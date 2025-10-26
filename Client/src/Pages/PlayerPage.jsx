import InfoPopup from '../Components/InfoPopup';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Breadcrumbs from '../Components/Breadcrumbs';
import { useAuth } from '../Context/AuthContext';
import PlayerPageSkeleton from '../Components/PlayerPageSkeleton';
const PlayerPage = () => {
	const { isAuthenticated } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();
	const [isInfoPopupVisible, setIsInfoPopupVisible] = useState(false);
	const popupLocalStorageKey = 'adblockInfoDismissed';
	const [animeData, setAnimeData] = useState(location.state?.animeData || null);
	const { animeId, episodeNumber } = useParams();
	const [selectedPlayerUrl, setSelectedPlayerUrl] = useState(null);
	const [currentEpisode, setCurrentEpisode] = useState(null);
	const [loading, setLoading] = useState(true);
	const [animeEpisodesData, setAnimeEpisodesData] = useState(
		location.state?.animeData || null
	);
	const totalEpisodes = animeData?.episodes;
	const [watchedEpisodes, setWatchedEpisodes] = useState({});
	const [hasChanges, setHasChanges] = useState(false);
	const handleEpisodeChange = (newEpisodeNumber) => {
		if (newEpisodeNumber <= 0 || newEpisodeNumber > totalEpisodes) return;
		setSelectedPlayerUrl(null);
		navigate(`/watch/${animeId}/${newEpisodeNumber}`);
	};

	const statusTranslate = {
		'Finished Airing': 'Zakończony',
		'Currently Airing': 'Emitowane',
	};
	useEffect(() => {
		const popupDismissed = localStorage.getItem(popupLocalStorageKey);

		if (!popupDismissed) {
			setIsInfoPopupVisible(true);
		}
	}, []);
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
		const fetchUserEpisodeData = async () => {
			const token = localStorage.getItem('token');
			if (!token) {
				return console.error('No auth token found');
			}
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_BACKEND_URL}/user/watched-episodes`,
					{
						headers: { Authorization: `Bearer ${token}` },
						params: {
							animeId,
						},
					}
				);

				const formattedWatched = {};
				response.data.forEach((ep) => {
					formattedWatched[ep.episode_number] = ep.iswatched;
				});
				setWatchedEpisodes(formattedWatched);
			} catch (err) {
				console.error('Error fetching episodes data:', err);
			}
		};
		const fetchAllData = async () => {
			try {
				await Promise.all([
					fetchAnimeDetails(),
					fetchEpisodesList(),
					fetchUserEpisodeData(),
				]);
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
	const handleCloseInfoPopup = () => {
		setIsInfoPopupVisible(false);
		try {
			localStorage.setItem(popupLocalStorageKey, 'true');
		} catch (error) {
			console.error('Nie można zapisać w localStorage:', error);
		}
	};
	const handleSaveEpisodes = async () => {
		const payload = Object.entries(watchedEpisodes).map(
			([episodeNumber, isWatched]) => ({
				episodeNumber: Number(episodeNumber),
				isWatched,
			})
		);
		try {
			const token = localStorage.getItem('token');
			if (!token) return console.error('No auth token found');
			await axios.put(
				`${import.meta.env.VITE_BACKEND_URL}/user/${animeId}/watched`,
				payload,
				{ headers: { Authorization: `Bearer ${token}` } }
			);
			setHasChanges(false);
		} catch (error) {
			console.error('Nie można zapisać odcinków:', error);
		}
	};
	const popupMessage =
		'Niektóre zewnętrzne odtwarzacze wideo mogą wyświetlać reklamy. Istnieją narzędzia przeglądarkowe pozwalające dostosować sposób wyświetlania treści.';

	if (loading) {
		return <PlayerPageSkeleton />;
	}
	if (!animeData) {
		return (
			<div>
				<h1>Nie znaleziono danych anime!</h1>
				<p>
					Wróć na <Link to='/'>stronę główną</Link> i wybierz anime.
				</p>
			</div>
		);
	}

	return (
		<div>
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
								<p>Odcinki: {totalEpisodes}</p>
								<p>Status: {statusTranslate[animeData.status] || 'N/A'}</p>
								<p>Rok: {animeData.year}</p>
							</div>
						</div>
					</div>
					<div className='border-2 border-cta rounded-md p-5 w-full custom-scroll'>
						<p className='border-b-2 border-cta text-xl pb-3'>Lista odcinków</p>
						<div className='flex flex-col mt-3 max-h-[300px] overflow-auto gap-2 pr-2 custom-scroll'>
							{Array.from({ length: totalEpisodes }, (_, i) => i + 1).map(
								(epNum) => (
									<div className='relative w-full'>
										<button
											key={epNum}
											onClick={() => handleEpisodeChange(epNum)}
											className={`${
												epNum == episodeNumber ? 'bg-cta/40' : ''
											} border-2 border-cta rounded-md p-2 cursor-pointer w-full`}
										>
											<p
												className={`${
													epNum == episodeNumber ? 'text-main' : 'text-cta'
												}`}
											>
												Odcinek {epNum}
											</p>
										</button>
										{isAuthenticated && (
											<input
												type='checkbox'
												checked={watchedEpisodes[epNum]}
												onChange={() => {
													setWatchedEpisodes((prev) => {
														const updated = { ...prev, [epNum]: !prev[epNum] };
														return updated;
													});
													setHasChanges(true);
												}}
												className='absolute top-1/2 -translate-y-1/2 left-5'
											/>
										)}
									</div>
								)
							)}
						</div>
					</div>
					{hasChanges && (
						<button
							onClick={() => {
								handleSaveEpisodes();
							}}
							className='mt-3 bg-cta text-main font-semibold py-2 px-4 rounded-md hover:bg-cta/80 transition-colors cursor-pointer'
						>
							Zapisz zmiany
						</button>
					)}
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
					{isInfoPopupVisible && (
						<InfoPopup message={popupMessage} onClose={handleCloseInfoPopup} />
					)}
					<div className='flex items-center justify-center gap-4 border-2 border-cta rounded-md p-3 w-full mb-5'>
						<button
							onClick={() => handleEpisodeChange(Number(episodeNumber) - 1)}
							disabled={episodeNumber <= 1}
							className='p-3 rounded-full transition-colors hover:bg-cta/20 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6 stroke-cta'
								fill='none'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M15 19l-7-7 7-7'
								/>
							</svg>
						</button>

						<div className='text-lg font-semibold'>
							Odcinek {episodeNumber} / {totalEpisodes}
						</div>

						<button
							onClick={() => handleEpisodeChange(Number(episodeNumber) + 1)}
							disabled={episodeNumber >= totalEpisodes}
							className='p-3 rounded-full transition-colors hover:bg-cta/20 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6 stroke-cta'
								fill='none'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M9 5l7 7-7 7'
								/>
							</svg>
						</button>
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
