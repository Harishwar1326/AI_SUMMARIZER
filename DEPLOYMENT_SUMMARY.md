# Deployment Summary

The project has been simplified for Vercel deployment without MongoDB.

## Current Architecture

Frontend (React + Vite) -> Vercel -> Backend (Express) -> Gemini API

## What Changed

- Removed MongoDB dependency and persistence code
- Removed database environment variables
- Kept summarization, drift analysis, and perspective analysis
- Kept a minimal Vercel configuration

## What You Need

- GitHub repository
- Vercel account
- `GEMINI_API_KEY`

## Result

The app now works as a stateless summarizer and does not store content in a database.
