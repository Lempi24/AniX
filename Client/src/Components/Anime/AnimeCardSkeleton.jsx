import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { SkeletonTheme } from 'react-loading-skeleton';
const AnimeCardSkeleton = () => {
	return (
		<SkeletonTheme baseColor='#393e46' highlightColor='#e94560'>
			<div className='relative rounded-xl overflow-hidden w-full h-full'>
				<Skeleton style={{ aspectRatio: '2/3', display: 'block' }} />
				<div className='absolute inset-x-0 bottom-0 h-1/3 p-2 md:p-3'>
					<Skeleton height={24} width='80%' />
					<div className='flex items-center justify-between mt-2'>
						<Skeleton height={16} width='40%' />
						<Skeleton height={16} width='30%' />
					</div>
				</div>
			</div>
		</SkeletonTheme>
	);
};

export default AnimeCardSkeleton;
