# Vercel Deployment Guide

This guide explains how to deploy the AI Content Summarizer to Vercel.

## Prerequisites

- A Vercel account (free at https://vercel.com)
- A GitHub account with this repository pushed
- MongoDB Atlas account (or any remote MongoDB instance)
- Gemini API key

## Step 1: Prepare MongoDB

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free MongoDB Atlas cluster
3. Get your connection string (looks like `mongodb+srv://username:password@cluster.mongodb.net/...`)
4. Keep this connection string safe; you'll need it in Step 4

## Step 2: Get Gemini API Key

1. Go to https://makersuite.google.com/app/apikey
2. Create a new API key
3. Copy the key; you'll need it in Step 4

## Step 3: Push to GitHub

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

## Step 4: Deploy to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. Go to https://vercel.com/dashboard
2. Click "Add New..." → "Project"
3. Select your GitHub repository
4. Click "Import"
5. In the "Environment Variables" section, add:
   - Name: `MONGO_URI`
     Value: Your MongoDB connection string
   - Name: `GEMINI_API_KEY`
     Value: Your Gemini API key
6. Click "Deploy"

### Option B: Using Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts and add the environment variables when asked.

## Step 5: Configure Environment Variables on Vercel

1. Go to your project settings on Vercel
2. Click "Environment Variables"
3. Add the following variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `GEMINI_API_KEY`: Your Gemini API key
4. Make sure they are set for Production, Preview, and Development
5. Redeploy the project after setting variables

## Step 6: Test the Deployment

1. Visit your deployed URL (provided by Vercel)
2. Test the summarization with sample content
3. Check the MongoDB Atlas cluster to verify data is being stored

## Environment Variables Reference

| Variable         | Required | Example                                                                      |
| ---------------- | -------- | ---------------------------------------------------------------------------- |
| `MONGO_URI`      | Yes      | `mongodb+srv://user:pass@cluster.mongodb.net/db?retryWrites=true&w=majority` |
| `GEMINI_API_KEY` | Yes      | `AIzaSyC7kRqZAKrt6keXl5LeXIMXqdkLuBn6pzo`                                    |
| `PORT`           | No       | `3001` (Vercel sets this automatically)                                      |

## Project Structure for Vercel

```
root/
├── backend/
│   ├── src/
│   │   ├── server.js
│   │   ├── summarizer.js
│   │   ├── cognitiveDrift.js
│   │   ├── perspectiveEngine.js
│   │   ├── mongoStore.js
│   │   └── ... other modules
│   └── package.json
├── frontend/
│   ├── src/
│   ├── dist/                  # Built output (created by Vercel)
│   └── package.json
├── vercel.json                # Vercel configuration
├── .vercelignore              # Files to ignore
└── package.json               # Root package.json
```

## Key Deployment Notes

- Vercel will automatically build the frontend using `npm run build`
- The backend runs on Vercel's infrastructure using your Node.js server
- MongoDB Atlas is required (free tier available)
- Gemini API calls are made from the backend for security

## Troubleshooting

### "MongoDB connection failed"

- Check your `MONGO_URI` is correct
- Verify MongoDB Atlas IP whitelist includes Vercel's IPs
- Add `0.0.0.0/0` to allow all IPs (less secure but works for testing)

### "Gemini API key is invalid"

- Verify the API key is correct
- Check the API key is active on Google Cloud Console

### "Build failed"

- Check the build logs on Vercel
- Ensure `npm run build` works locally
- Verify all dependencies are in package.json

### "Summarize request fails"

- Check the Vercel function logs
- Verify MongoDB and Gemini credentials are set
- Check browser console for error messages

## Performance Notes

- Keep MongoDB queries efficient
- MongoDB connection is pooled automatically
- Vercel automatically scales based on load
- Monitor usage on both Vercel and MongoDB dashboards

## Redeploying After Changes

Simply push to your main branch and Vercel will automatically redeploy:

```bash
git add .
git commit -m "Update feature"
git push origin main
```
