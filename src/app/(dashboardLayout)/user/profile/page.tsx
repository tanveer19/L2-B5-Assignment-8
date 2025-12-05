"use client";

import React, { useEffect, useState } from "react";
import {
  getUserProfile,
  updateUserProfile,
  uploadImageToCloudinary,
} from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const { user } = useAuth();
  const userId = user?.id!;
  const [profile, setProfile] = useState<any>({});
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    async function loadProfile() {
      if (!userId) return;
      const data = await getUserProfile(userId);
      setProfile(data.data);
    }
    loadProfile();
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload: any = {
        fullName: profile.fullName,
        bio: profile.bio,
        currentLocation: profile.currentLocation,
        interests: profile.interests?.filter(Boolean) || [],
        visitedCountries: profile.visitedCountries?.filter(Boolean) || [],
      };

      // Only upload if image selected
      if (image) {
        const uploaded = await uploadImageToCloudinary(image);
        payload.profileImage = uploaded.secure_url;
      }

      const data = await updateUserProfile(userId, payload);

      if (data.success) {
        setProfile(data.data);
        toast.success("Profile updated successfully!");
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={profile.fullName || ""}
          onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
          className="border p-2 w-full"
        />

        <textarea
          placeholder="Bio"
          value={profile.bio || ""}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          className="border p-2 w-full"
        />

        <input
          type="text"
          placeholder="Current Location"
          value={profile.currentLocation || ""}
          onChange={(e) =>
            setProfile({ ...profile, currentLocation: e.target.value })
          }
          className="border p-2 w-full"
        />

        <input
          type="text"
          placeholder="Interests (comma separated)"
          value={profile.interests?.join(", ") || ""}
          onChange={(e) =>
            setProfile({
              ...profile,
              interests: e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            })
          }
          className="border p-2 w-full"
        />

        <input
          type="text"
          placeholder="Visited Countries (comma separated)"
          value={profile.visitedCountries?.join(", ") || ""}
          onChange={(e) =>
            setProfile({
              ...profile,
              visitedCountries: e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            })
          }
          className="border p-2 w-full"
        />

        <label>Profile Image:</label>
        <input type="file" onChange={(e) => setImage(e.target.files![0])} />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
}
