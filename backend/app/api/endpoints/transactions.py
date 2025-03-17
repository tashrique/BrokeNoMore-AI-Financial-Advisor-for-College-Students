from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, status
from typing import List
from sqlalchemy.orm import Session

from app.api.deps import get_current_active_user
from app.db import get_db
from app.db.models import User

router = APIRouter()

@router.post("/upload")
async def upload_bank_statement(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Upload and process a bank statement (placeholder)"""
    return {"message": f"Received file {file.filename} - processing to be implemented"}

@router.get("/analyze")
async def analyze_transactions(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """Retrieve categorized spending insights (placeholder)"""
    return {
        "message": "Transaction analysis endpoint - to be implemented",
        "categories": [
            {"name": "Education", "amount": 0, "percentage": 0},
            {"name": "Housing", "amount": 0, "percentage": 0},
            {"name": "Food", "amount": 0, "percentage": 0},
            {"name": "Entertainment", "amount": 0, "percentage": 0},
            {"name": "Transportation", "amount": 0, "percentage": 0},
        ]
    }

@router.get("/academic-cycle")
async def get_academic_cycle_analysis(
    current_user: User = Depends(get_current_active_user),
    db: Session = Depends(get_db)
):
    """View spending patterns by academic term (placeholder)"""
    return {
        "message": "Academic cycle analysis endpoint - to be implemented",
        "terms": [
            {"name": "Fall 2023", "total_spending": 0, "categories": []},
            {"name": "Spring 2024", "total_spending": 0, "categories": []},
        ]
    }
