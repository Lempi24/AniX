import Home from './Pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AnimeDetails from './Pages/AnimeDetails';
import PlayerPage from './Pages/PlayerPage';
import Anime from './Pages/Anime';
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/anime/:animeId' element={<AnimeDetails />} />
				<Route path='/watch/:animeId/:episodeNumber' element={<PlayerPage />} />
				<Route path='/anime' element={<Anime />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
