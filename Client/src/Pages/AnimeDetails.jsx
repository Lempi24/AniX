import { useLocation, Link, useParams, useNavigate } from 'react-router-dom';
import Navigation from '../Components/Navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AnimeHeader from '../Components/Anime/AnimeHeader';
import TrailerModal from '../Components/Anime/TrailerModal';
import Breadcrumbs from '../Components/Breadcrumbs';
import AnimeDetailsSkeleton from '../Components/Anime/AnimeDetailsSkeleton';
const AnimeDetails = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { animeId } = useParams();
	const [loading, setLoading] = useState(true);
	const [animeData, setAnimeData] = useState(null);
	const [isTrailerOpen, setIsTrailerOpen] = useState(false);

	const seasonsTranslate = {
		summer: 'Lato',
		winter: 'Zima',
		spring: 'Wiosna',
		fall: 'Jesień',
	};

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
	};

	useEffect(() => {
		setAnimeData(null);

		if (location.state?.animeData) {
			setAnimeData(location.state.animeData);
			setLoading(false);
		} else {
			const fetchAnimeData = async () => {
				setLoading(true);
				try {
					const response = await axios.get(
						`${import.meta.env.VITE_BACKEND_URL}/anime/${animeId}`
					);
					setAnimeData(response.data);
				} catch (err) {
					console.error('Error fetching anime:', err);
				} finally {
					setLoading(false);
				}
			};
			fetchAnimeData();
		}
	}, [animeId]);

	const handleEpisodeClick = (episodeNumber) => {
		navigate(`/watch/${animeData.mal_id}/${episodeNumber}`, {
			state: { animeData, episodeNumber },
		});
	};
	if (loading) {
		return (
			<>
				<Navigation />
				<AnimeDetailsSkeleton />
			</>
		);
	}
	if (!animeData) {
		return (
			<div>
				<Navigation />
				<h1>Nie znaleziono danych anime!</h1>
			</div>
		);
	}

	return (
		<div className='pb-10'>
			<Navigation />
			{animeData && <Breadcrumbs animeId={animeId} title={animeData.title} />}
			<div className='relative flex flex-col items-center gap-10 mt-10 max-w-7xl mx-auto px-4'>
				<AnimeHeader
					image_url={animeData.image_url}
					title={animeData.title}
					title_japanese={animeData.title_japanese}
					score={animeData.score}
					episodes={animeData.episodes}
					status={animeData.status}
					year={animeData.year}
					watchNow={() => handleEpisodeClick(1)}
					handleTrailerState={() => setIsTrailerOpen(true)}
				/>
				<div className='flex flex-col lg:flex-row lg:gap-10 w-full items-start'>
					<div className='flex flex-col gap-5 lg:w-2/3 w-full'>
						<div className='border-2 border-cta rounded-md p-5'>
							<p className='border-b-2 border-cta text-xl pb-3'>Gatunki</p>
							<div className='flex flex-wrap items-center gap-3 mt-3'>
								{animeData.genres.map((genre) => (
									<p
										key={genre}
										className='border-2 border-cta rounded-2xl py-1 px-3'
									>
										{genresTranslate[genre] || genre}
									</p>
								))}
							</div>
						</div>
						<div className='border-2 border-cta rounded-md p-5'>
							<p className='border-b-2 border-cta text-xl pb-3'>Opis</p>
							<p className='mt-3 text-text-secondary leading-relaxed'>
								{animeData.synopsis.split('[Napisany przez MAL Rewrite]')[0]}
							</p>
						</div>
						{animeData.episodes && (
							<div className='border-2 border-cta rounded-md p-5'>
								<p className='border-b-2 border-cta text-xl pb-3'>Odcinki</p>
								<div className='grid grid-cols-[repeat(auto-fill,minmax(60px,1fr))] gap-3 mt-3'>
									{Array.from(
										{ length: animeData.episodes },
										(_, i) => i + 1
									).map((episodeNumber) => (
										<button
											onClick={() => handleEpisodeClick(episodeNumber)}
											key={episodeNumber}
											className='border-2 border-cta rounded-lg aspect-square flex items-center justify-center text-cta cursor-pointer hover:bg-cta hover:text-main transition-colors'
										>
											{episodeNumber}
										</button>
									))}
								</div>
							</div>
						)}
					</div>

					<div className='border-2 border-cta rounded-md p-5 w-full lg:w-1/3 mt-5 lg:mt-0'>
						<p className='border-b-2 border-cta text-xl pb-3'>Informacje</p>
						<div className='mt-3 space-y-3 text-sm'>
							<div className='flex items-center justify-between border-b border-cta/50 pb-2'>
								<p className='text-text-accent'>Studio</p>
								<p>{animeData.studio}</p>
							</div>
							<div className='flex items-center justify-between border-b border-cta/50 pb-2'>
								<p className='text-text-accent'>Sezon</p>
								<p>{`${seasonsTranslate[animeData.season] || ''} ${
									animeData.year || ''
								}`}</p>
							</div>
							<div className='flex items-center justify-between border-b border-cta/50 pb-2'>
								<p className='text-text-accent'>Źródło</p>
								<p>{animeData.source}</p>
							</div>
							<div className='flex items-center justify-between border-b border-cta/50 pb-2'>
								<p className='text-text-accent'>Dł. odcinka</p>
								<p>{animeData.duration?.split('per')[0]}</p>
							</div>
							<div className='flex items-center justify-between border-b border-cta/50 pb-2'>
								<p className='text-text-accent'>Klasyfikacja</p>
								<p>{animeData.rating?.split(' - ')[0]}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			{isTrailerOpen && (
				<TrailerModal
					handleTrailerState={() => setIsTrailerOpen(false)}
					trailer_url={animeData.trailer_url}
				/>
			)}
		</div>
	);
};
export default AnimeDetails;
