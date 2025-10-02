import { ImageCarousel } from '../Components/ImageCarousel';
import Navigation from '../Components/Navigation';
import AnimeCardSection from '../Components/AnimeCardSection';
import { useState, useEffect } from 'react';
import axios from 'axios';
const slides = [
	{
		src: 'https://cdn.myanimelist.net/images/anime/1000/110531l.jpg',
		title: 'Attack on Titan: Final Season',
		description:
			'Epicki finał serii, który zmieni wszystko. Nowe odcinki już dostępne!',
		buttonAction: () => console.log('Oglądaj Attack on Titan'),
	},
	{
		src: 'https://cdn.myanimelist.net/images/anime/1584/143719l.jpg',
		title: 'Dandadan: Sezon 2',
		description: 'Kontynuacja hitu! Nowe przygody już dostępne.',
		buttonAction: () => console.log('Oglądaj Dandadan'),
	},
];
const Home = () => {
	const [popularAnime, setPopularAnime] = useState([]);
	const [recentAnime, setRecentAnime] = useState([]);
	const [recomendedAnime, setRecommendedAnime] = useState([]);
	const fetchAllData = async () => {
		try {
			const requests = [
				axios.get('http://localhost:3001/anime/popular'),
				axios.get('http://localhost:3001/anime/recent'),
				axios.get('http://localhost:3001/anime/recommended'),
			];

			const [popularResponse, recentResponse, recomendedResponse] =
				await Promise.all(requests);
			setRecommendedAnime(recomendedResponse.data);
			setPopularAnime(popularResponse.data);
			setRecentAnime(recentResponse.data);
		} catch (error) {
			console.error('Error fetching popular anime:', error);
		}
	};
	useEffect(() => {
		fetchAllData();
	}, []);
	console.log(popularAnime);
	return (
		<div>
			<Navigation />
			<main className='space-y-5 lg:flex lg:flex-col lg:items-center lg:justify-center'>
				<ImageCarousel slides={slides} />
				<AnimeCardSection h2='Popularne teraz' animeList={popularAnime} />
				<AnimeCardSection h2='Ostatnio dodane' animeList={recentAnime} />
				<AnimeCardSection h2='Dla początkujących' animeList={recomendedAnime} />
			</main>
		</div>
	);
};

export default Home;
