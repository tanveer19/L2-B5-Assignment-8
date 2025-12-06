"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTravelPlanPage() {
  const router = useRouter();

  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [travelType, setTravelType] = useState("Solo");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrMsg("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/travel-plans`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destination,
          startDate,
          endDate,
          minBudget: Number(budgetMin) || undefined,
          maxBudget: Number(budgetMax) || undefined,
          travelType: travelType.toUpperCase(), // SOLO, FAMILY, FRIENDS
          description,
          visibility: "PUBLIC",
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        setErrMsg(error?.message || "Failed to create travel plan");
        setLoading(false);
        return;
      }

      router.push("/user/my-plans");
      router.refresh();
    } catch (error) {
      setErrMsg("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-5">Create Travel Plan</h1>

      {errMsg && <p className="text-red-600 mb-3">{errMsg}</p>}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1">Destination</label>
          <input
            type="text"
            placeholder="e.g. Paris, France"
            className="border p-2 w-full rounded"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Start Date</label>
            <input
              type="date"
              className="border p-2 w-full rounded"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1">End Date</label>
            <input
              type="date"
              className="border p-2 w-full rounded"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Budget Min</label>
            <input
              type="number"
              className="border p-2 w-full rounded"
              value={budgetMin}
              onChange={(e) => setBudgetMin(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-1">Budget Max</label>
            <input
              type="number"
              className="border p-2 w-full rounded"
              value={budgetMax}
              onChange={(e) => setBudgetMax(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-1">Travel Type</label>
          <select
            className="border p-2 w-full rounded"
            value={travelType}
            onChange={(e) => setTravelType(e.target.value)}
          >
            <option value="Solo">Solo</option>
            <option value="Family">Family</option>
            <option value="Friends">Friends</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            className="border p-2 w-full rounded"
            rows={4}
            placeholder="Short itinerary, expectations..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <button
          disabled={loading}
          className="bg-green-600 text-white py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Plan"}
        </button>
      </form>
    </div>
  );
}
