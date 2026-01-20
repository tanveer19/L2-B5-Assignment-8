"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plane,
  Calendar,
  DollarSign,
  Users,
  Eye,
  EyeOff,
  Plus,
  Edit,
  ArrowRight,
  MapPin,
  Clock,
} from "lucide-react";

interface TravelPlan {
  id: string;
  destination: string;
  city?: string;
  startDate: string;
  endDate: string;
  minBudget?: number;
  maxBudget?: number;
  travelType: "SOLO" | "FAMILY" | "FRIENDS";
  description?: string;
  visibility: "PUBLIC" | "PRIVATE";
}

export default function MyTravelPlansPage() {
  const [plans, setPlans] = useState<TravelPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  const fetchPlans = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/travel-plans/me`,
        {
          credentials: "include",
        }
      );

      if (!res.ok) {
        setErrMsg("Failed to load travel plans");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setPlans(data?.data || []);
    } catch (error) {
      setErrMsg("Something went wrong");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading your travel plans...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30">
              <Plane className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              My Travel Plans
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and organize your upcoming adventures
          </p>
        </div>

        <Link
          href="/user/add-plan"
          className="group px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Plan
        </Link>
      </div>

      {errMsg && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400">
          {errMsg}
        </div>
      )}

      {plans.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-blue-100 dark:border-gray-700 shadow-lg">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-6">
            <Plane className="w-10 h-10 text-blue-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            No Travel Plans Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start planning your next adventure and find travel buddies!
          </p>
          <Link
            href="/user/add-plan"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            Create Your First Plan
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {plans.map((plan) => {
            const startDate = new Date(plan.startDate);
            const endDate = new Date(plan.endDate);
            const duration = Math.ceil(
              (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
            );

            return (
              <div
                key={plan.id}
                className="group bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-700 rounded-2xl shadow-lg shadow-blue-500/5 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Header with gradient */}
                <div className="relative h-28 bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-600 p-5">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

                  <div className="relative flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="font-bold text-xl text-white mb-1 line-clamp-1">
                        {plan.destination}
                      </h2>
                      {plan.city && (
                        <p className="text-blue-50 text-sm font-medium flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {plan.city}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-bold flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {duration}d
                      </div>
                      {plan.visibility === "PUBLIC" ? (
                        <div
                          className="p-2 bg-green-500/20 backdrop-blur-sm rounded-full"
                          title="Public"
                        >
                          <Eye className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <div
                          className="p-2 bg-gray-500/20 backdrop-blur-sm rounded-full"
                          title="Private"
                        >
                          <EyeOff className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-4">
                  {/* Dates */}
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                      <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                        Travel Dates
                      </p>
                      <p className="text-sm text-gray-800 dark:text-gray-200 font-semibold">
                        {startDate.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        →{" "}
                        {endDate.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Budget & Type */}
                  <div className="grid grid-cols-2 gap-3">
                    {plan.minBudget !== undefined && (
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-cyan-50 dark:bg-cyan-900/30">
                          <DollarSign className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Budget
                          </p>
                          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                            ${plan.minBudget}–${plan.maxBudget}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-900/30">
                        <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Type
                        </p>
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                          {plan.travelType}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  {plan.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
                      {plan.description}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <Link
                      href={`/user/my-plans/${plan.id}/edit`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Link>

                    <Link
                      href={`/user/travel-plans/${plan.id}`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg font-medium transition-all hover:scale-105 shadow-md hover:shadow-lg hover:shadow-blue-500/30"
                    >
                      View
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
