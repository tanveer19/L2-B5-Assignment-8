"use client";

import React, { useEffect, useState } from "react";
import {
  getUserProfile,
  updateUserProfile,
  uploadImageToCloudinary,
} from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { 
  User, 
  MapPin, 
  Camera, 
  Globe, 
  Sparkles, 
  Save, 
  Loader2,
  FileText,
  Compass
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
  const { user } = useAuth();
  const userId = user?.id!;
  const [profile, setProfile] = useState<any>({});
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // raw input strings (fix the comma issue)
  const [interestsRaw, setInterestsRaw] = useState("");
  const [visitedRaw, setVisitedRaw] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load profile
  useEffect(() => {
    async function loadProfile() {
      if (!userId) return;
      setIsLoading(true);
      try {
        const { data } = await getUserProfile(userId);
        setProfile(data || {});

        // sync raw text fields
        setInterestsRaw((data?.interests || []).join(", "));
        setVisitedRaw((data?.visitedCountries || []).join(", "));
        if (data?.profileImage) {
          setPreviewUrl(data.profileImage);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    }
    loadProfile();
  }, [userId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-bold text-blue-600 uppercase tracking-wider">
              Settings
            </span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white">
            Personal <span className="text-blue-600">Profile</span>
          </h1>
          <p className="text-gray-500 mt-2">
            Update your account details and manage how others see you.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Image & Quick Info */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl shadow-blue-500/5 border border-blue-100 dark:border-gray-700">
            <div className="flex flex-col items-center">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-50 shadow-inner bg-gray-50 flex items-center justify-center">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Profile"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <User className="w-16 h-16 text-gray-300" />
                  )}
                </div>
                <label
                  htmlFor="profileImage"
                  className="absolute bottom-0 right-0 p-2.5 bg-blue-600 text-white rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition-all hover:scale-110 border-2 border-white"
                >
                  <Camera className="w-4 h-4" />
                  <input
                    id="profileImage"
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <h3 className="text-xl font-bold mt-6 text-gray-900 dark:text-white">
                {profile.fullName || "Your Name"}
              </h3>
              <p className="text-blue-600 font-medium text-sm">
                @{user?.email?.split('@')[0]}
              </p>
              
              <div className="w-full mt-8 pt-8 border-t border-gray-100 dark:border-gray-700 space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  {profile.currentLocation || "Location not set"}
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <Globe className="w-4 h-4 text-blue-500" />
                  {(profile.visitedCountries || []).length} countries visited
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl shadow-blue-500/5 border border-blue-100 dark:border-gray-700">
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Basic Information
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-bold">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="Enter your full name"
                    value={profile.fullName || ""}
                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                    className="rounded-xl border-gray-200 focus:ring-blue-500 h-11"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-bold">Current Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="location"
                      placeholder="e.g. Dhaka, Bangladesh"
                      value={profile.currentLocation || ""}
                      onChange={(e) => setProfile({ ...profile, currentLocation: e.target.value })}
                      className="pl-10 rounded-xl border-gray-200 focus:ring-blue-500 h-11"
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="bio" className="text-sm font-bold">Bio</Label>
                  <textarea
                    id="bio"
                    placeholder="Tell other travelers about yourself..."
                    value={profile.bio || ""}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="w-full min-h-[120px] rounded-xl border border-gray-200 bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl shadow-blue-500/5 border border-blue-100 dark:border-gray-700">
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Compass className="w-5 h-5 text-blue-600" />
                Travel Preferences
              </h4>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="interests" className="text-sm font-bold">Interests</Label>
                  <Input
                    id="interests"
                    placeholder="Hiking, Photography, Street Food (comma separated)"
                    value={interestsRaw}
                    onChange={(e) => setInterestsRaw(e.target.value)}
                    className="rounded-xl border-gray-200 focus:ring-blue-500 h-11"
                  />
                  <p className="text-[10px] text-gray-400 font-medium italic">Separate interests with commas</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="visited" className="text-sm font-bold">Visited Countries</Label>
                  <Input
                    id="visited"
                    placeholder="Japan, France, Brazil (comma separated)"
                    value={visitedRaw}
                    onChange={(e) => setVisitedRaw(e.target.value)}
                    className="rounded-xl border-gray-200 focus:ring-blue-500 h-11"
                  />
                  <p className="text-[10px] text-gray-400 font-medium italic">Separate countries with commas</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="submit"
                disabled={isSaving}
                className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 px-8 py-6 h-auto text-lg font-bold shadow-xl shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-95 flex items-center gap-2"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
