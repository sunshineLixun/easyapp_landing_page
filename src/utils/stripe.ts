import Stripe from 'stripe';

export function getStripeClient(): Stripe {
  const stripeSecretKey = import.meta.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    throw new Error('Stripe secret key not configured');
  }

  return new Stripe(stripeSecretKey, {
    apiVersion: '2025-05-28.basil',
  });
} 