import Home from './Pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Anime from './Pages/Anime';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/anime' element={<Anime />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
