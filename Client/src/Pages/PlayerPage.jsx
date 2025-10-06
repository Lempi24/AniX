import Navigation from '../Components/Navigation';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
const PlayerPage = () => {
	const location = useLocation();
	const [animeData, setAnimeData] = useState(location.state?.animeData || null);
	const { animeId, episode } = useParams();
	console.log(useParams());
	const [fetchedEpisodeNumber, setFetchedEpisodeNumber] = useState(
		location.state?.episodeNumber || null
	);
	const [selectedPlayerUrl, setSelectedPlayerUrl] = useState(null);
	const episodeData = {
		player_urls: {
			cda: 'http://ebd.cda.pl/800x450/2555521271',
			streamtape: 'link2',
			vudeo: 'link3',
		},
	};
	const statusTranslate = {
		'Finished Airing': 'Zakończony',
		'Currently Airing': 'Emitowane',
	};
	useEffect(() => {
		if (!animeData) {
			const fetchAnimeData = async () => {
				try {
					const response = await axios.get(
						`http://localhost:3001/anime/${animeId}`
					);
					setAnimeData(response.data);
					setFetchedEpisodeNumber(episode);
				} catch (err) {
					console.error('Error fetching anime:', err);
				}
			};
			fetchAnimeData();
		}
	}, [animeId, animeData]);
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
	console.log(animeData);
	return (
		<div className=''>
			<Navigation />
			<ul className='flex items-center space-x-2 p-5'>
				<li>
					<Link to={`/anime`} className='text-cta'>
						Anime
					</Link>
				</li>
				<li>{'>'}</li>
				<li>
					<Link to={`/anime/${animeId}`} className='text-cta'>
						{animeData.title}
					</Link>
				</li>
				<li>{'>'}</li>
				<li>Odcinek {fetchedEpisodeNumber}</li>
			</ul>
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
								(episodeNumber) => (
									<div
										className={`${
											episodeNumber === fetchedEpisodeNumber ? 'bg-cta' : ''
										} border-2 border-cta rounded-md p-2`}
									>
										<p
											className={`${
												episodeNumber === fetchedEpisodeNumber
													? 'text-main'
													: 'text-cta'
											}`}
										>
											Odcinek {episodeNumber}
										</p>
									</div>
								)
							)}
						</div>
					</div>
				</div>
				<div className='flex flex-col gap-5 w-full lg:w-2/3'>
					<div className='relative border-2 border-cta rounded-md overflow-hidden bg-black flex items-center justify-center'>
						{/* Kontener na player, który utrzyma proporcje 16:9 */}
						<div className='aspect-video w-full'>
							{selectedPlayerUrl ? (
								// Jeśli użytkownik wybrał player (selectedPlayerUrl nie jest null)
								<iframe
									className='w-full h-full' // Wypełnia cały kontener aspect-video
									src={selectedPlayerUrl}
									title='Odtwarzacz wideo odcinka anime'
									allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
									allowFullScreen
								></iframe>
							) : (
								// Jeśli żaden player nie został wybrany, pokazujemy placeholder
								<div className='w-full h-full flex items-center text-center justify-center text-cta text-xl font-semibold'>
									Wybierz player aby rozpocząć odtwarzanie
								</div>
							)}
						</div>
					</div>
					<div className='border-2 border-cta rounded-md p-5 w-full mb-5'>
						<p className='border-b-2 border-cta text-xl pb-3'>Wybierz player</p>
						<div className='grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3 mt-4 '>
							{/* Przykład dla playera CDA */}
							{episodeData.player_urls?.cda && (
								<button
									onClick={() =>
										handlePlayerSelect(episodeData.player_urls.cda)
									}
									className={`flex flex-col items-center justify-center p-3 border-2 border-cta rounded-lg transition-colors cursor-pointer
                    ${
											selectedPlayerUrl === episodeData.player_urls.cda
												? 'bg-cta text-black font-bold'
												: 'hover:bg-cta/20'
										}`}
								>
									<span className='text-lg'>CDA</span>
									<span className='text-xs opacity-70'>720p • SUB</span>
								</button>
							)}

							{/* Przykład dla playera Streamtape */}
							{episodeData.player_urls?.streamtape && (
								<button
									onClick={() =>
										handlePlayerSelect(episodeData.player_urls.streamtape)
									}
									className={`flex flex-col items-center justify-center p-3 border-2 border-cta rounded-lg transition-colors cursor-pointer
                    ${
											selectedPlayerUrl === episodeData.player_urls.streamtape
												? 'bg-cta text-black font-bold'
												: 'hover:bg-cta/20'
										}`}
								>
									<span className='text-lg'>Streamtape</span>
									<span className='text-xs opacity-70'>1080p • SUB</span>
								</button>
							)}

							{/* Przykład dla playera Vudeo */}
							{episodeData.player_urls?.vudeo && (
								<button
									onClick={() =>
										handlePlayerSelect(episodeData.player_urls.vudeo)
									}
									className={`flex flex-col items-center justify-center p-3 border-2 border-cta rounded-lg transition-colors cursor-pointer
                    ${
											selectedPlayerUrl === episodeData.player_urls.vudeo
												? 'bg-cta text-black font-bold'
												: 'hover:bg-cta/20'
										}`}
								>
									<span className='text-lg'>Vudeo</span>
									<span className='text-xs opacity-70'>720p • SUB</span>
								</button>
							)}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};
export default PlayerPage;
