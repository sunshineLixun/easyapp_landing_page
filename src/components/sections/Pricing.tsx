import { useEffect, useState } from 'react';
import PaymentButton from "@/components/ui/PaymentButton";

interface Plan {
  name: string;
  price: string;
  description: string;
  priceId: string;
}

// 默认计划数据
const defaultPlans: Plan[] = [
];

export default function Pricing() {
  const [plans, setPlans] = useState<Plan[]>(defaultPlans);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('/api/get-products');
        if (!response.ok) {
          throw new Error('Failed to fetch plans');
        }
        const data = await response.json();
        setPlans(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch plans');
        console.error('Error fetching plans:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return (
      <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12">
            Simple, Transparent Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {defaultPlans.map((plan) => (
              <div key={plan.priceId} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg animate-pulse">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12">
            Simple, Transparent Pricing
          </h2>
          <div className="text-center text-red-500">
            {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <h2 className="text-4xl font-bold text-center mb-12">
          Simple, Transparent Pricing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.priceId} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-3xl font-bold mb-4">{plan.price}</p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {plan.description}
              </p>
              <PaymentButton
                planName={plan.name}
                planPrice={plan.price}
                priceId={plan.priceId}
                className="cursor-pointer w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 