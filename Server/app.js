import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const BANNED_ID = [1535, 1735, 31964, 11757, 50265, 5114, 38000, 20583];
app.use(cors());
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
		const query =
			'SELECT * FROM anime WHERE mal_id <> ALL($1::int[]) ORDER BY created_at DESC NULLS LAST LIMIT 10';

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
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
