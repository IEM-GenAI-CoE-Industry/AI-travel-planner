from contextlib import asynccontextmanager
from datetime import datetime
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.mongodb import connect_to_mongo, close_mongo_connection
from app.routers import chat, itinerary, voting, destination

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Connect to MongoDB
    await connect_to_mongo()
    yield
    # Shutdown: Close MongoDB connection
    await close_mongo_connection()

app = FastAPI(
    title="Venture AI Travel Concierge API",
    description="FastAPI backend service powering AI travel planning with Open-Source Tool Calling, MongoDB persistence, and group consensus voting.",
    version="1.1.0",
    lifespan=lifespan
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
        "llm_engine": "Open-Source Tool Calling (Pattern 1)",
        "database": "MongoDB (Motor Async)",
        "timestamp": datetime.now().isoformat()
    }
