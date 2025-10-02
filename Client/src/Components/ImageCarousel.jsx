// src/components/ImageCarousel.jsx

// 1. Import Swipera i potrzebnych modułów
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';

// 2. Import bazowych stylów Swipera
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import ikonek (możesz użyć dowolnej biblioteki, np. react-icons)
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export const ImageCarousel = ({ slides }) => {
	return (
		<div className='relative w-full max-w-xl lg:max-w-5xl mx-auto'>
			{/* max-w-2/3 */}
			<Swiper
				modules={[Navigation, Pagination, A11y, Autoplay]}
				spaceBetween={50}
				slidesPerView={1}
				loop={true}
				speed={1000}
				navigation={{
					nextEl: '.swiper-button-next-custom',
					prevEl: '.swiper-button-prev-custom',
				}}
				pagination={{
					el: '.swiper-pagination-custom',
					clickable: true,
				}}
				autoplay={{ delay: 5000, disableOnInteraction: false }}
			>
				{slides.map((slide, index) => (
					<SwiperSlide key={index} className='relative text-text'>
						<img
							src={slide.src}
							alt={slide.title}
							className='block w-full h-full object-cover rounded-2xl aspect-[4/3] lg:aspect-[16/9]'
						/>
						<div
							className='absolute bottom-0 left-0 w-full p-4 rounded-b-2xl bg-gradient-to-t from-black/80 via-black/60 to-transparent
'
						>
							<h2 className='text-3xl font-bold'>{slide.title}</h2>
							<p className='text-sm mt-1'>{slide.description}</p>
							<button
								onClick={slide.buttonAction}
								className='bg-cta p-3 rounded-xl mt-2'
							>
								Oglądaj teraz
							</button>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
			<div className='swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 left-4 z-10 cursor-pointer hidden md:block'>
				<ChevronLeftIcon className='w-10 h-10 text-cta bg-black/30 rounded-full p-1' />
			</div>
			<div className='swiper-button-next-custom absolute top-1/2 -translate-y-1/2 right-4 z-10 cursor-pointer hidden md:block'>
				<ChevronRightIcon className='w-10 h-10 text-cta bg-black/30 rounded-full p-1' />
			</div>
		</div>
	);
};
