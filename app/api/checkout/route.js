import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req) {
  try {
    const rawKey = process.env.STRIPE_SECRET_KEY || '';
    const apiKey = rawKey.trim().replace(/^["']|["']$/g, '');

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
    const isTrial = planType?.includes('Trial');

    const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'https://global-data-sanitizer.vercel.app';

    const sessionData = {
      payment_method_types: ['card'],
      customer_email: customerEmail || undefined,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Global Enterprise Data Sanitizer - ${planType || 'Professional Tier'}`,
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
      success_url: `${origin}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
    };

    if (isTrial) {
      sessionData.subscription_data = {
        trial_period_days: 10,
      };
    }

    const session = await stripe.checkout.sessions.create(sessionData);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe Checkout Route Error:', error);
    return NextResponse.json(
      { error: error.message || 'Stripe connection failed.' },
      { status: 500 }
    );
  }
}
