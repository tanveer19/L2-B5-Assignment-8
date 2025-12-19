"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-[70vh] min-h-[500px] rounded-lg overflow-hidden">
      {/* Background Image */}
      <Image
        src="/mountain0.jpg"
        alt="Travel background"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Animated Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 space-y-6"
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-white"
        >
          TravelBuddy
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-200 max-w-2xl"
        >
          Find travel companions, explore new destinations, and make memories
          together. Turn your solo trips into shared adventures!
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/register"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Get Started
          </Link>

          <Link
            href="/travelers"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-100 transition"
          >
            Explore Travelers
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
