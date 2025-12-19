"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { api } from "@/lib/api";

export default function Search() {
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [interests, setInterests] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (destination) params.set("destination", destination);
      if (startDate) params.set("startDate", startDate);
      if (endDate) params.set("endDate", endDate);
      if (interests) params.set("interests", interests);

      const res = await api(`/travel-plans/public?${params.toString()}`);
      setResults(res.data);
    } catch (err: any) {
      toast.error(err.message || "Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Find Your Travel Buddy
      </h1>

      <form
        onSubmit={handleSearch}
        className="border p-4 rounded-lg mb-6 space-y-4"
      >
        <input
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Destination"
          className="border p-2 w-full"
        />
        <div className="flex gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 w-full"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <input
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          placeholder="Interests (comma separated)"
          className="border p-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {results.length > 0 && (
        <div className="space-y-4">
          {results.map((plan) => (
            <div key={plan.id} className="border p-4 rounded">
              <h3 className="font-bold">
                {plan.destination}
                {plan.city ? ` - ${plan.city}` : ""}
              </h3>
              <p className="text-sm">
                {new Date(plan.startDate).toLocaleDateString()} -{" "}
                {new Date(plan.endDate).toLocaleDateString()}
              </p>
              <p className="mt-2">{plan.description}</p>
              <p className="mt-2 text-sm text-gray-600">
                Host: {plan.owner.fullName}
              </p>
              <Link
                href={`/profile/${plan.owner.id}`}
                className="text-blue-600 underline text-sm"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
