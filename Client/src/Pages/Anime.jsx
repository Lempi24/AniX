import Navigation from '../Components/Navigation';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimeCard from '../Components/AnimeCard';
import AnimeCardSkeleton from '../Components/Anime/AnimeCardSkeleton';

const Anime = () => {
	const navigate = useNavigate();
	const [allGenres, setAllGenres] = useState(null);
	const [allAnime, setAllAnime] = useState([]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [choosenFilters, setChoosenFilters] = useState([]);
	const observerRef = useRef(null);

	// 🔹 Ładujemy listę gatunków tylko raz
	useEffect(() => {
		const fetchGenres = async () => {
			try {
				const res = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/anime/genres`
				);
				setAllGenres(res.data);
			} catch (err) {
				console.error('Error fetching genres:', err);
			}
		};
		fetchGenres();
	}, []);

	// 🔹 Pobieranie anime
	const fetchAnime = async (reset = false) => {
		if (loading) return;
		setLoading(true);
		try {
			const params = new URLSearchParams();
			choosenFilters.forEach((genre) => params.append('genres', genre));
			params.append('page', reset ? 1 : page);
			params.append('limit', 20);

			const res = await axios.get(
				`${import.meta.env.VITE_BACKEND_URL}/anime/filter?${params.toString()}`
			);
			const newData = res.data;

			if (reset) {
				setAllAnime(newData);
			} else {
				setAllAnime((prev) => [...prev, ...newData]);
			}

			setHasMore(newData.length === 20);
		} catch (err) {
			console.error('Error fetching anime:', err);
		} finally {
			setLoading(false);
		}
	};

	// 🔹 Reset wyników przy zmianie filtrów
	useEffect(() => {
		setPage(1);
		setHasMore(true);
		fetchAnime(true);
	}, [choosenFilters]);

	// 🔹 Paginacja — kolejne strony
	useEffect(() => {
		if (page > 1) fetchAnime();
	}, [page]);

	// 🔹 IntersectionObserver
	useEffect(() => {
		if (loading || !hasMore) return;
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setPage((prev) => prev + 1);
				}
			},
			{ threshold: 1 }
		);

		if (observerRef.current) observer.observe(observerRef.current);
		return () => observer.disconnect();
	}, [loading, hasMore]);

	const handleAnimeClick = (anime) => {
		navigate(`/anime/${anime.mal_id}`, { state: { animeData: anime } });
	};

	return (
		<div>
			<Navigation />
			<main className='space-y-5 px-5 py-10 max-w-7xl mx-auto'>
				{/* Filtrowanie */}
				<div className='p-5 lg:w-2/3'>
					<h2 className='font-bold text-2xl mb-3'>Filtrowanie</h2>
					<div className='space-x-3 space-y-3'>
						{!allGenres ? (
							<>Ładowanie...</>
						) : (
							allGenres.map((genre) => (
								<button
									key={genre}
									onClick={() =>
										setChoosenFilters((prev) =>
											prev.includes(genre)
												? prev.filter((g) => g !== genre)
												: [...prev, genre]
										)
									}
									className={`border-2 p-2 rounded-2xl text-sm cursor-pointer ${
										choosenFilters.includes(genre)
											? 'bg-cta text-white border-cta'
											: 'border-cta'
									}`}
								>
									{genre}
								</button>
							))
						)}
					</div>
				</div>

				{/* Wyniki */}
				<div>
					<h2 className='font-bold text-2xl mb-3'>Wyniki</h2>
					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center mt-5'>
						{loading && allAnime.length === 0
							? Array.from({ length: 12 }).map((_, i) => (
									<AnimeCardSkeleton key={i} />
							  ))
							: allAnime.map((anime) => (
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

					{/* trigger na dole */}
					<div ref={observerRef} style={{ height: '40px' }} />

					{/* komunikaty */}
					{loading && allAnime.length > 0 && (
						<p className='text-center mt-4'>Ładowanie kolejnych...</p>
					)}
					{!hasMore && <p className='text-center mt-4'>Koniec listy.</p>}
				</div>
			</main>
		</div>
	);
};

export default Anime;
