import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(request) {
  try {
    const body = await request.json();
    const { planType, customerEmail } = body;

    const apiKey = process.env.STRIPE_SECRET_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ error: 'STRIPE_SECRET_KEY is missing in Vercel Environment Variables' }, { status: 400 });
    }

    const stripe = new Stripe(apiKey.trim(), {
      apiVersion: '2023-10-16',
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: customerEmail || undefined,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { 
              name: planType || 'Professional Tier',
              description: 'Global Data Sanitization & Compliance Plan'
            },
            unit_amount: 1900,
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${request.headers.get('origin')}?success=true`,
      cancel_url: `${request.headers.get('origin')}?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```[cite: 4]
