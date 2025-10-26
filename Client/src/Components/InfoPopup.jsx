const InfoPopup = ({ message, onClose }) => {
	const closeIcon =
		'M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z';

	return (
		<div className='relative w-full bg-negative/20 p-4 rounded-lg '>
			<p className='text-sm mb-3'>{message}</p>
			<button
				onClick={onClose}
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
		</div>
	);
};

export default InfoPopup;
