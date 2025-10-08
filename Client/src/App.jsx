import Home from './Pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Anime from './Pages/Anime';
import PlayerPage from './Pages/PlayerPage';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/anime/:animeId' element={<Anime />} />
				<Route path='/watch/:animeId/:episodeNumber' element={<PlayerPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
