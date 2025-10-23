import Home from './Pages/Home';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './Components/Navigation';
import AnimeDetails from './Pages/AnimeDetails';
import PlayerPage from './Pages/PlayerPage';
import Anime from './Pages/Anime';
import ScrollToTop from './Components/ScrollToTop';
import LoginPopup from './Components/LogInPopup';
import { Toaster } from 'react-hot-toast';
function App() {
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	return (
		<BrowserRouter>
			<ScrollToTop />
			<Navigation onLoginClick={() => setIsLoginOpen(true)} />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/anime/:animeId' element={<AnimeDetails />} />
				<Route path='/watch/:animeId/:episodeNumber' element={<PlayerPage />} />
				<Route path='/anime' element={<Anime />} />
			</Routes>
			<Toaster
				position='top-center'
				reverseOrder={false}
				toastOptions={{
					duration: 2000,
					style: {
						background: '#222831',
						color: '#e3e2e2',
						fontSize: '1.3rem',
						maxWidth: 'fit-content',
						width: 'fit-content',
						minWidth: 'unset',
					},
					success: {},
					error: {},
				}}
			/>
			<LoginPopup isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
		</BrowserRouter>
	);
}

export default App;
