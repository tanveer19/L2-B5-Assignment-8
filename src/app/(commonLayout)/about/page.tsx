import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="max-w-7xl mx-auto px-10 py-16 space-y-16">
      {/* Hero / Intro */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600">
          About TravelBuddy
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          TravelBuddy is a social travel platform designed to help travelers
          connect, plan trips, and find the perfect travel companion — safely
          and easily.
        </p>
      </div>

      {/* Mission Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            Traveling alone can be exciting, but traveling with the right
            companion can turn a trip into a lifetime memory. Our mission is to
            make travel more social, affordable, and enjoyable by connecting
            like-minded travelers from around the world.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Whether you're a solo explorer, a digital nomad, or someone looking
            for a safe travel buddy — TravelBuddy helps you find the right
            match.
          </p>
        </div>

        <div className="bg-blue-50 p-8 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">
            Why Choose TravelBuddy?
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li>✔ Trusted traveler profiles</li>
            <li>✔ Secure authentication & verification</li>
            <li>✔ Smart travel matching</li>
            <li>✔ Easy trip planning</li>
          </ul>
        </div>
      </div>

      {/* Features Section */}
      <div className="space-y-10">
        <h2 className="text-3xl font-semibold text-center">
          Platform Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Explore Travelers"
            description="Browse verified traveler profiles and view their public travel plans before connecting."
          />
          <FeatureCard
            title="Travel Plan Management"
            description="Create, update, and manage your travel plans with destination, budget, dates, and visibility control."
          />
          <FeatureCard
            title="Search & Matching"
            description="Find travel buddies based on destination, travel dates, and shared interests."
          />
          <FeatureCard
            title="Secure Authentication"
            description="JWT-based authentication with secure cookies and role-based access."
          />
          <FeatureCard
            title="Subscription & Verification"
            description="Premium users get verified badges through secure Stripe payments."
          />
          <FeatureCard
            title="Admin Dashboard"
            description="Admins can manage users, plans, and platform activity efficiently."
          />
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center bg-blue-50 rounded-lg p-10 space-y-4">
        <h2 className="text-3xl font-semibold">Ready to Start Your Journey?</h2>
        <p className="text-gray-600">
          Join TravelBuddy today and discover your next travel companion.
        </p>
        <Link
          href="/register"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}

/* Reusable Feature Card */
function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition bg-white">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
