"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Loader2 } from "lucide-react";

export default function PricingPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null);
  console.log(process.env.NEXT_PUBLIC_API);
  const handleSubscribe = async (plan: "MONTHLY" | "YEARLY") => {
    setIsLoading(plan);

    try {
      const response = await fetch("/api/payments/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
        credentials: "include",
      });

      const data = await response.json();

      if (data.success && data.data.url) {
        window.location.href = data.data.url;
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600">
            Unlock premium features and get verified badge
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-4">Free</h3>
            <p className="text-4xl font-bold mb-6">
              $0<span className="text-lg text-gray-600">/month</span>
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Basic travel plans</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Limited matches</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>View profiles</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full" disabled>
              Current Plan
            </Button>
          </div>

          {/* Monthly Plan */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-4 border-blue-500 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold mb-4">Monthly</h3>
            <p className="text-4xl font-bold mb-6">
              $9.99<span className="text-lg text-gray-600">/month</span>
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Unlimited travel plans</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Priority matching</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Verified badge ✓</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Advanced filters</span>
              </li>
            </ul>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => handleSubscribe("MONTHLY")}
              disabled={isLoading !== null}
            >
              {isLoading === "MONTHLY" ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Subscribe Monthly"
              )}
            </Button>
          </div>

          {/* Yearly Plan */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
              Save 17%
            </div>
            <h3 className="text-2xl font-bold mb-4">Yearly</h3>
            <p className="text-4xl font-bold mb-6">
              $99.99<span className="text-lg text-gray-600">/year</span>
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Everything in Monthly</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>2 months free</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>Priority support</span>
              </li>
            </ul>
            <Button
              className="w-full"
              onClick={() => handleSubscribe("YEARLY")}
              disabled={isLoading !== null}
            >
              {isLoading === "YEARLY" ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Subscribe Yearly"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
