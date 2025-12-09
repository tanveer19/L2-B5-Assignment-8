"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import ReviewCard from "@/components/reviews/ReviewCard";

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await axiosInstance.get("/reviews/my-reviews");
      setReviews(res.data.data);
    })();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <h1 className="text-xl font-bold">My Written Reviews</h1>

      {reviews.map((rev: any) => (
        <ReviewCard key={rev.id} review={rev} />
      ))}
    </div>
  );
}
