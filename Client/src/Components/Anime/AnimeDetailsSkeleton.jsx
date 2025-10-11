// Components/AnimeDetailsSkeleton.js
const SkeletonPlaceholder = ({
	width = 'w-full',
	height = 'h-4',
	className = '',
}) => {
	return (
		<div
			className={`${width} ${height} bg-gray-700 rounded-md animate-pulse ${className}`}
		></div>
	);
};

const AnimeDetailsSkeleton = () => {
	return (
		<div className='pb-10'>
			{/* Breadcrumbs Placeholder */}
			<div className='max-w-7xl mx-auto px-4 mt-5'>
				<SkeletonPlaceholder width='w-1/3' height='h-4' />
			</div>

			<div className='relative flex flex-col items-center gap-10 mt-10 max-w-7xl mx-auto px-4'>
				{/* AnimeHeader Placeholder */}
				<div className='flex flex-col md:flex-row items-center md:items-start gap-8 w-full'>
					{/* Obrazek Placeholder */}
					<SkeletonPlaceholder
						width='w-[225px]'
						height='h-[317px]'
						className='shrink-0'
					/>
					{/* Nagłówki i szczegóły Placeholder */}
					<div className='flex flex-col gap-4 w-full'>
						<SkeletonPlaceholder width='w-3/4' height='h-8' />
						<SkeletonPlaceholder width='w-1/2' height='h-5' />
						<div className='flex gap-4 mt-2'>
							<SkeletonPlaceholder width='w-16' height='h-4' />
							<SkeletonPlaceholder width='w-16' height='h-4' />
						</div>
						<div className='flex flex-wrap gap-4 mt-4'>
							<SkeletonPlaceholder width='w-32' height='h-10' />
							<SkeletonPlaceholder width='w-32' height='h-10' />
						</div>
					</div>
				</div>

				{/* Sekcje pod nagłówkiem */}
				<div className='flex flex-col lg:flex-row lg:gap-10 w-full items-start'>
					{/* Lewa kolumna */}
					<div className='flex flex-col gap-5 lg:w-2/3 w-full'>
						<div className='border-2 border-cta rounded-md p-5'>
							<SkeletonPlaceholder width='w-1/4' height='h-6' />
							<div className='flex flex-wrap items-center gap-3 mt-3'>
								<SkeletonPlaceholder width='w-20' height='h-8' />
								<SkeletonPlaceholder width='w-24' height='h-8' />
								<SkeletonPlaceholder width='w-20' height='h-8' />
							</div>
						</div>
						<div className='border-2 border-cta rounded-md p-5'>
							<SkeletonPlaceholder width='w-1/4' height='h-6' />
							<div className='mt-3 space-y-2'>
								<SkeletonPlaceholder height='h-4' />
								<SkeletonPlaceholder height='h-4' />
								<SkeletonPlaceholder width='w-3/4' height='h-4' />
							</div>
						</div>
					</div>
					{/* Prawa kolumna */}
					<div className='border-2 border-cta rounded-md p-5 w-full lg:w-1/3 mt-5 lg:mt-0'>
						<SkeletonPlaceholder width='w-1/3' height='h-6' />
						<div className='mt-3 space-y-4'>
							<SkeletonPlaceholder height='h-5' />
							<SkeletonPlaceholder height='h-5' />
							<SkeletonPlaceholder height='h-5' />
							<SkeletonPlaceholder height='h-5' />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AnimeDetailsSkeleton;
