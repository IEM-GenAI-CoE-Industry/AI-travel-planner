# Venture AI — Autonomous Conversational Travel Concierge & Dynamic Itinerary Engine

> An enterprise-grade, privacy-first AI Travel Assistant combining **Local Open-Source LLMs (Ollama / Llama 3.1)** with **Tool Calling (Pattern 1)**, **MongoDB Async State Persistence**, and an interactive **React + Vite Luxury Travel Interface**.

---

## 🌟 Architecture Overview

```
 ┌────────────────────────────────────────────────────────┐
 │            React 18 + Vite Luxury Frontend             │
 │   - AI Concierge Chat with Preference Badges           │
 │   - Dynamic Interactive Itinerary & Day Stops          │
 │   - Real-Time Group Voting & Consensus Feed            │
 └───────────────────────────┬────────────────────────────┘
                             │  HTTP / JSON Proxy (/api)
                             ▼
 ┌────────────────────────────────────────────────────────┐
 │                FastAPI Asynchronous Backend            │
 │   - Multi-turn Conversational State Reconciliation     │
 │   - Dynamic Itinerary Generator (100% Bespoke)         │
 │   - MongoDB Motor Driver (with In-Memory Fallback)     │
 └─────────────┬────────────────────────────┬─────────────┘
               │                            │
   Tool Calling (Pattern 1)      Async State Persistence
               ▼                            ▼
 ┌───────────────────────────┐ ┌──────────────────────────┐
 │    Local Ollama Engine    │ │     MongoDB Database     │
 │  (llama3.1:8b on GPU VRAM)│ │  (venture_ai_db on 27017)│
 └───────────────────────────┘ └──────────────────────────┘
```

---

## 📋 Prerequisites

Before setting up, ensure you have the following installed on your machine:

1. **Python 3.10+** (Recommended via [Anaconda / Miniconda](https://docs.conda.io/en/latest/miniconda.html))
2. **Node.js 18+ & npm** ([Download Node.js](https://nodejs.org/))
3. **Ollama** ([Download Ollama for Windows/macOS/Linux](https://ollama.ai/))
4. **MongoDB Community Server** (Optional for local DB: [Download MongoDB](https://www.mongodb.com/try/download/community)) or free [MongoDB Atlas Cloud](https://www.mongodb.com/cloud/atlas).
5. **NVIDIA GPU** *(Optional for lightning-fast hardware acceleration)*: GeForce RTX / GTX with latest NVIDIA drivers.

---

## 🚀 Step-by-Step Setup Guide

### Step 1: Start the Local Open-Source LLM (Ollama)

Open your terminal and pull/run the Llama 3.1 8B model:

```bash
# Start Ollama with Llama 3.1 8B (automatically detects NVIDIA CUDA GPU)
ollama run llama3.1:8b
```

> **⚡ Performance Tip**: 
> - If you want sub-second inference speeds or have limited VRAM (under 4GB), you can run the ultra-fast 3B model:  
>   `ollama run llama3.2:3b`
> - Verify GPU offload status anytime in a separate terminal:  
>   `ollama ps` *(shows 100% GPU offload on NVIDIA RTX GPUs)*.

---

### Step 2: Backend Setup (Python & FastAPI)

1. **Create and activate the Conda environment**:
   ```bash
   conda create -n venture-ai python=3.10 -y
   conda activate venture-ai
   ```

2. **Navigate to the backend directory and install dependencies**:
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Configure Environment Variables**:
   Verify or create `backend/.env` (a template is available at `backend/.env.example`):
   ```ini
   # Server Configuration
   PORT=8000
   HOST=0.0.0.0

   # Database Configuration
   MONGO_URI=mongodb://localhost:27017
   DATABASE_NAME=venture_ai_db

   # Open-Source LLM Configuration (Local Ollama / vLLM / Groq)
   LLM_BASE_URL=http://localhost:11434/v1
   LLM_MODEL=llama3.1:8b
   LLM_API_KEY=ollama
   ```

4. **Start the FastAPI Backend**:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

   *The backend will boot up with MongoDB connection pooling on `http://localhost:8000`.*  
   *Interactive Swagger Documentation: **`http://localhost:8000/docs`***

---

### Step 3: Frontend Setup (React & Vite)

1. Open a new terminal tab and navigate into the `frontend/` directory:
   ```bash
   cd frontend
   ```

2. **Install frontend dependencies**:
   ```bash
   npm install
   ```

3. **Start the Vite development server**:
   ```bash
   npm run dev
   ```

4. **Access the application**:
   Open **`http://localhost:3000`** in your browser.

---

## 🧠 Pattern 1: Tool Calling & Dynamic State Architecture

### 1. Inquisitive Conversational Agent
When you message the AI Concierge, the system passes your sliding-window conversation history to the model with an elite travel-designer system persona. The LLM naturally engages, shares authentic local insights, and asks targeted follow-up questions to understand:
- Group size & travel companions
- Desired pace (Relaxed luxury vs. Packed sightseeing)
- Budget comfort range & tentative dates
- Dietary restrictions & activity preferences

### 2. Autonomous Profile Extraction
Whenever new travel preferences are shared, the LLM invokes the `update_traveler_profile` tool:
```json
{
  "destination": "Kashmir Valley",
  "start_date": "Next month",
  "duration_days": 5,
  "group_size": 4,
  "budget_inr": 80000,
  "travel_pace": "RELAXED",
  "interests": ["DAL_LAKE_HOUSEBOAT", "SNOW_GONDOLA"]
}
```

### 3. Dynamic Itinerary Generation
Instead of hardcoded static templates, the system dynamically crafts a tailored itinerary strictly matching the user's requested destination, duration, budget breakdown, weather forecast, and daily activities.

---

## 🗄️ Database & State Inspection

### Viewing Data in MongoDB Compass (GUI)
1. Open **MongoDB Compass**.
2. Connect to `mongodb://localhost:27017`.
3. Select the **`venture_ai_db`** database:
   - **`traveler_profiles`**: Inspect real-time extracted structured traveler JSON snapshots.
   - **`chat_threads`**: Inspect persistent multi-turn message history arrays.

### Live API Inspection Endpoints

| Endpoint | Method | Description |
| :--- | :---: | :--- |
| `/api/chat` | `POST` | Send chat prompt; receives AI reply + dynamic itinerary |
| `/api/chat/profile/{thread_id}` | `GET` | View live extracted traveler profile saved in MongoDB |
| `/api/chat/history/{thread_id}` | `GET` | View complete conversation message thread from MongoDB |
| `/api/chat/db-status` | `GET` | View MongoDB connection health and storage mode |
| `/api/itineraries/active` | `GET` | Fetch currently active day-by-day itinerary & activities |
| `/api/voting/active` | `GET` | Retrieve candidate options and real-time consensus feed |
| `/api/voting/active/vote` | `POST` | Submit up/down group vote with dynamic score recalculation |

---

## 🛠️ Troubleshooting & FAQs

### Q1: What happens if MongoDB is not running locally?
The backend includes a **Resilient In-Memory Fallback**. If MongoDB is offline, it will log `[INFO] [MongoDB] Offline. Using in-memory persistent cache` and continue running without throwing errors.

### Q2: How can I verify that Ollama is using my GPU?
Run `nvidia-smi -l 1` or `ollama ps` in your terminal. During inference, you will see `ollama_llama_server.exe` utilize ~4.5 GB of dedicated VRAM and GPU utilization spike to 70–95%.

### Q3: How do I switch to free Cloud Inference (Groq) for 500+ tokens/sec?
In `backend/.env`, set:
```ini
LLM_BASE_URL=https://api.groq.com/openai/v1
LLM_MODEL=llama-3.1-8b-instant
LLM_API_KEY=gsk_your_groq_api_key_here
```

---

## 📜 License
Distributed under the MIT License. Developed for the AI Travel Planner Initiative.
