import time
from fastapi import APIRouter, HTTPException
from app.data.mock_data import VOTING_CANDIDATES_DATA, INITIAL_FEED_DATA, VoteRequest, SingleVote, FeedItem

router = APIRouter(prefix="/api/voting", tags=["Voting"])

candidates_state = [c.model_copy(deep=True) for c in VOTING_CANDIDATES_DATA]
activity_feed_state = [f.model_copy(deep=True) for f in INITIAL_FEED_DATA]

@router.get("/{trip_id}")
async def get_voting_data(trip_id: str):
    return {
        "candidates": candidates_state,
        "activityFeed": activity_feed_state
    }

@router.post("/{trip_id}/vote")
async def cast_vote(trip_id: str, payload: VoteRequest):
    candidate = next((c for c in candidates_state if c.id == payload.candidateId), None)
    if not candidate:
        raise HTTPException(status_code=404, detail="Option candidate not found.")

    user = payload.user or "Alex Rivera"
    vote_type = payload.voteType

    existing_vote = next((v for v in candidate.votes if v.user == user), None)
    if existing_vote:
        existing_vote.vote = vote_type
        existing_vote.time = "Just now"
    else:
        candidate.votes.append(SingleVote(user=user, vote=vote_type, time="Just now"))

    up_votes = len([v for v in candidate.votes if v.vote == "UP"])
    total_votes = len(candidate.votes)
    candidate.consensusScore = round((up_votes / total_votes) * 100) if total_votes > 0 else 0

    if candidate.consensusScore == 100:
        candidate.status = "CONFIRMED"
    elif candidate.consensusScore >= 75:
        candidate.status = "TOP_PICK"
    else:
        candidate.status = "UNDER_REVIEW"

    # Add to feed
    activity_feed_state.insert(0, FeedItem(
        id=int(time.time() * 1000),
        user=user,
        avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        action=f"voted {vote_type} on",
        target=candidate.title,
        time="Just now",
        comment="Looks great for our group!" if vote_type == "UP" else "Prefer alternative options."
    ))

    return {
        "candidate": candidate,
        "candidates": candidates_state,
        "activityFeed": activity_feed_state
    }
