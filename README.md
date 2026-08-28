# Venture AI — Premium AI Travel Concierge 🇮🇳

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/Frontend-React%2018-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Bundler-Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Styles-Tailwind%20v4.3-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Conda](https://img.shields.io/badge/Environment-Conda%20(venture--ai)-44A833?style=flat&logo=anaconda&logoColor=white)](https://docs.conda.io/)

**Venture AI** is a full-stack, AI-powered travel concierge platform crafted exclusively for Indian luxury and domestic travel (Udaipur royal heritage retreats, Kerala backwater houseboats, South Goa riviera, and Manali alpine escapes). It features a conversational **FastAPI** AI Concierge, interactive **Leaflet route maps**, and collaborative **Group Voting** with live companion consensus percentages.

---

## 🏗️ Repository Structure

```text
virtual-ai-travel-planner/
│
├── frontend/                  # Web Application (React + Vite + Tailwind CSS v4)
│   ├── src/
│   │   ├── components/        # Common, Landing, Chat, Itinerary, and Voting components
│   │   ├── pages/             # LandingPage, ChatPage, ItineraryPage, VotingPage
│   │   ├── context/           # AppContext global state provider
│   │   ├── services/          # API service interfacing with FastAPI backend
│   │   ├── App.jsx            # Main React layout shell
│   │   ├── main.jsx           # React DOM entry point
│   │   └── index.css          # Tailwind CSS v4 directives (@theme & @import)
│   ├── index.html
│   ├── package.json           # Frontend dependencies & npm scripts
│   └── vite.config.js         # Vite configuration with /api proxy to FastAPI (port 8000)
│
├── backend/                   # Backend APIs & Business Logic (FastAPI, Python)
│   ├── app/
│   │   ├── main.py            # FastAPI entry point & CORS configuration
│   │   ├── data/
│   │   │   └── mock_data.py   # Pydantic schemas & seed data for Indian destinations
│   │   └── routers/
│   │       ├── chat.py        # /api/chat AI Concierge endpoints
│   │       ├── itinerary.py   # /api/itineraries itinerary management endpoints
│   │       ├── voting.py      # /api/voting group decision & consensus endpoints
│   │       └── destination.py # /api/destinations catalog endpoints
│   ├── requirements.txt       # Pip dependencies (fastapi, uvicorn, pydantic)
│   └── environment.yml        # Conda environment definition file (venture-ai)
│
├── .gitignore                 # Configured for Python, Conda, Node, and build outputs
└── README.md                  # Comprehensive setup & execution guide
```

---

## 📋 Prerequisites

Ensure you have the following installed on your machine:
- **Conda** (Anaconda or Miniconda) *or* **Python 3.10+**
- **Node.js** (v18+) *or* **pnpm**
- **Git**

---

## 🛠️ Step-by-Step Setup & Execution

To run Venture AI on your local machine, open **two terminal windows** from the project root:

---

### 🐍 Terminal 1: Backend Setup (FastAPI)

#### **Step 1: Create & Activate Conda Environment**
```bash
# 1. Create the dedicated conda environment (run once)
conda env create -f backend/environment.yml

# 2. Activate the environment
conda activate venture-ai
```

*(Alternatively, if using standard Python venv without Conda:)*
```bash
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1   # On Windows
# source venv/bin/activate    # On macOS/Linux
pip install -r requirements.txt
```

#### **Step 2: Start the FastAPI Server**
```bash
# Navigate to the backend directory
cd backend

# Launch the server with Uvicorn (with hot reload enabled)
uvicorn app.main:app --reload --port 8000
```

> 🟢 **Backend Live**: `http://localhost:8000`  
> 📖 **Interactive Swagger Documentation**: `http://localhost:8000/docs`

---

### ⚛️ Terminal 2: Frontend Setup (React + Vite)

#### **Step 1: Navigate to Frontend & Install Dependencies**
Open a **new terminal window** in the project root:
```bash
cd frontend

# Install dependencies (run once)
npm install
# or if using pnpm: pnpm install
```

#### **Step 2: Start the Development Server**
```bash
npm run dev
# or if using pnpm: pnpm dev
```

> 🌐 **Frontend Live**: Open your browser at **`http://localhost:3000`**

---

## 📡 API Reference & Endpoints

FastAPI provides automatic interactive Swagger documentation. With the backend running, visit **`http://localhost:8000/docs`**.

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check endpoint |
| `POST` | `/api/chat` | AI Concierge conversational prompt processor & trip generator |
| `GET` | `/api/destinations` | Catalog of curated Indian domestic destinations |
| `GET` | `/api/itineraries/{id}` | Fetch full itinerary with day-by-day stops, budget radar, & weather |
| `POST` | `/api/itineraries/{id}/activities` | Add custom activity stop to a day |
| `DELETE` | `/api/itineraries/{id}/activities/{activity_id}` | Remove activity stop from itinerary |
| `GET` | `/api/voting/{trip_id}` | Fetch group voting candidate options & companion activity feed |
| `POST` | `/api/voting/{trip_id}/vote` | Cast user vote (`UP` / `DOWN`) & recalculate group consensus percentage |

---

## ✨ Key Features

- 💬 **Conversational AI Concierge**: Converts open natural language travel prompts into structured itineraries with day-by-day schedules, hotel recommendations, and dining spots.
- 🗺️ **Interactive Leaflet Route Maps**: Custom pinpoint markers and connecting polyline route paths for visual navigation of daily stops.
- 🗳️ **Collaborative Group Voting**: Travel companions vote up/down on candidate stays and activities with live calculated consensus meters.
- 📊 **Spend Radar**: Live budget tracking across stay, dining, and activity categories in INR (`₹`).
- 🎨 **Modern Tailwind CSS v4 Styling**: Clean UI built with `@tailwindcss/vite` and CSS `@theme` design tokens.

---

## 🔍 Troubleshooting

- **Port 8000 or 3000 Already in Use**:
  - To free the ports on Windows:
    ```powershell
    # For Port 8000
    Get-NetTCPConnection -LocalPort 8000 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
    # For Port 3000
    Get-NetTCPConnection -LocalPort 3000 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
    ```
- **PowerShell Conda Activation Error**:
  - Run `conda init powershell`, then close and reopen your PowerShell terminal.
- **Python Module Import Issues**:
  - Verify your active Conda environment with `conda info --envs` and ensure `conda activate venture-ai` is active.
