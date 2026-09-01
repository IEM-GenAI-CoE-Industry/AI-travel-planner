from fastapi import FastAPI
from stripe_service import stripe

app = FastAPI()


@app.get("/")
def home():
    return {"message": "Backend is running"}


@app.get("/stripe-test")
def stripe_test():
    account = stripe.Account.retrieve("self")

    return {
        "stripe_connected": True,
        "account_id": account.id
    }


@app.post("/create-checkout-session")
def create_checkout_session():
    session = stripe.checkout.Session.create(
        mode="payment",
        line_items=[
            {
                "price_data": {
                    "currency": "usd",
                    "product_data": {
                        "name": "Travel Booking"
                    },
                    "unit_amount": 10000,
                },
                "quantity": 1,
            }
        ],
        success_url="http://localhost:3000/success",
        cancel_url="http://localhost:3000/cancel",
    )

    return {
        "checkout_url": session.url
    }


@app.post("/create-connected-account")
def create_connected_account():
    account = stripe.Account.create(
        type="express",
        country="IN",
        capabilities={
            "card_payments": {"requested": True},
            "transfers": {"requested": True},
        },
    )

    return {
        "connected_account_id": account.id
    }
