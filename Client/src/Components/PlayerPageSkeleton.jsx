// Components/Anime/PlayerPageSkeleton.js

const PlayerPageSkeleton = () => {
	return (
		<div className='pb-10 animate-pulse'>
			{/* Breadcrumbs */}
			<div className='h-6 w-40 bg-gray-700 rounded-md mb-6'></div>

			<main className='relative flex flex-col-reverse lg:flex-row items-center gap-10 mt-10 max-w-7xl mx-auto px-4'>
				{/* Prawa kolumna (video + player) */}
				<div className='flex flex-col gap-5 w-full lg:w-2/3'>
					{/* Tytuł odcinka */}
					<div className='h-6 w-1/2 bg-gray-700 rounded-md'></div>

					{/* Player video */}
					<div className='relative border-2 border-cta rounded-md overflow-hidden bg-gray-800 flex items-center justify-center'>
						<div className='aspect-video w-full flex items-center justify-center'>
							<div className='h-full w-full bg-gray-700'></div>
						</div>
					</div>

					{/* Nawigacja odcinków */}
					<div className='flex items-center justify-center gap-4 border-2 border-cta rounded-md p-3 w-full mb-5'>
						<div className='h-8 w-8 bg-gray-700 rounded-full'></div>
						<div className='h-4 w-32 bg-gray-700 rounded-md'></div>
						<div className='h-8 w-8 bg-gray-700 rounded-full'></div>
					</div>

					{/* Lista playerów */}
					<div className='border-2 border-cta rounded-md p-5 w-full mb-5'>
						<div className='h-6 w-32 bg-gray-700 rounded-md mb-4'></div>
						<div className='grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-3 mt-4'>
							{Array.from({ length: 6 }).map((_, i) => (
								<div
									key={i}
									className='h-16 w-full bg-gray-700 rounded-md'
								></div>
							))}
						</div>
					</div>
				</div>

				{/* Lewa kolumna (info + lista odcinków) */}
				<div className='flex flex-col gap-5 w-full lg:w-1/3 lg:mb-auto'>
					{/* Info box */}
					<div className='flex items-center gap-5 border-2 rounded-md p-2 border-cta'>
						<div className='w-[100px] h-[140px] bg-gray-700 rounded-sm'></div>
						<div className='flex-1 space-y-2'>
							<div className='h-5 w-2/3 bg-gray-700 rounded-md'></div>
							<div className='h-4 w-1/2 bg-gray-700 rounded-md'></div>
							<div className='h-4 w-1/3 bg-gray-700 rounded-md'></div>
							<div className='h-4 w-1/4 bg-gray-700 rounded-md'></div>
						</div>
					</div>

					{/* Lista odcinków */}
					<div className='border-2 border-cta rounded-md p-5 w-full'>
						<div className='h-6 w-32 bg-gray-700 rounded-md mb-3'></div>
						<div className='flex flex-col gap-2 max-h-[300px] overflow-auto pr-2'>
							{Array.from({ length: 8 }).map((_, i) => (
								<div
									key={i}
									className='h-10 w-full bg-gray-700 rounded-md'
								></div>
							))}
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default PlayerPageSkeleton;
