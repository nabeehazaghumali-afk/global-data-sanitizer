import os
import stripe
from fastapi import APIRouter, HTTPException, Request, Header, status
from pydantic import BaseModel

router = APIRouter(prefix="/v1/payments", tags=["Payments"])

# Set live or test Stripe API key from environment variables
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
ENDPOINT_SECRET = os.getenv("STRIPE_WEBHOOK_SECRET")

class CheckoutSessionRequest(BaseModel):
    price_id: str  # Stripe Price ID (e.g., price_1N...)
    customer_email: str
    success_url: str
    cancel_url: str

@router.post("/create-checkout-session")
def create_checkout_session(payload: CheckoutSessionRequest):
    """Creates a real Stripe Checkout Session for subscription plans."""
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            mode="subscription",
            customer_email=payload.customer_email,
            line_items=[{
                "price": payload.price_id,
                "quantity": 1,
            }],
            success_url=payload.success_url,
            cancel_url=payload.cancel_url,
        )
        return {"status": "SUCCESS", "checkout_url": session.url, "session_id": session.id}
    except stripe.error.StripeError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/webhook")
async def stripe_webhook(request: Request, stripe_signature: str = Header(None)):
    """Handles signed event webhooks from Stripe to activate enterprise access."""
    payload = await request.body()
    
    try:
        event = stripe.Webhook.construct_event(
            payload, stripe_signature, ENDPOINT_SECRET
        )
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid payload")
    except stripe.error.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid signature")

    # Handle subscription events from live Stripe server
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']
        customer_email = session.get("customer_email")
        print(f"Subscription successfully activated for: {customer_email}")
        
    elif event['type'] == 'customer.subscription.deleted':
        session = event['data']['object']
        print(f"Subscription canceled for customer.")

    return {"status": "SUCCESS"}
