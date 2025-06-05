import { useState } from "react";
import { Button } from "./button";
import { createCheckoutSession, type PaymentData } from "@/lib/payment";

interface PaymentButtonProps {
  planName: string;
  planPrice: string;
  priceId?: string;
  className?: string;
}

export default function PaymentButton({
  planName,
  planPrice,
  priceId,
  className,
}: PaymentButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const paymentData: PaymentData = {
        planName,
        planPrice,
        priceId,
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
    return "Get EasyApp";
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
