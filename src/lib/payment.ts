export const prerender = false;
import stripePromise, { STRIPE_PRICES } from './stripe';

export interface PaymentData {
  planName: string;
  planPrice: string;
  priceId?: string;
}

export async function createCheckoutSession(paymentData: PaymentData) {
  try {
    // 获取对应计划的价格 ID
    const priceId = getPriceId();
    console.log('priceId', priceId)
    if (!priceId) {
      throw new Error(`No price ID found for plan: ${paymentData.planName}`);
    }

    // 调用你的后端 API 创建 Checkout Session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        planName: paymentData.planName,
        successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/pricing`,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const { sessionId } = await response.json();
    
    // 重定向到 Stripe Checkout
    const stripe = await stripePromise;
    if (stripe) {
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        console.error('Stripe redirect error:', error);
        throw error;
      }
    }
  } catch (error) {
    console.error('Payment error:', error);
    throw error;
  }
}

function getPriceId(): string | null {
  console.log(STRIPE_PRICES.pro)
  return STRIPE_PRICES.pro
}

// 用于处理一次性支付（如果不需要订阅）
export async function createOneTimePayment(paymentData: PaymentData) {
  try {
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: getAmountFromPrice(paymentData.planPrice),
        currency: 'usd',
        planName: paymentData.planName,
      }),
    });

    const { clientSecret } = await response.json();
    return clientSecret;
  } catch (error) {
    console.error('One-time payment error:', error);
    throw error;
  }
}

function getAmountFromPrice(price: string): number {
  // 从价格字符串中提取数字（例如 "$49/mo" -> 49）
  const match = price.match(/\$(\d+)/);
  return match ? parseInt(match[1]) * 100 : 0; // Stripe 使用分作为单位
} 