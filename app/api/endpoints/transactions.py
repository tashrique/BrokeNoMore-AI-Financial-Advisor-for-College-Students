from fastapi import APIRouter, UploadFile, File

router = APIRouter()


@router.post("/upload")
async def upload_bank_statement(file: UploadFile = File(...)):
    """Upload and process a bank statement"""
    return {"message": f"Received file {file.filename} - processing to be implemented"}


@router.get("/analyze")
async def analyze_transactions():
    """Retrieve categorized spending insights"""
    return {"message": "Transaction analysis endpoint - to be implemented"}


@router.get("/academic-cycle")
async def get_academic_cycle_analysis():
    """View spending patterns by academic term"""
    return {"message": "Academic cycle analysis endpoint - to be implemented"}
