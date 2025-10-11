// Components/AnimeCardSectionSkeleton.js

import AnimeCardSkeleton from './AnimeCardSkeleton';

const AnimeCardSectionSkeleton = ({ h2 }) => {
	return (
		<section className='p-3 lg:max-w-2/3 w-full'>
			<div className='h-7 w-48 bg-gray-700 rounded-md animate-pulse'></div>

			<div className='mt-3 flex items-center gap-3 overflow-hidden pb-3'>
				{Array.from({ length: 10 }).map((_, index) => (
					<AnimeCardSkeleton key={index} />
				))}
			</div>
		</section>
	);
};

export default AnimeCardSectionSkeleton;
