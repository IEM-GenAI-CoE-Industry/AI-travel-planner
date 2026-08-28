from datetime import datetime
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import chat, itinerary, voting, destination

app = FastAPI(
    title="Venture AI Travel Concierge API",
    description="FastAPI backend service powering AI travel planning, interactive itineraries, and group voting.",
    version="1.0.0"
)

# CORS middleware for React frontend (http://localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount API Routers
app.include_router(chat.router)
app.include_router(itinerary.router)
app.include_router(voting.router)
app.include_router(destination.router)

@app.get("/api/health")
async def health_check():
    return {
        "status": "ok",
        "service": "Venture AI FastAPI Backend",
        "timestamp": datetime.now().isoformat()
    }
