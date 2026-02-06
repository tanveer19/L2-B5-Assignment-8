"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { destinations } from "@/data/destinations";
import { Calendar, ArrowRight } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.98 
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function PopularDestinations() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-semibold tracking-wider uppercase text-sm"
            >
              Explore the World
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight"
            >
              Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Destinations</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-md md:text-right"
          >
            Handpicked locations from across the globe, selected for their unique culture, stunning landscapes, and unforgettable experiences.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {destinations.map((item) => (
            <motion.div 
              key={item.slug} 
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <Link
                href={`/destinations/${item.slug}`}
                className="block relative h-[320px] rounded-2xl overflow-hidden shadow-xl shadow-gray-200/40"
              >
                {/* Image background */}
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                
                {/* Overlay Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <div className="space-y-3 transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                    <div className="flex items-center gap-2">
                       <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-white/30">
                        {item.country}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold tracking-tight">
                      {item.name}
                    </h3>
                    
                    <p className="text-sm text-gray-200 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-4 pt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-150">
                      <div className="flex items-center gap-1.5 text-xs text-blue-300 font-medium">
                        <Calendar size={14} />
                        <span>{item.bestTime}</span>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center gap-2 text-white font-semibold text-sm group/btn">
                      <span>View details</span>
                      <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                    </div>
                  </div>
                </div>

                {/* Glassmorphism accent for the bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Link href="/destinations" className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-all hover:shadow-xl hover:-translate-y-1">
            Browse All Destinations
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
