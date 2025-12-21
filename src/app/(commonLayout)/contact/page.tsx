import Link from "next/link";

export default function ContactPage() {
  return (
    <section className="max-w-7xl mx-auto px-10 py-16 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-600">
          Contact Us
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Have questions, feedback, or partnership ideas? We’d love to hear from
          you. Reach out and our team will get back to you as soon as possible.
        </p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Get in Touch</h2>

          <p className="text-gray-700">
            TravelBuddy is built to connect travelers safely and efficiently.
            Whether you need support or have a feature suggestion, feel free to
            contact us.
          </p>

          <div className="space-y-3 text-gray-700">
            <p>
              📧 Email:{" "}
              <a
                href="mailto:support@travelbuddy.com"
                className="text-blue-600 hover:underline"
              >
                support@travelbuddy.com
              </a>
            </p>
            <p>📍 Location: Dhaka, Bangladesh</p>
            <p>🕒 Support Hours: 9:00 AM – 8:00 PM</p>
          </div>

          <div className="pt-4">
            <Link
              href="/register"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Join TravelBuddy
            </Link>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white border rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                rows={4}
                placeholder="Write your message here..."
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
