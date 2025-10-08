# 🚀 Aurelio Platform - Quick Start

## Welkom bij Aurelio!

Dit is een **complete multi-tenant e-commerce platform** waarmee je meerdere webshops kunt beheren vanuit één systeem.

## 📋 Wat Zit Er In?

✅ **5 Applications:**
- Super Admin Dashboard (http://localhost:3000)
- User Dashboard voor multi-shop management (http://localhost:3001)
- Multi-tenant Storefront (http://localhost:3002)
- React Native Mobile App voor shop admins
- Medusa v2.0 E-commerce Backend

✅ **3 Shared Packages:**
- `@aurelio/ui` - Design systeem met Aurelio branding
- `@aurelio/lib` - Gedeelde utilities en types
- `@aurelio/database` - Supabase schema en migraties

✅ **Complete Features:**
- Multi-tenant architectuur met database isolatie
- Automated tenant provisioning (Neon databases)
- Payment processing (Stripe + Mollie)
- Domain management met Vercel API
- Email marketing ready (Listmonk)
- SMS marketing ready (Fonoster)
- Mobile app (iOS & Android)

## 🛠️ Installatie

### Stap 1: Vereisten

```bash
node -v    # Moet >= 20.0.0 zijn
pnpm -v    # Moet >= 8.0.0 zijn
docker -v  # Voor lokale development
```

Als je pnpm nog niet hebt:
```bash
npm install -g pnpm
```

### Stap 2: Dependencies Installeren

```bash
pnpm install
```

### Stap 3: Environment Variables

```bash
cp .env.example .env.local
```

Bewerk `.env.local` en voeg je API keys toe:

**Minimaal nodig om te starten:**
```bash
# Supabase (maak account op supabase.com)
NEXT_PUBLIC_SUPABASE_URL=https://jouw-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=jouw-anon-key
SUPABASE_SERVICE_ROLE_KEY=jouw-service-role-key
```

**Optioneel voor volledige functionaliteit:**
- Neon API key (neon.tech) - voor tenant databases
- Stripe keys (stripe.com) - voor payments
- Vercel token - voor domain management

### Stap 4: Database Setup

1. Ga naar [supabase.com](https://supabase.com) en maak een project aan
2. Ga naar SQL Editor in je Supabase dashboard
3. Kopieer de inhoud van `packages/database/migrations/001_initial_schema.sql`
4. Plak en run het script in SQL Editor

### Stap 5: Development Starten

```bash
# Start alle development servers
pnpm dev
```

Dit start:
- **Platform**: http://localhost:3000 (Super Admin)
- **User Dashboard**: http://localhost:3001
- **Storefront**: http://localhost:3002

## 📱 Mobile App

### iOS

```bash
cd apps/mobile-admin
pnpm install
pnpm ios
```

### Android

```bash
cd apps/mobile-admin
pnpm install
pnpm android
```

## 🏪 Je Eerste Shop Aanmaken

### Via Dashboard (Aanbevolen)

1. Ga naar http://localhost:3000
2. Klik op "New Shop"
3. Vul shop naam in (bijv. "Aurelio Living")
4. Klik "Create Shop"
5. Wacht 2-3 minuten voor provisioning

### Via API

```bash
# Eerst een user ID ophalen (na registratie)
# Dan:
curl -X POST http://localhost:3000/api/tenants \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Aurelio Living",
    "ownerId": "jouw-user-id"
  }'
```

## 🎨 Aurelio Branding

Het hele platform gebruikt consistent Aurelio branding:
- **Primary Color**: `#0ea5e9` (Aurelio Blue)
- **Font**: Inter
- **Design System**: `@aurelio/ui` package

## 📚 Belangrijke Bestanden

```
aurelio-living/
├── README.md                    # Project overzicht
├── GETTING_STARTED.md          # Deze file (quick start)
├── DEPLOYMENT_SUMMARY.md       # Complete implementatie overzicht
├── docs/
│   ├── getting-started.md      # Uitgebreide setup guide
│   ├── architecture.md         # Systeem architectuur
│   └── deployment.md           # Production deployment
├── .env.example                # Environment variables template
└── docker-compose.yml          # Lokale development services
```

## 🔧 Veelvoorkomende Problemen

### "Port 3000 already in use"

```bash
# Kill het process
lsof -ti:3000 | xargs kill -9

# Of wijzig de port in package.json
```

### "Cannot find module '@aurelio/ui'"

```bash
# Build shared packages eerst
pnpm --filter @aurelio/ui build
pnpm --filter @aurelio/lib build
```

### Docker services starten niet

```bash
# Reset Docker containers
docker-compose down -v
docker-compose up -d
```

## 🚀 Volgende Stappen

1. **Lees de documentatie**: `docs/getting-started.md`
2. **Bekijk de architectuur**: `docs/architecture.md`
3. **Maak je eerste shop**: Via dashboard of API
4. **Test de mobile app**: `cd apps/mobile-admin && pnpm ios`
5. **Deploy naar production**: Volg `docs/deployment.md`

## 💰 Business Model

- **Base subscription**: €10/maand per shop
- **Transaction fee**: 2% per verkoop
- **Break-even**: ~€250/maand in sales per shop

## 📞 Hulp Nodig?

- 📖 **Docs**: Bekijk de `docs/` folder
- 💬 **Issues**: Open een GitHub issue
- 📧 **Email**: support@aurelio.app

## 🎯 Wat Kan Je Nu Doen?

Het platform is **production-ready** met:

✅ Multi-tenant architecture  
✅ Automated provisioning  
✅ Payment processing  
✅ Domain management  
✅ Mobile app  
✅ Complete documentation  

**Succes met bouwen!** 🚀

---

Made with ❤️ by the Aurelio Team

