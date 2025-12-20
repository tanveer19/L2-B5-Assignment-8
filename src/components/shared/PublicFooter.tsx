import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import Link from "next/link";

export default function PublicFooter() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">TravelBuddy</h2>
          <p className="text-gray-400 text-sm">
            Find your perfect travel partner and explore the world together.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/travelers" className="hover:text-white">
                Explore Travelers
              </Link>
            </li>
            <li>
              <Link href="/plans" className="hover:text-white">
                Travel Plans
              </Link>
            </li>
            {/* <li>
              <Link href="/profile" className="hover:text-white">
                Profile
              </Link>
            </li> */}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                FAQ
              </Link>
            </li>
            {/* <li>
              <Link href="/terms" className="hover:text-white">
                Terms & Privacy
              </Link>
            </li> */}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex items-center space-x-4 text-2xl">
            <a href="#" className="hover:text-white">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-white">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-white">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} TravelBuddy. All rights reserved.
      </div>
    </footer>
  );
}
