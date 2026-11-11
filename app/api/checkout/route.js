import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function readLemonApiKey() {
  return (process.env.LEMON_SQUEEZY_API_KEY || '')
    .replace(/^\uFEFF/, '')
    .trim()
    .replace(/^['"]+|['"]+$/g, '')
    .replace(/\s+/g, '');
}

function appOrigin(request) {
  const headerOrigin = request.headers.get('origin');
  const configured = (process.env.NEXT_PUBLIC_APP_URL || '').trim();
  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  const raw = headerOrigin || configured || (vercelHost ? `https://${vercelHost}` : '');
  const origin = raw.trim().replace(/\/+$/, '');
  if (!/^https?:\/\//i.test(origin)) return '';
  return origin;
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const planType =
      typeof body.planType === 'string' && body.planType.trim()
        ? body.planType.trim()
        : 'Professional Tier';
    const customerEmail =
      typeof body.customerEmail === 'string' ? body.customerEmail.trim() : '';

    const apiKey = readLemonApiKey();
    const storeId = process.env.LEMON_SQUEEZY_STORE_ID;
    
    if (!apiKey || !storeId) {
      return NextResponse.json(
        { error: 'Lemon Squeezy API Key or Store ID is missing in environment variables.' },
        { status: 500 }
      );
    }

    const origin = appOrigin(request);
    if (!origin) {
      return NextResponse.json(
        { error: 'Checkout redirect URL is missing. Set NEXT_PUBLIC_APP_URL.' },
        { status: 500 }
      );
    }

    // Map your plans to Lemon Squeezy Variant IDs (replace with your actual variant IDs from dashboard)
    const isEnterprise = planType.includes('Enterprise');
    const variantId = isEnterprise 
      ? process.env.LEMON_SQUEEZY_ENTERPRISE_VARIANT_ID 
      : process.env.LEMON_SQUEEZY_PRO_VARIANT_ID;

    const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json',
      },
      body: JSON.stringify({
        data: {
          type: 'checkouts',
          attributes: {
            checkout_data: {
              email: customerEmail || undefined,
            },
            product_options: {
              redirect_url: `${origin}/?success=true`,
            },
          },
          relationships: {
            store: {
              data: { type: 'stores', id: String(storeId) },
            },
            variant: {
              data: { type: 'variants', id: String(variantId) },
            },
          },
        },
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.errors?.[0]?.detail || 'Lemon Squeezy checkout failed');
    }

    const checkoutUrl = data.data?.attributes?.url;
    if (!checkoutUrl) {
      return NextResponse.json({ error: 'Lemon Squeezy did not return a checkout URL.' }, { status: 500 });
    }

    return NextResponse.json({ url: checkoutUrl });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Checkout failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
