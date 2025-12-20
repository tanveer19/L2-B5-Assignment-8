"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { destinations } from "@/data/destinations";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.5,
      ease: [0.4, 0, 0.2, 1], // ✅ valid easing
    },
  },
};

export default function PopularDestinations() {
  return (
    <section className="py-12 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">
        Popular Destinations
      </h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-10"
      >
        {destinations.map((item) => (
          <motion.div key={item.slug} variants={cardVariants}>
            <Link
              href={`/destinations/${item.slug}`}
              target="_blank"
              className="block h-full"
            >
              <div className="rounded-xl overflow-hidden bg-white shadow hover:shadow-xl transition group cursor-pointer h-full">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>

                <div className="p-4 space-y-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.country}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
