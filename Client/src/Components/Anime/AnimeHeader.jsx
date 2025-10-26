import { useState, useEffect } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import { useAuth } from '../../Context/AuthContext';
import axios from 'axios';
const AnimeHeader = ({
	image_url,
	title,
	title_japanese,
	score,
	episodes,
	status,
	year,
	id,
	watchNow,
	handleTrailerState,
}) => {
	const { isAuthenticated } = useAuth();
	const [isDropdownOpen, setIsDropDownOpen] = useState(false);
	const statusRef = useClickOutside(() => setIsDropDownOpen(false));
	const statusTranslate = {
		'Finished Airing': 'Zakończony',
		'Currently Airing': 'Emitowane',
	};
	const statuses = [
		{ key: 'watching', label: 'Oglądam', color: 'hover:bg-green-400' },
		{ key: 'completed', label: 'Ukończone', color: 'hover:bg-blue-400' },
		{ key: 'planned', label: 'Planuję', color: 'hover:bg-yellow-400' },
		{ key: 'on_hold', label: 'Wstrzymane', color: 'hover:bg-orange-400' },
		{ key: 'dropped', label: 'Porzucone', color: 'hover:bg-red-400' },
		{ key: 'none', label: 'Usuń z list' },
	];
	const [hovered, setHovered] = useState(0);
	const stars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	const [selectedScore, setSelectedScore] = useState(0);
	const [userSelectedAnimeData, setUserSelectedAnimeData] = useState({});
	const [isStatusLoading, setIsStatusLoading] = useState(true);
	const currentStatus = statuses.find(
		(status) => status.key === userSelectedAnimeData.status
	);
	const getUserAnimeProfile = async (id) => {
		setIsDropDownOpen(false);
		try {
			const token = localStorage.getItem('token');
			if (!token) {
				setIsStatusLoading(false);
				return;
			}
			const response = await axios.get(
				`${import.meta.env.VITE_BACKEND_URL}/user/fetch-user-anime-profile`,
				{
					headers: { Authorization: `Bearer ${token}` },
					params: {
						id,
					},
				}
			);
			setUserSelectedAnimeData(response.data || {});
		} catch (error) {
			console.error('Failed to fetch data:', error);
		} finally {
			setIsStatusLoading(false);
		}
	};
	const handleStatusChange = async (status) => {
		setIsDropDownOpen(false);
		setIsStatusLoading(true);
		try {
			const token = localStorage.getItem('token');
			if (!token) return console.error('No auth token found');
			await axios.put(
				`${import.meta.env.VITE_BACKEND_URL}/user/anime-status`,
				{ status, id },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			if (status !== 'none') {
				setUserSelectedAnimeData((prev) => ({
					...prev,
					status: status,
				}));
			} else {
				setUserSelectedAnimeData({});
			}
		} catch (error) {
			console.error('Failed to update status:', error);
		} finally {
			setIsStatusLoading(false);
		}
	};
	useEffect(() => {
		setIsStatusLoading(true);

		if (isAuthenticated && id) {
			getUserAnimeProfile(id);
		} else {
			setIsStatusLoading(false);
			setUserSelectedAnimeData({});
		}
	}, [id, isAuthenticated]);
	const starIcon =
		'M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z';
	const playIcon =
		'M187.2 100.9C174.8 94.1 159.8 94.4 147.6 101.6C135.4 108.8 128 121.9 128 136L128 504C128 518.1 135.5 531.2 147.6 538.4C159.7 545.6 174.8 545.9 187.2 539.1L523.2 355.1C536 348.1 544 334.6 544 320C544 305.4 536 291.9 523.2 284.9L187.2 100.9z';
	return (
		<div className='flex flex-col lg:flex-row w-full items-center lg:items-start gap-5 lg:gap-10'>
			<div className='relative w-[250px] shrink-0'>
				<img
					onClick={handleTrailerState}
					src={image_url}
					alt={title}
					className='shrink-0 rounded-md border-2 border-cta shadow-[0_8px_30px_rgba(0,0,0,0.5)] cursor-pointer'
				/>
				<div className='absolute top-0 flex items-center justify-center bg-main/60 w-full h-full'>
					<button
						onClick={handleTrailerState}
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
					<h1 className='font-bold text-3xl lg:text-4xl'>{title}</h1>
					<p className='text-text-secondary'>{title_japanese}</p>
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
							<p className='font-bold text-lg text-star'>{score || 'N/A'}</p>
						</div>
					</div>
					<div className='text-center'>
						<p className='text-text-accent uppercase text-sm'>Odcinki</p>
						<p className='font-bold text-lg'>{episodes || 'N/A'}</p>
					</div>
					<div className='text-center'>
						<p className='text-text-accent uppercase text-sm'>Status</p>
						<p className='font-bold text-lg'>
							{statusTranslate[status] || 'N/A'}
						</p>
					</div>
					<div className='text-center'>
						<p className='text-text-accent uppercase text-sm'>Rok</p>
						<p className='font-bold text-lg'>{year || 'N/A'}</p>
					</div>
				</div>
				<div className='w-full space-y-5'>
					<div className='border-2 border-cta rounded-md p-5 w-full mt-5 space-y-5 lg:mt-0'>
						<p className='border-b-2 border-cta text-xl pb-3'>Twoja ocena</p>
						<div className='flex items-center gap-2 mt-5'>
							{stars.map((num) => (
								<div>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 640 640'
										onMouseEnter={() => setHovered(num)}
										onMouseLeave={() => setHovered(0)}
										onClick={() => setSelectedScore(num)}
										className={` stroke-star stroke-30 w-[20px] lg:w-[30px] transition-colors cursor-pointer ${
											hovered >= num || (!hovered && selectedScore >= num)
												? 'fill-star'
												: 'fill-transparent'
										}`}
									>
										<path d={starIcon} />
									</svg>
								</div>
							))}
							<span className='ml-1 lg:ml-10 text-star text-xl'>
								{selectedScore
									? `${selectedScore}/${stars.length}`
									: hovered
									? `${hovered}/${stars.length}`
									: '-'}
							</span>
						</div>
						<div className='flex gap-3'>
							<button className='bg-cta w-full p-2 rounded-xl cursor-pointer'>
								Zapisz ocenę
							</button>
							<button className='border-2 border-cta w-full p-2 rounded-xl cursor-pointer'>
								Wyczyść
							</button>
						</div>
					</div>
				</div>
				<div className='flex flex-col lg:flex-row items-center gap-3'>
					<button
						onClick={watchNow}
						className='bg-cta w-full p-2 rounded-xl cursor-pointer'
					>
						Oglądaj teraz
					</button>
					<div className='relative w-full'>
						<button
							onClick={() => setIsDropDownOpen((prev) => !prev)}
							className={`w-full border-2 rounded-xl p-2 transition-colors duration-300 flex items-center justify-center ${
								isAuthenticated
									? `border-cta ${currentStatus?.color} cursor-pointer`
									: 'border-secondary text-secondary cursor-not-allowed'
							}`}
							disabled={isStatusLoading}
						>
							<span className={isStatusLoading ? 'invisible' : ''}>
								{currentStatus?.label || 'Dodaj do listy'}
							</span>

							{isStatusLoading && (
								<div className='absolute flex items-center justify-center inset-0'>
									<div className='w-6 h-6 border-4 border-cta border-t-transparent rounded-full animate-spin'></div>
								</div>
							)}
						</button>
						{isDropdownOpen && isAuthenticated && (
							<div
								ref={statusRef}
								className='absolute border-2 bg-main border-cta w-full p-2 rounded-xl'
							>
								<ul className='text-center space-y-2'>
									{statuses
										.filter(
											(s) =>
												s.key !== 'none' ||
												(userSelectedAnimeData.status &&
													userSelectedAnimeData.status !== 'none')
										)
										.map((status) => (
											<li
												onClick={() => handleStatusChange(status.key)}
												key={status.key}
												className={`${status.color} hover:text-main border-l-3 border-transparent cursor-pointer p-1 transition-colors duration-200 ease-in-out`}
											>
												{status.label}
											</li>
										))}
								</ul>
							</div>
						)}
					</div>
					<button
						className={`w-full border-2  rounded-xl p-2  transition-colors duration-300 ${
							isAuthenticated
								? 'border-cta hover:bg-cta/20 cursor-pointer'
								: 'border-secondary text-secondary cursor-not-allowed'
						}`}
					>
						Ulubione
					</button>
				</div>
			</div>
		</div>
	);
};
export default AnimeHeader;
