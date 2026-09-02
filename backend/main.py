from fastapi import FastAPI
from stripe_service import stripe

from database import engine, SessionLocal
from models import Base, Payment

from pydantic import BaseModel

app = FastAPI()

# Create database tables
Base.metadata.create_all(bind=engine)


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





class PaymentRequest(BaseModel):
    hotel_name: str
    amount: float


@app.post("/create-checkout-session")
def create_checkout_session(payment: PaymentRequest):

    db = SessionLocal()

    try:
        amount_in_cents = int(payment.amount * 100)

        session = stripe.checkout.Session.create(
            mode="payment",
            line_items=[
                {
                    "price_data": {
                        "currency": "usd",
                        "product_data": {
                            "name": payment.hotel_name
                        },
                        "unit_amount": amount_in_cents,
                    },
                    "quantity": 1,
                }
            ],
            success_url="http://localhost:3000/success",
            cancel_url="http://localhost:3000/cancel",
        )

        new_payment = Payment(
            hotel_name=payment.hotel_name,
            amount=payment.amount,
            stripe_session_id=session.id,
            payment_status="pending"
        )

        db.add(new_payment)
        db.commit()

        return {
            "checkout_url": session.url,
            "payment_id": new_payment.id
        }

    finally:
        db.close()


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