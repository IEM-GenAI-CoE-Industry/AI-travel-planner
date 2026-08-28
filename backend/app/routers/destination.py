from fastapi import APIRouter
from app.data.mock_data import DESTINATIONS_DATA

router = APIRouter(prefix="/api/destinations", tags=["Destinations"])

@router.get("")
@router.get("/")
async def get_destinations():
    return DESTINATIONS_DATA
