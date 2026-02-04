"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/mountain0.jpg"
        alt="Travel background"
        fill
        priority
        className="object-cover scale-105"
      />

      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-purple-900/50 to-cyan-900/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-32 right-16 w-24 h-24 bg-cyan-400/20 rounded-full blur-lg animate-pulse delay-1000" />
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-purple-400/20 rounded-full blur-md animate-pulse delay-500" />

      {/* Airplane Animation - CSS Version */}
      <motion.div
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: "100vw", opacity: 1 }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          delay: 2
        }}
        className="absolute top-1/4 z-20 w-16 h-16 drop-shadow-lg"
      >
        <div className="relative w-full h-full">
          {/* Airplane SVG */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full text-white drop-shadow-md"
            fill="currentColor"
          >
            {/* Airplane body */}
            <path d="M20 50 L80 45 L85 50 L80 55 Z" fill="#3B82F6" />
            {/* Wings */}
            <path d="M35 35 L55 45 L45 50 L25 40 Z" fill="#1E40AF" />
            <path d="M35 65 L55 55 L45 50 L25 60 Z" fill="#1E40AF" />
            {/* Tail */}
            <path d="M15 45 L25 50 L15 55 Z" fill="#2563EB" />
            {/* Wing tips */}
            <circle cx="30" cy="37" r="2" fill="#60A5FA" />
            <circle cx="30" cy="63" r="2" fill="#60A5FA" />
          </svg>
          
          {/* Animated trail */}
          <motion.div
            animate={{ 
              opacity: [0.3, 0.7, 0.3],
              scaleX: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-8 h-1 bg-gradient-to-r from-transparent via-blue-300 to-transparent rounded-full"
          />
        </div>
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        {/* Animated Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-8 max-w-4xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white text-sm font-medium"
          >
            ✈️ Your Adventure Starts Here
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight"
          >
            <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
              Travel
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-200 via-blue-200 to-white bg-clip-text text-transparent">
              Buddy
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Connect with fellow adventurers, discover breathtaking destinations, and create unforgettable memories together. 
            <span className="text-cyan-300 font-medium"> Transform your solo journey into shared experiences.</span>
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-8 text-white/80 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span>10K+ Travelers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse delay-300" />
              <span>150+ Destinations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse delay-700" />
              <span>5K+ Adventures</span>
            </div>
          </motion.div>

          {/* Enhanced Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4"
          >
            <Link
              href="/register"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center gap-2">
                Start Your Journey
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </span>
            </Link>

            <Link
              href="/travelers"
              className="group px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105"
            >
              <span className="flex items-center gap-2">
                Explore Community
                <span className="group-hover:rotate-12 transition-transform duration-300">🌍</span>
              </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center text-white/60 text-sm"
          >
            <span className="mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-1 h-3 bg-white/60 rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}