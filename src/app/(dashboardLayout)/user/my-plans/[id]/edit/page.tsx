"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Eye,
  FileText,
  Save,
  ArrowLeft,
  Loader2,
  Plane,
  Sparkles,
} from "lucide-react";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function EditTravelPlanForm() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    destination: "",
    city: "",
    startDate: "",
    endDate: "",
    minBudget: "",
    maxBudget: "",
    travelType: "SOLO",
    description: "",
    visibility: "PUBLIC",
  });

  // -------------------------------
  // Fetch existing plan
  // -------------------------------
  const fetchPlan = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/travel-plans/${id}`,
        { credentials: "include" }
      );

      if (!res.ok) {
        toast.error("Failed to load plan details.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      const plan = data.data;

      setFormData({
        destination: plan.destination,
        city: plan.city || "",
        startDate: plan.startDate.substring(0, 10),
        endDate: plan.endDate.substring(0, 10),
        minBudget: plan.minBudget ? String(plan.minBudget) : "",
        maxBudget: plan.maxBudget ? String(plan.maxBudget) : "",
        travelType: plan.travelType,
        description: plan.description || "",
        visibility: plan.visibility,
      });
    } catch (error: any) {
      toast.error("Something went wrong while fetching the plan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlan();
  }, [id]);

  // -------------------------------
  // Update handler
  // -------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        destination: formData.destination,
        city: formData.city || undefined,
        startDate: formData.startDate,
        endDate: formData.endDate,
        minBudget: formData.minBudget ? Number(formData.minBudget) : undefined,
        maxBudget: formData.maxBudget ? Number(formData.maxBudget) : undefined,
        travelType: formData.travelType,
        description: formData.description,
        visibility: formData.visibility,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/travel-plans/${id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        toast.error(error?.message || "Failed to update travel plan.");
        setSaving(false);
        return;
      }

      toast.success("Travel plan updated successfully!");
      router.push("/user/my-plans");
    } catch (error: any) {
      toast.error("An unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-muted-foreground animate-pulse">Loading plan details...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto px-4 py-6 md:py-8"
    >
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to My Plans
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30">
            <Plane className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Edit Travel Plan
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Update your journey details and preferences
        </p>
      </div>

      <form 
        onSubmit={handleSubmit} 
        className="bg-white dark:bg-gray-900 border border-blue-100 dark:border-gray-700 rounded-2xl shadow-lg p-6 md:p-8 space-y-6"
      >
          {/* Destination */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <MapPin className="w-4 h-4 text-blue-500" />
              Destination
            </label>
            <input
              type="text"
              placeholder="e.g. Paris, France"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-800 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              value={formData.destination}
              onChange={(e) =>
                setFormData({ ...formData, destination: e.target.value })
              }
              required
            />
          </div>

          {/* City (Optional) */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <MapPin className="w-4 h-4 text-cyan-500" />
              City{" "}
              <span className="text-xs font-normal text-gray-500">
                (Optional)
              </span>
            </label>
            <input
              type="text"
              placeholder="e.g. Paris"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-800 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <Calendar className="w-4 h-4 text-blue-500" />
                Start Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-800 dark:text-gray-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <Calendar className="w-4 h-4 text-cyan-500" />
                End Date
              </label>
              <input
                type="date"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-800 dark:text-gray-200 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <DollarSign className="w-4 h-4 text-green-500" />
                Min Budget
              </label>
              <input
                type="number"
                placeholder="500"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-800 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                value={formData.minBudget}
                onChange={(e) =>
                  setFormData({ ...formData, minBudget: e.target.value })
                }
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <DollarSign className="w-4 h-4 text-green-500" />
                Max Budget
              </label>
              <input
                type="number"
                placeholder="1500"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-800 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                value={formData.maxBudget}
                onChange={(e) =>
                  setFormData({ ...formData, maxBudget: e.target.value })
                }
              />
            </div>
          </div>

          {/* Travel Type & Visibility */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <Users className="w-4 h-4 text-purple-500" />
                Travel Type
              </label>
              <select
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-800 dark:text-gray-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                value={formData.travelType}
                onChange={(e) =>
                  setFormData({ ...formData, travelType: e.target.value })
                }
              >
                <option value="SOLO">Solo</option>
                <option value="FAMILY">Family</option>
                <option value="FRIENDS">Friends</option>
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                <Eye className="w-4 h-4 text-indigo-500" />
                Visibility
              </label>
              <select
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-800 dark:text-gray-200 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                value={formData.visibility}
                onChange={(e) =>
                  setFormData({ ...formData, visibility: e.target.value })
                }
              >
                <option value="PUBLIC">Public (Visible to everyone)</option>
                <option value="PRIVATE">Private (Only you)</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              <FileText className="w-4 h-4 text-blue-500" />
              Description
            </label>
            <textarea
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-800 dark:text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
              rows={5}
              placeholder="Share your travel plans, itinerary, expectations, and what kind of travel buddy you're looking for..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="w-full sm:flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/40 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => router.push("/user/my-plans")}
              className="w-full sm:flex-1 px-6 py-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
    </motion.div>
  );
}
