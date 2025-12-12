"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(true);
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      verifySession();
    }
  }, [sessionId]);

  const verifySession = async () => {
    try {
      const response = await fetch(
        `/api/payments/verify-session?session_id=${sessionId}`,
        {
          credentials: "include",
        }
      );
      await response.json();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsVerifying(false);
    }
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md w-full text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-8">
          Your subscription is now active and you've received your verified
          badge ✓
        </p>
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700"
          onClick={() => router.push("/user/my-plans")}
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
}
