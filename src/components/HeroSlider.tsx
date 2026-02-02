'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';

interface SliderProps {
  sliders: any[];
}

export default function HeroSlider({ sliders }: SliderProps) {
  if (!sliders || sliders.length === 0) {
      return (
          <div className="w-full h-[500px] bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">No slides available</p>
          </div>
      );
  }

  return (
    <div className="w-full h-[500px] relative group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        className="h-full w-full"
      >
        {sliders.map((slide) => (
          <SwiperSlide key={slide._id} className="relative">
             <div className="relative w-full h-full">
                {/* Use img for simplicity with external URLs, or configure Next Image */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-center text-white px-4 max-w-4xl">
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-md">{slide.title}</h2>
                    {slide.link && (
                      <Link href={slide.link} className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full transition transform hover:scale-105 shadow-lg">
                        Explore Now
                      </Link>
                    )}
                  </div>
                </div>
             </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
