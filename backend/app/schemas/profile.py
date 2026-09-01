from typing import List, Optional
from enum import Enum
from pydantic import BaseModel, Field

class TravelPace(str, Enum):
    RELAXED = "RELAXED"
    MODERATE = "MODERATE"
    PACKED = "PACKED"

class TravelerProfile(BaseModel):
    destination: Optional[str] = Field(
        None, 
        description="Target destination, e.g. 'Kashmir Valley', 'Udaipur, Rajasthan', 'Kerala Backwaters', 'South Goa', 'Gandhinagar'"
    )
    start_date: Optional[str] = Field(
        None, 
        description="Estimated start date or season e.g. 'Next month', 'October 2026', 'This weekend'"
    )
    duration_days: Optional[int] = Field(
        None, 
        ge=1, 
        le=30, 
        description="Duration of the trip in total days"
    )
    group_size: Optional[int] = Field(
        None, 
        ge=1, 
        description="Number of people traveling in the group"
    )
    budget_inr: Optional[int] = Field(
        None, 
        ge=5000, 
        description="Estimated total budget in Indian Rupees (INR)"
    )
    travel_pace: Optional[TravelPace] = Field(
        None, 
        description="Pace preference: RELAXED (luxury/leisure), MODERATE (balanced), PACKED (heavy sightseeing)"
    )
    interests: Optional[List[str]] = Field(
        default_factory=list, 
        description="List of specific interest keywords e.g. ['DAL_LAKE_HOUSEBOAT', 'SNOW_GONDOLA', 'HERITAGE_PALACE', 'LOCAL_CUISINE']"
    )
    dietary: Optional[List[str]] = Field(
        default_factory=list, 
        description="Dietary preferences e.g. ['VEGETARIAN', 'VEGAN', 'JAIN', 'SEAFOOD', 'HALAL']"
    )

TRAVELER_PROFILE_TOOL = {
    "type": "function",
    "function": {
        "name": "update_traveler_profile",
        "description": "Call this tool whenever the user mentions, refines, or updates their destination, budget, group size, trip duration, pace, or travel interests.",
        "parameters": TravelerProfile.model_json_schema()
    }
}
