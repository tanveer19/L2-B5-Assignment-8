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

  // raw input strings (fix the comma issue)
  const [interestsRaw, setInterestsRaw] = useState("");
  const [visitedRaw, setVisitedRaw] = useState("");

  const [isSaving, setIsSaving] = useState(false);

  // Load profile
  useEffect(() => {
    async function loadProfile() {
      if (!userId) return;

      const { data } = await getUserProfile(userId);
      setProfile(data || {});

      // sync raw text fields
      setInterestsRaw((data?.interests || []).join(", "));
      setVisitedRaw((data?.visitedCountries || []).join(", "));
    }
    loadProfile();
  }, [userId]);

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // parse arrays from raw text
      const interestsArr =
        interestsRaw
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean) || [];
      const visitedArr =
        visitedRaw
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean) || [];

      const payload: any = {
        fullName: profile.fullName,
        bio: profile.bio,
        currentLocation: profile.currentLocation,
        interests: interestsArr,
        visitedCountries: visitedArr,
      };

      // Upload Cloudinary image if selected
      if (image) {
        const uploaded = await uploadImageToCloudinary(image);
        payload.profileImage = uploaded.secure_url;
      }

      const res = await updateUserProfile(userId, payload);

      if (res.success) {
        // update profile & raw strings
        setProfile(res.data);
        setInterestsRaw((res.data?.interests || []).join(", "));
        setVisitedRaw((res.data?.visitedCountries || []).join(", "));

        toast.success("Profile updated successfully!");
      } else {
        toast.error(res.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Full Name */}
        <input
          type="text"
          placeholder="Full Name"
          value={profile.fullName || ""}
          onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
          className="border p-2 w-full"
        />

        {/* Bio */}
        <textarea
          placeholder="Bio"
          value={profile.bio || ""}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          className="border p-2 w-full"
        />

        {/* Location */}
        <input
          type="text"
          placeholder="Current Location"
          value={profile.currentLocation || ""}
          onChange={(e) =>
            setProfile({ ...profile, currentLocation: e.target.value })
          }
          className="border p-2 w-full"
        />

        {/* Interests */}
        <input
          type="text"
          placeholder="Interests (comma separated)"
          value={interestsRaw}
          onChange={(e) => setInterestsRaw(e.target.value)}
          onBlur={() =>
            setProfile({
              ...profile,
              interests: interestsRaw
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            })
          }
          className="border p-2 w-full"
        />

        {/* Visited Countries */}
        <input
          type="text"
          placeholder="Visited Countries (comma separated)"
          value={visitedRaw}
          onChange={(e) => setVisitedRaw(e.target.value)}
          onBlur={() =>
            setProfile({
              ...profile,
              visitedCountries: visitedRaw
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
            })
          }
          className="border p-2 w-full"
        />

        {/* Profile Image */}
        <label className="block text-gray-700 font-medium mb-1">
          Profile Image:
        </label>

        <div className="flex items-center gap-4">
          <label
            htmlFor="profileImage"
            className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded transition"
          >
            {image ? "Change Image" : "Upload Image"}
          </label>

          {image && <span className="text-sm text-gray-600">{image.name}</span>}

          <input
            id="profileImage"
            type="file"
            className="hidden"
            onChange={(e) => setImage(e.target.files![0])}
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={isSaving}
          className={`mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition ${
            isSaving ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
