import time
from fastapi import APIRouter, HTTPException
from app.data.mock_data import SAMPLE_ITINERARY_DATA, ActivityItem, ActivityVotes, AddActivityRequest

router = APIRouter(prefix="/api/itineraries", tags=["Itineraries"])

# Mutable active itinerary state
active_itinerary = SAMPLE_ITINERARY_DATA.model_copy(deep=True)

@router.get("/{id}")
@router.get("/active")
@router.get("/")
async def get_itinerary(id: str = "active"):
    return active_itinerary

@router.post("/{id}/activities")
async def add_activity(id: str, payload: AddActivityRequest):
    day = next((d for d in active_itinerary.days if d.dayNumber == payload.dayNumber), None)
    if not day:
        raise HTTPException(status_code=404, detail="Day not found in itinerary.")

    new_act_data = payload.newActivity
    act_obj = ActivityItem(
        id=f"act-{int(time.time() * 1000)}",
        time=new_act_data.get("time", "03:00 PM"),
        category=new_act_data.get("category", "ACTIVITY"),
        title=new_act_data.get("title", "Custom Activity"),
        location=new_act_data.get("location", active_itinerary.destination or "Destination"),
        lat=float(new_act_data.get("lat", 24.58)),
        lng=float(new_act_data.get("lng", 73.68)),
        description=new_act_data.get("description", "User added activity stop."),
        cost=int(new_act_data.get("cost", 1000)),
        status="Suggested",
        image=new_act_data.get("image", "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80"),
        votes=ActivityVotes(up=1, down=0)
    )

    day.activities.append(act_obj)
    active_itinerary.budget.spent += act_obj.cost

    return {"message": "Activity added successfully", "itinerary": active_itinerary}

@router.delete("/{id}/activities/{activity_id}")
async def remove_activity(id: str, activity_id: str):
    for day in active_itinerary.days:
        day.activities = [act for act in day.activities if act.id != activity_id]
    return {"message": "Activity removed", "itinerary": active_itinerary}
