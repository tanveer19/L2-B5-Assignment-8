"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import StarRating from "@/components/reviews/StarRating";
import { toast } from "react-toastify";

interface Review {
  id: string;
  rating: number;
  comment: string;
}

export default function EditReviewPage() {
  const { id } = useParams();
  const router = useRouter();

  const [review, setReview] = useState<Review | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchReview() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API}/reviews/${id}`,
          {
            cache: "no-store",
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Failed to fetch review");

        const data = await res.json();
        setReview(data.data);
        setRating(data.data.rating);
        setComment(data.data.comment);
      } catch (err: any) {
        toast.error(err.message || "Failed to load review");
      } finally {
        setLoading(false);
      }
    }

    fetchReview();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/reviews/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment }),
      });

      if (!res.ok) throw new Error("Failed to update review");

      toast.success("Review updated successfully");
      router.push("/user/reviews");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  };

  if (loading) return <div className="p-6">Loading review...</div>;
  if (!review) return <div className="p-6">Review not found.</div>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Edit Review</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Rating</label>
          <StarRating rating={rating} setRating={setRating} editable />
        </div>

        <div>
          <label className="block font-medium mb-1">Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border rounded p-2"
            rows={4}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Review
        </button>
      </form>
    </div>
  );
}
