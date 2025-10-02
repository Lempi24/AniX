import AnimeCard from './AnimeCard';

const AnimeCardSection = ({ h2, animeList = [] }) => {
	return (
		<section className='p-3 lg:max-w-2/3'>
			<h2 className='border-l-3 border-cta pl-3 font-medium text-xl'>{h2}</h2>
			<div className='mt-3 flex items-center gap-3 overflow-auto pb-3 custom-scroll'>
				{animeList.map((anime) => (
					<AnimeCard
						key={anime.mal_id}
						title={anime.title}
						imageUrl={anime.image_url}
						episodes={anime.episodes}
					/>
				))}
			</div>
		</section>
	);
};
export default AnimeCardSection;
