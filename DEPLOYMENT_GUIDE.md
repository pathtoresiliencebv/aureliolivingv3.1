# 🚀 Vercel Deployment Guide - Aurelio Platform

## Deployment Structure

The Aurelio Platform is deployed across multiple Vercel projects:

### 1. **Platform (Super Admin Dashboard)**
- **Domain**: `platform.aurelio.app` (or custom domain)
- **Directory**: `apps/platform`
- **Purpose**: Super admin tenant management

### 2. **Storefront (Aurelio Living)**
- **Domain**: `aurelio-living.vercel.app` (or custom domain)
- **Directory**: `apps/storefront`
- **Purpose**: Multi-tenant e-commerce storefront

### 3. **User Dashboard** (Optional)
- **Domain**: `dashboard.aurelio.app`
- **Directory**: `apps/user-dashboard`
- **Purpose**: Multi-shop management for shop owners

## Prerequisites

1. **Vercel Account**
   - Sign up at [vercel.com](https://vercel.com)
   - Install Vercel CLI: `npm i -g vercel`
   - Login: `vercel login`

2. **Environment Variables Ready**
   - Supabase URL and Keys
   - Stripe API Keys
   - Neon API Key
   - Other integration keys

## Deployment Steps

### Step 1: Deploy Super Admin Platform

```bash
# Navigate to platform app
cd apps/platform

# Deploy to production
vercel --prod

# When prompted:
# - Set up and deploy: Yes
# - Which scope: Select your team/account
# - Link to existing project: No
# - Project name: aurelio-platform (or your choice)
# - Directory: ./
# - Override settings: No
```

### Step 2: Configure Environment Variables

After deployment, add environment variables via Vercel dashboard or CLI:

```bash
# Platform variables
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add STRIPE_SECRET_KEY production
vercel env add STRIPE_PUBLISHABLE_KEY production
vercel env add STRIPE_WEBHOOK_SECRET production
vercel env add VERCEL_TOKEN production
vercel env add NEON_API_KEY production
```

### Step 3: Deploy Storefront (Aurelio Living)

```bash
# Navigate to storefront app
cd apps/storefront

# Deploy to production
vercel --prod

# When prompted:
# - Project name: aurelio-living (or your choice)
# - Link to different project: No
```

Add environment variables:
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add MEDUSA_API_URL production
```

### Step 4: Deploy User Dashboard (Optional)

```bash
# Navigate to user dashboard
cd apps/user-dashboard

# Deploy to production
vercel --prod
```

## Custom Domains

### Platform Domain Setup

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add domain: `platform.aurelio.app` (or your domain)
3. Configure DNS:
   ```
   Type: A
   Name: platform
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www.platform
   Value: cname.vercel-dns.com
   ```

### Storefront Domain Setup

For the main Aurelio Living shop:
1. Add domain: `aurelio-living.com` (your custom domain)
2. Configure DNS with your domain provider
3. SSL will be automatically provisioned

For multi-tenant subdomains:
1. Add wildcard domain: `*.shops.aurelio.app`
2. Configure DNS:
   ```
   Type: A
   Name: *.shops
   Value: 76.76.21.21
   ```

## Environment Variables Reference

### Required for All Apps

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Platform App Only

```bash
# Payments
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
MOLLIE_API_KEY=live_...

# Infrastructure
NEON_API_KEY=your-neon-key
VERCEL_TOKEN=your-vercel-token
VERCEL_PROJECT_ID=prj_...
VERCEL_TEAM_ID=team_...

# Optional: Marketing
OPENAI_API_KEY=sk-...
LISTMONK_API_URL=https://...
FONOSTER_API_KEY=...
```

### Storefront App Only

```bash
# Medusa Backend
MEDUSA_API_URL=https://medusa.aurelio.app
MEDUSA_PUBLISHABLE_KEY=pk_...

# Optional: Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-...
NEXT_PUBLIC_FB_PIXEL_ID=...
```

## Post-Deployment Steps

### 1. Setup Webhooks

**Stripe Webhook URL:**
```
https://platform.aurelio.app/api/webhooks/stripe
```

**Mollie Webhook URL:**
```
https://platform.aurelio.app/api/webhooks/mollie
```

### 2. Configure Vercel API Integration

In your Vercel dashboard:
1. Settings → Tokens → Create Token
2. Scope: Full Access (for domain management)
3. Add token to platform environment variables

### 3. Test Domain Management

1. Login to Super Admin dashboard
2. Create a test tenant
3. Add custom domain via domain management UI
4. Verify domain provisioning works

### 4. Setup Medusa Backend

The Medusa backend needs separate hosting (Railway, Render, or AWS):

```bash
# Example: Deploy to Railway
cd apps/medusa
railway login
railway init
railway up

# Set environment variables in Railway dashboard
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
STORE_CORS=https://aurelio-living.vercel.app
ADMIN_CORS=https://platform.aurelio.app
```

### 5. Run Database Migrations

```bash
# Connect to your Supabase project
psql -h db.your-project.supabase.co -U postgres -d postgres

# Run the schema migration
\i packages/database/migrations/001_initial_schema.sql
```

## Monitoring & Maintenance

### Vercel Analytics

Enable analytics for all projects:
1. Dashboard → Analytics → Enable
2. Track Core Web Vitals
3. Monitor real-time visitors

### Logs

View deployment logs:
```bash
# Platform logs
cd apps/platform
vercel logs

# Storefront logs
cd apps/storefront
vercel logs
```

### Rollback

If needed, rollback to previous deployment:
```bash
vercel rollback
```

## Performance Optimization

### Edge Functions

The storefront uses Edge Middleware for tenant resolution:
- Located in `apps/storefront/middleware.ts`
- Runs on Vercel Edge Network
- Minimal latency for domain routing

### Image Optimization

Next.js automatic image optimization is enabled:
- Images are optimized on-demand
- Served via Vercel CDN
- WebP format for modern browsers

### Caching Strategy

Configure caching headers in `next.config.ts`:
```typescript
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Cache-Control', value: 'no-store' }
      ]
    },
    {
      source: '/products/:path*',
      headers: [
        { key: 'Cache-Control', value: 's-maxage=60, stale-while-revalidate' }
      ]
    }
  ]
}
```

## Troubleshooting

### Build Failures

**Issue**: Monorepo build fails
**Solution**: Ensure `turbo.json` is configured correctly and all dependencies are installed

```bash
# Clean install
rm -rf node_modules .next .turbo
pnpm install
```

### Environment Variables Not Working

**Issue**: Environment variables are undefined
**Solution**: Check Vercel dashboard → Settings → Environment Variables
- Ensure variables are set for "Production"
- Redeploy after adding variables

### Domain Not Resolving

**Issue**: Custom domain shows 404
**Solution**: 
1. Check DNS propagation (use dnschecker.org)
2. Verify domain is added in Vercel dashboard
3. Ensure SSL certificate is issued (may take 1-2 minutes)

### Rate Limiting

**Issue**: Deployment fails due to rate limits
**Solution**: Vercel free tier has limits. Upgrade to Pro:
- Unlimited deployments
- Better performance
- Team collaboration

## Costs

### Vercel Pricing

- **Hobby**: Free (personal projects)
  - 100GB bandwidth/month
  - 100 build hours/month
  
- **Pro**: $20/month per user
  - 1TB bandwidth/month
  - 400 build hours/month
  - Commercial use
  - Team collaboration

### Recommendation

For production Aurelio Platform:
- **Pro Plan** minimum ($20/month)
- Additional bandwidth if needed ($40 per 100GB)
- Consider Enterprise for high-traffic shops

## Security

### Best Practices

1. **Never commit secrets to git**
   - Use `.env.local` (gitignored)
   - Store in Vercel environment variables

2. **Enable Preview Protection**
   - Dashboard → Settings → Deployment Protection
   - Require password for preview deployments

3. **Setup Vercel Firewall**
   - Available on Pro/Enterprise plans
   - DDoS protection
   - Rate limiting

4. **Enable Secure Headers**
   - Configured in `next.config.ts`
   - HSTS, CSP, X-Frame-Options

## Support

### Resources

- 📖 [Vercel Documentation](https://vercel.com/docs)
- 💬 [Vercel Community](https://github.com/vercel/next.js/discussions)
- 🎫 [Vercel Support](https://vercel.com/support)

### Aurelio Platform Support

- 📧 Email: support@aurelio.app
- 📚 Documentation: `/docs` folder in repo
- 💻 GitHub: https://github.com/pathtoresiliencebv/aureliolivingv3.1

---

**Ready to deploy!** Start with `vercel --prod` in each app directory. 🚀

