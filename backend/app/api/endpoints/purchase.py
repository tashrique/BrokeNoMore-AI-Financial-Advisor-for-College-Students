from fastapi import APIRouter, Body, Depends, HTTPException, status
from pydantic import BaseModel, HttpUrl
from typing import List, Optional
from sqlalchemy.orm import Session

from app.api.deps import get_current_active_user
from app.db import get_db
from app.db.models import User

router = APIRouter()

class ProductEvaluation(BaseModel):
    product_url: HttpUrl
    price: Optional[float] = None
    category: Optional[str] = None
    urgency: Optional[int] = None  # 1-10 scale

class PurchaseFeedback(BaseModel):
    evaluation_id: str
    followed_advice: bool
    actual_decision: str
    satisfaction: int  # 1-5 scale

@router.post("/evaluate")
async def evaluate_purchase(
    product: ProductEvaluation,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Analyze a product link and return a spending decision (placeholder)"""
    return {
        "evaluation_id": "sample-id",
        "recommendation": "wait",
        "reasoning": "This appears to be a non-essential purchase and your current balance is low.",
        "questions": [
            "Is this item required for a class?",
            "Do you need this immediately or can it wait until next month?"
        ]
    }

@router.post("/feedback")
async def purchase_feedback(
    feedback: PurchaseFeedback,
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """User feedback on purchase decision (placeholder)"""
    return {"message": "Feedback received, thank you for helping improve our recommendations"} 