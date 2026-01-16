"use client";

import { useState, useEffect } from "react";
import { Menu, X, LogOut, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  const handleLogout = async () => {
    logout();
    closeMenu();
  };

  // -------------------------------
  //    NAVIGATION LINKS (Desktop + Mobile)
  // -------------------------------
  const renderNavLinks = (isMobile = false) => {
    const linkClass = isMobile
      ? "text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
      : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors font-medium";

    // Not Logged In
    if (!user) {
      return (
        <>
          <Link href="/travelers" className={linkClass} onClick={closeMenu}>
            Explore Travelers
          </Link>
          <Link href="/plans" className={linkClass} onClick={closeMenu}>
            Explore Travel Plans
          </Link>
        </>
      );
    }

    // Admin
    if (user.role === "ADMIN") {
      return (
        <>
          <Link
            href="/admin/dashboard"
            className={linkClass}
            onClick={closeMenu}
          >
            Admin Dashboard
          </Link>
          <Link href="/admin/users" className={linkClass} onClick={closeMenu}>
            Manage Users
          </Link>
          <Link
            href="/admin/travel-plans"
            className={linkClass}
            onClick={closeMenu}
          >
            Manage Travel Plans
          </Link>
        </>
      );
    }

    // Regular User
    return (
      <>
        <Link href="/travelers" className={linkClass} onClick={closeMenu}>
          Explore Travelers
        </Link>
        <Link href="/plans" className={linkClass} onClick={closeMenu}>
          Explore Travel Plans
        </Link>
        <Link href="/user/my-plans" className={linkClass} onClick={closeMenu}>
          My Plans
        </Link>
        <Link href="/user/reviews" className={linkClass} onClick={closeMenu}>
          My Reviews
        </Link>
        <Link href="/user/pricing" className={linkClass} onClick={closeMenu}>
          Subscription
        </Link>
      </>
    );
  };

  // -------------------------------
  //          AUTH BUTTONS
  // -------------------------------
  const renderAuthButtons = (isMobile = false) => {
    // Logged Out
    if (!user) {
      if (isMobile) {
        return (
          <div className="flex flex-col gap-2 pt-2">
            <Button variant="outline" asChild className="w-full rounded-xl border-blue-200 hover:border-blue-400 hover:bg-blue-50">
              <Link href="/login" onClick={closeMenu}>
                Login
              </Link>
            </Button>

            <Button className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg shadow-blue-500/25" asChild>
              <Link href="/register" onClick={closeMenu}>
                Register
              </Link>
            </Button>
          </div>
        );
      }

      return (
        <div className="flex gap-3">
          <Button variant="outline" asChild className="rounded-xl border-blue-200 hover:border-blue-400 hover:bg-blue-50 dark:border-gray-600 dark:hover:bg-gray-800">
            <Link href="/login">Login</Link>
          </Button>
          <Button className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30" asChild>
            <Link href="/register">Register</Link>
          </Button>
        </div>
      );
    }

    // Logged In — Mobile
    if (isMobile) {
      return (
        <>
          <Link
            href="/user/profile"
            className="text-gray-700"
            onClick={closeMenu}
          >
            Profile
          </Link>

          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </>
      );
    }

    // Logged In — Desktop (Dropdown)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold overflow-hidden`}
              style={{
                backgroundColor: user.role === "ADMIN" ? "#f87171" : "#3b82f6", // Tailwind red-500 / blue-500
              }}
            >
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                user.fullName?.charAt(0)
              )}
            </div>
            <span className="hidden sm:inline">{user.fullName}</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem asChild>
            <Link href="/user/profile" className="w-full cursor-pointer">
              Edit Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleLogout}
            className="text-red-600 cursor-pointer"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg shadow-blue-500/5" 
        : "bg-white dark:bg-gray-900"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent hover:from-blue-500 hover:to-cyan-400 transition-all duration-300"
          >
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30">
              <Plane className="w-5 h-5 text-white" />
            </div>
            TravelBuddy
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">{renderNavLinks()}</div>
            {renderAuthButtons()}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6 text-gray-700 dark:text-gray-200" /> : <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-blue-100 dark:border-gray-700 shadow-xl shadow-blue-500/10">
          <div className="flex flex-col p-4 gap-4">
            {renderNavLinks(true)}
            {renderAuthButtons(true)}
          </div>
        </div>
      )}
    </nav>
  );
}
