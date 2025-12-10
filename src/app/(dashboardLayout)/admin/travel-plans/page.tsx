"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface TravelPlan {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  visibility: "PUBLIC" | "PRIVATE";
  owner: { fullName: string };
}

export default function AdminTravelPlansPage() {
  const [plans, setPlans] = useState<TravelPlan[]>([]);

  useEffect(() => {
    fetchPlans();
  }, []);

  async function fetchPlans() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/admin/travel-plans`,
      {
        credentials: "include",
      }
    );
    if (res.ok) {
      const data = await res.json();
      setPlans(data.data);
    } else {
      toast.error("Failed to load travel plans.");
    }
  }

  async function deletePlan(id: string) {
    const confirm = window.confirm(
      "Are you sure you want to delete this travel plan?"
    );
    if (!confirm) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/travel-plans/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (res.ok) {
        toast.success("Travel plan deleted!");
        setPlans(plans.filter((p) => p.id !== id));
      } else {
        toast.error("Failed to delete plan.");
      }
    } catch (err) {
      toast.error("Something went wrong while deleting.");
    }
  }

  async function togglePlan(id: string, visibility: "PUBLIC" | "PRIVATE") {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/admin/travel-plans/${id}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visibility }),
      }
    );

    if (res.ok) {
      toast.success(
        `Plan ${visibility === "PUBLIC" ? "approved" : "blocked"}!`
      );
      setPlans(plans.map((p) => (p.id === id ? { ...p, visibility } : p)));
    } else {
      toast.error("Failed to update plan.");
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Manage Travel Plans</h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Destination</th>
            <th className="p-3 border">Owner</th>
            <th className="p-3 border">Dates</th>
            <th className="p-3 border">Visibility</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {plans.length === 0 && (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-500">
                No travel plans found
              </td>
            </tr>
          )}

          {plans.map((plan) => (
            <tr key={plan.id} className="border">
              <td className="p-3 border">{plan.destination}</td>
              <td className="p-3 border">{plan.owner.fullName}</td>
              <td className="p-3 border">
                {new Date(plan.startDate).toLocaleDateString()} -{" "}
                {new Date(plan.endDate).toLocaleDateString()}
              </td>
              <td className="p-3 border">{plan.visibility}</td>
              <td className="p-3 border flex gap-2">
                <button
                  onClick={() => deletePlan(plan.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>

                <button
                  onClick={() =>
                    togglePlan(
                      plan.id,
                      plan.visibility === "PUBLIC" ? "PRIVATE" : "PUBLIC"
                    )
                  }
                  className={`px-3 py-1 rounded ${
                    plan.visibility === "PUBLIC"
                      ? "bg-yellow-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {plan.visibility === "PUBLIC" ? "Block" : "Approve"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
