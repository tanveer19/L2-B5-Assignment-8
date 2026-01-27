"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Users, 
  Map, 
  Star, 
  ArrowRight, 
  Loader2,
  AlertCircle,
  UserPlus,
  Plane
} from "lucide-react";

interface Stats {
  totalUsers: number;
  totalTravelPlans: number;
  totalReviews: number;
}

interface User {
  id: string;
  fullName?: string;
  email: string;
  role: string;
}

interface TravelPlan {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  owner: { fullName: string };
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [recentPlans, setRecentPlans] = useState<TravelPlan[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, usersRes, plansRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API}/admin/stats`, {
            credentials: "include",
          }),
          fetch(`${process.env.NEXT_PUBLIC_API}/admin/users`, {
            credentials: "include",
          }),
          fetch(`${process.env.NEXT_PUBLIC_API}/admin/travel-plans`, {
            credentials: "include",
          }),
        ]);

        if (!statsRes.ok) throw new Error("Failed to fetch dashboard stats");
        
        const statsData = await statsRes.json();
        setStats(statsData.data);

        // Handle users conditionally (don't break if fail, just empty list)
        if (usersRes.ok) {
          const usersData = await usersRes.json();
          // Assuming the API returns latest first, otherwise we just take the first 5
          setRecentUsers(usersData.data.slice(0, 5));
        }

        // Handle plans conditionally
        if (plansRes.ok) {
          const plansData = await plansRes.json();
          setRecentPlans(plansData.data.slice(0, 5));
        }

      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong loading the dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-100px)] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[calc(100vh-100px)] items-center justify-center">
        <div className="flex max-w-md flex-col items-center gap-2 rounded-lg border bg-red-50 p-6 text-center text-red-900 shadow-sm">
          <AlertCircle className="h-10 w-10 text-red-600" />
          <h3 className="font-semibold">Error Loading Dashboard</h3>
          <p className="text-sm">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-500">Welcome to your admin overview.</p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 md:grid-cols-3"
      >
        {/* Total Users Card */}
        <Link href="/admin/users" className="block group">
          <motion.div 
            variants={item}
            className="relative overflow-hidden rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md group-hover:border-blue-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Users</p>
                <h3 className="mt-2 text-3xl font-bold text-gray-900">{stats?.totalUsers || 0}</h3>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm font-medium text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
              Manage Users <ArrowRight className="ml-1 h-4 w-4" />
            </div>
          </motion.div>
        </Link>

        {/* Total Travel Plans Card */}
        <Link href="/admin/travel-plans" className="block group">
          <motion.div 
            variants={item}
            className="relative overflow-hidden rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md group-hover:border-green-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Travel Plans</p>
                <h3 className="mt-2 text-3xl font-bold text-gray-900">{stats?.totalTravelPlans || 0}</h3>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600 group-hover:scale-110 transition-transform">
                <Map className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm font-medium text-green-600 opacity-0 transition-opacity group-hover:opacity-100">
              View Plans <ArrowRight className="ml-1 h-4 w-4" />
            </div>
          </motion.div>
        </Link>
        
        {/* Total Reviews Card - Just a stat for now */}
        <motion.div 
          variants={item}
          className="rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Reviews</p>
              <h3 className="mt-2 text-3xl font-bold text-gray-900">{stats?.totalReviews || 0}</h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-50 text-yellow-600">
              <Star className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-400">
            Platform Activity
          </div>
        </motion.div>
      </motion.div>

      {/* Recent Activity Sections */}
      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid gap-6 md:grid-cols-2"
      >
        {/* Recent Users */}
        <motion.div 
          variants={item} 
          className="rounded-xl border bg-white shadow-sm flex flex-col h-full"
        >
          <div className="p-6 border-b flex items-center justify-between bg-gray-50/50 rounded-t-xl">
            <div className="flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-blue-600" />
              <h2 className="font-semibold text-gray-900">Recent Users</h2>
            </div>
            <Link href="/admin/users" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </Link>
          </div>
          <div className="p-0 flex-1">
            {recentUsers.length > 0 ? (
              <div className="divide-y">
                {recentUsers.map((user) => (
                  <div key={user.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div>
                      <p className="font-medium text-gray-900">{user.fullName || "Unnamed User"}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                      {user.role}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500 text-sm">No recent users found.</div>
            )}
          </div>
        </motion.div>

        {/* Recent Travel Plans */}
        <motion.div 
          variants={item} 
          className="rounded-xl border bg-white shadow-sm flex flex-col h-full"
        >
          <div className="p-6 border-b flex items-center justify-between bg-gray-50/50 rounded-t-xl">
            <div className="flex items-center gap-2">
              <Plane className="h-5 w-5 text-green-600" />
              <h2 className="font-semibold text-gray-900">Recent Trips</h2>
            </div>
            <Link href="/admin/travel-plans" className="text-sm text-green-600 hover:text-green-700 font-medium">
              View All
            </Link>
          </div>
          <div className="p-0 flex-1">
            {recentPlans.length > 0 ? (
              <div className="divide-y">
                {recentPlans.map((plan) => (
                  <div key={plan.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div>
                      <p className="font-medium text-gray-900">{plan.destination}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>by {plan.owner?.fullName || "Unknown"}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded inline-block">
                         {new Date(plan.startDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500 text-sm">No recent travel plans found.</div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
