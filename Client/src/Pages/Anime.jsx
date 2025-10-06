import { useLocation, Link, useParams, useNavigate } from 'react-router-dom';
import Navigation from '../Components/Navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
const Anime = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const starIcon =
		'M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z';
	const closeIcon =
		'M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z';
	const playIcon =
		'M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z';
	const [animeData, setAnimeData] = useState(location.state?.animeData || null);
	const { animeId } = useParams();
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
	const statusTranslate = {
		'Finished Airing': 'Zakończony',
		'Currently Airing': 'Emitowane',
	};
	const [isTrailerOpen, setIsTrailerOpen] = useState(false);
	useEffect(() => {
		if (!animeData) {
			const fetchAnimeData = async () => {
				try {
					const response = await axios.get(
						`http://localhost:3001/anime/${animeId}`
					);
					setAnimeData(response.data);
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
	const handleEpisodeClick = (episodeNumber) => {
		navigate(`/watch/${animeData.mal_id}/${episodeNumber}`, {
			state: { animeData, episodeNumber },
		});
	};
	return (
		<div className='pb-10'>
			<Navigation />
			<div className='relative flex flex-col items-center gap-10 mt-10 max-w-7xl mx-auto px-4'>
				<div className='flex flex-col lg:flex-row w-full items-center lg:items-start gap-5 lg:gap-10'>
					<div className='relative w-[250px] shrink-0'>
						<img
							onClick={() => setIsTrailerOpen(true)}
							src={animeData.image_url}
							alt={animeData.title}
							className='shrink-0 rounded-md border-2 border-cta shadow-[0_8px_30px_rgba(0,0,0,0.5)] cursor-pointer'
						/>
						<div className='absolute top-0 flex items-center justify-center bg-main/60 w-full h-full'>
							<button
								onClick={() => setIsTrailerOpen(true)}
								className='p-3 border-2 border-cta rounded-full cursor-pointer'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 640 640'
									className='fill-cta w-[25px]'
								>
									<path d={playIcon} />
								</svg>
							</button>
						</div>
					</div>

					<div className='flex flex-col gap-5 w-full'>
						<div className='text-center lg:text-left space-y-2'>
							<h1 className='font-bold text-3xl lg:text-4xl'>
								{animeData.title}
							</h1>
							<p className='text-text-secondary'>{animeData.title_japanese}</p>
						</div>
						<div className='flex items-center gap-5 flex-wrap justify-center lg:justify-start'>
							<div className='text-center'>
								<p className='text-text-accent uppercase text-sm'>Ocena</p>
								<div className='flex items-center justify-center gap-1'>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 640 640'
										className='fill-star w-[15px]'
									>
										<path d={starIcon} />
									</svg>
									<p className='font-bold text-lg text-star'>
										{animeData.score || 'N/A'}
									</p>
								</div>
							</div>
							<div className='text-center'>
								<p className='text-text-accent uppercase text-sm'>Odcinki</p>
								<p className='font-bold text-lg'>
									{animeData.episodes || 'N/A'}
								</p>
							</div>
							<div className='text-center'>
								<p className='text-text-accent uppercase text-sm'>Status</p>
								<p className='font-bold text-lg'>
									{statusTranslate[animeData.status] || 'N/A'}
								</p>
							</div>
							<div className='text-center'>
								<p className='text-text-accent uppercase text-sm'>Rok</p>
								<p className='font-bold text-lg'>{animeData.year || 'N/A'}</p>
							</div>
						</div>
						<div className='flex flex-col lg:flex-row items-center gap-3'>
							<button className='bg-cta w-full p-2 rounded-xl cursor-pointer'>
								Oglądaj teraz
							</button>
							<button className='w-full border-2 border-cta rounded-xl p-2 cursor-pointer'>
								Dodaj do listy
							</button>
							<button className='w-full border-2 border-cta rounded-xl p-2 cursor-pointer'>
								Ulubione
							</button>
						</div>
					</div>
				</div>

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
											className='border-2 border-cta rounded-lg aspect-square flex items-center justify-center text-cta cursor-pointer'
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
				<div className='fixed inset-0 bg-black/80 flex items-center justify-center z-50'>
					<div
						className='relative w-[95%] max-w-3xl bg-secondary p-2 rounded-lg'
						onClick={(e) => e.stopPropagation()}
					>
						<button
							onClick={() => setIsTrailerOpen(false)}
							className='absolute -top-3 -right-3 w-8 h-8 bg-cta text-white rounded-full flex items-center justify-center text-lg font-bold z-10 cursor-pointer'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 640 640'
								className='fill-main w-[20px]'
							>
								<path d={closeIcon} />
							</svg>
						</button>

						{animeData.trailer_url && (
							<div className='aspect-video'>
								<iframe
									className='w-full h-full rounded-md'
									src={animeData.trailer_url}
									title='Zwiastun anime'
									allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
									allowFullScreen
								></iframe>
							</div>
						)}
						{!animeData.trailer_url && (
							<p>Przepraszamy, te anime nie posiada trailera :c</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
};
export default Anime;
