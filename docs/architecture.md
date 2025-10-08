# Aurelio Platform Architecture

## System Overview

Aurelio is a **multi-tenant e-commerce platform** that enables users to create and manage multiple online stores from a single account. Think of it as "Shopify for entrepreneurs" - but open-source and fully customizable.

## Core Concepts

### Multi-Tenancy

Each "tenant" represents an independent e-commerce store with:
- **Isolated database** (Neon PostgreSQL)
- **Dedicated Medusa backend** instance
- **Unique subdomain** (`shop.aurelio.app`)
- **Optional custom domain** (`shop.com`)

### Platform vs Tenant Data

**Platform Database (Supabase):**
- User accounts and authentication
- Tenant registry (shop metadata)
- Subscriptions and billing
- Domain management
- Cross-tenant analytics

**Tenant Database (Neon):**
- Products and variants
- Orders and customers
- Inventory
- Settings and configuration
- All Medusa-specific data

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     User / Shop Owner                        │
└────────────────────┬────────────────────────────────────────┘
                     │
           ┌─────────┴──────────┐
           │                    │
    ┌──────▼──────┐      ┌─────▼─────┐
    │  Web App    │      │ Mobile App │
    │  (Next.js)  │      │  (React N) │
    └──────┬──────┘      └─────┬──────┘
           │                   │
           └─────────┬─────────┘
                     │
        ┌────────────▼───────────────┐
        │   Vercel Edge Network      │
        │   (Edge Middleware)        │
        └────────────┬───────────────┘
                     │
         ┌───────────┴────────────┐
         │                        │
    ┌────▼─────┐          ┌──────▼──────┐
    │ Platform │          │  Storefront │
    │ Dashboard│          │  (Multi-    │
    │ (Admin)  │          │   tenant)   │
    └────┬─────┘          └──────┬──────┘
         │                       │
         │       ┌───────────────┘
         │       │
    ┌────▼───────▼────┐
    │  Supabase       │ ◄──── Platform Database
    │  (PostgreSQL +  │       - Users
    │   Auth)         │       - Tenants
    └─────────────────┘       - Subscriptions
         │                    - Domains
         │
    ┌────▼───────────────────────────┐
    │  Tenant Resolution Logic       │
    └────┬───────────────────────────┘
         │
    ┌────▼─────┐  ┌─────────┐  ┌─────────┐
    │ Tenant 1 │  │Tenant 2 │  │Tenant N │
    └────┬─────┘  └────┬────┘  └────┬────┘
         │             │            │
    ┌────▼──────┐ ┌───▼─────┐ ┌───▼─────┐
    │ Neon DB 1 │ │Neon DB 2│ │Neon DB N│
    └────┬──────┘ └───┬─────┘ └───┬─────┘
         │            │            │
    ┌────▼──────┐ ┌──▼──────┐ ┌──▼──────┐
    │Medusa 1   │ │Medusa 2 │ │Medusa N │
    │(Railway)  │ │(Railway)│ │(Railway)│
    └───────────┘ └─────────┘ └─────────┘
```

## Key Components

### 1. Edge Middleware (Vercel)

The entry point for all requests. Extracts tenant information from:
- **Subdomain**: `shop.aurelio.app` → tenant: `shop`
- **Custom domain**: `myshop.com` → lookup in domains table

```typescript
// apps/storefront/middleware.ts
export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host');
  const subdomain = hostname.split('.')[0];
  
  // Fetch tenant from Supabase
  const tenant = await getTenantByDomain(subdomain);
  
  // Set in header for downstream consumption
  response.headers.set('x-tenant-slug', tenant.slug);
  return response;
}
```

### 2. Tenant Provisioning

When a new shop is created:

```typescript
1. User creates shop via Platform Dashboard
2. API creates tenant record in Supabase
3. Provisioning job triggered:
   a. Create Neon database
   b. Deploy Medusa instance (Docker/Railway)
   c. Run Medusa migrations on new DB
   d. Setup Listmonk account
   e. Provision Fonoster SMS number
   f. Create Stripe subscription
   g. Configure DNS (subdomain)
4. Update tenant status to 'active'
5. Shop is ready!
```

### 3. Multi-Shop Dashboard

Users with multiple shops see unified view:

```typescript
// Cross-shop analytics
SELECT 
  SUM(order_total) as total_revenue,
  COUNT(*) as total_orders
FROM medusa_orders
WHERE tenant_id IN (user_tenant_ids);

// Aggregated from multiple Neon databases
```

### 4. Data Flow

**Customer places order:**
```
Customer → Storefront → Medusa API (Tenant) → Neon DB (Tenant)
                     ↓
              Supabase (Platform) → Record transaction fee
                     ↓
              Stripe → Charge 2% transaction fee
```

**Admin manages shop:**
```
Admin → Mobile App / Dashboard → Medusa Admin API → Neon DB
                               ↓
                         Supabase → Verify permissions (RLS)
```

## Security Model

### Row Level Security (RLS)

All Supabase tables use RLS:

```sql
-- Users can only see their own tenants
CREATE POLICY "Users can read own tenants" ON tenants
  FOR SELECT USING (
    id IN (
      SELECT tenant_id FROM user_tenants 
      WHERE user_id = auth.uid()
    )
  );
```

### Database Isolation

Each tenant's data is completely isolated:
- **Separate Neon project**
- **Separate connection string**
- **No shared tables**

### API Authentication

- **Platform APIs**: Supabase Auth JWT
- **Medusa APIs**: Medusa JWT (per tenant)
- **Webhooks**: Signature verification (Stripe, Mollie)

## Scalability Considerations

### Current Architecture (< 1000 tenants)
- One Medusa instance per tenant
- One Neon database per tenant
- Cost: ~$30/tenant/month

### Future Architecture (> 1000 tenants)
- **Option 1**: Shared Medusa with schema-per-tenant
- **Option 2**: Kubernetes cluster with auto-scaling
- **Option 3**: Neon branching for staging environments

## Technology Choices

### Why Next.js?
- **Edge Middleware** for tenant resolution
- **Server Components** for fast initial loads
- **API Routes** for backend logic
- **Vercel** for easy deployment

### Why Medusa v2?
- **Headless** - complete API control
- **Modular** - plugins for everything
- **Open source** - no vendor lock-in
- **TypeScript** - type safety

### Why Neon?
- **Serverless** - pay per use
- **Branching** - staging environments
- **Fast provisioning** - ~2 seconds per DB
- **Connection pooling** - built-in

### Why Supabase?
- **Auth** - built-in with RLS
- **Real-time** - for live dashboards
- **Storage** - for images/files
- **Edge Functions** - serverless compute

## Performance

### Target Metrics
- **Storefront load time**: < 1s (LCP)
- **Admin dashboard**: < 500ms (TTFB)
- **API response time**: < 200ms (p95)
- **Database queries**: < 50ms (p99)

### Optimization Strategies
- **Edge caching** - Vercel CDN
- **Database indexes** - on frequently queried fields
- **Connection pooling** - Neon/Supabase built-in
- **React Query** - client-side caching
- **Image optimization** - Next.js Image component

## Disaster Recovery

### Backups
- **Supabase**: Daily automatic backups
- **Neon**: Point-in-time recovery (PITR)
- **Code**: Git + GitHub

### Monitoring
- **Vercel Analytics** - performance monitoring
- **Sentry** - error tracking
- **Datadog** - infrastructure monitoring
- **Custom dashboards** - Grafana

## Cost Breakdown

### Per Tenant
- Neon database: $0-20/month
- Medusa hosting: $5-10/month
- Vercel: $0 (included in Pro)
- **Total**: ~$5-30/month

### Revenue
- Base subscription: $10/month
- Transaction fee: 2% per sale
- **Break-even**: ~$250/month in sales

## Future Enhancements

1. **Multi-region** - deploy closer to customers
2. **A/B testing** - built-in experimentation
3. **AI recommendations** - product suggestions
4. **Advanced analytics** - cohort analysis
5. **White-label** - fully branded platform

---

For more details, see:
- [Getting Started Guide](./getting-started.md)
- [API Reference](./api-reference.md)
- [Deployment Guide](./deployment.md)

