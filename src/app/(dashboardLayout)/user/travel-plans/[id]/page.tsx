"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function TravelPlanDetailsPage() {
  const { id } = useParams();
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  const fetchPlan = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/travel-plans/${id}`,
        {
          credentials: "include",
        }
      );

      if (!res.ok) {
        setErrMsg("Failed to load travel plan details");
        setLoading(false);
        return;
      }

      const json = await res.json();
      setPlan(json.data);
    } catch (err) {
      setErrMsg("Something went wrong");
    }

    setLoading(false);
  };

  useEffect(() => {
    if (id) fetchPlan();
  }, [id]);

  if (loading) return <p className="mt-10 text-center">Loading...</p>;
  if (errMsg) return <p className="text-red-600 text-center mt-10">{errMsg}</p>;
  if (!plan) return <p className="mt-10 text-center">No plan found</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">{plan.destination}</h1>

      <p className="text-gray-600 mb-1">
        <b>Dates:</b> {plan.startDate} → {plan.endDate}
      </p>

      {plan.minBudget !== undefined && (
        <p className="mb-1">
          <b>Budget:</b> {plan.minBudget} – {plan.maxBudget} BDT
        </p>
      )}

      <p className="mb-1">
        <b>Type:</b> {plan.travelType}
      </p>

      <p className="mb-1">
        <b>Visibility:</b> {plan.visibility}
      </p>

      {plan.description && (
        <p className="mt-4 text-gray-700">{plan.description}</p>
      )}
    </div>
  );
}
