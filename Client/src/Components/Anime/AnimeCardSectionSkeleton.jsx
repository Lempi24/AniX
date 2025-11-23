import AnimeCardSkeleton from './AnimeCardSkeleton';

const AnimeCardSectionSkeleton = () => {
	return (
		<section className='p-3 lg:max-w-2/3 w-full overflow-hidden'>
			<div className='h-7 w-48 bg-gray-700 rounded-md animate-pulse'></div>

			<div className='mt-3 flex items-center gap-3 pb-3'>
				{Array.from({ length: 10 }).map((_, index) => (
					<div key={index} className='flex-shrink-0 w-[160px] md:w-[200px]'>
						<AnimeCardSkeleton />
					</div>
				))}
			</div>
		</section>
	);
};

export default AnimeCardSectionSkeleton;
