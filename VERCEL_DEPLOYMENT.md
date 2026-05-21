# Vercel Deployment Guide

This project is now ready for Vercel without any database connection.

## Required Environment Variable

- `GEMINI_API_KEY`: Google Gemini API key

## Deploy

1. Push the repository to GitHub.
2. Import the repo in Vercel.
3. Add `GEMINI_API_KEY` in Vercel environment variables.
4. Deploy.

## Notes

- The app stores no summaries in MongoDB.
- `/api/summarize` runs the summarizer, drift analysis, and perspective engine in the backend.
- `vercel.json` only configures the build and API rewrite.
