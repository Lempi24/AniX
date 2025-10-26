const AnimeCard = ({ title, imageUrl, episodes, score }) => {
	const starIcon =
		'M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z';

	return (
		<div className='relative rounded-xl overflow-hidden w-full h-full shrink-0 cursor-pointer group'>
			<img
				src={imageUrl}
				alt={title}
				className='object-cover w-full aspect-[2/3]'
			/>
			<div className='absolute inset-x-0 bottom-0 h-1/3 bg-main/70 transition-all duration-500 ease-in-out group-hover:h-full flex flex-col justify-between p-2 md:p-3'>
				<h3 className='text-base md:text-lg truncate group-hover:whitespace-normal group-hover:overflow-visible'>
					{title}
				</h3>
				<div className='flex items-center justify-between text-xs md:text-sm'>
					<p>{episodes ? `${episodes} odc.` : 'N/A'}</p>
					<div className='flex items-center gap-1'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 640 640'
							className='fill-star w-[12px] md:w-[15px]'
						>
							<path d={starIcon} />
						</svg>
						<p className='text-star'>{score ? score : 'N/A'}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AnimeCard;
