import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req) {
  try {
    const apiKey = process.env.STRIPE_SECRET_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'STRIPE_SECRET_KEY is missing in Vercel Environment Variables.' },
        { status: 500 }
      );
    }

    const stripe = new Stripe(apiKey);
    const { planType, customerEmail } = await req.json();

    const isEnterprise = planType?.includes('Enterprise');
    const unitAmount = isEnterprise ? 9900 : 1900;
    const planName = planType || 'Professional Tier';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: customerEmail || undefined,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Global Enterprise Data Sanitizer - ${planName}`,
              description: 'Zero-Trust In-Memory PII Masking Subscription',
            },
            unit_amount: unitAmount,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${req.headers.get('origin') || 'https://global-data-sanitizer.vercel.app'}/?success=true`,
      cancel_url: `${req.headers.get('origin') || 'https://global-data-sanitizer.vercel.app'}/?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe Checkout Route Error:', error);
    return NextResponse.json(
      { error: error.message || 'Stripe connection failed.' },
      { status: 500 }
    );
  }
}
