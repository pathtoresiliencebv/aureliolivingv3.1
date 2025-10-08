# ��� Vercel Deployment - 5 Minuten Setup

## Stap 1: Ga naar Vercel
https://vercel.com → Login met GitHub

## Stap 2: Import Repository  
Add New → Project → Import: `aureliolivingv3.1`

## Stap 3: Platform Configuratie
```
Name: aurelio-platform
Root: apps/platform  
Build: pnpm install && pnpm build
Install: npm install -g pnpm@8.15.4 && cd ../.. && pnpm install --no-frozen-lockfile
```

**Environment Variables** (5x toevoegen):
- `NEXT_PUBLIC_SUPABASE_URL` = https://xxx.supabase.co
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = eyJ...
- `SUPABASE_SERVICE_ROLE_KEY` = eyJ...
- `STRIPE_SECRET_KEY` = sk_test...
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = pk_test...

→ Deploy!

## Stap 4: Storefront Deployment
Same repo, andere config:
```
Name: aurelio-living
Root: apps/storefront
Build: pnpm install && pnpm build  
Install: npm install -g pnpm@8.15.4 && cd ../.. && pnpm install --no-frozen-lockfile
```

**Environment Variables** (2x):
- `NEXT_PUBLIC_SUPABASE_URL` (zelfde)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (zelfde)

→ Deploy!

## Klaar! ✅
Platform: https://aurelio-platform.vercel.app
Storefront: https://aurelio-living.vercel.app

Volledige guide: ENVIRONMENT_VARIABLES.md
