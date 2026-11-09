import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with your secret key (or test key)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy_key_for_testing');

export async function POST(request) {
  try {
    const body = await request.json();
    const { planType, customerEmail } = body;

    // Agar live Stripe key nahi dali hui, toh testing ke liye mock URL bhej dein taake error na aaye
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ 
        url: `https://checkout.stripe.com/pay/mock_session_${encodeURIComponent(planType)}?email=${encodeURIComponent(customerEmail)}` 
      });
    }

    // Real Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: customerEmail,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: { name: planType },
            unit_amount: 1900, // $19.00
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
