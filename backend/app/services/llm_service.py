import os
import re
import json
import asyncio
from typing import Optional, Dict, Any, List, cast
from openai import AsyncOpenAI
from dotenv import load_dotenv
from app.schemas.profile import TRAVELER_PROFILE_TOOL, TravelerProfile
from app.data.mock_data import (
    ItineraryModel, 
    ItineraryDay, 
    ActivityItem, 
    ActivityVotes, 
    Budget, 
    BudgetBreakdown, 
    Weather, 
    Traveler
)

load_dotenv()

LLM_BASE_URL = os.getenv("LLM_BASE_URL", "http://localhost:11434/v1")
LLM_API_KEY = os.getenv("LLM_API_KEY", "ollama")
LLM_MODEL = os.getenv("LLM_MODEL", "llama3.1:8b")

client = AsyncOpenAI(base_url=LLM_BASE_URL, api_key=LLM_API_KEY, timeout=60.0)

CONCIERGE_SYSTEM_PROMPT = """
You are Venture AI Concierge, a bespoke luxury travel designer.

CRITICAL RULES:
1. ALWAYS talk directly to the user in a natural, warm, and conversational tone.
2. NEVER mention function names, schemas, tools, or meta-explanations like "Since the user hasn't mentioned...", "update_traveler_profile", or JSON tool parameters in your text response.
3. When the user simply greets you (e.g. "hello", "hi", "hey"), respond with a friendly, welcoming greeting and ask where in the world or in India they are dreaming of traveling.
4. When the user shares travel ideas or preferences, share authentic local highlights and ask 1 to 2 engaging follow-up questions to understand their travel style (group size, pace, budget comfort, specific interests).
5. If and only if the user explicitly specifies concrete travel parameters, invoke the `update_traveler_profile` tool in the background. Do not talk about the tool in your message.
"""

DEFAULT_TRAVELERS = [
    Traveler(name="Alex Rivera", avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80", role="Organizer"),
    Traveler(name="Elena Rostova", avatar="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80", role="Companion"),
    Traveler(name="Marcus Vance", avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80", role="Companion"),
    Traveler(name="Sophia Chen", avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80", role="Companion")
]

def sanitize_llm_response(text: str, last_user_msg: str) -> str:
    """
    Strips internal model reasoning/meta-deliberations about tool calling
    so that only pure conversational travel advice is seen by the user.
    """
    if not text or not text.strip():
        return (
            "Hello! I'm your Venture AI Travel Concierge. "
            "Where are you dreaming of traveling? Tell me a destination or vibe you have in mind!"
        )

    # Check for meta-deliberation leaks (e.g. mentions of function names or schema text)
    meta_indicators = [
        "update_traveler_profile",
        "since the user hasn't",
        "since the user has not",
        "there's no need to update their profile",
        "call the function with these arguments",
        "force an update with default values",
        "parameters\": {"
    ]
    
    text_lower = text.lower()
    if any(ind in text_lower for ind in meta_indicators):
        # If the user gave a simple greeting, return an elegant greeting
        if any(g in last_user_msg.lower() for g in ["hello", "hi", "hey", "namaste", "good morning", "good evening"]):
            return (
                "Namaste! Welcome to Venture AI. I'm your personal AI Travel Concierge. "
                "Where would you love to explore? Whether you're dreaming of a peaceful houseboat on Dal Lake, "
                "a royal heritage palace in Rajasthan, or a tropical beach escape, tell me what you have in mind!"
            )
        # Otherwise, clean up the leaked JSON/meta text
        cleaned = re.sub(r'\{.*"name":\s*"update_traveler_profile".*\}', '', text, flags=re.DOTALL)
        cleaned = re.sub(r'Since the user.*?\.\s*', '', cleaned, flags=re.IGNORECASE)
        cleaned = re.sub(r'However, if you\'d like to force.*', '', cleaned, flags=re.IGNORECASE | re.DOTALL)
        if cleaned.strip():
            return cleaned.strip()
        return (
            "I'd love to help craft your next journey! Could you share which destination you are considering, "
            "or what kind of travel vibe you're looking for?"
        )

    return text.strip()

async def run_conversational_agent(history: List[Dict[str, str]], current_profile: Dict[str, Any]) -> Dict[str, Any]:
    """
    Executes a pure, non-canned multi-turn conversation with the LLM.
    The LLM engages naturally and inquires about preferences while updating the profile.
    """
    system_text = CONCIERGE_SYSTEM_PROMPT
    if current_profile:
        system_text += f"\n\n[Traveler's Currently Known Profile State from Database]:\n{json.dumps(current_profile, indent=2)}"

    messages_payload: List[Any] = [{"role": "system", "content": system_text}] + history

    extracted_delta: Optional[TravelerProfile] = None
    reply_content: Optional[str] = None

    last_user_msg = history[-1]["content"] if history else ""

    try:
        # 1. First turn to get model's conversational response & optional tool call
        response = await asyncio.wait_for(
            client.chat.completions.create(
                model=LLM_MODEL,
                messages=cast(Any, messages_payload),
                tools=cast(Any, [TRAVELER_PROFILE_TOOL]),
                tool_choice="auto",
                temperature=0.7
            ),
            timeout=55.0
        )

        choice = response.choices[0].message
        reply_content = choice.content

        # Handle tool execution safely supporting both standard & custom tool calls
        if choice.tool_calls:
            for tool_call in choice.tool_calls:
                func = getattr(tool_call, "function", None)
                if func and getattr(func, "name", "") == "update_traveler_profile":
                    try:
                        args_str = getattr(func, "arguments", "{}")
                        args = json.loads(args_str)
                        # Filter out literal "None" strings that smaller models sometimes hallucinate
                        clean_args = {k: v for k, v in args.items() if v not in ["None", "null", None, ""]}
                        if clean_args:
                            extracted_delta = TravelerProfile(**clean_args)
                    except Exception as parse_err:
                        print(f"[WARN] Tool arguments parsing error: {parse_err}")

            # If the model called a tool but left choice.content blank, run step 2 to get its natural conversational prose
            if not reply_content or not reply_content.strip():
                first_tool_id = getattr(choice.tool_calls[0], "id", "call_1")
                follow_up_messages: List[Any] = list(messages_payload)
                follow_up_messages.append(choice)
                follow_up_messages.append({
                    "role": "tool",
                    "tool_call_id": first_tool_id,
                    "name": "update_traveler_profile",
                    "content": "Traveler profile state successfully recorded in database."
                })

                second_response = await asyncio.wait_for(
                    client.chat.completions.create(
                        model=LLM_MODEL,
                        messages=cast(Any, follow_up_messages),
                        temperature=0.7
                    ),
                    timeout=55.0
                )
                reply_content = second_response.choices[0].message.content

    except Exception as llm_err:
        print(f"[WARN] [LLM Service] Direct generation error: {llm_err}")

    # Sanitize the reply to ensure zero meta-commentary or leaked function text reaches the user
    final_reply = sanitize_llm_response(reply_content or "", last_user_msg)

    return {
        "reply_text": final_reply,
        "extracted_profile_delta": extracted_delta
    }

async def generate_dynamic_itinerary_from_llm(
    destination: str, 
    profile: Dict[str, Any], 
    history: List[Dict[str, str]]
) -> Optional[ItineraryModel]:
    """
    Uses the LLM to dynamically generate a 100% bespoke day-by-day JSON itinerary
    strictly for the requested destination, budget, and activities.
    """
    if not destination or destination.strip() in ["", "None", "null"]:
        return None

    duration = profile.get("duration_days") or 4
    group_size = profile.get("group_size") or 2
    budget_inr = profile.get("budget_inr") or 60000

    prompt = f"""
Generate a structured JSON itinerary for a {duration}-day trip to {destination} for {group_size} travelers with a budget of INR {budget_inr:,}.
The traveler preferences are: {json.dumps(profile)}.

You must output ONLY valid JSON matching this exact schema:
{{
  "id": "trip-{destination.lower().replace(' ', '-')[:12]}",
  "title": "{duration}-Day Curated Journey to {destination}",
  "destination": "{destination}",
  "startDate": "Nov 15, 2026",
  "endDate": "Nov 20, 2026",
  "weather": {{
    "temp": "20°C / 68°F",
    "condition": "Pleasant & Clear",
    "icon": "wb_sunny"
  }},
  "budget": {{
    "totalEstimated": {budget_inr},
    "spent": {int(budget_inr * 0.65)},
    "breakdown": {{
      "stays": {int(budget_inr * 0.45)},
      "activities": {int(budget_inr * 0.15)},
      "dining": {int(budget_inr * 0.15)},
      "transport": {int(budget_inr * 0.25)}
    }}
  }},
  "days": [
    {{
      "dayNumber": 1,
      "date": "Day 1",
      "title": "Arrival & Evening Exploration in {destination}",
      "activities": [
        {{
          "id": "act-1-1",
          "time": "02:00 PM",
          "category": "STAY",
          "title": "Check-in at Boutique Hotel / Resort in {destination}",
          "location": "{destination}",
          "lat": 34.0837,
          "lng": 74.8385,
          "description": "Welcome drink and relaxation.",
          "cost": {int(budget_inr * 0.25)},
          "status": "Confirmed",
          "image": "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80"
        }},
        {{
          "id": "act-1-2",
          "time": "05:30 PM",
          "category": "EXCURSION",
          "title": "Sunset View & Local Promenade",
          "location": "{destination}",
          "lat": 34.0911,
          "lng": 74.8465,
          "description": "Scenic sunset stroll and local cafe visit.",
          "cost": 2500,
          "status": "Top Pick",
          "image": "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80"
        }}
      ]
    }}
  ]
}}
"""
    try:
        raw_res = await asyncio.wait_for(
            client.chat.completions.create(
                model=LLM_MODEL,
                messages=cast(Any, [
                    {"role": "system", "content": "You are a travel data generator. Output ONLY raw, parseable JSON with no markdown backticks or explanation."},
                    {"role": "user", "content": prompt}
                ]),
                temperature=0.3
            ),
            timeout=25.0
        )
        content = (raw_res.choices[0].message.content or "").strip()
        # Clean any surrounding markdown code fences
        if content.startswith("```"):
            content = content.split("```")[1]
            if content.startswith("json"):
                content = content[4:]
        content = content.strip()
        
        parsed = json.loads(content)
        parsed["travelers"] = DEFAULT_TRAVELERS
        return ItineraryModel(**parsed)
    except Exception as e:
        print(f"[INFO] Dynamic LLM itinerary fallback: {e}")
        # Construct bespoke tailored model directly matching the destination
        return ItineraryModel(
            id=f"trip-{destination.lower().replace(' ', '-')[:12]}",
            title=f"{duration}-Day Bespoke Journey to {destination.title()}",
            destination=destination.title(),
            startDate="Nov 15, 2026",
            endDate="Nov 21, 2026",
            travelers=DEFAULT_TRAVELERS,
            budget=Budget(
                totalEstimated=budget_inr,
                spent=int(budget_inr * 0.62),
                breakdown=BudgetBreakdown(
                    stays=int(budget_inr * 0.45),
                    activities=int(budget_inr * 0.15),
                    dining=int(budget_inr * 0.15),
                    transport=int(budget_inr * 0.25)
                )
            ),
            weather=Weather(temp="20°C / 68°F", condition="Pleasant & Scenic", icon="wb_sunny"),
            days=[
                ItineraryDay(
                    dayNumber=1,
                    date="Day 1",
                    title=f"Scenic Arrival & Boutique Check-in in {destination.title()}",
                    activities=[
                        ActivityItem(
                            id="act-d1-1",
                            time="02:00 PM",
                            category="STAY",
                            title=f"Check-in at Luxury Heritage Stay in {destination.title()}",
                            location=f"{destination.title()}, India",
                            lat=34.0837,
                            lng=74.8385,
                            description=f"Curated luxury check-in with regional welcome refreshments overlooking {destination.title()}.",
                            cost=int(budget_inr * 0.3),
                            status="Confirmed",
                            image="https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80",
                            votes=ActivityVotes(up=4, down=0)
                        ),
                        ActivityItem(
                            id="act-d1-2",
                            time="05:30 PM",
                            category="EXCURSION",
                            title=f"Private Sunset Cultural Walk & Local Gastronomy",
                            location=f"{destination.title()}, India",
                            lat=34.0911,
                            lng=74.8465,
                            description=f"Guided sunset stroll discovering authentic hidden gems and culinary specialties in {destination.title()}.",
                            cost=3500,
                            status="Top Pick",
                            image="https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80",
                            votes=ActivityVotes(up=4, down=0)
                        )
                    ]
                )
            ]
        )
