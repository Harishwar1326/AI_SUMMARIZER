# Environment Setup Guide

Complete guide for configuring environment variables for local development and Vercel production.

## Local Development Setup

### Step 1: Create .env File

Copy the example file and fill in your credentials:

```bash
cp .env.example .env
```

### Step 2: Configure MongoDB

For local development, MongoDB runs on your machine:

```
MONGO_URI=mongodb://localhost:27017/
```

To use MongoDB Atlas (recommended for consistency with production):

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`
5. Update `.env`:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

### Step 3: Configure Gemini API

1. Go to https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the key
4. Add to `.env`:

```
GEMINI_API_KEY=your_api_key_here
```

### Step 4: Optional Settings

```
PORT=3001
NODE_ENV=development
```

### Step 5: Start Development Server

```bash
npm run dev
```

Services run on:

- Frontend: http://localhost:5173
- Backend: http://localhost:3001

## Production Setup (Vercel)

### Step 1: Prepare MongoDB Atlas

MongoDB local connections won't work on Vercel. Use MongoDB Atlas:

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create M0 (free) cluster
3. Create database user:
   - Click "Database Access"
   - Click "Add New Database User"
   - Create username and password
   - Click "Add User"
4. Configure IP Whitelist:
   - Click "Network Access"
   - Click "Add IP Address"
   - Choose "Allow access from anywhere" (use `0.0.0.0/0`)
   - Click "Confirm"
5. Get Connection String:
   - Click "Clusters"
   - Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database user password
   - Example: `mongodb+srv://user:pass@cluster.mongodb.net/dbname?retryWrites=true&w=majority`

### Step 2: Ensure Gemini API Key is Active

1. Go to https://console.cloud.google.com
2. Select your project
3. Verify Generative Language API is enabled
4. Verify your API key is active

### Step 3: Set Up Vercel Project

1. Push code to GitHub:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

2. Go to https://vercel.com/dashboard
3. Click "Add New..." → "Project"
4. Select your GitHub repository
5. Click "Import"

### Step 4: Configure Environment Variables

In Vercel dashboard for your project:

1. Go to "Settings" → "Environment Variables"
2. Add variables:

```
Name: MONGO_URI
Value: mongodb+srv://user:pass@cluster.mongodb.net/dbname?retryWrites=true&w=majority
```

```
Name: GEMINI_API_KEY
Value: your_api_key_here
```

3. Ensure both are set for:
   - ☑ Production
   - ☑ Preview
   - ☑ Development

4. Save and redeploy project

### Step 5: Deploy

Vercel automatically deploys when you push to main:

```bash
git push origin main
```

Or manually redeploy from Vercel dashboard.

## Environment Variables Reference

| Variable         | Required | Local Dev                    | Production                      |
| ---------------- | -------- | ---------------------------- | ------------------------------- |
| `MONGO_URI`      | Yes      | `mongodb://localhost:27017/` | MongoDB Atlas connection string |
| `GEMINI_API_KEY` | Yes      | Your Gemini API key          | Your Gemini API key             |
| `PORT`           | No       | 3001                         | Set by Vercel                   |
| `NODE_ENV`       | No       | development                  | production (set by Vercel)      |

## Verifying Configuration

### Locally

Check .env file:

```bash
cat .env
```

Should contain:

- `MONGO_URI` pointing to MongoDB
- `GEMINI_API_KEY` populated

Test backend connection:

```bash
npm run start --workspace backend
# Should output: Server running on port 3001
```

Test API:

```bash
curl http://localhost:3001/api/health
# Should return: {"ok":true}
```

### On Vercel

1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Verify all variables are present
4. Check "Deployments" tab for latest deployment status
5. Test API endpoint: `https://your-domain.vercel.app/api/health`

## Troubleshooting

### "MONGO_URI is not defined" or "Cannot connect to MongoDB"

- Verify MONGO_URI is in your .env file locally
- Verify MONGO_URI is in Vercel environment variables
- Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Try connecting locally with MongoDB Atlas connection string first

### "Gemini API key is not found" or "Invalid API key"

- Get fresh API key from https://makersuite.google.com/app/apikey
- Verify it's copied without spaces
- Check Generative Language API is enabled in Google Cloud Console
- Update both local .env and Vercel environment variables

### "Connection timeout"

- MongoDB Atlas: Add your IP to whitelist (or use 0.0.0.0/0)
- Gemini API: Check network connectivity, verify API is accessible
- Vercel: Check function logs for timeout errors

## Best Practices

1. **Never commit .env file** - it contains secrets
   - Check .gitignore includes `.env`
   - Use .env.example as template only
2. **Use Vercel's environment variables UI** - don't hardcode secrets
3. **Keep MongoDB Atlas password secure** - use strong passwords
4. **Rotate API keys periodically** - for security
5. **Monitor usage** - both Vercel and MongoDB Atlas have usage dashboards
6. **Use different credentials for development and production**
7. **Enable 2FA** on MongoDB Atlas and Google Cloud accounts

## Quick Start Checklist

- [ ] Clone repository
- [ ] Run `npm install`
- [ ] Copy `.env.example` to `.env`
- [ ] Add `MONGO_URI` (local or Atlas)
- [ ] Add `GEMINI_API_KEY`
- [ ] Run `npm run dev`
- [ ] Test at http://localhost:5173
- [ ] For production: set environment variables in Vercel
- [ ] Push to GitHub for automatic Vercel deployment
