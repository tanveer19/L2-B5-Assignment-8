"use client";

import { motion } from "framer-motion";
import { Quote, MapPin, Star, Heart } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Aisha Rahman",
      location: "Bangladesh → Thailand",
      message:
        "I found an amazing travel buddy through this platform. We explored Phuket together and it was unforgettable! The beaches, the food, the culture - everything was perfect.",
      rating: 5,
      avatar: "AR",
      color: "from-blue-400 to-blue-600",
    },
    {
      name: "Michael Lee",
      location: "USA → Japan",
      message:
        "The matching system works great! I met someone with the same interests and we had a great time in Tokyo. From temples to ramen shops, every moment was special.",
      rating: 5,
      avatar: "ML",
      color: "from-cyan-400 to-cyan-600",
    },
    {
      name: "Sara Ahmed",
      location: "UAE → Turkey",
      message:
        "Traveling alone felt scary, but this platform helped me find a friendly companion. Turkey was amazing! Istanbul's history and culture blew my mind.",
      rating: 5,
      avatar: "SA",
      color: "from-blue-500 to-cyan-500",
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-b from-white via-cyan-50/30 to-white dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-900 overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-cyan-100/40 via-transparent to-transparent dark:from-cyan-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent dark:from-blue-900/20" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-4">
            <Heart className="w-4 h-4" />
            Real Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Success Stories
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Thousands of travelers have already found companions for their dream trips!
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative"
            >
              <div className="h-full bg-white dark:bg-gray-900 rounded-2xl shadow-lg shadow-blue-500/5 p-8 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2 border border-blue-100 dark:border-gray-700">
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                  <Quote className="w-6 h-6 text-white" fill="currentColor" />
                </div>

                {/* Avatar & Info */}
                <div className="flex items-center gap-4 mb-6 mt-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                    {testimonial.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                      {testimonial.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
                      <MapPin className="w-3.5 h-3.5 text-blue-500" />
                      <span>{testimonial.location}</span>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>

                {/* Message */}
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed italic">
                  "{testimonial.message}"
                </p>

                {/* Decorative Element */}
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-tl-full -z-10" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { number: "10K+", label: "Happy Travelers" },
            { number: "50+", label: "Countries Covered" },
            { number: "4.9/5", label: "Average Rating" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-100 dark:border-gray-700"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
