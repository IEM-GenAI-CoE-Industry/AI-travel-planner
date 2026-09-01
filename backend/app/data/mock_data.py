from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

# --- Pydantic Models for Itinerary & Destinations ---

class DestinationModel(BaseModel):
    id: str
    name: str
    tagline: str
    priceRange: str
    duration: str
    rating: float
    reviewsCount: int
    tags: List[str]
    image: str
    description: str

class Traveler(BaseModel):
    name: str
    avatar: str
    role: str

class BudgetBreakdown(BaseModel):
    stays: int
    activities: int
    dining: int
    transport: int

class Budget(BaseModel):
    totalEstimated: int
    spent: int
    breakdown: Optional[BudgetBreakdown] = None

class Weather(BaseModel):
    temp: str
    condition: str
    icon: str

class ActivityVotes(BaseModel):
    up: int
    down: int

class ActivityItem(BaseModel):
    id: str
    time: str
    category: str
    title: str
    location: str
    lat: float
    lng: float
    description: str
    cost: int
    status: Optional[str] = "Suggested"
    image: Optional[str] = None
    votes: Optional[ActivityVotes] = Field(default_factory=lambda: ActivityVotes(up=1, down=0))

class ItineraryDay(BaseModel):
    dayNumber: int
    date: str
    title: str
    activities: List[ActivityItem]

class ItineraryModel(BaseModel):
    id: str
    title: str
    destination: str
    startDate: str
    endDate: str
    travelers: List[Traveler]
    budget: Budget
    weather: Weather
    days: List[ItineraryDay]

class SingleVote(BaseModel):
    user: str
    vote: str
    time: str

class CandidateModel(BaseModel):
    id: str
    category: str
    title: str
    location: str
    pricePerNight: str
    image: str
    features: List[str]
    consensusScore: int
    votes: List[SingleVote]
    status: str

class FeedItem(BaseModel):
    id: int
    user: str
    avatar: str
    action: str
    target: str
    time: str
    comment: Optional[str] = None

class VoteRequest(BaseModel):
    candidateId: str
    voteType: str
    user: Optional[str] = "Alex Rivera"

class AddActivityRequest(BaseModel):
    dayNumber: int
    newActivity: Dict[str, Any]


# --- Seed Catalog for Indian Domestic Travel ---

DESTINATIONS_DATA = [
    DestinationModel(
        id="udaipur",
        name="Udaipur, Rajasthan",
        tagline="Royal lake palaces, heritage architecture & romantic sunsets",
        priceRange="₹45,000 - ₹85,000",
        duration="6 Days / 5 Nights",
        rating=4.93,
        reviewsCount=1840,
        tags=["Royal Heritage", "Lake View", "Luxury Palace", "Culinary"],
        image="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
        description="Experience the Venice of the East. Stay in heritage palaces overlooking Lake Pichola, enjoy private royal boat cruises, and indulge in authentic Mewari fine dining."
    ),
    DestinationModel(
        id="kerala",
        name="Kerala Backwaters & Munnar",
        tagline="Serene backwater houseboats, tea gardens & Ayurvedic wellness",
        priceRange="₹38,000 - ₹72,000",
        duration="7 Days / 6 Nights",
        rating=4.95,
        reviewsCount=2150,
        tags=["Nature & Spas", "Houseboat", "Tea Estates", "Wellness"],
        image="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
        description="Cruise gently along Kumarakom and Alleppey backwaters on a luxury private houseboat, rejuvenate with authentic Ayurvedic treatments, and tour Munnar's mist-covered tea hills."
    ),
    DestinationModel(
        id="goa",
        name="South Goa Riviera",
        tagline="Pristine white sand beaches, Portuguese heritage & coastal luxury",
        priceRange="₹42,000 - ₹78,000",
        duration="5 Days / 4 Nights",
        rating=4.89,
        reviewsCount=1620,
        tags=["Coastal Luxury", "Private Yacht", "Heritage", "Seafood"],
        image="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
        description="Relax on South Goa's secluded beaches, charter a private sunset yacht along the Sal River, and explore 400-year-old Portuguese villas in Fontainhas."
    ),
    DestinationModel(
        id="manali",
        name="Manali & Solang Valley",
        tagline="Majestic Himalayan snow peaks, pine forests & mountain retreats",
        priceRange="₹35,000 - ₹68,000",
        duration="6 Days / 5 Nights",
        rating=4.91,
        reviewsCount=1430,
        tags=["Himalayan Alpine", "Adventure", "Mountain Spa", "Scenic"],
        image="https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
        description="Breathe in crisp mountain air surrounded by deodar cedar forests. Stay in boutique mountain chalets, ride the Solang ropeway, and savor hot trout in Old Manali."
    )
]

SAMPLE_ITINERARY_DATA = ItineraryModel(
    id="udaipur-royal-getaway",
    title="6-Day Royal Udaipur & Lake Pichola Retreat",
    destination="Udaipur, Rajasthan, India",
    startDate="Nov 12, 2026",
    endDate="Nov 18, 2026",
    travelers=[
        Traveler(name="Alex Rivera", avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80", role="Organizer"),
        Traveler(name="Elena Rostova", avatar="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80", role="Companion"),
        Traveler(name="Marcus Vance", avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80", role="Companion"),
        Traveler(name="Sophia Chen", avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80", role="Companion")
    ],
    budget=Budget(
        totalEstimated=65000,
        spent=42500,
        breakdown=BudgetBreakdown(stays=28000, activities=8500, dining=6000, transport=0)
    ),
    weather=Weather(temp="26°C / 78°F", condition="Pleasant & Sunny", icon="wb_sunny"),
    days=[
        ItineraryDay(
            dayNumber=1,
            date="Thursday, Nov 12",
            title="Royal Arrival & Lake Pichola Sunset",
            activities=[
                ActivityItem(
                    id="act-1",
                    time="02:00 PM",
                    category="STAY",
                    title="Check-in at Taj Lake Palace / Oberoi Udaivilas",
                    location="Lake Pichola, Udaipur",
                    lat=24.5754,
                    lng=73.6800,
                    description="Traditional Rajasthani welcome with floral marigolds and Shehnai music. Private lake-facing heritage suite.",
                    cost=18000,
                    status="Confirmed",
                    image="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
                    votes=ActivityVotes(up=4, down=0)
                ),
                ActivityItem(
                    id="act-2",
                    time="06:00 PM",
                    category="DINING",
                    title="Royal Thali Dinner at Ambrai Restaurant",
                    location="Ahar River Bank, Jagdish Temple Ghat",
                    lat=24.5778,
                    lng=73.6822,
                    description="Fine dining on the water's edge directly facing illuminated City Palace and Jagmandir.",
                    cost=4500,
                    status="Top Pick",
                    image="https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
                    votes=ActivityVotes(up=4, down=0)
                )
            ]
        ),
        ItineraryDay(
            dayNumber=2,
            date="Friday, Nov 13",
            title="City Palace Heritage Walk & Private Solar Boat Cruise",
            activities=[
                ActivityItem(
                    id="act-3",
                    time="10:00 AM",
                    category="CULTURE",
                    title="Exclusive Private Guided Tour of City Palace & Crystal Gallery",
                    location="City Palace Complex, Udaipur",
                    lat=24.5764,
                    lng=73.6835,
                    description="Explore Mor Chowk peacock mosaics, Zenana Mahal courtyards, and rare crystal collections with a royal historian.",
                    cost=3200,
                    status="Confirmed",
                    image="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80",
                    votes=ActivityVotes(up=4, down=0)
                ),
                ActivityItem(
                    id="act-4",
                    time="05:00 PM",
                    category="EXCURSION",
                    title="Sunset Private Shikara Boat Ride to Jagmandir Island Palace",
                    location="Lake Pichola",
                    lat=24.5698,
                    lng=73.6780,
                    description="Guided boat ride across serene waters with high tea served on Jagmandir island terrace.",
                    cost=4000,
                    status="Top Pick",
                    image="https://images.unsplash.com/photo-1609828913637-a55d96349204?auto=format&fit=crop&w=800&q=80",
                    votes=ActivityVotes(up=3, down=1)
                )
            ]
        ),
        ItineraryDay(
            dayNumber=3,
            date="Saturday, Nov 14",
            title="Monsoon Palace Views & Craft Village Experience",
            activities=[
                ActivityItem(
                    id="act-5",
                    time="11:30 AM",
                    category="CULTURE & SHOPPING",
                    title="Shilpgram Artisan Village & Miniature Painting Workshop",
                    location="Near Havala Village, Udaipur",
                    lat=24.6085,
                    lng=73.6521,
                    description="Master artisan workshop in traditional Mewari miniature painting and handcrafted leather Mojris.",
                    cost=2500,
                    status="Suggested",
                    image="https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
                    votes=ActivityVotes(up=3, down=0)
                )
            ]
        )
    ]
)

VOTING_CANDIDATES_DATA = [
    CandidateModel(
        id="vote-1",
        category="HERITAGE STAY",
        title="Option A: Taj Lake Palace, Udaipur",
        location="Lake Pichola",
        pricePerNight="₹45,000 / night",
        image="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
        features=["Floating palace in Lake Pichola", "Royal welcome & butler service", "Jharokha lake views"],
        consensusScore=100,
        votes=[
            SingleVote(user="Alex Rivera", vote="UP", time="2h ago"),
            SingleVote(user="Elena Rostova", vote="UP", time="1h ago"),
            SingleVote(user="Marcus Vance", vote="UP", time="45m ago"),
            SingleVote(user="Sophia Chen", vote="UP", time="10m ago")
        ],
        status="CONFIRMED"
    ),
    CandidateModel(
        id="vote-2",
        category="HERITAGE STAY",
        title="Option B: The Leela Palace, Udaipur",
        location="Lake Pichola West Bank",
        pricePerNight="₹38,000 / night",
        image="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
        features=["Private boat arrival", "ESPA luxury wellness spa", "Sheesh Mahal dining"],
        consensusScore=50,
        votes=[
            SingleVote(user="Alex Rivera", vote="DOWN", time="2h ago"),
            SingleVote(user="Elena Rostova", vote="UP", time="1h ago"),
            SingleVote(user="Marcus Vance", vote="DOWN", time="30m ago"),
            SingleVote(user="Sophia Chen", vote="UP", time="5m ago")
        ],
        status="UNDER_REVIEW"
    ),
    CandidateModel(
        id="vote-3",
        category="DINING & SUNSET",
        title="Option A: Ambrai Waterfront Mewari Fine Dining",
        location="Jagdish Temple Ghat",
        pricePerNight="₹4,500 for two",
        image="https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
        features=["Unobstructed City Palace views", "Authentic Laal Maas & Gatte ki Sabzi", "Live Sitar music"],
        consensusScore=100,
        votes=[
            SingleVote(user="Alex Rivera", vote="UP", time="3h ago"),
            SingleVote(user="Elena Rostova", vote="UP", time="2h ago"),
            SingleVote(user="Marcus Vance", vote="UP", time="1h ago"),
            SingleVote(user="Sophia Chen", vote="UP", time="15m ago")
        ],
        status="TOP_PICK"
    ),
    CandidateModel(
        id="vote-4",
        category="EXCURSION",
        title="Option B: Vintage Car Ride & Sajjangarh Monsoon Palace Sunset",
        location="Bansdara Mountain",
        pricePerNight="₹3,500 per person",
        image="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80",
        features=["Chauffeur in vintage classic car", "Panoramic sunset view over lakes", "Wildlife sanctuary pass"],
        consensusScore=75,
        votes=[
            SingleVote(user="Alex Rivera", vote="UP", time="4h ago"),
            SingleVote(user="Elena Rostova", vote="UP", time="3h ago"),
            SingleVote(user="Marcus Vance", vote="UP", time="2h ago"),
            SingleVote(user="Sophia Chen", vote="DOWN", time="10m ago")
        ],
        status="NEEDS_VOTE"
    )
]

INITIAL_FEED_DATA = [
    FeedItem(id=1, user="Alex Rivera", avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80", action="voted UP on", target="Option A: Taj Lake Palace Udaipur", time="10 minutes ago", comment="Staying on Lake Pichola in a floating palace will be magical!"),
    FeedItem(id=2, user="Sophia Chen", avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80", action="voted UP on", target="Ambrai Waterfront Dinner", time="15 minutes ago", comment="The illuminated City Palace view right from the table looks unreal."),
    FeedItem(id=3, user="Marcus Vance", avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80", action="voted UP on", target="Shikara Boat Cruise", time="1 hour ago", comment="Sunset boat ride to Jagmandir is a must for Day 2.")
]
