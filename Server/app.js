import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { error } from 'console';
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
app.get('/auth/verify', authenticateToken, async (req, res) => {
	try {
		const userResult = await pool.query(
			'SELECT id, username, email, avatar_url FROM users WHERE id = $1',
			[req.user.userId]
		);

		if (userResult.rows.length === 0) {
			return res.status(401).json({ error: 'Nieprawidłowy token' });
		}

		res.json({
			user: userResult.rows[0],
		});
	} catch (error) {
		console.error('Błąd verify:', error);
		res.status(500).json({ error: 'Błąd serwera' });
	}
});
async function validateUserAndAnime(userId, animeId) {
	const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [
		userId,
	]);
	if (userResult.rows.length === 0)
		throw { status: 404, message: 'Użytkownik nie istnieje' };

	const animeResult = await pool.query(
		'SELECT * FROM anime WHERE mal_id = $1',
		[animeId]
	);
	if (animeResult.rows.length === 0)
		throw { status: 404, message: 'Anime nie istnieje' };

	return { user: userResult.rows[0], anime: animeResult.rows[0] };
}

function authenticateToken(req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) {
		return res.status(401).json({ error: 'Token wymagany' });
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) {
			return res.status(403).json({ error: 'Nieprawidłowy token' });
		}
		req.user = user;
		next();
	});
}
const optionalAuthMiddleware = (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (authHeader && authHeader.startsWith('Bearer ')) {
		const token = authHeader.split(' ')[1];
		try {
			req.user = jwt.verify(token, process.env.JWT_SECRET);
		} catch (e) {
			req.user = null;
		}
	}
	next();
};
app.post('/auth/login', async (req, res) => {
	try {
		const { username, password } = req.body;

		if (!username || !password) {
			return res.status(400).json({ error: 'Proszę wypełnić wszystkie pola.' });
		}

		const normalizedUsername = username.toLowerCase();

		const userResult = await pool.query(
			'SELECT * FROM users WHERE LOWER(email) = $1 OR LOWER(username) = $1',
			[normalizedUsername]
		);
		if (userResult.rows.length === 0) {
			return res.status(401).json({ error: 'Nieprawidłowe dane' });
		}
		const user = userResult.rows[0];

		const isPasswordValid = await bcrypt.compare(password, user.password_hash);
		if (!isPasswordValid) {
			return res.status(401).json({ error: 'Nieprawidłowe dane' });
		}

		const token = jwt.sign(
			{ userId: user.id, username: user.username },
			process.env.JWT_SECRET,
			{ expiresIn: '7d' }
		);

		res.json({
			message: 'Zalogowano pomyślnie!',
			token,
			user: {
				id: user.id,
				username: user.username,
				email: user.email,
			},
		});
	} catch (error) {
		console.error('Błąd podczas logowania:', error);
		res.status(500).json({ error: 'Wystąpił błąd serwera.' });
	}
});

app.post('/auth/register', async (req, res) => {
	try {
		let { username, email, password } = req.body;
		if (!username || !email || !password) {
			return res.status(400).json({ error: 'Proszę wypełnić wszystkie pola' });
		}
		username = username.toLowerCase();
		email = email.toLowerCase();
		const userCheck = await pool.query(
			'SELECT * FROM users WHERE LOWER(email) = $1 OR LOWER(username) = $2',
			[email, username]
		);
		if (userCheck.rows.length > 0) {
			return res
				.status(400)
				.json({ error: 'Użytkownik o tym e-mailu lub nazwie już istnieje' });
		}

		const saltRounds = 10;
		const passwordHash = await bcrypt.hash(password, saltRounds);

		await pool.query(
			'INSERT INTO users (username, email, password_hash, avatar_url) VALUES ($1, $2, $3, $4)',
			[
				username,
				email,
				passwordHash,
				'https://placehold.co/150x150/1a1a2e/e94560?text=:-)',
			]
		);

		res.status(201).json({ message: 'Użytkownik pomyślnie zarejestrowany!' });
	} catch (error) {
		console.error('Błąd podczas rejestracji:', error);
		res.status(500).json({ error: 'Wystąpił błąd serwera.' });
	}
});

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
app.get('/anime/:id/relations', async (req, res) => {
	const { id } = req.params;

	try {
		const initialRes = await pool.query(
			'SELECT prequel_id, sequel_id FROM anime WHERE mal_id = $1',
			[id]
		);

		if (initialRes.rows.length === 0) {
			return res.json([]);
		}

		const { prequel_id, sequel_id } = initialRes.rows[0];
		const relationIds = [];
		if (prequel_id) relationIds.push(prequel_id);
		if (sequel_id) relationIds.push(sequel_id);

		if (relationIds.length === 0) {
			return res.json([]);
		}

		const relationsQuery = `
            SELECT mal_id, title, english_title, image_url, episodes
            FROM anime
            WHERE mal_id = ANY($1::int[]);
        `;

		const relationsRes = await pool.query(relationsQuery, [relationIds]);

		const finalRelations = relationsRes.rows.map((anime) => ({
			...anime,
			relation_type: anime.mal_id === prequel_id ? 'Prequel' : 'Sequel',
		}));

		res.json(finalRelations);
	} catch (error) {
		console.error(`Błąd podczas pobierania powiązań dla anime ${id}:`, error);
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
app.get('/anime/:id/episodes', optionalAuthMiddleware, async (req, res) => {
	try {
		const { id } = req.params;
		const userId = req.user?.userId || null;

		const animeCheck = await pool.query(
			'SELECT is_protected FROM anime WHERE mal_id = $1',
			[id]
		);
		if (animeCheck.rows.length === 0) {
			return res.status(404).json({ error: 'Nie znaleziono anime' });
		}
		const isProtected = animeCheck.rows[0].is_protected;
		if (isProtected && !userId) {
			return res
				.status(401)
				.json({ error: 'Musisz być zalogowany, aby obejrzeć te anime' });
		}
		const query = `
			SELECT 
				*, 
				(NOW() - created_at <= interval '7 days') AS is_new
			FROM episodes 
			WHERE anime_id = $1 
			ORDER BY episode_number ASC
		`;
		const result = await pool.query(query, [id]);

		res.json(result.rows);
	} catch (error) {
		console.error('Błąd podczas pobierania listy odcinków:', error);
		res.status(500).json({ error: 'Wystąpił błąd serwera.' });
	}
});
app.put('/user/anime-status', authenticateToken, async (req, res) => {
	const { id, status } = req.body;
	const userId = req.user.userId;
	if (!id || !status) {
		return res.status(400).json({ message: 'Brakuje danych' });
	}

	try {
		const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [
			userId,
		]);
		if (userResult.rows.length === 0) {
			return res.status(404).json({ error: 'Użytkownik nie istnieje' });
		}

		const animeResult = await pool.query(
			'SELECT * FROM anime WHERE mal_id = $1',
			[id]
		);
		if (animeResult.rows.length === 0) {
			return res.status(404).json({ error: 'Anime nie istnieje' });
		}
		if (!status || status === 'none') {
			await pool.query(
				'DELETE FROM user_anime_library WHERE user_id = $1 AND anime_id = $2',
				[userId, id]
			);
			return res.status(200).json({ message: 'Anime usunięte z listy' });
		}
		await pool.query(
			`INSERT INTO user_anime_library (user_id, anime_id, status, is_favorite, user_score)
             VALUES ($1, $2, $3, false, 0)
             ON CONFLICT (user_id, anime_id)
             DO UPDATE SET status = EXCLUDED.status`,
			[userId, id, status]
		);

		res.status(200).json({ message: `Status zmieniony na: ${status}` });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Błąd servera' });
	}
});
app.put('/user/anime-status/favorite', authenticateToken, async (req, res) => {
	const { isFavorite, id } = req.body;
	const userId = req.user.userId;
	if (!id || typeof isFavorite !== 'boolean') {
		return res.status(400).json({ message: 'Brakuje danych' });
	}
	try {
		await validateUserAndAnime(userId, id);

		await pool.query(
			`INSERT INTO user_anime_library (user_id, anime_id, status, is_favorite, user_score)
       VALUES ($1, $2, '', $3, 0)
       ON CONFLICT (user_id, anime_id)
       DO UPDATE SET is_favorite = EXCLUDED.is_favorite`,
			[userId, id, isFavorite]
		);
		res.status(200).json({
			message: isFavorite ? 'Dodano do ulubionych' : 'Usunięto z ulubionych',
		});
	} catch (err) {
		console.error(err);
		res
			.status(err.status || 500)
			.json({ message: err.message || 'Błąd servera' });
	}
});
app.put('/user/anime-score', authenticateToken, async (req, res) => {
	const { id, score } = req.body;
	const userId = req.user.userId;
	if (!id || score === undefined || score === null) {
		return res.status(400).json({ message: 'Brakuje danych' });
	}

	try {
		await validateUserAndAnime(userId, id);
		await pool.query(
			`
            INSERT INTO user_anime_library (user_id, anime_id, status, is_favorite, user_score, updated_at)
            VALUES ($1, $2, '', false, $3, NOW())
            ON CONFLICT (user_id, anime_id)
            DO UPDATE SET user_score = EXCLUDED.user_score, updated_at = NOW()
            `,
			[userId, id, score]
		);

		await pool.query(
			`
            UPDATE anime
            SET score = (
                SELECT AVG(user_score)::numeric(3,2)
                FROM user_anime_library
                WHERE anime_id = $1 AND user_score IS NOT NULL AND user_score > 0

            )
            WHERE anime.mal_id = $1
            `,
			[id]
		);

		res.status(200).json({ message: `Ocena ustawiona na ${score}` });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Błąd serwera' });
	}
});
app.get(
	'/user/fetch-user-anime-profile',
	authenticateToken,
	async (req, res) => {
		const { id } = req.query;
		const userId = req.user.userId;
		try {
			const userAnimeData = await pool.query(
				'SELECT * FROM user_anime_library WHERE user_id = $1 AND anime_id = $2',
				[userId, id]
			);
			if (userAnimeData.rows.length === 0) {
				return res.status(404).json({ error: 'Nie zaleziono danych' });
			}
			res.json(userAnimeData.rows[0]);
		} catch (error) {
			console.error('Nie pobrano danych:', error);
			res.status(500).json({ message: 'Błąd servera' });
		}
	}
);
app.get('/user/watched-episodes', authenticateToken, async (req, res) => {
	const { animeId } = req.query;
	const userId = req.user.userId;

	try {
		const queryResponse = await pool.query(
			'SELECT episode_number, iswatched FROM user_episode_progress WHERE anime_id = $1 AND user_id = $2',
			[animeId, userId]
		);
		res.json(queryResponse.rows);
	} catch (error) {
		console.error('Nie pobrano danych:', error);
		res.status(500).json({ message: 'Błąd servera' });
	}
});
app.put('/user/:animeId/watched', authenticateToken, async (req, res) => {
	const { animeId } = req.params;
	const userId = req.user.userId;
	const episodes = req.body;

	if (!Array.isArray(episodes)) {
		return res.status(400).json({ error: 'Payload musi być tablicą' });
	}
	try {
		const updatePromises = episodes.map((episode) => {
			const { episodeNumber, isWatched } = episode;

			const upsertQuery = `
                INSERT INTO user_episode_progress (user_id, anime_id, episode_number, isWatched)
                VALUES ($1, $2, $3, $4)
                ON CONFLICT (user_id, anime_id, episode_number)
                DO UPDATE SET isWatched = $4;
            `;

			return pool.query(upsertQuery, [
				userId,
				animeId,
				episodeNumber,
				isWatched,
			]);
		});
		await Promise.all(updatePromises);
		res
			.status(200)
			.json({ message: 'Status obejrzanych odcinków zaktualizowany' });
	} catch (error) {
		console.error(
			'Błąd podczas aktualizacji statusu obejrzanych odcinków:',
			error
		);
		res.status(500).json({ error: 'Błąd serwera podczas zapisu danych' });
	}
});
app.get('/', (req, res) => {
	res.send('Backend działa ✅');
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
