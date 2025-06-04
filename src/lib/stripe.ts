import { loadStripe } from '@stripe/stripe-js';

// 你的 Stripe 公钥（在生产环境中应该从环境变量获取）
const stripePromise = loadStripe(import.meta.env.PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_stripe_key_here');

// 产品价格 ID（在 Stripe Dashboard 中创建产品后获得）
export const STRIPE_PRICES = {
  starter: '', // 免费计划，通常不需要 Stripe
  pro: import.meta.env.STRIPE_PRICE_PRO || 'price_pro_monthly_id_here', // 替换为你的实际价格 ID
  enterprise: import.meta.env.STRIPE_PRICE_ENTERPRISE || 'price_enterprise_custom_id_here' // 企业版可能需要自定义处理
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
  
  return hasPublishableKey && hasSecretKey;
} 