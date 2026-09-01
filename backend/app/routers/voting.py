import time
import random
import string

from fastapi import APIRouter, HTTPException, WebSocket, WebSocketDisconnect

from app.data.mock_data import (
    VOTING_CANDIDATES_DATA,
    INITIAL_FEED_DATA,
    VoteRequest,
    SingleVote,
    FeedItem
)


router = APIRouter(prefix="/api/voting", tags=["Voting"])


# ============================================================
# WEBSOCKET CONNECTION MANAGER
# ============================================================

class ConnectionManager:

    def __init__(self):
        self.rooms = {}

    async def connect(self, room_code, websocket):
        await websocket.accept()

        if room_code not in self.rooms:
            self.rooms[room_code] = []

        self.rooms[room_code].append(websocket)

    def disconnect(self, room_code, websocket):
        if room_code in self.rooms:

            if websocket in self.rooms[room_code]:
                self.rooms[room_code].remove(websocket)

            if not self.rooms[room_code]:
                del self.rooms[room_code]

    async def broadcast(self, room_code, data):

        if room_code in self.rooms:

            for websocket in self.rooms[room_code]:
                await websocket.send_json(data)


manager = ConnectionManager()


# ============================================================
# TRIP ROOMS
# ============================================================

trip_rooms = {}


def generate_room_code():

    while True:

        code = ''.join(
            random.choices(
                string.ascii_uppercase + string.digits,
                k=6
            )
        )

        if code not in trip_rooms:
            return code


# ============================================================
# CREATE TRIP ROOM
# ============================================================

@router.post("/rooms")
async def create_room():

    room_code = generate_room_code()

    trip_rooms[room_code] = {
        "trip_id": "udaipur-royal-getaway"
    }

    return {
        "roomCode": room_code,
        "tripId": "udaipur-royal-getaway"
    }


# ============================================================
# GET TRIP ROOM
# ============================================================

@router.get("/rooms/{room_code}")
async def get_room(room_code: str):

    room = trip_rooms.get(room_code)

    if not room:
        raise HTTPException(
            status_code=404,
            detail="Trip room not found"
        )

    return {
        "roomCode": room_code,
        "tripId": room["trip_id"]
    }


# ============================================================
# VOTING DATA
# ============================================================

candidates_state = [
    c.model_copy(deep=True)
    for c in VOTING_CANDIDATES_DATA
]

activity_feed_state = [
    f.model_copy(deep=True)
    for f in INITIAL_FEED_DATA
]


# ============================================================
# WEBSOCKET ROOM CONNECTION
# ============================================================

@router.websocket("/ws/{room_code}")
async def voting_websocket(
    websocket: WebSocket,
    room_code: str
):

    # Check whether room exists
    if room_code not in trip_rooms:

        await websocket.close(code=1008)

        return

    await manager.connect(
        room_code,
        websocket
    )

    try:

        while True:

            await websocket.receive_text()

    except WebSocketDisconnect:

        manager.disconnect(
            room_code,
            websocket
        )


# ============================================================
# GET VOTING DATA FOR ROOM
# ============================================================

@router.get("/{room_code}")
async def get_voting_data(room_code: str):

    if room_code not in trip_rooms:

        raise HTTPException(
            status_code=404,
            detail="Trip room not found"
        )

    return {
        "candidates": candidates_state,
        "activityFeed": activity_feed_state
    }


# ============================================================
# CAST VOTE
# ============================================================

@router.post("/{room_code}/vote")
async def cast_vote(
    room_code: str,
    payload: VoteRequest
):

    # Check room
    if room_code not in trip_rooms:

        raise HTTPException(
            status_code=404,
            detail="Trip room not found"
        )

    # Find candidate
    candidate = next(
        (
            c
            for c in candidates_state
            if c.id == payload.candidateId
        ),
        None
    )

    if not candidate:

        raise HTTPException(
            status_code=404,
            detail="Option candidate not found."
        )

    user = payload.user or "Alex Rivera"

    vote_type = payload.voteType


    # ========================================================
    # UPDATE USER'S VOTE
    # ========================================================

    existing_vote = next(
        (
            v
            for v in candidate.votes
            if v.user == user
        ),
        None
    )

    if existing_vote:

        existing_vote.vote = vote_type
        existing_vote.time = "Just now"

    else:

        candidate.votes.append(
            SingleVote(
                user=user,
                vote=vote_type,
                time="Just now"
            )
        )


    # ========================================================
    # CALCULATE CONSENSUS
    # ========================================================

    up_votes = len(
        [
            v
            for v in candidate.votes
            if v.vote == "UP"
        ]
    )

    total_votes = len(candidate.votes)

    candidate.consensusScore = (
        round((up_votes / total_votes) * 100)
        if total_votes > 0
        else 0
    )


    # ========================================================
    # UPDATE STATUS
    # ========================================================

    if candidate.consensusScore == 100:

        candidate.status = "CONFIRMED"

    elif candidate.consensusScore >= 75:

        candidate.status = "TOP_PICK"

    else:

        candidate.status = "UNDER_REVIEW"


    # ========================================================
    # ADD ACTIVITY FEED
    # ========================================================

    activity_feed_state.insert(
        0,
        FeedItem(
            id=int(time.time() * 1000),
            user=user,
            avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
            action=f"voted {vote_type} on",
            target=candidate.title,
            time="Just now",
            comment=(
                "Looks great for our group!"
                if vote_type == "UP"
                else "Prefer alternative options."
            )
        )
    )


    # ========================================================
    # WEBSOCKET UPDATE
    # ========================================================

    update = {

        "type": "vote_updated",

        "candidate": candidate.model_dump(),

        "candidates": [
            c.model_dump()
            for c in candidates_state
        ],

        "activityFeed": [
            f.model_dump()
            for f in activity_feed_state
        ]
    }


    # Send update ONLY to this room
    await manager.broadcast(
        room_code,
        update
    )


    # ========================================================
    # HTTP RESPONSE
    # ========================================================

    return {

        "candidate": candidate,

        "candidates": candidates_state,

        "activityFeed": activity_feed_state
    }