# Quick Start Guide

Get your Pipedream Connect integration running in 3 minutes.

## Prerequisites

- Node.js 18+ installed
- npm or yarn
- Access to Pipedream account
- Project ID: `proj_RMslqXD`

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Verify Configuration

The `.env.local` file is pre-configured with your project ID:

```bash
cat .env.local
# Output: NEXT_PUBLIC_PIPEDREAM_PROJECT_ID=proj_RMslqXD
```

## Step 3: Run Locally

```bash
npm run dev
```

Open http://localhost:3000 in your browser. You should see:

```
Pipedream Connect Integration

- Project ID: proj_RMslqXD
- Configuration Status: ✓ All checks pass
- Test Connection button
- Setup instructions
```

## Testing the Integration

1. Click the **Test Connection** button
2. Check the browser console (F12) for connection logs
3. You should see "Connection successful!" message

## Next: Production Setup

To deploy to production:

### Option 1: Vercel (Recommended)

```bash
npm install -g vercel
vercel link
vercel env add NEXT_PUBLIC_PIPEDREAM_PROJECT_ID proj_RMslqXD
vercel deploy --prod
```

### Option 2: Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Set environment variables on your hosting platform

3. Deploy the `.next` folder

## Complete Setup

For full production setup including OAuth configuration, see [SETUP_GUIDE.md](./SETUP_GUIDE.md).

## Verify Everything Works

After deployment:

1. Visit your deployed URL
2. Confirm "Project ID configured" status
3. Test the connection button
4. Check your Pipedream dashboard for activity

## Files Overview

| File | Purpose |
|------|---------|
| `app/page.tsx` | Main integration UI |
| `lib/pipedream.ts` | SDK configuration |
| `app/api/connections` | Connection management |
| `.env.local` | Configuration (local only) |
| `vercel.json` | Vercel deployment config |
| `SETUP_GUIDE.md` | Detailed setup instructions |

## Troubleshooting

**"Project ID is not configured" error**
→ Check `.env.local` contains `NEXT_PUBLIC_PIPEDREAM_PROJECT_ID=proj_RMslqXD`

**Build fails**
→ Run `npm install` and try `npm run build` again

**Connection test fails**
→ Check browser console (F12) for errors
→ Ensure your Pipedream project is active

## Get Help

- [Pipedream Connect Docs](https://pipedream.com/docs/connect/quickstart)
- [Next.js Docs](https://nextjs.org/docs)
- Check the browser console for error messages

**You're all set! 🚀**
