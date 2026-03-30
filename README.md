# HoosLearn

HoosLearn is an AI-powered learning platform that transforms a student prompt into engaging educational media, currently supporting:

- Short educational songs
- Short educational videos

The product is designed for fast, interactive feedback: users submit a topic, receive a job ID immediately, and watch real-time progress until their generated media is ready to play.

---

## What HoosLearn Does

HoosLearn helps students learn concepts through multimodal content generation.

### Core User Flow

1. User enters a topic and chooses **Song** or **Video**.
2. Frontend sends a generation request to the backend.
3. Backend creates a job and queues it for asynchronous processing.
4. Worker expands the topic into structured prompts, generates media, and uploads output.
5. Frontend receives live progress events and displays the final media URL.

### Key Product Capabilities

- Asynchronous AI generation for long-running jobs
- Multilingual prompt support
- Real-time progress updates via WebSocket
- HTTP polling fallback for reliability
- Media playback directly from generated output URLs

---

## Tech Stack and Architecture

### Frontend

- React + TypeScript + Vite
- Tailwind CSS
- React Router
- WebSocket + polling status fallback
- Hosted on Vercel

### Backend

- FastAPI
- Pydantic models
- Redis queue and metadata storage
- Background worker process
- Hosted on Render

### AI and Media Pipeline

- Gemini for prompt expansion and localization
- ElevenLabs and Vertex options for music/TTS paths
- Runway option for video generation
- FFmpeg and Pillow for fallback/assembly workflows

### Infrastructure

- Redis for queue, state, and pub/sub
- S3-compatible object storage (via boto3)
- Presigned URLs for media delivery

### High-Level Architecture

1. Frontend calls `POST /generate`.
2. API creates `job_id`, stores pending metadata, enqueues job in Redis.
3. Worker consumes queue, builds structured prompts, runs generation, uploads media.
4. Worker writes done/error metadata and publishes progress events.
5. Frontend listens via WebSocket `/ws/{job_id}`, falls back to `GET /status/{job_id}`.
6. User consumes final output from returned CDN/presigned URL.

---

## How to Run Locally

### Prerequisites

- Python 3.11 or 3.12
- Node.js 20+
- pnpm
- Redis
- FFmpeg installed and available on PATH
- S3-compatible bucket credentials (AWS S3 or equivalent)

### 1. Clone and Install Dependencies
```bash
# from repo root
pip install -r requirements.txt

cd frontend
pnpm install
cd ..
```

### 2. Configure Environment Variables

Create a `.env` file in the repository root:
```
REDIS_URL=redis://localhost:6379/0

AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
S3_BUCKET_NAME=your_bucket_name

GEMINI_API_KEY=your_gemini_key

LEARNLENS_MUSIC_PROVIDER=elevenlabs
LEARNLENS_VIDEO_PROVIDER=runway
ELEVENLABS_API_KEY=your_elevenlabs_key

VITE_API_BASE_URL=http://localhost:8000
VITE_WS_BASE_URL=ws://localhost:8000
```

### 3. Start Services

**Terminal 1 — Redis:**
```bash
redis-server
```

**Terminal 2 — Backend API:**
```bash
cd backend
uvicorn main:app --reload --port 8000
```

**Terminal 3 — Worker:**
```bash
cd backend
python worker.py
```

**Terminal 4 — Frontend:**
```bash
cd frontend
pnpm dev
```

---

## Notes

Ensure all API keys are valid before starting the worker. Generation times vary depending on provider response times. The worker must be running separately from the API server for jobs to process.
