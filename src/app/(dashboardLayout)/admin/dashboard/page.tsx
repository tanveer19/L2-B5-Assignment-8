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
  Plane,
  Activity,
  Database,
  Server,
  Clock,
  CheckCircle2
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
  const [greeting, setGreeting] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const [health, setHealth] = useState({
    api: "checking",
    db: "checking",
    load: "0%"
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Dynamic greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");

    // Clock update
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    const fetchDashboardData = async () => {
      const startTime = performance.now();
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

        const endTime = performance.now();
        const latency = endTime - startTime;
        
        // Update health based on response
        setHealth({
          api: statsRes.ok ? "online" : "offline",
          db: statsRes.ok ? "connected" : "disconnected",
          load: `${Math.round(10 + (latency / 100))} %` // Semi-realistic load simulation based on latency
        });

        if (!statsRes.ok) throw new Error("Failed to fetch dashboard stats");
        
        const statsData = await statsRes.json();
        setStats(statsData.data);

        if (usersRes.ok) {
          const usersData = await usersRes.json();
          setRecentUsers(usersData.data.slice(0, 5));
        }

        if (plansRes.ok) {
          const plansData = await plansRes.json();
          setRecentPlans(plansData.data.slice(0, 5));
        }

      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong loading the dashboard");
        setHealth(prev => ({ ...prev, api: "offline", db: "disconnected" }));
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    return () => clearInterval(timer);
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
        className="flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 text-blue-600 mb-2">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{greeting}, Admin</h1>
          <p className="mt-1 text-gray-500">Here's what's happening on your platform today.</p>
        </div>

        {/* System Health Status - Premium Tagline */}
        <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium whitespace-nowrap transition-colors ${
            health.api === "online" ? "bg-green-50 text-green-700 border-green-100" : 
            health.api === "checking" ? "bg-yellow-50 text-yellow-700 border-yellow-100" : 
            "bg-red-50 text-red-700 border-red-100"
          }`}>
            <Activity className="h-3 w-3" />
            <span>API {health.api.toUpperCase()}</span>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium whitespace-nowrap transition-colors ${
            health.db === "connected" ? "bg-green-50 text-green-700 border-green-100" : 
            health.db === "checking" ? "bg-yellow-50 text-yellow-700 border-yellow-100" : 
            "bg-red-50 text-red-700 border-red-100"
          }`}>
            <Database className="h-3 w-3" />
            <span>DB {health.db.toUpperCase()}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-xs font-medium whitespace-nowrap">
            <Server className="h-3 w-3" />
            <span>Load: {health.load}</span>
          </div>
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
        
        {/* Total Reviews Card */}
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
              <div className="divide-y divide-gray-100">
                {recentUsers.map((user) => (
                  <div key={user.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold">
                        {(user.fullName || "U")[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{user.fullName || "Unnamed User"}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                      {user.role}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center text-gray-400 text-sm flex flex-col items-center gap-2">
                <Users className="h-8 w-8 opacity-20" />
                No recent users found.
              </div>
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
              <div className="divide-y divide-gray-100">
                {recentPlans.map((plan) => (
                  <div key={plan.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                        <Map className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{plan.destination}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>by {plan.owner?.fullName || "Unknown"}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded inline-block border border-gray-100">
                         {new Date(plan.startDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center text-gray-400 text-sm flex flex-col items-center gap-2">
                <Plane className="h-8 w-8 opacity-20" />
                No recent travel plans found.
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex items-center justify-center gap-2 pt-8 text-gray-400 text-sm border-t border-gray-100"
      >
        {health.api === "online" && health.db === "connected" ? (
          <>
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>All systems operational</span>
          </>
        ) : (
          <>
            <AlertCircle className="h-4 w-4 text-red-500" />
            <span>System issues detected</span>
          </>
        )}
      </motion.div>
    </div>
  );
}
