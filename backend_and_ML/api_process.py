from fastapi import APIRouter, HTTPException
import httpx
import os

router = APIRouter()

@router.post("/")
async def geocode_location(payload: dict):
    location = payload.get("location")
    if not location:
        raise HTTPException(status_code=400, detail="Location is required")

    async with httpx.AsyncClient() as client:
        res = await client.get(
            "https://api.openrouteservice.org/geocode/search",
            params={
                "api_key": os.getenv("API_KEY"),
                "text": location
            }
        )

    return res.json()