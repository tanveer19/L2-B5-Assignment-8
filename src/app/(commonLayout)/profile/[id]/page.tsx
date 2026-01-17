"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

interface UserProfile {
  id: string;
  fullName?: string;
  currentLocation?: string;
  profileImage?: string;
  bio?: string;
  interests?: string[];
  visitedCountries?: string[];
}

interface RatingStats {
  averageRating: number;
  totalReviews: number;
}

export default function PublicProfilePage() {
  const { id } = useParams();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<RatingStats | null>(null);
  const [loading, setLoading] = useState(true);

  // ⭐ Review Form State
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // ⭐ Simple star UI for display
  const StarDisplay = ({ rating }: { rating: number }) => (
    <div className="flex space-x-1 text-yellow-400 text-xl">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>{star <= rating ? "★" : "☆"}</span>
      ))}
    </div>
  );

  useEffect(() => {
    if (!id) return;

    async function fetchProfileData() {
      try {
        // 1️⃣ Fetch profile
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/users/${id}`, {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch user profile");

        const data = await res.json();
        setProfile(data.data);

        // 2️⃣ Fetch rating stats
        const ratingRes = await fetch(
          `${process.env.NEXT_PUBLIC_API}/reviews/user/${id}/average`,
          { cache: "no-store" }
        );

        if (ratingRes.ok) {
          const ratingData = await ratingRes.json();
          setStats(ratingData.data);
        }
      } catch (err: any) {
        toast.error(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    }

    fetchProfileData();
  }, [id]);

  const submitReview = async () => {
    if (rating === 0) return toast.error("Select a rating!");
    if (!comment.trim()) return toast.error("Write a comment!");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/reviews`, {
        method: "POST",
        credentials: "include", // ⬅ IMPORTANT: sends cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reviewedUserId: id,
          rating,
          comment,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to submit review");

      toast.success("Review submitted!");

      // refresh rating after submit
      const ratingRes = await fetch(
        `${process.env.NEXT_PUBLIC_API}/reviews/user/${id}/average`,
        { cache: "no-store" }
      );
      if (ratingRes.ok) setStats((await ratingRes.json()).data);

      setRating(0);
      setComment("");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (loading) return <div className="p-6">Loading profile...</div>;
  if (!profile) return <div className="p-6">User not found.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="border p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold">{profile.fullName}</h1>
        <p className="text-gray-600">{profile.currentLocation}</p>

        {/* ⭐ Rating Section */}
        {stats && (
          <div className="mt-3">
            <div className="flex items-center space-x-3">
              <StarDisplay rating={Math.round(stats.averageRating)} />
              <p className="text-gray-700 font-medium">
                {stats.averageRating.toFixed(1)} / 5
              </p>
            </div>
            <p className="text-sm text-gray-500">
              {stats.totalReviews} review{stats.totalReviews !== 1 ? "s" : ""}
            </p>
          </div>
        )}

        {/* Profile Image */}
        {profile.profileImage && (
          <Image
            src={profile.profileImage}
            alt="profile"
            width={128}
            height={128}
            className="rounded-full my-4 object-cover"
          />
        )}

        <p className="mt-4">{profile.bio}</p>

        <h3 className="font-medium mt-4">Interests:</h3>
        <p>{profile.interests?.join(", ") || "Not added"}</p>

        <h3 className="font-medium mt-4">Visited Countries:</h3>
        <p>{profile.visitedCountries?.join(", ") || "Not added"}</p>
      </div>

      {/* ⭐ Review Form (Only if logged in and NOT reviewing yourself) */}
      <div className="border p-6 rounded-xl shadow mt-6">
        <h2 className="text-xl font-semibold mb-2">Write a Review</h2>

        <div className="flex gap-2 text-2xl text-yellow-400 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className="cursor-pointer"
              onClick={() => setRating(star)}
            >
              {star <= rating ? "★" : "☆"}
            </span>
          ))}
        </div>

        <textarea
          className="w-full p-3 border rounded-md"
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button
          onClick={submitReview}
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}
