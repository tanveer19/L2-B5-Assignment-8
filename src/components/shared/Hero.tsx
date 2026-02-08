"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import { destinations } from '@/data/destinations';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <div className="h-[80vh] w-full relative group">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper h-full w-full"
      >
        {destinations.map((destination, index) => (
          <SwiperSlide key={index} className="relative overflow-hidden">
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
            <Image
              src={destination.image}
              alt={destination.name}
              fill
              priority={index === 0}
              className="object-cover"
            />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white px-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center"
              >
                <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold tracking-widest uppercase bg-blue-600/80 backdrop-blur-md rounded-full">
                  {destination.country}
                </span>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter drop-shadow-2xl">
                  {destination.name}
                </h1>
                <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200 font-medium leading-relaxed drop-shadow-lg">
                  {destination.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 px-8 py-3.5 bg-white text-gray-900 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors shadow-2xl"
                >
                  Explore Now
                </motion.button>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
