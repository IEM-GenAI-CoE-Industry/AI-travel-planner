from datetime import datetime
from fastapi import APIRouter
from app.data.mock_data import ChatRequest, ChatResponse, SAMPLE_ITINERARY_DATA, ItineraryModel

router = APIRouter(prefix="/api/chat", tags=["Chat"])

@router.post("", response_model=ChatResponse)
@router.post("/", response_model=ChatResponse)
async def handle_chat(payload: ChatRequest):
    query_lower = payload.message.lower()
    
    response_text = ""
    generated_trip = None

    if any(k in query_lower for k in ["udaipur", "rajasthan", "palace", "lake"]):
        response_text = "I've generated a bespoke 6-Day Royal Udaipur & Lake Pichola Retreat for your group! It includes heritage luxury stays at Taj Lake Palace, sunset shikara cruises to Jagmandir, and authentic Mewari fine dining at Ambrai."
        generated_trip = SAMPLE_ITINERARY_DATA
    elif any(k in query_lower for k in ["kerala", "backwater", "houseboat", "munnar"]):
        response_text = "Kerala is an enchanting choice! I've curated a 7-Day Backwater Houseboat & Munnar Tea Estate Itinerary featuring private Alleppey cruises, authentic Ayurvedic wellness treatments, and tea garden walking tours."
        generated_trip = ItineraryModel(
            id="kerala-backwaters",
            title="7-Day Kerala Backwaters & Tea Gardens Escapade",
            destination="Kerala, India",
            startDate="Nov 20, 2026",
            endDate="Nov 27, 2026",
            travelers=SAMPLE_ITINERARY_DATA.travelers,
            budget={"totalEstimated": 58000, "spent": 38000},
            weather={"temp": "28°C / 82°F", "condition": "Warm & Tropical", "icon": "wb_sunny"},
            days=SAMPLE_ITINERARY_DATA.days
        )
    elif any(k in query_lower for k in ["goa", "beach", "yacht"]):
        response_text = "South Goa offers exquisite coastal luxury and tranquil heritage charm! Here is a 5-Day Riviera & Private Yacht Charter itinerary, including Portuguese villa walks in Fontainhas and luxury beachfront resorts."
        generated_trip = ItineraryModel(
            id="goa-riviera",
            title="5-Day South Goa Luxury Riviera & Yacht Getaway",
            destination="Goa, India",
            startDate="Dec 05, 2026",
            endDate="Dec 10, 2026",
            travelers=SAMPLE_ITINERARY_DATA.travelers,
            budget={"totalEstimated": 62000, "spent": 41000},
            weather={"temp": "29°C / 84°F", "condition": "Sunny Beach Breeze", "icon": "wb_sunny"},
            days=SAMPLE_ITINERARY_DATA.days
        )
    elif any(k in query_lower for k in ["manali", "himachal", "mountain", "snow"]):
        response_text = "The Himalayas are breathtaking! I've planned a 6-Day Manali & Solang Alpine Retreat with boutique cedar chalets, Solang valley ropeway views, and trout dining in Old Manali."
        generated_trip = ItineraryModel(
            id="manali-alpine",
            title="6-Day Manali Alpine & Solang Retreat",
            destination="Manali, Himachal Pradesh, India",
            startDate="Dec 18, 2026",
            endDate="Dec 24, 2026",
            travelers=SAMPLE_ITINERARY_DATA.travelers,
            budget={"totalEstimated": 52000, "spent": 34000},
            weather={"temp": "12°C / 53°F", "condition": "Crisp Alpine Air", "icon": "ac_unit"},
            days=SAMPLE_ITINERARY_DATA.days
        )
    else:
        response_text = f"I've analyzed your local travel request (\"{payload.message}\") and created a custom Indian travel concierge itinerary featuring boutique local stays, private heritage transfers, and authentic regional culinary experiences."
        generated_trip = SAMPLE_ITINERARY_DATA

    return ChatResponse(
        sender="Venture Concierge",
        timestamp=datetime.now().strftime("%I:%M %p").lower(),
        text=response_text,
        suggestedPills=[
            "Customize budget breakdown",
            "Add royal heritage walk",
            "Compare boutique stays",
            "Share with travel group"
        ],
        generatedTrip=generated_trip
    )
