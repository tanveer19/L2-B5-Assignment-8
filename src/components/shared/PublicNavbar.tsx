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

// Replace this with your actual auth context
// Example: const { user, logout } = useAuth();
const MOCK_USER = null; // Try these to test different states:
// const MOCK_USER = { name: "John Doe", role: "user" };
// const MOCK_USER = { name: "Admin User", role: "admin" };

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Replace with your actual auth
  const user = MOCK_USER;

  const handleLogout = async () => {
    // Add your logout logic here
    // await fetch('/api/auth/logout', { method: 'POST' });
    // router.push('/login');
    console.log("Logging out...");
  };

  // Navigation Links Component - DRY principle
  const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => {
    const linkClass = isMobile
      ? "text-gray-700 hover:text-blue-600"
      : "text-gray-700 hover:text-blue-600 transition";

    if (!user) {
      return (
        <>
          <Link href="/explore" className={linkClass}>
            Explore Travelers
          </Link>
          <Link href="/find-buddy" className={linkClass}>
            Find Travel Buddy
          </Link>
        </>
      );
    }

    if (user.role === "admin") {
      return (
        <>
          <Link href="/admin/dashboard" className={linkClass}>
            Admin Dashboard
          </Link>
          <Link href="/admin/users" className={linkClass}>
            Manage Users
          </Link>
          <Link href="/admin/travel-plans" className={linkClass}>
            Manage Travel Plans
          </Link>
          {isMobile && (
            <Link href="/profile" className={linkClass}>
              Profile
            </Link>
          )}
        </>
      );
    }

    // Regular user
    return (
      <>
        <Link href="/explore" className={linkClass}>
          Explore Travelers
        </Link>
        <Link href="/travel-plans" className={linkClass}>
          My Travel Plans
        </Link>
        {isMobile && (
          <>
            <Link href="/dashboard" className={linkClass}>
              Dashboard
            </Link>
            <Link href="/profile" className={linkClass}>
              Profile
            </Link>
          </>
        )}
      </>
    );
  };

  // Auth Buttons Component - DRY principle
  const AuthButtons = ({ isMobile = false }: { isMobile?: boolean }) => {
    if (user) {
      if (isMobile) {
        return (
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        );
      }

      // Desktop - User Menu Dropdown
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <div
                className={`w-8 h-8 ${
                  user.role === "admin" ? "bg-red-500" : "bg-blue-500"
                } rounded-full flex items-center justify-center text-white font-semibold`}
              >
                {user.name.charAt(0)}
              </div>
              <span className="hidden sm:inline">{user.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem asChild>
              <Link href="/profile" className="w-full cursor-pointer">
                View Profile
              </Link>
            </DropdownMenuItem>
            {user.role === "user" && (
              <DropdownMenuItem asChild>
                <Link href="/dashboard" className="w-full cursor-pointer">
                  Dashboard
                </Link>
              </DropdownMenuItem>
            )}
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
    }

    // Not logged in
    if (isMobile) {
      return (
        <div className="flex flex-col gap-2 pt-2">
          <Button variant="outline" className="w-full" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button className="w-full bg-blue-600 hover:bg-blue-700" asChild>
            <Link href="/register">Register</Link>
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
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-bold text-blue-600"
            >
              <MapPin className="w-6 h-6" />
              TravelBuddy
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              <NavLinks />
            </div>
            <AuthButtons />
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
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b shadow-lg overflow-x-hidden">
          <div className="flex flex-col p-4 gap-4 max-w-full">
            <NavLinks isMobile />
            <AuthButtons isMobile />
          </div>
        </div>
      )}
    </nav>
  );
}
