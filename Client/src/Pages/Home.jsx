import { ImageCarousel } from '../Components/ImageCarousel';
import Navigation from '../Components/Navigation';
import AnimeCardSection from '../Components/AnimeCardSection';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AnimeCardSectionSkeleton from '../Components/Anime/AnimeCardSectionSkeleton';
const Home = () => {
	const navigate = useNavigate();
	const [popularAnime, setPopularAnime] = useState([]);
	const [recentAnime, setRecentAnime] = useState([]);
	const [recomendedAnime, setRecommendedAnime] = useState([]);
	const [loading, setLoading] = useState(true);
	const fetchAllData = async () => {
		setLoading(true);
		try {
			const requests = [
				axios.get(`${import.meta.env.VITE_BACKEND_URL}/anime/popular`),
				axios.get(`${import.meta.env.VITE_BACKEND_URL}/anime/recent`),
				axios.get(`${import.meta.env.VITE_BACKEND_URL}/anime/recommended`),
			];

			const [popularResponse, recentResponse, recomendedResponse] =
				await Promise.all(requests);
			setRecommendedAnime(recomendedResponse.data);
			setPopularAnime(popularResponse.data);
			setRecentAnime(recentResponse.data);
		} catch (error) {
			console.error('Error fetching popular anime:', error);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchAllData();
	}, []);
	const handleAnimeClick = (animeObject) => {
		if (animeObject && animeObject.mal_id) {
			navigate(`/anime/${animeObject.mal_id}`, {
				state: { animeData: animeObject },
			});
		} else if (typeof animeObject === 'number') {
			navigate(`/anime/${animeObject}`);
		}
	};
	const slides = [
		{
			src: 'https://cdn.myanimelist.net/images/anime/1959/151055l.jpg',
			title: 'Boku no Hero Academia: Final Season',
			description: 'Epicki finał serii! Nowe odcinki już dostępne!',
			buttonAction: () => handleAnimeClick(60098),
		},
		{
			src: 'https://cdn.myanimelist.net/images/anime/1682/150432l.jpg',
			title: 'Gachiakuta',
			description:
				'Śmieci wciąż nieposprzątane. Pierwszy sezon Gachiakuta trwa w najlepsze!',
			buttonAction: () => handleAnimeClick(59062),
		},
		{
			src: 'https://cdn.myanimelist.net/images/anime/1364/151767l.jpg',
			title: 'Sanda',
			description:
				'Anime studia Science SARU od twórczyni Beastars, w niedalekiej przyszłości, gdzie liczba urodzeń dramatycznie spada, nastolatek Sanda odkrywa, że jest potomkiem Świętego Mikołaja i zmuszony zostaje ratować przyjaciółkę koleżanki przed zniknięciem.',
			buttonAction: () => handleAnimeClick(59267),
		},
	];
	return (
		<div>
			<Navigation onAnimeClick={handleAnimeClick} />
			<main className='space-y-5 lg:flex lg:flex-col lg:items-center lg:justify-center'>
				<ImageCarousel slides={slides} />
				{loading ? (
					<>
						<AnimeCardSectionSkeleton />
						<AnimeCardSectionSkeleton />
						<AnimeCardSectionSkeleton />
					</>
				) : (
					<>
						<AnimeCardSection
							h2='Popularne teraz'
							animeList={popularAnime}
							onAnimeClick={handleAnimeClick}
						/>
						<AnimeCardSection
							h2='Ostatnio dodane'
							animeList={recentAnime}
							onAnimeClick={handleAnimeClick}
						/>
						<AnimeCardSection
							h2='Dla początkujących'
							animeList={recomendedAnime}
							onAnimeClick={handleAnimeClick}
						/>
					</>
				)}
			</main>
		</div>
	);
};

export default Home;
