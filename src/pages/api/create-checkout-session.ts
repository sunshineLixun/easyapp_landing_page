export const prerender = false;

import type { APIRoute } from 'astro';
import type Stripe from 'stripe';
import { getStripeClient } from '../../utils/stripe';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { priceId, planName, successUrl, cancelUrl } = await request.json();

    // 验证必需的环境变量
    const stripeSecretKey = import.meta.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      throw new Error('Stripe secret key not configured');
    }

    // 验证输入
    if (!priceId || !planName || !successUrl || !cancelUrl) {
      throw new Error('Missing required parameters');
    }

    // 初始化 Stripe
    const stripe = getStripeClient();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment', // 或 'payment' 用于一次性付款
      success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
      metadata: {
        planName: planName,
      },
      // 可选：收集用户信息
      customer_email: undefined, // 如果你有用户邮箱可以传入
      // 可选：允许促销代码
      allow_promotion_codes: false,
      // 可选：自动税收计算
      automatic_tax: { enabled: true },
    });

    return new Response(
      JSON.stringify({ sessionId: session.id }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error creating checkout session:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Failed to create checkout session';
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error : undefined 
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}; 