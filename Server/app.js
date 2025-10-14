import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const BANNED_ID = [1535, 1735, 31964, 11757, 50265, 5114, 38000, 20583];
app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
		credentials: true,
	})
);
app.use(express.json());

const { Pool } = pg;
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		require: true,
	},
});
const getCurrentSeason = () => {
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth() + 1;

	let season;
	if (month >= 1 && month <= 3) {
		season = 'winter';
	} else if (month >= 4 && month <= 6) {
		season = 'spring';
	} else if (month >= 7 && month <= 9) {
		season = 'summer';
	} else {
		season = 'fall';
	}
	return { year, season };
};
app.get('/anime/popular', async (req, res) => {
	try {
		const { year, season } = getCurrentSeason();
		const query = `
            SELECT * FROM anime 
            WHERE year = $1 AND season = $2 
            ORDER BY members DESC 
            LIMIT 10
        `;
		const values = [year, season];
		const result = await pool.query(query, values);
		res.json(result.rows);
	} catch (error) {
		console.error('Error fetching popular anime:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});
app.get('/anime/recent', async (req, res) => {
	try {
		const query = `
            SELECT a.*
            FROM anime a
            JOIN (
                -- Znajdź najnowszą datę dodania odcinka dla każdego anime
                SELECT DISTINCT ON (anime_id) anime_id, created_at AS latest_episode_date
                FROM episodes
                ORDER BY anime_id, created_at DESC
            ) AS latest_episodes ON a.mal_id = latest_episodes.anime_id
            WHERE a.mal_id <> ALL($1::int[]) -- Zachowujemy Twoją listę banów
            ORDER BY latest_episodes.latest_episode_date DESC -- Sortuj po dacie ostatniego odcinka
            LIMIT 10;
        `;
		const result = await pool.query(query, [BANNED_ID]);
		res.json(result.rows);
	} catch (error) {
		console.error('Error fetching recent anime:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});
app.get('/anime/recommended', async (req, res) => {
	try {
		const query = 'SELECT * FROM anime WHERE mal_id = ANY($1::int[])';

		const result = await pool.query(query, [BANNED_ID]);
		res.json(result.rows);
	} catch (error) {
		console.error('Error fetching recommended anime:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});
app.get('/anime/genres', async (req, res) => {
	try {
		const query =
			'SELECT DISTINCT UNNEST(genres) AS genre FROM anime ORDER BY genre ASC';

		const result = await pool.query(query);

		const genres = result.rows.map((row) => row.genre);

		res.json(genres);
	} catch (error) {
		console.error('Error fetching genres:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});
app.get('/anime/search', async (req, res) => {
	const { q } = req.query;
	if (!q) {
		return res.json([]);
	}
	try {
		const query = `
            SELECT
                *,
                -- Rozszerzamy ranking, aby uwzględniał OBA tytuły
                CASE
                    WHEN title ILIKE $2 OR english_title ILIKE $2 THEN 3 -- Dopasowanie od początku
                    WHEN title ILIKE $3 OR english_title ILIKE $3 THEN 2 -- Dopasowanie w środku
                    ELSE 1
                END as priority,
                -- Wybierz NAJLEPSZE dopasowanie z obu tytułów
                GREATEST(similarity(title, $1), similarity(COALESCE(english_title, ''), $1)) as sim
            FROM anime
            WHERE
                -- Rozszerzamy wyszukiwanie, aby uwzględniało OBA tytuły
                (title ILIKE $3 OR english_title ILIKE $3)
                OR (word_similarity(title, $1) > 0.4 OR word_similarity(COALESCE(english_title, ''), $1) > 0.4)
            ORDER BY
                priority DESC,
                sim DESC       
            LIMIT 10;
        `;
		const values = [q, `${q}%`, `%${q}%`];

		const result = await pool.query(query, values);
		res.json(result.rows);
	} catch (error) {
		console.error('Błąd podczas wyszukiwania:', error);
		res.status(500).json({ error: 'Błąd serwera' });
	}
});
app.get('/anime/filter', async (req, res) => {
	try {
		const { genres, page = 1, limit = 20 } = req.query;
		const genreFilters = Array.isArray(genres)
			? genres
			: genres
			? [genres]
			: [];

		const offset = (parseInt(page) - 1) * parseInt(limit);

		let query;
		let values;

		if (genreFilters.length > 0) {
			console.log('Filtruję po gatunkach:', genreFilters);

			query = `
                SELECT * FROM anime
                WHERE genres @> $1::TEXT[]
                ORDER BY title ASC NULLS LAST
				LIMIT $2 OFFSET $3;
            `;
			values = [genreFilters, limit, offset];
		} else {
			query = `
                SELECT * FROM anime
                ORDER BY title ASC NULLS LAST
				LIMIT $1 OFFSET $2;
            `;
			values = [limit, offset];
		}

		const result = await pool.query(query, values);
		res.json(result.rows);
	} catch (error) {
		console.error('Błąd podczas filtrowania anime:', error);
		res.status(500).json({ error: 'Błąd serwera' });
	}
});
app.get('/anime/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const query = 'SELECT * FROM anime WHERE mal_id = $1';
		const result = await pool.query(query, [id]);

		if (result.rows.length === 0) {
			return res
				.status(404)
				.json({ error: 'Nie zaleziono anime o podanym ID.' });
		}
		res.json(result.rows[0]);
	} catch (error) {
		console.error('Błąd podczas pobierania danych anime:', error);
		res.status(500).json({ error: 'Wystąpił błąd serwera.' });
	}
});
app.get('/anime/:id/episodes', async (req, res) => {
	try {
		const { id } = req.params;
		const query =
			'SELECT * FROM episodes WHERE anime_id = $1 ORDER BY episode_number ASC';
		const result = await pool.query(query, [id]);

		res.json(result.rows);
	} catch (error) {
		console.error('Błąd podczas pobierania listy odcinków:', error);
		res.status(500).json({ error: 'Wystąpił błąd serwera.' });
	}
});
app.get('/', (req, res) => {
	res.send('Backend działa ✅');
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
