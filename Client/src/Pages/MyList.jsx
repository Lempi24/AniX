import AnimeCard from '../Components/AnimeCard';
import AnimeCardSkeleton from '../Components/Anime/AnimeCardSkeleton';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const MyList = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [allAnime, setAllAnime] = useState([]);
	const [filter, setFilter] = useState('all');
	const [stats, setStats] = useState(null);
	const filters = [
		{ key: 'all', label: 'Wszystkie' },
		{ key: 'watching', label: 'Oglądam' },
		{ key: 'completed', label: 'Ukończone' },
		{ key: 'planned', label: 'Planuję' },
		{ key: 'on_hold', label: 'Wstrzymane' },
		{ key: 'dropped', label: 'Porzucone' },
	];
	const fetchAnime = async (token) => {
		setAllAnime([]);
		setLoading(true);
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_BACKEND_URL}/user/anime-list`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
					params: {
						filter: filter,
					},
				}
			);
			setAllAnime(response.data);
			setLoading(false);
		} catch (error) {
			console.error('Error fetching anime list:', error);
			setLoading(false);
		} finally {
			setLoading(false);
		}
	};
	const fetchStats = async (token) => {
		try {
			const response = await axios.get(
				`${import.meta.env.VITE_BACKEND_URL}/user/anime-list/stats`,
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			setStats(response.data);
		} catch (error) {
			console.error('Error fetching list stats:', error);
		}
	};
	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) {
			navigate('/');
			setLoading(false);
			return;
		}
		fetchAnime(token);
		if (!stats) {
			fetchStats(token);
		}
	}, [filter]);
	const handleAnimeClick = (anime) => {
		navigate(`/anime/${anime.mal_id}`);
	};
	console.log(allAnime);
	return (
		<div>
			<main className='space-y-5 px-5 py-10 max-w-7xl mx-auto'>
				<div className='p-5 lg:w-2/3'>
					<div className='flex justify-center lg:justify-start gap-5 pb-2 text-sm font-medium'>
						{['Profil', 'Lista anime', 'Ustawienia'].map((label, i) => (
							<button
								key={label}
								className={`relative pb-1 transition-colors duration-200 ${
									i === 1
										? 'text-cta after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-cta cursor-pointer'
										: 'text-gray-300 hover:text-cta/70'
								}`}
							>
								{label}
							</button>
						))}
					</div>
				</div>
				<div className='p-5 lg:w-2/3'>
					<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2'>
						{filters.map((f) => (
							<button
								key={f.key}
								onClick={() => setFilter(f.key)}
								className={`flex items-center justify-center gap-2 p-3 text-sm rounded-xl border-2 border-cta transition-colors duration-300 cursor-pointer ${
									filter === f.key ? 'bg-cta text-main' : 'hover:bg-cta/20'
								}`}
							>
								<span>{f.label}</span>
								<span className='opacity-80'>
									({stats ? stats[f.key] ?? '0' : '0'})
								</span>
							</button>
						))}
					</div>
				</div>
				<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center mt-5'>
					{loading && allAnime.length === 0
						? Array.from({ length: 5 }).map((_, i) => (
								<AnimeCardSkeleton key={i} />
						  ))
						: allAnime.map((anime) => (
								<div key={anime.mal_id} onClick={() => handleAnimeClick(anime)}>
									<AnimeCard
										title={anime.title}
										imageUrl={anime.image_url}
										episodes={anime.episodes}
										score={anime.score}
									/>
								</div>
						  ))}
				</div>
			</main>
		</div>
	);
};
export default MyList;
