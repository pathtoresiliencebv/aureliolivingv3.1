# Getting Started with Aurelio Platform

Welcome to Aurelio! This guide will help you set up the platform and create your first shop.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20 or higher
- **pnpm** 8 or higher
- **Docker** and Docker Compose (for local development)
- **Git**

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/aurelio-platform.git
cd aurelio-platform
```

### 2. Run the Setup Script

```bash
chmod +x scripts/dev-setup.sh
./scripts/dev-setup.sh
```

This script will:
- Install all dependencies
- Start Docker services (PostgreSQL, Redis, Listmonk)
- Build shared packages
- Create `.env.local` from `.env.example`

### 3. Configure Environment Variables

Open `.env.local` and add your credentials:

```bash
# Supabase (create project at supabase.com)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Neon (create account at neon.tech)
NEON_API_KEY=your-neon-api-key

# Stripe (get from stripe.com/dashboard)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# ... (see .env.example for all variables)
```

### 4. Setup Supabase Database

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor in your Supabase dashboard
3. Run the migration script from `packages/database/migrations/001_initial_schema.sql`

### 5. Start Development Servers

```bash
pnpm dev
```

This will start:
- Super Admin Dashboard: http://localhost:3000
- User Dashboard: http://localhost:3001
- Storefront: http://localhost:3002

## Creating Your First Shop

### Via Super Admin Dashboard

1. Navigate to http://localhost:3000
2. Sign up with your email
3. Go to "Create New Shop"
4. Fill in shop details:
   - **Shop Name**: Aurelio Living
   - **Slug**: aurelio-living (will become aurelio-living.aurelio.app)
5. Click "Create Shop"

The platform will automatically:
- Create a Neon database for the shop
- Deploy a Medusa instance
- Setup email marketing (Listmonk)
- Configure SMS service (Fonoster)
- Generate subdomain

### Via CLI (for developers)

```bash
cd scripts
node provision-tenant.ts "Aurelio Living" aurelio-living user-123
```

Replace `user-123` with your actual user ID from Supabase.

## Mobile App Setup

### iOS

1. Install Xcode from the App Store
2. Install CocoaPods:
   ```bash
   sudo gem install cocoapods
   ```
3. Navigate to mobile app:
   ```bash
   cd apps/mobile-admin
   ```
4. Install dependencies:
   ```bash
   pnpm install
   cd ios && pod install && cd ..
   ```
5. Start the app:
   ```bash
   pnpm ios
   ```

### Android

1. Install Android Studio
2. Setup Android SDK
3. Navigate to mobile app:
   ```bash
   cd apps/mobile-admin
   ```
4. Start the app:
   ```bash
   pnpm android
   ```

## Project Structure

```
aurelio-platform/
├── apps/
│   ├── platform/           # Super Admin Dashboard
│   ├── user-dashboard/     # Multi-Shop User Dashboard
│   ├── storefront/         # Multi-tenant Storefront
│   ├── mobile-admin/       # Mobile App for Shop Admins
│   └── medusa/             # Medusa E-commerce Backend
├── packages/
│   ├── database/           # Supabase Schemas
│   ├── ui/                 # Aurelio Design System
│   ├── lib/                # Shared Utilities
│   └── ...
└── docs/                   # Documentation
```

## Next Steps

- [Architecture Overview](./architecture.md)
- [Creating a Storefront](./storefront-guide.md)
- [Integrating Payment Providers](./payments.md)
- [Setting Up Marketing Automation](./marketing.md)
- [API Reference](./api-reference.md)

## Need Help?

- 📚 [Full Documentation](./README.md)
- 💬 [Discord Community](https://discord.gg/aurelio)
- 📧 [Email Support](mailto:support@aurelio.app)
- 🐛 [Report Issues](https://github.com/your-org/aurelio-platform/issues)

## Common Issues

### Port Already in Use

If you see "Port 3000 is already in use":

```bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9

# Or change the port in package.json
```

### Docker Services Not Starting

```bash
# Stop all containers
docker-compose down

# Remove volumes and restart
docker-compose down -v
docker-compose up -d
```

### pnpm Install Fails

```bash
# Clear pnpm cache
pnpm store prune

# Reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

---

Happy building with Aurelio! 🚀

