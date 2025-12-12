"use client";

import { useEffect, useState } from "react";

interface Stats {
  totalUsers: number;
  totalTravelPlans: number;
  totalReviews: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/stats`, {
          method: "GET",
          credentials: "include", // include cookies for auth
        });

        if (!res.ok) {
          throw new Error("Failed to fetch stats");
        }

        const data = await res.json();
        setStats(data.data); // assuming your backend response has { success, data }
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border rounded-lg shadow">
          <h2 className="text-lg font-medium">Total Users</h2>
          <p className="text-3xl font-bold mt-2">{stats?.totalUsers}</p>
        </div>

        <div className="p-6 border rounded-lg shadow">
          <h2 className="text-lg font-medium">Travel Plans</h2>
          <p className="text-3xl font-bold mt-2">{stats?.totalTravelPlans}</p>
        </div>

        <div className="p-6 border rounded-lg shadow">
          <h2 className="text-lg font-medium">Total Reviews</h2>
          <p className="text-3xl font-bold mt-2">{stats?.totalReviews}</p>
        </div>
      </div>
    </div>
  );
}
