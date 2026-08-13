# Noloop Project

![NoLoop Demo](./demo.png)

A full-stack web application featuring a Next.js frontend, a NestJS backend, and a Python-based AI microservice.

**Live Links:**
- **Frontend:** [https://no-loop-demo.vercel.app](https://no-loop-demo.vercel.app)
- **Backend (API):** [https://no-loop-demo.onrender.com](https://no-loop-demo.onrender.com)

## Project Structure

```text
.
├── frontend/           # Next.js App Router, Tailwind, React
├── backend/            # NestJS API (Primary backend)
│   ├── src/            # Backend business logic
│   └── ai-engine/      # Python FastAPI AI microservice
├── .env.example        # Environment variables template
└── venv/               # Python virtual environment (if created locally)
```

## Prerequisites

- **Bun**: For managing Node dependencies and running the Next.js and NestJS servers.
- **Python 3**: For running the AI microservice.
- **PostgreSQL**: For the database.

## Environment Setup

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Fill in your actual database credentials, JWT secret, and API keys.

## Installation & Running

### 1. Frontend
```bash
cd frontend
bun install
bun run dev
```
The frontend runs on `http://localhost:3000`.

### 2. Backend (NestJS)
```bash
cd backend
bun install
bun run start:dev
```
The backend API runs on `http://localhost:4000`.

### 3. AI Engine (Python)
From the root of the project:
```bash
# Create a virtual environment if you haven't already
python -m venv venv

# Activate it (Windows)
venv\Scripts\activate
# Or on Mac/Linux: source venv/bin/activate

# Install dependencies
pip install -r backend/ai-engine/requirements.txt

# Run the AI engine
cd backend/ai-engine
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
The AI engine runs on `http://localhost:8000`.

## Production Build & Deployment

- **Frontend (Vercel)**: Point your Vercel project's Root Directory to `frontend/`. Set `NEXT_PUBLIC_API_URL` to your backend's URL.
- **Backend (Render/Railway)**: Point the root directory to `backend/`, using `bun run build` and `bun run start:prod`.
- **AI Engine (Render)**: Deploy as a separate Web Service pointing to `backend/ai-engine/`, using `pip install -r requirements.txt` and `uvicorn app.main:app --host 0.0.0.0 --port 8000`.
