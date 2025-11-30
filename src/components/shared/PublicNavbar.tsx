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

// Mock user data - replace with your actual auth context/props
const MOCK_USER = null; // Change to { name: "John Doe", role: "user" } to test
// const MOCK_USER = { name: "John Doe", role: "user" };
// const MOCK_USER = { name: "Admin User", role: "admin" };

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = MOCK_USER; // Replace with: const { user } = useAuth();

  const handleLogout = async () => {
    // Add your logout logic here
    console.log("Logging out...");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <a
              href="/"
              className="flex items-center gap-2 text-2xl font-bold text-blue-600"
            >
              <MapPin className="w-6 h-6" />
              TravelBuddy
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {!user ? (
              <>
                <div className="flex gap-6">
                  <a
                    href="/explore"
                    className="text-gray-700 hover:text-blue-600 transition"
                  >
                    Explore Travelers
                  </a>
                  <a
                    href="/find-buddy"
                    className="text-gray-700 hover:text-blue-600 transition"
                  >
                    Find Travel Buddy
                  </a>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" asChild>
                    <a href="/login">Login</a>
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                    <a href="/register">Register</a>
                  </Button>
                </div>
              </>
            ) : user.role === "admin" ? (
              <>
                <div className="flex gap-6">
                  <a
                    href="/admin/dashboard"
                    className="text-gray-700 hover:text-blue-600 transition"
                  >
                    Admin Dashboard
                  </a>
                  <a
                    href="/admin/users"
                    className="text-gray-700 hover:text-blue-600 transition"
                  >
                    Manage Users
                  </a>
                  <a
                    href="/admin/travel-plans"
                    className="text-gray-700 hover:text-blue-600 transition"
                  >
                    Manage Travel Plans
                  </a>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <span className="hidden sm:inline">{user.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <a href="/profile" className="w-full cursor-pointer">
                        View Profile
                      </a>
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
              </>
            ) : (
              <>
                <div className="flex gap-6">
                  <a
                    href="/explore"
                    className="text-gray-700 hover:text-blue-600 transition"
                  >
                    Explore Travelers
                  </a>
                  <a
                    href="/travel-plans"
                    className="text-gray-700 hover:text-blue-600 transition"
                  >
                    My Travel Plans
                  </a>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <span className="hidden sm:inline">{user.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <a href="/profile" className="w-full cursor-pointer">
                        View Profile
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href="/dashboard" className="w-full cursor-pointer">
                        Dashboard
                      </a>
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
              </>
            )}
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
            {!user ? (
              <>
                <a
                  href="/explore"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Explore Travelers
                </a>
                <a
                  href="/find-buddy"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Find Travel Buddy
                </a>
                <div className="flex flex-col gap-2 pt-2">
                  <Button variant="outline" className="w-full" asChild>
                    <a href="/login">Login</a>
                  </Button>
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    asChild
                  >
                    <a href="/register">Register</a>
                  </Button>
                </div>
              </>
            ) : user.role === "admin" ? (
              <>
                <a
                  href="/admin/dashboard"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Admin Dashboard
                </a>
                <a
                  href="/admin/users"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Manage Users
                </a>
                <a
                  href="/admin/travel-plans"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Manage Travel Plans
                </a>
                <a
                  href="/profile"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Profile
                </a>
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="w-full"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <a
                  href="/explore"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Explore Travelers
                </a>
                <a
                  href="/travel-plans"
                  className="text-gray-700 hover:text-blue-600"
                >
                  My Travel Plans
                </a>
                <a
                  href="/dashboard"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Dashboard
                </a>
                <a
                  href="/profile"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Profile
                </a>
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  className="w-full"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
