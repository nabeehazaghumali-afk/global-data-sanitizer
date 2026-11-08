import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export async function POST(req) {
  try {
    const { planType, customerEmail } = await req.json();

    // Determine price based on selected tier ($19 Professional vs Custom/Enterprise)
    const unitAmount = planType.includes('19') ? 1900 : 9900; // Amount in cents ($19.00)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Global Data Sanitizer - ${planType}`,
              description: 'Enterprise Zero-Trust PII Masking & Compliance Suite',
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
      customer_email: customerEmail || 'client@bank-vault.com',
      success_url: `${req.headers.get('origin')}?payment=success`,
      cancel_url: `${req.headers.get('origin')}?payment=canceled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
