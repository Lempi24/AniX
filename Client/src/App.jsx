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
import Footer from './Pages/Footer';
import Dmca from './Pages/Dmca';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import TermsOfService from './Pages/TermsOfService';
import ContactPage from './Pages/ContactPage';
import MyList from './Pages/MyList';
function App() {
	const [isLoginOpen, setIsLoginOpen] = useState(false);
	return (
		<BrowserRouter>
			<ScrollToTop />
			<Navigation onLoginClick={() => setIsLoginOpen(true)} />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route
					path='/anime/:animeId'
					element={<AnimeDetails loginPopup={() => setIsLoginOpen(true)} />}
				/>
				<Route path='/watch/:animeId/:episodeNumber' element={<PlayerPage />} />
				<Route path='/anime' element={<Anime />} />
				<Route path='/dmca' element={<Dmca />} />
				<Route path='/privacy-policy' element={<PrivacyPolicy />} />
				<Route path='/terms-of-service' element={<TermsOfService />} />
				<Route path='/contact' element={<ContactPage />} />
				<Route path='/my-list' element={<MyList />} />
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
			<Footer />
			<LoginPopup isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
		</BrowserRouter>
	);
}

export default App;
