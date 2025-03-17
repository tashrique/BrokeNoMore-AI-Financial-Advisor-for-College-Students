from fastapi import APIRouter, Body
from pydantic import BaseModel, HttpUrl

router = APIRouter()


class ProductEvaluation(BaseModel):
    product_url: HttpUrl
    price: float = None
    category: str = None
    urgency: int = None  # 1-10 scale


class PurchaseFeedback(BaseModel):
    evaluation_id: str
    followed_advice: bool
    actual_decision: str
    satisfaction: int  # 1-5 scale


@router.post("/evaluate")
async def evaluate_purchase(product: ProductEvaluation):
    """Analyze a product link and return a spending decision"""
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
async def purchase_feedback(feedback: PurchaseFeedback):
    """User feedback on purchase decision"""
    return {"message": "Feedback received, thank you for helping improve our recommendations"}
