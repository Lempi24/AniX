const TrailerModal = ({ handleTrailerState, trailer_url }) => {
	const closeIcon =
		'M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z';

	return (
		<div className='fixed inset-0 bg-black/80 flex items-center justify-center z-50'>
			<div
				className='relative w-[95%] max-w-3xl bg-secondary p-2 rounded-lg'
				onClick={(e) => e.stopPropagation()}
			>
				<button
					onClick={handleTrailerState}
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

				{trailer_url && (
					<div className='aspect-video'>
						<iframe
							className='w-full h-full rounded-md'
							src={trailer_url}
							title='Zwiastun anime'
							allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
							allowFullScreen
						></iframe>
					</div>
				)}
				{!trailer_url && <p>Przepraszamy, te anime nie posiada trailera :c</p>}
			</div>
		</div>
	);
};

export default TrailerModal;
