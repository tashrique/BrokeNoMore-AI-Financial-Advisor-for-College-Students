from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, DateTime, Text, JSON
from sqlalchemy.orm import relationship
from datetime import datetime

from app.db.base import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    google_id = Column(String, unique=True, index=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    transactions = relationship("Transaction", back_populates="user")
    purchase_evaluations = relationship("PurchaseEvaluation", back_populates="user")
    financial_profile = relationship("FinancialProfile", back_populates="user", uselist=False)


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    date = Column(DateTime)
    amount = Column(Float)
    description = Column(String)
    category = Column(String)
    subcategory = Column(String, nullable=True)
    is_income = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="transactions")


class PurchaseEvaluation(Base):
    __tablename__ = "purchase_evaluations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    product_url = Column(String)
    product_name = Column(String, nullable=True)
    price = Column(Float)
    category = Column(String, nullable=True)
    recommendation = Column(String)  # buy, wait, avoid, alternative
    reasoning = Column(Text)
    questions = Column(JSON, nullable=True)
    user_responses = Column(JSON, nullable=True)
    followed_advice = Column(Boolean, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="purchase_evaluations")


class FinancialProfile(Base):
    __tablename__ = "financial_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True)
    monthly_income = Column(Float, nullable=True)
    monthly_expenses = Column(Float, nullable=True)
    savings = Column(Float, nullable=True)
    financial_health_score = Column(Integer, nullable=True)  # 0-100
    spending_patterns = Column(JSON, nullable=True)
    academic_term = Column(String, nullable=True)  # Fall, Spring, Summer
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="financial_profile")
