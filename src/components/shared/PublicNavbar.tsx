"use client";

import { useState } from "react";
import { Menu, X, LogOut, MapPin } from "lucide-react";
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
  const { user, logout } = useAuth();

  const closeMenu = () => setIsOpen(false);

  const handleLogout = async () => {
    await logout();
    closeMenu();
  };

  // -------------------------------
  //    NAVIGATION LINKS (Desktop + Mobile)
  // -------------------------------
  const renderNavLinks = (isMobile = false) => {
    const linkClass = isMobile
      ? "text-gray-700 hover:text-blue-600"
      : "text-gray-700 hover:text-blue-600 transition";

    // Not Logged In
    if (!user) {
      return (
        <>
          <Link href="/explore" className={linkClass} onClick={closeMenu}>
            Explore Travelers
          </Link>
          <Link href="/find-buddy" className={linkClass} onClick={closeMenu}>
            Find Travel Buddy
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
        <Link href="/explore" className={linkClass} onClick={closeMenu}>
          Explore Travelers
        </Link>
        <Link
          href="user/travel-plans"
          className={linkClass}
          onClick={closeMenu}
        >
          My Travel Plans
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
            <Button variant="outline" asChild className="w-full">
              <Link href="/login" onClick={closeMenu}>
                Login
              </Link>
            </Button>

            <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/register" onClick={closeMenu}>
                Register
              </Link>
            </Button>
          </div>
        );
      }

      return (
        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700" asChild>
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
              className={`w-8 h-8 ${
                user.role === "ADMIN" ? "bg-red-500" : "bg-blue-500"
              } rounded-full flex items-center justify-center text-white font-semibold`}
            >
              {user.fullName?.charAt(0)}
            </div>
            <span className="hidden sm:inline">{user.fullName}</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem asChild>
            <Link href="/user/profile" className="w-full cursor-pointer">
              View Profile
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
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-bold text-blue-600"
          >
            <MapPin className="w-6 h-6" />
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
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b shadow-lg">
          <div className="flex flex-col p-4 gap-4">
            {renderNavLinks(true)}
            {renderAuthButtons(true)}
          </div>
        </div>
      )}
    </nav>
  );
}
