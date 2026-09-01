import os
from datetime import datetime
from typing import Dict, Any, Optional
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "venture_ai_db")

client: Optional[AsyncIOMotorClient] = None
db = None
is_mongo_connected = False

# Resilient In-Memory Fallback Cache if MongoDB service is not running locally
_in_memory_threads: Dict[str, list] = {}
_in_memory_profiles: Dict[str, dict] = {}

async def connect_to_mongo():
    global client, db, is_mongo_connected
    try:
        client = AsyncIOMotorClient(MONGO_URI, serverSelectionTimeoutMS=2000)
        # Verify connection
        await client.admin.command("ping")
        db = client[DATABASE_NAME]
        
        # Ensure indexes
        await db.chat_threads.create_index("thread_id", unique=True)
        await db.traveler_profiles.create_index("thread_id", unique=True)
        
        is_mongo_connected = True
        print(f"[OK] [MongoDB] Successfully connected to {DATABASE_NAME} at {MONGO_URI}")
    except Exception as err:
        is_mongo_connected = False
        print(f"[INFO] [MongoDB] Offline / Unreachable ({err}). Using in-memory persistent cache.")

async def close_mongo_connection():
    global client
    if client:
        client.close()
        print("[OK] [MongoDB] Connection closed.")

async def get_chat_history(thread_id: str) -> list:
    """Retrieve message history for a given thread_id."""
    if is_mongo_connected and db is not None:
        try:
            doc = await db.chat_threads.find_one({"thread_id": thread_id})
            if doc:
                return doc.get("messages", [])
        except Exception as e:
            print(f"[WARN] MongoDB read error: {e}")
    return _in_memory_threads.get(thread_id, [])

async def save_chat_message(thread_id: str, message: dict):
    """Append a message to the thread history."""
    history = await get_chat_history(thread_id)
    history.append(message)
    _in_memory_threads[thread_id] = history

    if is_mongo_connected and db is not None:
        try:
            await db.chat_threads.update_one(
                {"thread_id": thread_id},
                {
                    "$set": {
                        "messages": history,
                        "updated_at": datetime.utcnow()
                    }
                },
                upsert=True
            )
        except Exception as e:
            print(f"[WARN] MongoDB save message error: {e}")

async def get_traveler_profile(thread_id: str) -> dict:
    """Retrieve the latest extracted TravelerProfile state."""
    if is_mongo_connected and db is not None:
        try:
            doc = await db.traveler_profiles.find_one({"thread_id": thread_id})
            if doc:
                return doc.get("profile", {})
        except Exception as e:
            print(f"[WARN] MongoDB read profile error: {e}")
    return _in_memory_profiles.get(thread_id, {})

async def save_traveler_profile(thread_id: str, profile_dict: dict):
    """Save or merge the updated TravelerProfile snapshot."""
    _in_memory_profiles[thread_id] = profile_dict

    if is_mongo_connected and db is not None:
        try:
            await db.traveler_profiles.update_one(
                {"thread_id": thread_id},
                {
                    "$set": {
                        "profile": profile_dict,
                        "updated_at": datetime.utcnow()
                    }
                },
                upsert=True
            )
        except Exception as e:
            print(f"[WARN] MongoDB save profile error: {e}")
