import { ImageCarousel } from '../Components/ImageCarousel';
import Navigation from '../Components/Navigation';
import AnimeCard from '../Components/AnimeCard';
import AnimeCardSection from '../Components/AnimeCardSection';
const slides = [
	{
		src: 'https://cdn.myanimelist.net/images/anime/1000/110531l.jpg',
		title: 'Attack on Titan: Final Season',
		description:
			'Epicki finał serii, który zmieni wszystko. Nowe odcinki już dostępne!',
		buttonAction: () => console.log('Oglądaj Attack on Titan'),
	},
	{
		src: 'https://cdn.myanimelist.net/images/anime/1584/143719l.jpg',
		title: 'Dandadan: Sezon 2',
		description: 'Kontynuacja hitu! Nowe przygody już dostępne.',
		buttonAction: () => console.log('Oglądaj Dandadan'),
	},
];

const Home = () => {
	return (
		<div>
			<Navigation />
			<main className='space-y-5 lg:flex lg:flex-col lg:items-center lg:justify-center'>
				<ImageCarousel slides={slides} />
				<AnimeCardSection h2='Popularne teraz' />
				<AnimeCardSection h2='Ostatnio dodane' />
				<AnimeCardSection h2='Dla początkujących' />
			</main>
		</div>
	);
};

export default Home;
