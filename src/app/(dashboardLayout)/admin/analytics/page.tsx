"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Users, 
  Plane, 
  Star, 
  Calendar,
  Activity,
  BarChart3,
  PieChart,
  ArrowUp,
  ArrowDown,
  Minus
} from "lucide-react";

interface AnalyticsData {
  userGrowth: {
    labels: string[];
    data: number[];
    total: number;
    growth: number;
  };
  travelPlans: {
    labels: string[];
    data: number[];
    total: number;
    growth: number;
  };
  reviews: {
    labels: string[];
    data: number[];
    total: number;
    growth: number;
  };
  engagement: {
    activeUsers: number;
    avgSessionTime: string;
    bounceRate: number;
    topDestinations: { name: string; count: number }[];
  };
  demographics: {
    ageGroups: { label: string; value: number }[];
    countries: { name: string; count: number }[];
  };
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30d");

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      
      try {
        // Try to fetch real analytics data from API
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/admin/analytics?range=${timeRange}`, {
          credentials: "include",
        });
        
        if (response.ok) {
          const analyticsData = await response.json();
          setData(analyticsData.data);
        } else {
          // If API doesn't exist or fails, show empty state
          setData(null);
        }
      } catch (error) {
        console.error("Analytics API not available:", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange]);

  const renderTrendIcon = (growth: number) => {
    if (growth > 0) return <ArrowUp className="w-4 h-4 text-green-500" />;
    if (growth < 0) return <ArrowDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const renderChart = (chartData: { labels: string[]; data: number[] }) => {
    const maxValue = Math.max(...chartData.data);
    
    return (
      <div className="flex items-end justify-between h-32 gap-2 mt-4">
        {chartData.data.map((value, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(value / maxValue) * 100}%` }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="w-full bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-md min-h-[4px]"
            />
            <span className="text-xs text-gray-500 mt-2">{chartData.labels[index]}</span>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-100px)] items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Track platform performance and user engagement
            </p>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700">
          <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
            <BarChart3 className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Analytics Not Available
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
            Analytics data is not available yet. The analytics API endpoint needs to be implemented on the backend to display real data.
          </p>
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>For developers:</strong> Implement <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">/admin/analytics</code> API endpoint to enable this feature.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Track platform performance and user engagement
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {["7d", "30d", "90d", "1y"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                timeRange === range
                  ? "bg-white dark:bg-gray-700 text-blue-600 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* User Growth */}
        <div className="bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-700 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</span>
            </div>
            <div className="flex items-center gap-1">
              {renderTrendIcon(data?.userGrowth.growth || 0)}
              <span className={`text-sm font-medium ${
                (data?.userGrowth.growth || 0) > 0 ? "text-green-600" : 
                (data?.userGrowth.growth || 0) < 0 ? "text-red-600" : "text-gray-600"
              }`}>
                {Math.abs(data?.userGrowth.growth || 0)}%
              </span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            {data?.userGrowth.total.toLocaleString()}
          </div>
          {data && renderChart(data.userGrowth)}
        </div>

        {/* Travel Plans */}
        <div className="bg-white dark:bg-gray-900 border border-green-100 dark:border-gray-700 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Plane className="w-5 h-5 text-green-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Travel Plans</span>
            </div>
            <div className="flex items-center gap-1">
              {renderTrendIcon(data?.travelPlans.growth || 0)}
              <span className={`text-sm font-medium ${
                (data?.travelPlans.growth || 0) > 0 ? "text-green-600" : 
                (data?.travelPlans.growth || 0) < 0 ? "text-red-600" : "text-gray-600"
              }`}>
                {Math.abs(data?.travelPlans.growth || 0)}%
              </span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            {data?.travelPlans.total.toLocaleString()}
          </div>
          {data && renderChart(data.travelPlans)}
        </div>

        {/* Reviews */}
        <div className="bg-white dark:bg-gray-900 border border-yellow-100 dark:border-gray-700 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Reviews</span>
            </div>
            <div className="flex items-center gap-1">
              {renderTrendIcon(data?.reviews.growth || 0)}
              <span className={`text-sm font-medium ${
                (data?.reviews.growth || 0) > 0 ? "text-green-600" : 
                (data?.reviews.growth || 0) < 0 ? "text-red-600" : "text-gray-600"
              }`}>
                {Math.abs(data?.reviews.growth || 0)}%
              </span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            {data?.reviews.total.toLocaleString()}
          </div>
          {data && renderChart(data.reviews)}
        </div>
      </motion.div>

      {/* Engagement Metrics & Top Destinations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Engagement Metrics */}
        <div className="bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-700 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">User Engagement</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {data?.engagement.activeUsers.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
            </div>
            
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {data?.engagement.avgSessionTime}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg Session</div>
            </div>
            
            <div className="col-span-2 text-center p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-xl">
              <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                {data?.engagement.bounceRate}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Bounce Rate</div>
            </div>
          </div>
        </div>

        {/* Top Destinations */}
        <div className="bg-white dark:bg-gray-900 border border-green-100 dark:border-gray-700 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <PieChart className="w-5 h-5 text-green-500" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Top Destinations</h3>
          </div>
          
          <div className="space-y-3">
            {data?.engagement.topDestinations.map((destination, index) => (
              <div key={destination.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="text-gray-800 dark:text-gray-200 font-medium">
                    {destination.name}
                  </span>
                </div>
                <span className="text-gray-600 dark:text-gray-400 font-semibold">
                  {destination.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Demographics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Age Groups */}
        <div className="bg-white dark:bg-gray-900 border border-purple-100 dark:border-gray-700 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-6">Age Demographics</h3>
          
          <div className="space-y-4">
            {data?.demographics.ageGroups.map((group, index) => (
              <div key={group.label} className="flex items-center gap-4">
                <div className="w-16 text-sm font-medium text-gray-600 dark:text-gray-400">
                  {group.label}
                </div>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${group.value}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className="h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  />
                </div>
                <div className="w-12 text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {group.value}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Countries */}
        <div className="bg-white dark:bg-gray-900 border border-cyan-100 dark:border-gray-700 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-6">Top Countries</h3>
          
          <div className="space-y-3">
            {data?.demographics.countries.map((country, index) => (
              <div key={country.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                    {index + 1}
                  </div>
                  <span className="text-gray-800 dark:text-gray-200 font-medium">
                    {country.name}
                  </span>
                </div>
                <span className="text-gray-600 dark:text-gray-400 font-semibold">
                  {country.count} users
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}