"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-blue-50 rounded-lg p-12 text-center flex flex-col items-center justify-center space-y-6">
      {/* Main Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-blue-600">
        TravelBuddy
      </h1>

      {/* Subheading */}
      <p className="text-lg md:text-xl text-gray-700 max-w-2xl">
        Find travel companions, explore new destinations, and make memories
        together. Turn your solo trips into shared adventures!
      </p>

      {/* Call-to-Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/register"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
        <Link
          href="/travelers"
          className="bg-white border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-100 transition"
        >
          Explore Travelers
        </Link>
      </div>

      {/* Optional Image or Illustration */}
      <div className="mt-6">
        <Image
          src="/mountain0.jpg"
          width={1920}
          height={1389}
          alt="Travel illustration"
          className="w-full max-w-lg mx-auto"
        />
      </div>
    </section>
  );
}
