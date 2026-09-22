# Production Deployment Guide

This guide covers deploying your Pipedream Connect integration to production.

## Pre-Deployment Checklist

- [ ] Verify `.env.local` has correct `NEXT_PUBLIC_PIPEDREAM_PROJECT_ID=proj_RMslqXD`
- [ ] Test locally with `npm run dev`
- [ ] Run build: `npm run build` (must succeed with no errors)
- [ ] Update `.env.production` with production values
- [ ] Configure OAuth credentials in Pipedream dashboard
- [ ] Set up production redirect URIs in Pipedream OAuth client

## Vercel Deployment (Recommended)

### 1. Connect Repository

```bash
npm install -g vercel
cd /path/to/project
vercel link
```

### 2. Set Environment Variables

```bash
vercel env add NEXT_PUBLIC_PIPEDREAM_PROJECT_ID proj_RMslqXD
```

### 3. Deploy

```bash
# Preview deployment
vercel deploy

# Production deployment
vercel deploy --prod
```

### 4. Verify Production

Visit your production URL and confirm:
- Page loads without errors
- Project ID is displayed
- Configuration status shows all checks passing
- Test Connection button works

## Alternative Deployment Platforms

### Netlify

1. Connect your GitHub repository to Netlify
2. Set environment variables in Netlify dashboard:
   - `NEXT_PUBLIC_PIPEDREAM_PROJECT_ID=proj_RMslqXD`
3. Build command: `npm run build`
4. Publish directory: `.next`

### Railway

1. Connect GitHub repository
2. Add environment variables
3. Railway auto-detects Next.js and configures build/start commands
4. Deploy

### AWS Amplify

1. Connect GitHub repository
2. Add environment variables
3. Configure build settings for Next.js
4. Deploy

### Self-Hosted (Linux/Docker)

```bash
# Build
npm run build

# Install production dependencies only
npm ci --production

# Start server
npm start
```

For Docker:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build
ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]
```

## Production Environment Variables

Create `.env.production`:

```
NEXT_PUBLIC_PIPEDREAM_PROJECT_ID=proj_RMslqXD
```

Optional for advanced usage:
```
NEXT_PUBLIC_PIPEDREAM_API_KEY=pk_...
NEXT_PUBLIC_PIPEDREAM_API_URL=https://api.pipedream.com
```

## Post-Deployment

### 1. Test the Integration

```bash
curl https://yourdomain.com
# Should return HTML with "Pipedream Connect Integration"
```

### 2. Check API Endpoints

```bash
curl https://yourdomain.com/api/connections
# Should return { projectId: "proj_RMslqXD", status: "ready" }
```

### 3. Configure Pipedream OAuth

In Pipedream Dashboard:

1. Go to OAuth Clients
2. Create or update OAuth client
3. Set Redirect URIs:
   - `https://yourdomain.com/api/connections` (for managed auth)
   - `https://yourdomain.com/api/webhooks` (for webhooks)

### 4. Monitor Production

- Check server logs for errors
- Monitor API response times
- Track connection success/failure rates
- Review webhook deliveries in Pipedream dashboard

## Troubleshooting Production Issues

### App shows "Project ID is not configured"

**Solution**: Verify environment variable is set:
```bash
# Vercel
vercel env list

# Check it contains NEXT_PUBLIC_PIPEDREAM_PROJECT_ID
```

### API endpoints return 500 errors

**Solution**: Check server logs
```bash
# Vercel
vercel logs

# Other platforms - check your platform's log viewer
```

### OAuth redirect not working

**Solution**: 
1. Verify redirect URI in Pipedream OAuth client settings
2. Check that your OAuth client credentials are correct
3. Ensure `NEXT_PUBLIC_PIPEDREAM_PROJECT_ID` is set

## Rollback Procedure

If something goes wrong in production:

### Vercel
```bash
vercel rollback
```

### Other Platforms
Redeploy the previous commit:
```bash
git revert <commit-id>
git push
# Re-deploy
```

## Performance Optimization

### Caching

The `.next` build outputs are cached. For faster deploys:
```bash
npm run build
# Uses turbopack for faster builds
```

### Database/External Calls

API calls to Pipedream are made via HTTPS. Verify DNS resolution:
```bash
# Test from production environment
curl -I https://api.pipedream.com
```

## Security Considerations

1. **Never commit `.env` files** - use platform environment variables only
2. **Rotate API keys** regularly
3. **Use HTTPS URLs only** for production
4. **Implement rate limiting** for `/api/connections` endpoint if needed
5. **Log security events** and monitor for suspicious activity

## Monitoring & Alerts

Set up monitoring for:
- 404/500 errors
- Slow API responses (>1s)
- Failed connections
- Webhook delivery failures

## Support & Resources

- [Pipedream Documentation](https://pipedream.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)

## Maintenance

### Regular Tasks

- [ ] Monitor error rates
- [ ] Review connection logs monthly
- [ ] Update dependencies: `npm update`
- [ ] Test OAuth flow monthly
- [ ] Verify webhooks are delivering

### Update Pipedream SDK

```bash
npm update @pipedream/sdk @pipedream/connect-react
npm run build
npm run dev  # Test locally
# Deploy to production
```

---

**Your Pipedream Connect integration is now ready for production! 🚀**
