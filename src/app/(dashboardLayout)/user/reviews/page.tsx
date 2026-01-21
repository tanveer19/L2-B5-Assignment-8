"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import ReviewCard from "@/components/reviews/ReviewCard";
import { MessageSquare, Sparkles } from "lucide-react";

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axiosInstance.get("/reviews/my-reviews");
        setReviews(res.data.data);
      } catch (error) {
        console.error("Failed to load reviews:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading your reviews...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30">
            <MessageSquare className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            My Written Reviews
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Manage all the reviews you've written for other travelers
        </p>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-blue-100 dark:border-gray-700 shadow-lg">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-6">
            <MessageSquare className="w-10 h-10 text-blue-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            No Reviews Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            You haven't written any reviews yet. Start sharing your travel
            experiences!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((rev: any) => (
            <ReviewCard key={rev.id} review={rev} />
          ))}
        </div>
      )}
    </div>
  );
}
