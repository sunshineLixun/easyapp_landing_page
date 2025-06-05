export const prerender = false;
import { loadStripe } from '@stripe/stripe-js';

// 你的 Stripe 公钥（在生产环境中应该从环境变量获取）
const stripePromise = loadStripe(import.meta.env.PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_stripe_key_here');

// 产品价格 ID（在 Stripe Dashboard 中创建产品后获得）
console.log('111', import.meta.env.STRIPE_PRICE_PRO)
export const STRIPE_PRICES = {
  pro: import.meta.env.STRIPE_PRICE_PRO, // 替换为你的实际价格 ID
};

export default stripePromise;

// 帮助函数：验证 Stripe 配置
export function validateStripeConfig() {
  const hasPublishableKey = !!import.meta.env.PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const hasSecretKey = !!import.meta.env.STRIPE_SECRET_KEY;
  
  if (!hasPublishableKey) {
    console.warn('⚠️  Missing PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable');
  }
  
  if (!hasSecretKey) {
    console.warn('⚠️  Missing STRIPE_SECRET_KEY environment variable');
  }

  if (!STRIPE_PRICES.pro) {
    console.warn('⚠️  Missing STRIPE_PRICE_PRO environment variable');
  }

  return hasPublishableKey && hasSecretKey && STRIPE_PRICES.pro;
} 