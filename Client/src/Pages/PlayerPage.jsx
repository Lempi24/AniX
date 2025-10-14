import Navigation from '../Components/Navigation';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Breadcrumbs from '../Components/Breadcrumbs';
const PlayerPage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [animeData, setAnimeData] = useState(location.state?.animeData || null);
	const { animeId, episodeNumber } = useParams();
	const [selectedPlayerUrl, setSelectedPlayerUrl] = useState(null);
	const [currentEpisode, setCurrentEpisode] = useState(null);
	const [loading, setLoading] = useState(true);
	const [animeEpisodesData, setAnimeEpisodesData] = useState(
		location.state?.animeData || null
	);
	const handleEpisodeChange = (newEpisodeNumber) => {
		setSelectedPlayerUrl(null);
		navigate(`/watch/${animeId}/${newEpisodeNumber}`);
	};

	const statusTranslate = {
		'Finished Airing': 'Zakończony',
		'Currently Airing': 'Emitowane',
	};
	useEffect(() => {
		setLoading(true);
		const fetchAnimeDetails = async () => {
			if (!animeData) {
				try {
					const response = await axios.get(
						`${import.meta.env.VITE_BACKEND_URL}/anime/${animeId}`
					);
					setAnimeData(response.data);
				} catch (err) {
					console.error('Error fetching anime details:', err);
				}
			}
		};

		const fetchEpisodesList = async () => {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/anime/${animeId}/episodes`
				);
				setAnimeEpisodesData(response.data);
			} catch (err) {
				console.error('Error fetching episodes list:', err);
			}
		};

		const fetchAllData = async () => {
			try {
				await Promise.all([fetchAnimeDetails(), fetchEpisodesList()]);
			} catch (error) {
				console.error('Błąd podczas pobierania danych:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchAllData();
	}, [animeId]);
	useEffect(() => {
		if (animeEpisodesData && animeEpisodesData.length > 0) {
			const foundEpisode = animeEpisodesData.find(
				(ep) => ep.episode_number == episodeNumber
			);
			setCurrentEpisode(foundEpisode);
		}
	}, [episodeNumber, animeEpisodesData]);
	console.log('Obecny odcinek:', currentEpisode);
	if (!animeData) {
		return (
			<div>
				<Navigation />
				<h1>Nie znaleziono danych anime!</h1>
				<p>
					Wróć na <Link to='/'>stronę główną</Link> i wybierz anime.
				</p>
			</div>
		);
	}
	console.log(animeEpisodesData);
	return (
		<div>
			<Navigation />
			<Breadcrumbs
				animeId={animeId}
				title={animeData.title}
				episodeNumber={episodeNumber}
			/>
			<main className='relative flex flex-col lg:flex-row-reverse  items-center gap-10 mt-10 max-w-7xl mx-auto px-4'>
				<div className='flex flex-col gap-5 w-full lg:w-1/3 lg:mb-auto'>
					<div className='flex items-center gap-5 border-2 rounded-md p-2 border-cta '>
						<img
							src={animeData.image_url}
							alt={animeData.title}
							className='w-[100px] rounded-sm'
						/>
						<div>
							<h2 className='font-bold text-lg'>{animeData.title}</h2>
							<div className='text-sm text-accent'>
								<p>Ocena: N/A</p>
								<p>Odcinki: {animeData.episodes}</p>
								<p>Status: {statusTranslate[animeData.status] || 'N/A'}</p>
								<p>Rok: {animeData.year}</p>
							</div>
						</div>
					</div>
					<div className='border-2 border-cta rounded-md p-5 w-full'>
						<p className='border-b-2 border-cta text-xl pb-3'>Lista odcinków</p>
						<div className='flex flex-col mt-3 max-h-[300px] overflow-auto gap-2'>
							{Array.from({ length: animeData.episodes }, (_, i) => i + 1).map(
								(epNum) => (
									<button
										key={epNum}
										onClick={() => handleEpisodeChange(epNum)}
										className={`${
											epNum == episodeNumber ? 'bg-cta' : ''
										} border-2 border-cta rounded-md p-2 cursor-pointer`}
									>
										<p
											className={`${
												epNum == episodeNumber ? 'text-main' : 'text-cta'
											}`}
										>
											Odcinek {epNum}
										</p>
									</button>
								)
							)}
						</div>
					</div>
				</div>
				<div className='flex flex-col gap-5 w-full lg:w-2/3'>
					<p className='font-bold text-2xl'>
						Odcinek {episodeNumber}
						{': '}
						{currentEpisode?.title}
					</p>

					<div className='relative border-2 border-cta rounded-md overflow-hidden bg-black flex items-center justify-center'>
						<div className='aspect-video w-full'>
							{selectedPlayerUrl ? (
								<iframe
									className='w-full h-full'
									src={selectedPlayerUrl}
									title='Odtwarzacz wideo odcinka anime'
									allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
									allowFullScreen
								></iframe>
							) : (
								<div className='w-full h-full flex items-center text-center justify-center text-cta text-xl font-semibold'>
									Wybierz player aby rozpocząć odtwarzanie
								</div>
							)}
						</div>
					</div>
					<div className='border-2 border-cta rounded-md p-5 w-full mb-5'>
						<p className='border-b-2 border-cta text-xl pb-3'>Wybierz player</p>
						<div className='grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3 mt-4'>
							{loading ? (
								<p className='text-cta animate-pulse'>Ładowanie playerów...</p>
							) : currentEpisode &&
							  currentEpisode.player_urls &&
							  Object.keys(currentEpisode.player_urls).length > 0 ? (
								Object.entries(currentEpisode.player_urls).map(
									([playerName, playerUrl]) => (
										<button
											key={playerName}
											onClick={() => setSelectedPlayerUrl(playerUrl)}
											className={`flex flex-col items-center justify-center p-3 border-2 border-cta rounded-lg transition-colors cursor-pointer
                        ${
													selectedPlayerUrl === playerUrl
														? 'bg-cta text-black font-bold'
														: 'hover:bg-cta/20'
												}`}
										>
											<span className='text-lg capitalize'>
												{' '}
												{playerName.replace(/ Cafe$/i, '')}
											</span>
											<span className='text-xs opacity-70'>JP • SUB</span>
										</button>
									)
								)
							) : (
								<p className='col-span-full text-center text-cta'>
									Brak dostępnych playerów dla tego odcinka. :c
								</p>
							)}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};
export default PlayerPage;
