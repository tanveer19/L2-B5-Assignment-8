"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface TravelPlan {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  minBudget?: number;
  maxBudget?: number;
  travelType: "SOLO" | "FAMILY" | "FRIENDS";
  description?: string;
  visibility: "PUBLIC" | "PRIVATE";
}

export default function MyTravelPlansPage() {
  const [plans, setPlans] = useState<TravelPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  const fetchPlans = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/travel-plans/me`,
        {
          credentials: "include",
        }
      );

      if (!res.ok) {
        setErrMsg("Failed to load travel plans");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setPlans(data?.data || []);
    } catch (error) {
      setErrMsg("Something went wrong");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">My Travel Plans</h1>
        <Link
          href="/user/add-plan"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add New Plan
        </Link>
      </div>

      {errMsg && <p className="text-red-600 mb-4">{errMsg}</p>}

      {plans.length === 0 ? (
        <p className="text-gray-700">You have no travel plans yet.</p>
      ) : (
        <div className="space-y-5">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="border rounded p-5 shadow-sm bg-white"
            >
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold">{plan.destination}</h2>

                {/* Edit Button */}
                {/* <Link
                  href={`/user/my-plans/${plan.id}/edit`}
                  className="text-blue-600 underline"
                >
                  Edit
                </Link> */}
              </div>

              <p className="text-sm text-gray-600">
                {plan.startDate} → {plan.endDate}
              </p>

              {plan.minBudget !== undefined && (
                <p>
                  <b>Budget:</b> {plan.minBudget}–{plan.maxBudget} BDT
                </p>
              )}

              <p>
                <b>Type:</b> {plan.travelType}
              </p>

              <p className="mt-1">
                <b>Visibility:</b> {plan.visibility}
              </p>

              {plan.description && (
                <p className="mt-2 text-gray-700">{plan.description}</p>
              )}

              {/* View Public Page */}
              <Link
                href={`/user/travel-plans/${plan.id}`}
                className="mt-3 inline-block text-green-600 underline"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
