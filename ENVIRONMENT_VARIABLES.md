# 🔑 Environment Variables Guide - Aurelio Platform

## Overview

Dit document bevat alle environment variables die nodig zijn voor het deployen van het Aurelio Platform naar Vercel.

---

## 📦 GitHub Repository

**Repository**: `pathtoresiliencebv/aureliolivingv3.1`
- URL: https://github.com/pathtoresiliencebv/aureliolivingv3.1

**Te deployen apps**:
1. `apps/platform` - Super Admin Dashboard
2. `apps/storefront` - Aurelio Living Shop  
3. `apps/user-dashboard` - User Dashboard (optioneel)

---

## 🚀 Required Variables (Minimaal om te starten)

### **Platform (Super Admin Dashboard)**

#### **Supabase** ✅ REQUIRED
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Hoe te verkrijgen:**
1. Ga naar https://supabase.com/dashboard
2. Selecteer je project (of maak nieuwe aan)
3. Settings → API
4. Kopieer:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY` ⚠️

#### **Stripe** ✅ REQUIRED
```bash
STRIPE_SECRET_KEY=sk_test_51... (of sk_live_...)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51... (of pk_live_...)
```

**Hoe te verkrijgen:**
1. Ga naar https://dashboard.stripe.com/apikeys
2. Voor TEST mode:
   - Toggle "Test mode" aan (rechtsboven)
   - Kopieer "Secret key" → `STRIPE_SECRET_KEY`
   - Kopieer "Publishable key" → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### **Storefront (Aurelio Living)**

#### **Supabase** ✅ REQUIRED
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

*Gebruik dezelfde Supabase keys als Platform*

---

## 🔧 Optional Variables (Voor productie features)

### **Stripe Webhooks** (voor subscription events)
```bash
STRIPE_WEBHOOK_SECRET=whsec_...
```

**Setup:**
1. Deploy platform eerst zonder webhook secret
2. Ga naar https://dashboard.stripe.com/webhooks
3. Klik "Add endpoint"
4. Webhook URL: `https://jouw-platform-url.vercel.app/api/webhooks/stripe`
5. Selecteer events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
6. Kopieer "Signing secret" → `STRIPE_WEBHOOK_SECRET`
7. Update Vercel environment variables

### **Mollie** (Nederlandse payment provider)
```bash
MOLLIE_API_KEY=test_dHar4XY7LxsDOtmnkVtjNVWXLSlXsM (of live_...)
```

**Hoe te verkrijgen:**
1. Ga naar https://www.mollie.com/dashboard/developers/api-keys
2. Kopieer Test of Live API key

### **Neon** (voor tenant databases)
```bash
NEON_API_KEY=your-neon-api-key
```

**Hoe te verkrijgen:**
1. Ga naar https://console.neon.tech
2. Account settings → API Keys
3. Create new API key
4. Kopieer key

### **Vercel API** (voor custom domain management)
```bash
VERCEL_TOKEN=your-vercel-token
VERCEL_PROJECT_ID=prj_...
VERCEL_TEAM_ID=team_...
```

**Hoe te verkrijgen:**
1. Ga naar https://vercel.com/account/tokens
2. Create Token
3. Scope: "Full Access" (voor domain management)
4. Kopieer token → `VERCEL_TOKEN`
5. Project ID vind je in project settings URL

### **Medusa Backend** (e-commerce API)
```bash
NEXT_PUBLIC_MEDUSA_API_URL=https://your-medusa.railway.app
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_...
```

*Medusa moet apart gehost worden (Railway, Render, etc.)*

### **Analytics**
```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=123456789
NEXT_PUBLIC_TIKTOK_PIXEL_ID=ABCDEFGHIJK
```

**Google Analytics:**
1. Ga naar https://analytics.google.com
2. Admin → Data Streams
3. Kopieer Measurement ID

**Facebook Pixel:**
1. Ga naar https://business.facebook.com/events_manager
2. Kopieer Pixel ID

### **Marketing Tools**

#### **Listmonk** (Email marketing)
```bash
LISTMONK_API_URL=https://your-listmonk.com
LISTMONK_USERNAME=admin
LISTMONK_PASSWORD=your-password
```

#### **Fonoster** (SMS marketing)
```bash
FONOSTER_API_KEY=your-api-key
FONOSTER_PROJECT_ID=your-project-id
```

### **AI Features**
```bash
OPENAI_API_KEY=sk-...
```

**Hoe te verkrijgen:**
1. Ga naar https://platform.openai.com/api-keys
2. Create new secret key
3. Kopieer key

---

## 📋 Vercel Deployment Checklist

### **Step 1: Deploy Platform**

1. Ga naar https://vercel.com
2. Klik "Add New... → Project"
3. Select GitHub repository: `aureliolivingv3.1`
4. Configure:
   ```
   Project Name: aurelio-platform
   Framework: Next.js
   Root Directory: apps/platform
   Build Command: cd ../.. && pnpm install && pnpm build --filter=platform
   Output Directory: .next
   Install Command: (leave empty)
   ```
5. Add Environment Variables:
   - [ ] `NEXT_PUBLIC_SUPABASE_URL`
   - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - [ ] `SUPABASE_SERVICE_ROLE_KEY`
   - [ ] `STRIPE_SECRET_KEY`
   - [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - [ ] (Optional) andere variables

6. Click "Deploy"

### **Step 2: Deploy Storefront**

1. Same Vercel account, klik "Add New... → Project"
2. Select SAME GitHub repository: `aureliolivingv3.1`
3. Configure:
   ```
   Project Name: aurelio-living
   Framework: Next.js
   Root Directory: apps/storefront
   Build Command: cd ../.. && pnpm install && pnpm build --filter=storefront
   Output Directory: .next
   Install Command: (leave empty)
   ```
4. Add Environment Variables:
   - [ ] `NEXT_PUBLIC_SUPABASE_URL`
   - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - [ ] (Optional) Medusa URL

5. Click "Deploy"

### **Step 3: Setup Supabase Database**

1. Ga naar je Supabase project
2. SQL Editor → New Query
3. Kopieer en run: `packages/database/migrations/001_initial_schema.sql`

### **Step 4: Setup Stripe Webhooks** (als je subscriptions gebruikt)

1. Get deployed platform URL (bijv. `https://aurelio-platform.vercel.app`)
2. Ga naar https://dashboard.stripe.com/webhooks
3. Add endpoint: `https://aurelio-platform.vercel.app/api/webhooks/stripe`
4. Select events (zie boven)
5. Copy webhook secret
6. Update Vercel environment variable: `STRIPE_WEBHOOK_SECRET`
7. Redeploy platform

---

## 🔒 Security Best Practices

### **NEVER commit to Git:**
- ❌ `SUPABASE_SERVICE_ROLE_KEY`
- ❌ `STRIPE_SECRET_KEY`
- ❌ `STRIPE_WEBHOOK_SECRET`
- ❌ `MOLLIE_API_KEY`
- ❌ `VERCEL_TOKEN`
- ❌ `OPENAI_API_KEY`

### **OK to be public:**
- ✅ `NEXT_PUBLIC_SUPABASE_URL`
- ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- ✅ `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- ✅ `NEXT_PUBLIC_*` variables (they're in client-side code anyway)

### **Environment per Vercel Environment:**

Set different values for:
- **Development**: Test keys
- **Preview**: Test keys
- **Production**: Live keys

---

## 🆘 Troubleshooting

### "Missing environment variable"
→ Check Vercel Dashboard → Project → Settings → Environment Variables

### "Supabase connection failed"
→ Verify URL ends with `.supabase.co` (no trailing slash)
→ Check anon key starts with `eyJ...`

### "Stripe error"
→ Make sure you're using matching keys (both test or both live)
→ Check test mode toggle in Stripe dashboard

### "Build failed"
→ Check build command includes `cd ../..` (for monorepo)
→ Verify Root Directory is set correctly

---

## 📞 Support

- 📖 Docs: Check `/docs` folder in repo
- 💻 GitHub: https://github.com/pathtoresiliencebv/aureliolivingv3.1
- 📧 Email: support@aurelio.app

---

**Last updated**: October 2024
**Version**: v3.1

