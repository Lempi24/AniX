import { ImageCarousel } from '../Components/ImageCarousel';
import AnimeCardSection from '../Components/AnimeCardSection';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import AnimeCardSkeleton from '../Components/Anime/AnimeCardSkeleton';
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
				'Anime studia Science SARU, w niedalekiej przyszłości nastolatek Sanda odkrywa, że jest potomkiem Świętego Mikołaja i musi ratować przyjaciółkę przed zniknięciem.',
			buttonAction: () => handleAnimeClick(59267),
		},
	];
	return (
		<div>
			<main className='space-y-5 lg:flex lg:flex-col lg:items-center lg:justify-center'>
				<ImageCarousel slides={slides} />

				{loading ? (
					// 2. Blok ładowania - renderuje "szkieletowe" wersje AnimeCardSection
					<>
						{/* Szkielet dla "Popularne teraz" */}
						<section className='p-3 lg:max-w-2/3 w-full'>
							<div className='h-7 w-48 bg-gray-700 rounded-md animate-pulse mb-3'></div>
							<Swiper
								modules={[Navigation]}
								navigation
								spaceBetween={15}
								slidesPerView={'auto'}
							>
								{Array.from({ length: 6 }).map((_, i) => (
									<SwiperSlide
										key={i}
										className='!w-[185px] lg:!w-[250px] mt-5'
									>
										<AnimeCardSkeleton />
									</SwiperSlide>
								))}
							</Swiper>
						</section>

						{/* Szkielet dla "Ostatnio dodane" */}
						<section className='p-3 lg:max-w-2/3 w-full'>
							<div className='h-7 w-48 bg-gray-700 rounded-md animate-pulse mb-3'></div>
							<Swiper
								modules={[Navigation]}
								navigation
								spaceBetween={15}
								slidesPerView={'auto'}
							>
								{Array.from({ length: 6 }).map((_, i) => (
									<SwiperSlide
										key={i}
										className='!w-[185px] lg:!w-[250px] mt-5'
									>
										<AnimeCardSkeleton />
									</SwiperSlide>
								))}
							</Swiper>
						</section>

						{/* Szkielet dla "Dla początkujących" */}
						<section className='p-3 lg:max-w-2/3 w-full'>
							<div className='h-7 w-48 bg-gray-700 rounded-md animate-pulse mb-3'></div>
							<Swiper
								modules={[Navigation]}
								navigation
								spaceBetween={15}
								slidesPerView={'auto'}
							>
								{Array.from({ length: 6 }).map((_, i) => (
									<SwiperSlide
										key={i}
										className='!w-[185px] lg:!w-[250px] mt-5'
									>
										<AnimeCardSkeleton />
									</SwiperSlide>
								))}
							</Swiper>
						</section>
					</>
				) : (
					// 3. Blok z prawdziwymi danymi (bez zmian)
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
