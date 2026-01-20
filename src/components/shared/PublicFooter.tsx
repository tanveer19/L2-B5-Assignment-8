import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Plane, Mail, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function PublicFooter() {
  return (
    <footer className="relative bg-gray-900 text-white mt-16 overflow-hidden">
      {/* Bold Top Section with CTA */}
      <div className="relative bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 py-16">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
                <Sparkles className="w-8 h-8" />
                <h2 className="text-4xl md:text-5xl font-black">
                  Ready to Explore?
                </h2>
              </div>
              <p className="text-xl text-blue-50 font-medium">
                Join thousands of travelers finding their perfect travel buddies
              </p>
            </div>

            <Link
              href="/register"
              className="group px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-white/20 flex items-center gap-3"
            >
              Get Started Free
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
            {/* Brand - Takes more space */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/50">
                  <Plane className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  TravelBuddy
                </h2>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed mb-6 font-medium">
                The world's leading platform for connecting travelers. Find your
                perfect travel companion and turn solo adventures into shared
                memories.
              </p>

              {/* Newsletter */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-cyan-400" />
                  Stay Updated
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Get travel tips and buddy matches
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-bold hover:from-blue-600 hover:to-cyan-600 transition-all hover:scale-105 shadow-lg shadow-blue-500/30">
                    Join
                  </button>
                </div>
              </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
              {/* Explore */}
              <div>
                <h3 className="text-white font-black text-lg mb-6 uppercase tracking-wider">
                  Explore
                </h3>
                <ul className="space-y-4">
                  {[
                    { label: "Home", href: "/" },
                    { label: "Find Travelers", href: "/travelers" },
                    { label: "Travel Plans", href: "/plans" },
                    { label: "Destinations", href: "#" },
                  ].map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-cyan-400 transition-colors font-medium text-base flex items-center gap-2 group"
                      >
                        <span className="w-0 h-0.5 bg-cyan-400 group-hover:w-4 transition-all duration-300"></span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="text-white font-black text-lg mb-6 uppercase tracking-wider">
                  Company
                </h3>
                <ul className="space-y-4">
                  {[
                    { label: "About Us", href: "/about" },
                    { label: "Contact", href: "/contact" },
                    { label: "Careers", href: "#" },
                    { label: "Blog", href: "#" },
                  ].map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-cyan-400 transition-colors font-medium text-base flex items-center gap-2 group"
                      >
                        <span className="w-0 h-0.5 bg-cyan-400 group-hover:w-4 transition-all duration-300"></span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="text-white font-black text-lg mb-6 uppercase tracking-wider">
                  Legal
                </h3>
                <ul className="space-y-4">
                  {[
                    { label: "Privacy", href: "#" },
                    { label: "Terms", href: "#" },
                    { label: "Security", href: "#" },
                    { label: "Cookies", href: "#" },
                  ].map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-cyan-400 transition-colors font-medium text-base flex items-center gap-2 group"
                      >
                        <span className="w-0 h-0.5 bg-cyan-400 group-hover:w-4 transition-all duration-300"></span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-gray-500 font-medium">
                © {new Date().getFullYear()} TravelBuddy. All rights reserved.
              </p>

              {/* Social Icons - Bold Style */}
              <div className="flex items-center gap-4">
                {[
                  {
                    Icon: FaLinkedin,
                    color: "from-blue-700 to-blue-800",
                    label: "LinkedIn",
                    url: "https://www.linkedin.com/in/tanveer-hossain-jony/",
                  },

                  {
                    Icon: FaTwitter,
                    color: "from-cyan-500 to-blue-500",
                    label: "Twitter",
                    url: "https://x.com/thjbd19",
                  },
                  {
                    Icon: FaFacebook,
                    color: "from-blue-600 to-blue-700",
                    label: "Facebook",
                    url: "https://www.facebook.com/thjbd19",
                  },
                ].map(({ Icon, color, label, url }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`p-4 rounded-xl bg-gradient-to-br ${color} hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
