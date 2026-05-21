# AI Content Summarizer

React front end, Node.js API, and MongoDB storage for original and summarized content.

## Features

- Extractive and abstractive summarization
- Summary length, style, and tone controls
- Plain text, TXT, DOCX, PDF, and URL input
- Stores both original and summarized content in MongoDB
- Cognitive drift analysis with stability scoring and drift timelines
- Parallel perspective summaries for business, student, researcher, and critic views
- Presentation guide for feature explanation in [docs/PRESENTATION_GUIDE.md](docs/PRESENTATION_GUIDE.md)

## Prerequisites

- Node.js 20+
- MongoDB running locally

## Setup

1. Install dependencies:

```bash
npm install
```

2. Make sure MongoDB is running locally:

```bash
mongod
```

3. Start the app:

```bash
npm run dev
```

The frontend runs on the Vite default port and proxies API calls to the Node backend.

## Environment Variables

Copy `.env.example` to `.env` and update with your credentials:

```bash
cp .env.example .env
```

Required variables:

- `MONGO_URI`: MongoDB connection string (use local or MongoDB Atlas)
- `GEMINI_API_KEY`: Google Gemini API key from https://makersuite.google.com/app/apikey

## Deployment

For production deployment to Vercel, see [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md).

Quick steps:

1. Set up MongoDB Atlas (free tier available)
2. Get your Gemini API key
3. Push code to GitHub
4. Connect repository to Vercel
5. Add environment variables in Vercel dashboard
6. Deploy

## Output

The API now returns:

- The main summary
- Cognitive drift analysis
- Perspective-based summaries and comparative insights
