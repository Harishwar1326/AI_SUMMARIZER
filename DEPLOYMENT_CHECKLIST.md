# Vercel Deployment Checklist

Use this checklist to ensure your project is ready for Vercel deployment.

## Pre-Deployment Steps

- [ ] All code committed to GitHub
- [ ] `.env` file NOT committed (check .gitignore)
- [ ] All tests passing locally
- [ ] `npm run build` works without errors locally
- [ ] Frontend builds successfully (`npm run build` in frontend folder)
- [ ] Backend starts without errors (`npm run start` in backend folder)

## MongoDB Atlas Setup

- [ ] MongoDB Atlas account created (https://www.mongodb.com/cloud/atlas)
- [ ] Cluster created (can use free tier)
- [ ] Database user created with secure password
- [ ] Connection string copied (format: `mongodb+srv://username:password@cluster.mongodb.net/...`)
- [ ] IP whitelist updated to include `0.0.0.0/0` (allows all IPs)

## Gemini API Setup

- [ ] Google Cloud project created
- [ ] Gemini API enabled
- [ ] API key created and copied
- [ ] API key has appropriate permissions

## GitHub Repository

- [ ] Repository public or Vercel has access
- [ ] Latest code pushed to main branch
- [ ] All commits signed off (optional but recommended)

## Vercel Configuration

- [ ] Vercel account created (https://vercel.com)
- [ ] GitHub connected to Vercel
- [ ] Repository imported as project
- [ ] Build settings configured:
  - Build Command: `npm run build`
  - Output Directory: `frontend/dist`
- [ ] Environment variables set in Vercel dashboard:
  - [ ] `MONGO_URI` = MongoDB connection string
  - [ ] `GEMINI_API_KEY` = Gemini API key
- [ ] Variables set for all environments (Production, Preview, Development)

## Post-Deployment

- [ ] Visit deployment URL and test basic functionality
- [ ] Test summarization with sample content
- [ ] Check MongoDB Atlas to verify data is being stored
- [ ] Monitor Vercel logs for errors
- [ ] Test all input types (text, file upload, URL)
- [ ] Verify drift analysis displays correctly
- [ ] Verify perspective summaries generate correctly

## Troubleshooting During Deployment

If you encounter issues:

1. **Check Vercel Build Logs**: Go to Vercel dashboard → Project → Deployments → Click on failed deployment
2. **Check Function Logs**: Go to Vercel dashboard → Project → Functions (for runtime errors)
3. **MongoDB Issues**: Verify connection string and IP whitelist in Atlas
4. **API Key Issues**: Verify API keys are correct and active
5. **CORS Issues**: Check browser console for errors; verify backend CORS is configured

## Local Testing with Vercel Environment

To test locally with actual Vercel environment variables:

```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Pull environment variables from Vercel
vercel env pull .env.vercel

# Run dev server with Vercel environment
export $(cat .env.vercel | xargs)
npm run dev
```

## Continuous Deployment

After successful initial deployment:

- Push changes to main branch
- Vercel automatically rebuilds and deploys
- Check Vercel deployments page for build status
- Monitor logs for any runtime errors

## Rollback Plan

If deployment causes issues:

1. Go to Vercel dashboard → Deployments
2. Find the previous successful deployment
3. Click "..." → "Redeploy"
4. Or push a revert commit to main branch for automatic redeploy

## Production Best Practices

- Monitor both Vercel and MongoDB Atlas dashboards regularly
- Set up alerts for unusual activity
- Keep API keys secure (never commit to repository)
- Use environment variables for all sensitive data
- Consider adding rate limiting for API endpoints
- Backup MongoDB regularly
- Monitor API response times and costs
