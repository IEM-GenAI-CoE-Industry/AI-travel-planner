from datetime import datetime
from typing import Optional, List, Dict, Any
from fastapi import APIRouter
from pydantic import BaseModel
from app.db.mongodb import (
    get_chat_history, 
    save_chat_message, 
    get_traveler_profile, 
    save_traveler_profile,
    is_mongo_connected,
    DATABASE_NAME,
    MONGO_URI
)
from app.services.llm_service import run_conversational_agent, generate_dynamic_itinerary_from_llm
from app.schemas.profile import TravelerProfile
from app.data.mock_data import ItineraryModel

router = APIRouter(prefix="/api/chat", tags=["Chat"])

class ChatRequest(BaseModel):
    message: str
    thread_id: Optional[str] = "default-thread"

class ChatResponse(BaseModel):
    sender: str
    timestamp: str
    text: str
    suggestedPills: List[str]
    currentProfile: Dict[str, Any]
    generatedTrip: Optional[ItineraryModel] = None

@router.post("", response_model=ChatResponse)
@router.post("/", response_model=ChatResponse)
async def handle_chat(payload: ChatRequest):
    thread_id = payload.thread_id or "default-thread"

    # 1. Fetch persistent state from MongoDB
    current_profile = await get_traveler_profile(thread_id)
    history = await get_chat_history(thread_id)

    # 2. Record incoming user message
    user_msg_entry = {"role": "user", "content": payload.message, "timestamp": datetime.utcnow().isoformat()}
    await save_chat_message(thread_id, user_msg_entry)
    
    # 3. Format history for Open-Source LLM (Sliding Window: last 10 messages)
    llm_history = [{"role": m["role"], "content": m["content"]} for m in history[-10:]]
    llm_history.append({"role": "user", "content": payload.message})

    # 4. Run Pure Open-Source LLM Conversational Agent (Zero generic hardcoding)
    agent_output = await run_conversational_agent(llm_history, current_profile)
    reply_text = agent_output["reply_text"]
    delta_profile: Optional[TravelerProfile] = agent_output["extracted_profile_delta"]

    # 5. State Reconciliation: Merge extracted delta into current profile snapshot
    if delta_profile:
        delta_dict = delta_profile.model_dump(exclude_unset=True, exclude_none=True)
        for key, val in delta_dict.items():
            if isinstance(val, list):
                combined = list(set(current_profile.get(key, []) + val))
                current_profile[key] = combined
            else:
                current_profile[key] = val

        # Persist updated profile in MongoDB
        await save_traveler_profile(thread_id, current_profile)

    # 6. Save assistant reply to MongoDB chat history
    assistant_msg_entry = {"role": "assistant", "content": reply_text, "timestamp": datetime.utcnow().isoformat()}
    await save_chat_message(thread_id, assistant_msg_entry)

    # 7. Generate a 100% dynamic itinerary tailored strictly to the user's destination
    destination_str = current_profile.get("destination")
    generated_trip = None
    if destination_str:
        generated_trip = await generate_dynamic_itinerary_from_llm(destination_str, current_profile, llm_history)

    return ChatResponse(
        sender="Venture Concierge",
        timestamp=datetime.now().strftime("%I:%M %p").lower(),
        text=reply_text,
        currentProfile=current_profile,
        suggestedPills=[
            "Customize budget breakdown",
            "View day-by-day stops",
            "Compare boutique stays",
            "Explore dining & activities"
        ],
        generatedTrip=generated_trip
    )

# --- Database Inspection Endpoints ---

@router.get("/db-status")
async def get_db_status():
    """Inspect MongoDB connection status."""
    return {
        "is_connected": is_mongo_connected,
        "database": DATABASE_NAME,
        "uri": MONGO_URI.split("@")[-1] if "@" in MONGO_URI else MONGO_URI,
        "storage_mode": "Live MongoDB Database" if is_mongo_connected else "In-Memory Persistent Cache"
    }

@router.get("/profile/{thread_id}")
async def inspect_profile(thread_id: str = "default-thread"):
    """View the live extracted traveler profile saved in MongoDB."""
    profile = await get_traveler_profile(thread_id)
    return {"thread_id": thread_id, "traveler_profile": profile}

@router.get("/history/{thread_id}")
async def inspect_history(thread_id: str = "default-thread"):
    """View the full conversation thread history saved in MongoDB."""
    history = await get_chat_history(thread_id)
    return {"thread_id": thread_id, "total_messages": len(history), "messages": history}
