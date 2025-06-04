import React, { useState } from "react";
import { Button } from "./button";
import { createCheckoutSession, type PaymentData } from "@/lib/payment";

interface PaymentButtonProps {
  planName: string;
  planPrice: string;
  className?: string;
}

export default function PaymentButton({
  planName,
  planPrice,
  className,
}: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    // 免费计划不需要支付
    if (
      planName.toLowerCase() === "starter" ||
      planPrice.toLowerCase() === "free"
    ) {
      // 这里可以处理免费计划的注册逻辑
      window.location.href = "/signup?plan=starter";
      return;
    }

    // 企业版需要联系销售
    if (planName.toLowerCase() === "enterprise") {
      // 重定向到联系销售页面
      window.location.href = "/contact?plan=enterprise";
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const paymentData: PaymentData = {
        planName,
        planPrice,
      };

      await createCheckoutSession(paymentData);
    } catch (err) {
      console.error("Payment failed:", err);
      setError(
        err instanceof Error ? err.message : "Payment failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonText = () => {
    if (isLoading) return "Processing...";

    switch (planName.toLowerCase()) {
      case "starter":
        return "Get Started Free";
      case "enterprise":
        return "Contact Sales";
      default:
        return "Subscribe Now";
    }
  };

  return (
    <div className="w-full">
      <Button
        onClick={handlePayment}
        className={className}
        disabled={isLoading}
      >
        {getButtonText()}
      </Button>
      {error && (
        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
      )}
    </div>
  );
}
