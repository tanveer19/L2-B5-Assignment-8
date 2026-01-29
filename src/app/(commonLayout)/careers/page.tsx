"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Briefcase, Heart, Globe, Target, Users, ArrowRight, CheckCircle2 } from "lucide-react";

export default function CareersPage() {
  const openPositions = [
    {
      id: 1,
      title: "Full Stack Developer",
      department: "Engineering",
      location: "Dhaka, Bangladesh",
      type: "Full-time",
      description: "We're looking for a talented full stack developer to help build the next generation of our platform.",
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "Remote",
      type: "Full-time",
      description: "Lead the vision and strategy of our travel platform while working closely with engineering and design teams.",
    },
    {
      id: 3,
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      description: "Create beautiful and intuitive user experiences for millions of travelers around the world.",
    },
    {
      id: 4,
      title: "Community Manager",
      department: "Community",
      location: "Dhaka, Bangladesh",
      type: "Full-time",
      description: "Build and nurture our global community of travelers, ensuring every member feels welcome and supported.",
    },
    {
      id: 5,
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      description: "Help us reach travelers worldwide and tell the TravelBuddy story through creative marketing campaigns.",
    },
    {
      id: 6,
      title: "Customer Success Lead",
      department: "Support",
      location: "Dhaka, Bangladesh",
      type: "Full-time",
      description: "Ensure our users have the best experience possible by providing exceptional support and gathering feedback.",
    },
  ];

  const values = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Perspective",
      description: "We celebrate diversity and believe great ideas come from everywhere.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Passion for Travel",
      description: "We're obsessed with helping travelers create unforgettable memories together.",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Impact Driven",
      description: "Everything we do is focused on creating meaningful impact in our users' lives.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaboration",
      description: "We believe in the power of teamwork and lifting each other up.",
    },
  ];

  const benefits = [
    "Competitive salary and equity packages",
    "Flexible work arrangements",
    "Comprehensive health and wellness benefits",
    "Professional development opportunities",
    "Unlimited paid time off",
    "Travel discounts for all employees",
    "Collaborative and inclusive team culture",
    "Access to cutting-edge technology",
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 space-y-20">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          Join Our Team
        </div>
        <h1 className="text-5xl md:text-6xl font-black">
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Build the Future of Travel
          </span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Join TravelBuddy and help connect millions of travelers around the world. We're looking for talented, passionate individuals to grow with us.
        </p>
      </motion.div>

      {/* Why Join Us */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-12 space-y-8"
      >
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white">
          Why Join TravelBuddy?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-4 text-center"
            >
              <div className="flex justify-center text-blue-600 dark:text-blue-400">
                {value.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {value.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white">
          What We Offer
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className="flex items-start gap-4"
            >
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <p className="text-lg text-gray-700 dark:text-gray-300">{benefit}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Open Positions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-8"
      >
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Open Positions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We're actively hiring talented individuals across various departments. Check out our current openings below.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {openPositions.map((position, idx) => (
            <motion.div
              key={position.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg hover:border-blue-500 dark:hover:border-blue-400 transition-all group cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                      {position.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{position.description}</p>
                  <div className="flex flex-wrap gap-3 text-sm">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                      {position.department}
                    </span>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                      {position.location}
                    </span>
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">
                      {position.type}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition translate-x-0 group-hover:translate-x-2" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-12 text-center space-y-6 text-white"
      >
        <h2 className="text-4xl font-bold">Ready to Join Us?</h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          If you don't see a position that matches your skills, we'd still love to hear from you. Send us your resume and tell us what you're passionate about.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:careers@travelbuddy.com"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Send Your Resume
          </a>
          <Link
            href="/"
            className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
