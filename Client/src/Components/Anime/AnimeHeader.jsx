const AnimeHeader = ({
	image_url,
	title,
	title_japanese,
	score,
	episodes,
	status,
	year,
	watchNow,
	handleTrailerState
}) => {
	const statusTranslate = {
		'Finished Airing': 'Zakończony',
		'Currently Airing': 'Emitowane',
	};
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
				<div className='flex flex-col lg:flex-row items-center gap-3'>
					<button
						onClick={watchNow}
						className='bg-cta w-full p-2 rounded-xl cursor-pointer'
					>
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
	);
};
export default AnimeHeader;
