import AnimeCard from './AnimeCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const AnimeCardSection = ({ h2, animeList = [], onAnimeClick }) => {
	return (
		<section className='p-3 lg:max-w-2/3'>
			<h2 className='border-l-3 border-cta pl-3 font-medium text-xl'>{h2}</h2>

			<Swiper
				modules={[Navigation]}
				navigation
				loop={true}
				spaceBetween={15}
				slidesPerView={'auto'}
			>
				{animeList.map((anime) => (
					<SwiperSlide
						key={anime.mal_id}
						className='!w-[185px] lg:!w-[250px] mt-5'
					>
						<div onClick={() => onAnimeClick(anime)}>
							<AnimeCard
								title={anime.title}
								imageUrl={anime.image_url}
								episodes={anime.episodes}
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
};

export default AnimeCardSection;
