"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditTravelPlanForm({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [formData, setFormData] = useState({
    destination: "",
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
        setErrMsg("Failed to load plan");
        setLoading(false);
        return;
      }

      const data = await res.json();
      const plan = data.data;

      setFormData({
        destination: plan.destination,
        startDate: plan.startDate.substring(0, 10),
        endDate: plan.endDate.substring(0, 10),
        minBudget: plan.minBudget || "",
        maxBudget: plan.maxBudget || "",
        travelType: plan.travelType,
        description: plan.description || "",
        visibility: plan.visibility,
      });
    } catch (error) {
      setErrMsg("Something went wrong");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPlan();
  }, []);

  // -------------------------------
  // Update handler
  // -------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrMsg("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/travel-plans/${id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        setErrMsg("Failed to update plan");
        setSaving(false);
        return;
      }

      router.push("/user/my-plans"); // redirect back
    } catch (error) {
      setErrMsg("Something went wrong");
    }

    setSaving(false);
  };

  // -------------------------------
  // UI
  // -------------------------------
  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-5 bg-white shadow rounded mt-10">
      <h1 className="text-2xl font-semibold mb-5">Edit Travel Plan</h1>

      {errMsg && <p className="text-red-600 mb-4">{errMsg}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Destination */}
        <div>
          <label className="block">Destination</label>
          <input
            type="text"
            value={formData.destination}
            onChange={(e) =>
              setFormData({ ...formData, destination: e.target.value })
            }
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Dates */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block">Start Date</label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div className="flex-1">
            <label className="block">End Date</label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
              className="w-full border p-2 rounded"
              required
            />
          </div>
        </div>

        {/* Budget */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block">Min Budget</label>
            <input
              type="number"
              value={formData.minBudget}
              onChange={(e) =>
                setFormData({ ...formData, minBudget: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="flex-1">
            <label className="block">Max Budget</label>
            <input
              type="number"
              value={formData.maxBudget}
              onChange={(e) =>
                setFormData({ ...formData, maxBudget: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        {/* Type */}
        <div>
          <label className="block">Travel Type</label>
          <select
            value={formData.travelType}
            onChange={(e) =>
              setFormData({ ...formData, travelType: e.target.value as any })
            }
            className="w-full border p-2 rounded"
          >
            <option value="SOLO">Solo</option>
            <option value="FAMILY">Family</option>
            <option value="FRIENDS">Friends</option>
          </select>
        </div>

        {/* Visibility */}
        <div>
          <label className="block">Visibility</label>
          <select
            value={formData.visibility}
            onChange={(e) =>
              setFormData({ ...formData, visibility: e.target.value as any })
            }
            className="w-full border p-2 rounded"
          >
            <option value="PUBLIC">Public</option>
            <option value="PRIVATE">Private</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full border p-2 rounded"
            rows={4}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
