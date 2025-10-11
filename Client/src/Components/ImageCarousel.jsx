import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export const ImageCarousel = ({ slides }) => {
	if (!slides || slides.length === 0) {
		return null;
	}

	return (
		<div className='w-full'>
			<Swiper
				modules={[Navigation, Pagination, A11y, Autoplay]}
				slidesPerView={1}
				loop={true}
				speed={1000}
				autoplay={{ delay: 5000, disableOnInteraction: false }}
				navigation={{
					nextEl: '.swiper-button-next-custom',
					prevEl: '.swiper-button-prev-custom',
				}}
				onSwiper={(swiper) => {
					const container = swiper.el;

					container.addEventListener('mouseenter', () =>
						swiper.autoplay.stop()
					);
					container.addEventListener('mouseleave', () =>
						swiper.autoplay.start()
					);
					container.addEventListener('touchstart', () =>
						swiper.autoplay.stop()
					);
					container.addEventListener('touchend', () => swiper.autoplay.start());
				}}
			>
				{slides.map((slide, index) => (
					<SwiperSlide key={index} className='relative text-white'>
						<div className='absolute inset-0 bg-black'>
							<img
								src={slide.src}
								alt={slide.title}
								className='block w-full h-full object-cover opacity-40 blur-sm'
							/>
						</div>

						<div className='relative flex flex-col justify-end h-[40vh] lg:h-[50vh] max-h-[500px] max-w-6xl mx-auto px-8 pb-10 z-10'>
							<h2 className='text-4xl lg:text-5xl font-bold'>{slide.title}</h2>
							<p className='text-lg mt-2 max-w-2xl'>{slide.description}</p>
							<button
								onClick={slide.buttonAction}
								className='bg-cta p-3 rounded-xl mt-4 w-fit cursor-pointer hover:bg-cta/60 transition-colors duration-300'
							>
								Oglądaj teraz
							</button>
						</div>
					</SwiperSlide>
				))}

				<div className='swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 left-4 z-20 cursor-pointer hidden md:block'>
					<ChevronLeftIcon className='w-10 h-10 text-cta bg-black/30 rounded-full p-1' />
				</div>
				<div className='swiper-button-next-custom absolute top-1/2 -translate-y-1/2 right-4 z-20 cursor-pointer hidden md:block'>
					<ChevronRightIcon className='w-10 h-10 text-cta bg-black/30 rounded-full p-1' />
				</div>
			</Swiper>
		</div>
	);
};
