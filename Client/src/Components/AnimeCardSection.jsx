import AnimeCard from './AnimeCard';

const AnimeCardSection = ({ h2 }) => {
	return (
		<section className='p-3 lg:max-w-2/3'>
			<h2 className='border-l-3 border-cta pl-3 font-medium text-xl'>{h2}</h2>
			<div className='mt-3 flex items-center gap-3 overflow-auto pb-3 custom-scroll'>
				<AnimeCard />
				<AnimeCard />
				<AnimeCard />
				<AnimeCard />
				<AnimeCard />
				<AnimeCard />
			</div>
		</section>
	);
};
export default AnimeCardSection;
