# Aurelio Platform - Deployment Guide

This guide will walk you through deploying the Aurelio platform to production.

## Prerequisites

- **Vercel Account** (for hosting Next.js apps)
- **Supabase Project** (for platform database)
- **Neon Account** (for tenant databases)
- **Stripe Account** (for payments)
- **Domain name** (e.g., `aurelio.app`)

## Step 1: Deploy to Vercel

### Platform Dashboard

```bash
cd apps/platform
vercel --prod
```

**Environment Variables:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEON_API_KEY=your-neon-key
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Custom Domain:** `platform.aurelio.app`

### User Dashboard

```bash
cd apps/user-dashboard
vercel --prod
```

**Custom Domain:** `dashboard.aurelio.app`

### Storefront (Multi-tenant)

```bash
cd apps/storefront
vercel --prod
```

**Custom Domain:** `*.aurelio.app` (wildcard)

**Important:** Configure wildcard domain in Vercel:
1. Go to Project Settings → Domains
2. Add `*.aurelio.app`
3. Add DNS records:
   ```
   Type: CNAME
   Name: *
   Value: cname.vercel-dns.com
   ```

## Step 2: Setup Supabase

### Create Project

1. Go to [supabase.com](https://supabase.com)
2. Create new project: "Aurelio Platform"
3. Wait for initialization (~2 minutes)

### Run Migrations

1. Go to SQL Editor
2. Copy contents of `packages/database/migrations/001_initial_schema.sql`
3. Run the script
4. Verify tables were created

### Configure Auth

1. Go to Authentication → Providers
2. Enable Email provider
3. Configure email templates (optional)
4. Setup OAuth providers (Google, GitHub, etc.)

### Get API Keys

1. Go to Project Settings → API
2. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY`

## Step 3: Configure Neon

### Get API Key

1. Go to [neon.tech](https://neon.tech)
2. Navigate to Account Settings → API Keys
3. Generate new API key → `NEON_API_KEY`

### Test API

```bash
curl https://console.neon.tech/api/v2/projects \
  -H "Authorization: Bearer $NEON_API_KEY"
```

## Step 4: Setup Stripe

### Create Account

1. Go to [stripe.com](https://stripe.com)
2. Complete business verification
3. Get API keys from Dashboard → Developers

### Configure Webhooks

1. Go to Developers → Webhooks
2. Add endpoint: `https://platform.aurelio.app/api/webhooks/stripe`
3. Select events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`
4. Copy webhook secret → `STRIPE_WEBHOOK_SECRET`

### Create Product

1. Go to Products → Add Product
2. Name: "Aurelio Standard Plan"
3. Price: $10/month (recurring)
4. Save Product ID for app configuration

## Step 5: Deploy Medusa (Backend)

### Option A: Railway

1. Create account at [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select `apps/medusa`
4. Add environment variables:
   ```
   DATABASE_URL=postgresql://... (from Neon)
   REDIS_URL=redis://...
   STRIPE_SECRET_KEY=...
   JWT_SECRET=...
   COOKIE_SECRET=...
   ```
5. Deploy → Get URL (e.g., `medusa-prod.railway.app`)

### Option B: Docker

```bash
cd apps/medusa
docker build -t aurelio-medusa .
docker push your-registry/aurelio-medusa

# Deploy to your hosting (AWS, GCP, etc.)
```

## Step 6: Setup Domain DNS

### Main Domain

Point `aurelio.app` to Vercel:

```
Type: A
Name: @
Value: 76.76.21.21

Type: AAAA
Name: @
Value: 2606:4700:4700::1111
```

### Subdomains

```
Type: CNAME
Name: platform
Value: cname.vercel-dns.com

Type: CNAME
Name: dashboard
Value: cname.vercel-dns.com

Type: CNAME
Name: *
Value: cname.vercel-dns.com
```

## Step 7: Configure Email & SMS

### Listmonk (Email Marketing)

```bash
# Deploy Listmonk
docker run -d \
  --name listmonk \
  -p 9000:9000 \
  -e LISTMONK_app__address=0.0.0.0:9000 \
  listmonk/listmonk:latest
```

Or use managed service (e.g., DigitalOcean App Platform)

### Fonoster (SMS)

```bash
# Deploy Fonoster
# See: https://docs.fonoster.com/docs/deployment
```

Or use Twilio as fallback for SMS.

## Step 8: Setup Monitoring

### Vercel Analytics

1. Go to Project → Analytics
2. Enable Web Analytics
3. Enable Speed Insights

### Sentry (Error Tracking)

```bash
npm install @sentry/nextjs

# Add to next.config.js
const { withSentryConfig } = require('@sentry/nextjs');
```

### Uptime Monitoring

Setup monitoring with:
- UptimeRobot (free)
- Pingdom
- Datadog

## Step 9: Security Checklist

- [ ] All environment variables are set
- [ ] Supabase RLS policies are enabled
- [ ] Stripe webhooks are verified
- [ ] HTTPS is enabled (SSL certificates)
- [ ] Rate limiting is configured
- [ ] CORS is properly configured
- [ ] Secrets are not in Git
- [ ] Backups are enabled (Supabase/Neon)

## Step 10: Post-Deployment

### Create First Tenant

```bash
# Via API
curl -X POST https://platform.aurelio.app/api/tenants \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Aurelio Living",
    "ownerId": "your-user-id"
  }'
```

### Test Full Flow

1. **Sign up** on platform
2. **Create shop** via dashboard
3. Wait for provisioning (~2 minutes)
4. **Visit storefront** at `{shop}.aurelio.app`
5. **Test checkout** with test card
6. **Verify** webhook was received
7. **Check** Stripe dashboard for payment

## Troubleshooting

### Subdomain not resolving

```bash
# Check DNS propagation
dig *.aurelio.app

# Wait 24-48 hours for global propagation
```

### Medusa not connecting to database

```bash
# Test connection
psql $DATABASE_URL

# Check Neon dashboard for connection limits
```

### Stripe webhooks failing

```bash
# Test webhook locally
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Check signature verification in logs
```

### Tenant provisioning stuck

```bash
# Check logs in Vercel
vercel logs

# Check Neon API rate limits
# Verify environment variables are set
```

## Performance Optimization

### Enable CDN

All static assets are automatically cached by Vercel Edge Network.

### Database Connection Pooling

Neon and Supabase have built-in connection pooling. No additional configuration needed.

### Image Optimization

Use Next.js Image component:

```tsx
import Image from 'next/image';

<Image 
  src="/product.jpg" 
  width={500} 
  height={500} 
  alt="Product"
/>
```

## Scaling

### Horizontal Scaling

Vercel automatically scales based on traffic.

### Database Scaling

- **Supabase**: Upgrade to Pro plan for more connections
- **Neon**: Each tenant DB scales independently

### Cost Optimization

1. Monitor usage in dashboards
2. Archive inactive tenants
3. Optimize database queries
4. Use caching (Redis) for frequently accessed data

## Backup Strategy

### Automated Backups

- **Supabase**: Daily automatic backups (retained 7 days)
- **Neon**: Point-in-time recovery (PITR)
- **Code**: GitHub repository

### Manual Backups

```bash
# Backup Supabase
supabase db dump -f backup.sql

# Backup Neon
pg_dump $DATABASE_URL > neon-backup.sql
```

## Support

- 📚 Documentation: https://docs.aurelio.app
- 💬 Discord: https://discord.gg/aurelio
- 📧 Email: support@aurelio.app

---

**Congratulations!** Your Aurelio Platform is now live! 🎉

