"use client";

import { useState } from "react";
import StarRating from "./StarRating";
import { axiosInstance } from "@/lib/axios";

export default function ReviewForm({
  reviewedUserId,
  existingReview,
}: {
  reviewedUserId: string;
  existingReview?: any;
}) {
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [comment, setComment] = useState(existingReview?.comment || "");
  const isEdit = !!existingReview;

  const handleSubmit = async () => {
    if (isEdit) {
      await axiosInstance.patch(`/reviews/${existingReview.id}`, {
        rating,
        comment,
      });
      alert("Review updated.");
    } else {
      await axiosInstance.post("/reviews", {
        reviewedUserId,
        rating,
        comment,
      });
      alert("Review submitted!");
    }

    window.location.reload();
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow">
      <StarRating rating={rating} setRating={setRating} />

      <textarea
        className="w-full border rounded p-2 mt-2"
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review..."
      />

      <button
        onClick={handleSubmit}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
      >
        {isEdit ? "Update Review" : "Submit Review"}
      </button>
    </div>
  );
}
