from fastapi import APIRouter

from app.api.endpoints import auth, transactions, purchase

# Create API router
api_router = APIRouter()

# Include endpoint routers
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(transactions.router, prefix="/transactions", tags=["transactions"])
api_router.include_router(purchase.router, prefix="/purchase", tags=["purchase"])