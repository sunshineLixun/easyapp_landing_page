import type { APIRoute } from 'astro';
import type Stripe from 'stripe';
import { getStripeClient } from '../../utils/stripe';

export const GET: APIRoute = async () => {
  try {
    const stripe = getStripeClient();

    // 获取所有产品
    const products = await stripe.products.list({
      active: true,
      expand: ['data.default_price'],
    });

    // 格式化产品数据
    const formattedProducts = products.data.map(product => {
      const price = product.default_price as Stripe.Price;
      return {
        name: product.name,
        price: price.unit_amount ? `$${(price.unit_amount / 100).toFixed(2)}/mo` : 'Custom',
        description: product.description || '',
        priceId: price.id,
      };
    });

    return new Response(
      JSON.stringify(formattedProducts),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch products';
    
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