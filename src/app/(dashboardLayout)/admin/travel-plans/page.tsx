"use client";

import { useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TravelPlan {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  visibility: "PUBLIC" | "PRIVATE";
  owner: { fullName: string; email?: string };
}

function initials(name?: string) {
  if (!name) return "NA";
  return name
    .split(" ")
    .map((n) => n[0]?.toUpperCase())
    .slice(0, 2)
    .join("");
}

export default function AdminTravelPlansPage() {
  const [plans, setPlans] = useState<TravelPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let mounted = true;
    fetchPlans()
      .catch(() => toast.error("Could not load travel plans"))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
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

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return plans;
    return plans.filter(
      (p) =>
        p.destination.toLowerCase().includes(q) ||
        p.owner?.fullName?.toLowerCase().includes(q) ||
        p.owner?.email?.toLowerCase().includes(q)
    );
  }, [plans, query]);

  async function handleDelete(id: string) {
    const confirmAction = window.confirm(
      "Delete this travel plan? This action cannot be undone."
    );
    if (!confirmAction) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/travel-plans/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (res.ok) {
        setPlans((prev) => prev.filter((p) => p.id !== id));
        toast.success("Travel plan deleted");
      } else {
        toast.error("Failed to delete plan.");
      }
    } catch (err) {
      toast.error("Something went wrong while deleting.");
    }
  }

  async function handleToggle(id: string, current: "PUBLIC" | "PRIVATE") {
    const confirmAction = window.confirm(
      `Are you sure you want to ${current === "PUBLIC" ? "block" : "approve"} this plan?`
    );
    if (!confirmAction) return;

    const newVisibility = current === "PUBLIC" ? "PRIVATE" : "PUBLIC";
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/admin/travel-plans/${id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ visibility: newVisibility }),
        }
      );
      if (res.ok) {
        setPlans((prev) =>
          prev.map((p) =>
            p.id === id ? { ...p, visibility: newVisibility } : p
          )
        );
        toast.success(
          `Plan ${newVisibility === "PUBLIC" ? "approved" : "blocked"}!`
        );
      } else {
        toast.error("Failed to update plan.");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  }

  if (loading)
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-48 bg-gray-200 rounded" />
          <div className="h-10 w-full bg-gray-200 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-12 bg-gray-200 rounded" />
            <div className="h-12 bg-gray-200 rounded" />
            <div className="h-12 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );

  return (
    <div className="p-6">
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Manage Travel Plans</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review and moderate travel plans submitted by users
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by destination or owner"
            className="w-[320px]"
          />
          <Button variant="outline" onClick={() => setQuery("")}>
            Clear
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-md shadow-sm overflow-hidden">
        <div className="w-full overflow-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Destination
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Visibility
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-background divide-y">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No travel plans found
                  </td>
                </tr>
              )}

              {filtered.map((plan) => (
                <tr key={plan.id} className="hover:bg-accent/40 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                      {initials(plan.destination)}
                    </div>
                    <div>
                      <div className="font-medium">{plan.destination}</div>
                      <div className="text-sm text-muted-foreground">
                        {plan.owner.fullName}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                    {plan.owner.email ?? "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {new Date(plan.startDate).toLocaleDateString()} -{" "}
                    {new Date(plan.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        plan.visibility === "PUBLIC"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {plan.visibility === "PUBLIC" ? "Approved" : "Blocked"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex items-center justify-end gap-2">
                    <Button
                      variant={
                        plan.visibility === "PUBLIC"
                          ? "secondary"
                          : "destructive"
                      }
                      size="sm"
                      onClick={() => handleToggle(plan.id, plan.visibility)}
                    >
                      {plan.visibility === "PUBLIC" ? "Block" : "Approve"}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(plan.id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        navigator.clipboard.writeText(plan.owner.email ?? "")
                      }
                    >
                      Copy Owner
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
