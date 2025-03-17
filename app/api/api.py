from fastapi import APIRouter

from app.api.endpoints import auth, transactions, purchase

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(transactions.router, prefix="/transactions", tags=["transactions"])
api_router.include_router(purchase.router, prefix="/purchase", tags=["purchase"])
