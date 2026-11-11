import os
import httpx
from fastapi import APIRouter, HTTPException, Request, Header
from pydantic import BaseModel

router = APIRouter(prefix="/v1/payments", tags=["Payments"])

LEMON_SQUEEZY_API_KEY = os.getenv("LEMON_SQUEEZY_API_KEY")
STORE_ID = os.getenv("LEMON_SQUEEZY_STORE_ID")

class CheckoutSessionRequest(BaseModel):
    variant_id: str  # Lemon Squeezy Variant ID
    customer_email: str
    success_url: str
    cancel_url: str

@router.post("/create-checkout-session")
async def create_checkout_session(payload: CheckoutSessionRequest):
    """Creates a Lemon Squeezy Checkout for subscription plans."""
    url = "https://api.lemonsqueezy.com/v1/checkouts"
    headers = {
        "Authorization": f"Bearer {LEMON_SQUEEZY_API_KEY}",
        "Content-Type": "application/vnd.api+json",
        "Accept": "application/vnd.api+json"
    }
    
    body = {
        "data": {
            "type": "checkouts",
            "attributes": {
                "checkout_data": {
                    "email": payload.customer_email,
                },
                "product_options": {
                    "redirect_url": payload.success_url
                }
            },
            "relationships": {
                "store": {
                    "data": {
                        "type": "stores",
                        "id": str(STORE_ID)
                    }
                },
                "variant": {
                    "data": {
                        "type": "variants",
                        "id": str(payload.variant_id)
                    }
                }
            }
        }
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(url, json=body, headers=headers)
        if response.status_code != 201:
            raise HTTPException(status_code=400, detail=response.text)
        
        data = response.json()
        checkout_url = data["data"]["attributes"]["url"]
        return {"status": "SUCCESS", "checkout_url": checkout_url}

@router.post("/webhook")
async def lemonsqueezy_webhook(request: Request):
    """Handles webhook events from Lemon Squeezy."""
    payload = await request.json()
    event_name = payload.get("meta", {}).get("event_name")
    
    if event_name == "subscription_created":
        print("Subscription successfully created!")
    elif event_name == "subscription_cancelled":
        print("Subscription canceled for customer.")

    return {"status": "SUCCESS"}
