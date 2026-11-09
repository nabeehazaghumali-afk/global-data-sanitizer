import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Real Stripe Instance connected directly to your Vercel Environment Variable
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { planType, customerEmail } = body;

    // Real Stripe Checkout Session Creation
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: customerEmail || undefined,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: planType,
              description: 'Global Data Sanitization & Enterprise Compliance Subscription',
            },
            unit_amount: 1900, // $19.00 USD
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${request.headers.get('origin')}?success=true`,
      cancel_url: `${request.headers.get('origin')}?canceled=true`,
    });

    // Send real checkout URL back to client
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe Checkout Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
