import Navigation from '../Components/Navigation';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimeCard from '../Components/AnimeCard';
import AnimeCardSkeleton from '../Components/Anime/AnimeCardSkeleton';
const Anime = () => {
	const genresTranslate = {
		Action: 'Akcja',
		Romance: 'Romans',
		Adventure: 'Przygoda',
		Sports: 'Sportowy',
		'Award Winning': 'Nagradzany',
		Comedy: 'Komedia',
		Drama: 'Dramat',
		Erotica: 'Erotyczne',
		Mystery: 'Tajemnica',
		'Slice of Life': 'Okruchy zycia',
		Gourmet: 'Kulinarny',
	};
	const navigate = useNavigate();
	const [allGenres, setAllGenres] = useState(null);
	const [allAnime, setAllAnime] = useState(null);
	const [loading, setLoading] = useState(true);
	const fetchAllGenresAndAnime = async () => {
		setLoading(true);
		try {
			const requests = [
				axios.get(`${import.meta.env.VITE_BACKEND_URL}/anime/genres`),
				axios.get(`${import.meta.env.VITE_BACKEND_URL}/anime/browse`),
			];
			const [allGenresResponse, allAnimeResponse] = await Promise.all(requests);
			setAllGenres(allGenresResponse.data);
			setAllAnime(allAnimeResponse.data);
		} catch (error) {
			console.error('Error catching genres: ', error);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchAllGenresAndAnime();
	}, []);
	const handleAnimeClick = (animeObject) => {
		navigate(`/anime/${animeObject.mal_id}`, {
			state: { animeData: animeObject },
		});
	};
	return (
		<div>
			<Navigation />
			<main className='space-y-5 px-5 py-10 max-w-7xl mx-auto'>
				<div className='p-5  lg:w-2/3'>
					<h2 className='font-bold text-2xl mb-3'>Sortowanie</h2>
					<div className='space-x-3 space-y-3'>
						<button className='border-2 border-cta p-2 rounded-2xl text-sm cursor-pointer'>
							Tytuł A-Z
						</button>
						<button className='border-2 border-cta p-2 rounded-2xl text-sm cursor-pointer'>
							Od najnowszych
						</button>
						<button className='border-2 border-cta p-2 rounded-2xl text-sm cursor-pointer'>
							Od najstarszych
						</button>
					</div>
				</div>
				<div className='p-5  lg:w-2/3'>
					<h2 className='font-bold text-2xl mb-3'>Filtrowanie</h2>
					<div className='space-x-3 space-y-3'>
						{!allGenres ? (
							<>Ładowanie</>
						) : (
							<>
								<button className='border-2 border-cta bg-cta p-2 rounded-2xl text-sm cursor-pointer'>
									Obecny sezon
								</button>
								{allGenres.map((genre) => (
									<button className='border-2 border-cta p-2 rounded-2xl text-sm cursor-pointer'>
										{genre}
									</button>
								))}
							</>
						)}
					</div>
				</div>
				<div>
					<h2 className='font-bold text-2xl mb-3'>Wyniki</h2>

					{/* Logika renderowania warunkowego */}
					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center mt-5'>
						{loading
							? // Jeśli się ładuje, pokaż 12 szkieletów
							  Array.from({ length: 12 }).map((_, index) => (
									<AnimeCardSkeleton key={index} />
							  ))
							: // Jeśli załadowane, pokaż prawdziwe karty
							  allAnime.map((anime) => (
									<div
										key={anime.mal_id}
										onClick={() => handleAnimeClick(anime)}
									>
										<AnimeCard
											title={anime.title}
											imageUrl={anime.image_url}
											episodes={anime.episodes}
										/>
									</div>
							  ))}
					</div>
				</div>
			</main>
		</div>
	);
};
export default Anime;
