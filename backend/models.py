from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.orm import declarative_base
from datetime import datetime

Base = declarative_base()


class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)
    hotel_name = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    stripe_session_id = Column(String, nullable=True)
    payment_status = Column(String, default="pending")
    created_at = Column(DateTime, default=datetime.utcnow)