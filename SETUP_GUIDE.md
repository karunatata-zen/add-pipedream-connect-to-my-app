# Pipedream Connect Integration Setup Guide

This project has been configured with Pipedream Connect integration for your project `proj_RMslqXD`.

## Project Overview

- **Project ID**: proj_RMslqXD
- **Framework**: Next.js 16 with TypeScript
- **SDK**: @pipedream/sdk, @pipedream/connect-react
- **Configuration**: Environment-based with `.env.local`

## Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

The `.env.local` file is already configured with your project ID:

```
NEXT_PUBLIC_PIPEDREAM_PROJECT_ID=proj_RMslqXD
```

### 3. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000 to see the integration page.

## Production Deployment

### Before Deploying

1. **Authenticate with Pipedream CLI**
   ```bash
   pd login
   ```

2. **Set up OAuth credentials**
   - Go to your Pipedream dashboard
   - Navigate to OAuth Clients
   - Create or update OAuth client credentials
   - Configure redirect URIs for production (e.g., `https://yourdomain.com/api/connections`)

3. **Update Environment Variables**
   
   Create a `.env.production` file or configure in your deployment platform:
   
   ```
   NEXT_PUBLIC_PIPEDREAM_PROJECT_ID=proj_RMslqXD
   NEXT_PUBLIC_PIPEDREAM_API_KEY=<your-api-key>
   ```

### Vercel Deployment

1. **Connect Repository**
   ```bash
   vercel link
   ```

2. **Set Environment Variables**
   ```bash
   vercel env add NEXT_PUBLIC_PIPEDREAM_PROJECT_ID proj_RMslqXD
   vercel env add NEXT_PUBLIC_PIPEDREAM_API_KEY <your-key>
   ```

3. **Deploy**
   ```bash
   vercel deploy --prod
   ```

### Other Platforms (Netlify, Railway, etc.)

1. Set the environment variables in your platform's dashboard
2. Deploy using their standard procedures

## Project Structure

```
├── app/
│   ├── page.tsx              # Main Pipedream Connect UI
│   ├── layout.tsx            # Root layout
│   └── api/
│       ├── connections/      # Connection management API
│       │   └── route.ts
│       └── webhooks/         # Webhook receiver
│           └── route.ts
├── lib/
│   └── pipedream.ts          # Pipedream SDK configuration
├── .env.local                # Local environment config
├── package.json              # Dependencies
└── next.config.ts            # Next.js config
```

## Integration Points

### Frontend Integration

The main page (`app/page.tsx`) provides:
- Project ID display
- Configuration status checks
- Test connection button
- Setup instructions

To integrate in your own pages:

```tsx
import { pipedreamClient } from '@/lib/pipedream';

export default function MyPage() {
  // Use pipedreamClient for API calls
}
```

### API Routes

**GET `/api/connections`** - Check connection status
**POST `/api/connections`** - Create/manage connections
**POST `/api/webhooks`** - Receive webhook events

Example API usage:

```typescript
const response = await fetch('/api/connections', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ projectId: 'proj_RMslqXD' })
});
```

## Next Steps

1. **Complete CLI Authentication**
   - Run `pd login` from your terminal
   - Follow the browser authentication flow

2. **Configure OAuth Client**
   - Visit your Pipedream project dashboard
   - Set up OAuth credentials for managed auth

3. **Test Locally**
   - Run `npm run dev`
   - Click "Test Connection" button on the homepage
   - Check the browser console and server logs

4. **Deploy to Production**
   - Update environment variables
   - Deploy using your preferred platform
   - Test connections with real accounts

## Troubleshooting

### Missing Project ID Error
Ensure `.env.local` contains:
```
NEXT_PUBLIC_PIPEDREAM_PROJECT_ID=proj_RMslqXD
```

### Build Errors
Clear cache and reinstall:
```bash
rm -rf .next node_modules
npm install
npm run build
```

### SDK Issues
- Verify Pipedream CLI is installed: `pd --version`
- Check authentication: `pd login`
- Review Pipedream documentation at https://pipedream.com/docs/connect/quickstart

## Build and Test

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint and typecheck
npm run lint
```

## Documentation

- [Pipedream Connect Quickstart](https://pipedream.com/docs/connect/quickstart)
- [Pipedream SDK Documentation](https://pipedream.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)

## Support

For issues with Pipedream Connect:
1. Check [Pipedream documentation](https://pipedream.com/docs)
2. Review the console logs in browser DevTools
3. Check server logs during development

For issues with the Next.js app:
- Review this guide
- Check Next.js documentation
- Review the API route implementations
