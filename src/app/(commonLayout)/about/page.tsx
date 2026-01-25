"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Plane, Users, Shield, Search, CreditCard, Settings, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16 space-y-20">
      {/* Hero / Intro */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          About Us
        </div>
        <h1 className="text-5xl md:text-6xl font-black">
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            TravelBuddy
          </span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          A social travel platform designed to help travelers connect, plan trips, and find the perfect travel companion — safely and easily.
        </p>
      </motion.div>

      {/* Mission Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Our Mission
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            Traveling alone can be exciting, but traveling with the right companion can turn a trip into a lifetime memory. Our mission is to make travel more social, affordable, and enjoyable by connecting like-minded travelers from around the world.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            Whether you're a solo explorer, a digital nomad, or someone looking for a safe travel buddy — TravelBuddy helps you find the right match.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-8 rounded-2xl border border-blue-100 dark:border-gray-700 shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
            Why Choose TravelBuddy?
          </h3>
          <ul className="space-y-4">
            {[
              "Trusted traveler profiles",
              "Secure authentication & verification",
              "Smart travel matching",
              "Easy trip planning",
              "Global community",
              "24/7 support"
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                <div className="p-1 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Platform Features
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Everything you need to find and connect with travel companions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={Users}
            title="Explore Travelers"
            description="Browse verified traveler profiles and view their public travel plans before connecting."
            color="from-blue-500 to-blue-600"
            delay={0}
          />
          <FeatureCard
            icon={Plane}
            title="Travel Plan Management"
            description="Create, update, and manage your travel plans with destination, budget, dates, and visibility control."
            color="from-cyan-500 to-cyan-600"
            delay={0.1}
          />
          <FeatureCard
            icon={Search}
            title="Search & Matching"
            description="Find travel buddies based on destination, travel dates, and shared interests."
            color="from-blue-600 to-cyan-500"
            delay={0.2}
          />
          <FeatureCard
            icon={Shield}
            title="Secure Authentication"
            description="JWT-based authentication with secure cookies and role-based access."
            color="from-green-500 to-green-600"
            delay={0.3}
          />
          <FeatureCard
            icon={CreditCard}
            title="Subscription & Verification"
            description="Premium users get verified badges through secure Stripe payments."
            color="from-purple-500 to-purple-600"
            delay={0.4}
          />
          <FeatureCard
            icon={Settings}
            title="Admin Dashboard"
            description="Admins can manage users, plans, and platform activity efficiently."
            color="from-orange-500 to-orange-600"
            delay={0.5}
          />
        </div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden text-center bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 rounded-3xl p-12 shadow-2xl"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="relative space-y-6">
          <h2 className="text-4xl font-black text-white">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-50 max-w-2xl mx-auto">
            Join TravelBuddy today and discover your next travel companion.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-white/20"
          >
            Get Started Free
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

/* Reusable Feature Card */
function FeatureCard({
  icon: Icon,
  title,
  description,
  color,
  delay,
}: {
  icon: any;
  title: string;
  description: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-700 rounded-2xl p-6 shadow-lg shadow-blue-500/5 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1"
    >
      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${color} mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
