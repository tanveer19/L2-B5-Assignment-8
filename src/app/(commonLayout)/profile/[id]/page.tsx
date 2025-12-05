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

export default function PublicProfilePage() {
  const { id } = useParams();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchProfile() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API}/users/${id}`, {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch user profile");

        const data = await res.json();
        setProfile(data.data);
      } catch (err: any) {
        toast.error(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [id]);

  if (loading) return <div className="p-6">Loading profile...</div>;
  if (!profile) return <div className="p-6">User not found.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="border p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold">{profile.fullName}</h1>
        <p className="text-gray-600">{profile.currentLocation}</p>

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
    </div>
  );
}
