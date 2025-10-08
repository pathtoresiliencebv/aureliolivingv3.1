# Aurelio Platform

> Enterprise Multi-Tenant E-Commerce Platform - Build and manage multiple online stores with ease

![Aurelio Platform](./docs/assets/aurelio-banner.png)

## 🚀 Overview

Aurelio is a comprehensive, multi-tenant e-commerce platform that allows users to create and manage their own online stores with custom domains, integrated payments, marketing automation, AI-powered customer service, and much more. Think Shopify, but open-source and fully customizable.

## ✨ Features

### 🏪 Multi-Tenant Architecture
- **Isolated Databases**: Each store gets its own Neon PostgreSQL database
- **Custom Domains**: Automatic subdomain (`yourstore.aurelio.app`) + custom domain support
- **Unlimited Stores**: Manage multiple stores from a single account

### 💳 Payments & Billing
- **Stripe + Mollie**: Dual payment provider support
- **Subscription Model**: $10/month + 2% transaction fee
- **Automated Billing**: Invoice generation and payment tracking

### 📱 Mobile App (Shop Admins)
- **React Native**: Native iOS and Android apps
- **Real-time Dashboard**: Monitor sales, orders, and inventory
- **Push Notifications**: Order alerts and important updates
- **Offline Mode**: Manage your store even without internet

### 🤖 AI Customer Service
- **Multi-Channel Support**: Email, chat, WhatsApp, social media
- **GPT-4 Chatbot**: Automated responses and ticket routing
- **Agent Dashboard**: Unified inbox for all customer conversations

### 📧 Marketing Automation
- **Email Marketing**: Integrated Listmonk for newsletters and campaigns
- **SMS Marketing**: Fonoster-powered SMS/voice communications
- **Google Ads**: Direct integration for advertising campaigns
- **Social Media**: Facebook, Instagram, and TikTok integrations

### 🚚 Shipping Intelligence
- **Shippoo & ShipEdge**: Automated order fulfillment
- **AI Routing**: Smart carrier selection based on destination
- **Real-time Tracking**: Automatic tracking number updates

### 🛍️ Point of Sale (POS)
- **In-Store Sales**: Touch-optimized POS interface
- **Inventory Sync**: Real-time synchronization with online store
- **Offline Mode**: Continue selling without internet
- **Multi-Location**: Manage multiple physical locations

### 📊 Analytics & SEO
- **Google Analytics 4**: E-commerce tracking and insights
- **Search Console**: SEO monitoring and optimization
- **Product Feeds**: Automatic Google Shopping and TikTok feeds

## 🏗️ Architecture

```
aurelio-platform/
├── apps/
│   ├── platform/              # Super Admin Dashboard (Next.js)
│   ├── user-dashboard/        # Multi-Shop User Dashboard (Next.js)
│   ├── storefront/            # Multi-tenant Storefront (Next.js)
│   ├── mobile-admin/          # Shop Admin Mobile App (React Native)
│   ├── medusa/                # E-commerce Backend (Medusa v2.0)
│   ├── customer-service/      # AI Customer Service (Node.js)
│   ├── listmonk/              # Email Marketing (Go)
│   ├── fonoster/              # SMS/Voice (Node.js)
│   └── pos/                   # Point of Sale (React)
├── packages/
│   ├── database/              # Supabase schemas & migrations
│   ├── ui/                    # Shared React components (Aurelio Design System)
│   ├── lib/                   # Shared utilities
│   ├── shipping/              # Shipping integrations
│   ├── marketing/             # Marketing API clients
│   └── analytics/             # Analytics integrations
└── docs/                      # Documentation
```

## 🛠️ Tech Stack

### Core
- **Frontend**: Next.js 14 (App Router), React Native (Expo)
- **Backend**: Medusa v2.0 (Node.js), Express
- **Database**: Supabase (platform), Neon (tenants)
- **Caching**: Redis
- **Monorepo**: Turborepo + pnpm

### Infrastructure
- **Hosting**: Vercel (frontend), Railway/Render (backend)
- **Auth**: Supabase Auth
- **Payments**: Stripe, Mollie
- **CDN**: Cloudflare

### Integrations
- **AI**: OpenAI GPT-4
- **Email**: Listmonk, SendGrid
- **SMS**: Fonoster
- **Shipping**: Shippoo, ShipEdge
- **Ads**: Google Ads, Meta Business, TikTok

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- pnpm 8+
- PostgreSQL 15+
- Redis
- Docker & Docker Compose (optional)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-org/aurelio-platform.git
cd aurelio-platform
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Setup environment variables**
```bash
cp .env.example .env.local
# Edit .env.local with your credentials
```

4. **Start development servers**
```bash
pnpm dev
```

5. **Access the applications**
- Super Admin: http://localhost:3000
- User Dashboard: http://localhost:3001
- Storefront: http://localhost:3002
- Customer Service: http://localhost:3003

### Docker Setup (Recommended)

```bash
docker-compose up -d
```

## 📱 Mobile App Setup

### iOS
```bash
cd apps/mobile-admin
pnpm ios
```

### Android
```bash
cd apps/mobile-admin
pnpm android
```

## 📚 Documentation

- [Getting Started Guide](./docs/getting-started.md)
- [Architecture Overview](./docs/architecture.md)
- [API Reference](./docs/api-reference.md)
- [Deployment Guide](./docs/deployment.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

## 🗺️ Roadmap

### Phase 1: Foundation ✅
- [x] Monorepo setup
- [x] Base project structure
- [ ] Supabase database schema
- [ ] Medusa v2.0 integration

### Phase 2: Core Features (In Progress)
- [ ] Super Admin Dashboard
- [ ] Tenant provisioning system
- [ ] Multi-tenant storefront
- [ ] Mobile app for admins

### Phase 3: Advanced Features
- [ ] AI customer service
- [ ] Shipping intelligence
- [ ] Email marketing (Listmonk)
- [ ] SMS marketing (Fonoster)

### Phase 4: Integrations
- [ ] Google Ads & Analytics
- [ ] Facebook/Instagram
- [ ] TikTok Shop
- [ ] Product feeds

### Phase 5: POS & Polish
- [ ] Point of Sale system
- [ ] Complete documentation
- [ ] Video tutorials
- [ ] First production tenant (Aurelio Living)

## 💰 Pricing Model

- **Base Subscription**: $10/month per store
- **Transaction Fee**: 2% per sale
- **SMS/Voice**: Pay-as-you-go (carrier rates)
- **Custom Features**: Contact us for enterprise pricing

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](./CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

Built with amazing open-source projects:
- [Medusa](https://medusajs.com) - E-commerce backend
- [Listmonk](https://listmonk.app) - Email marketing
- [Fonoster](https://fonoster.com) - CPaaS platform
- [FinOpenPOS](https://github.com/JoaoHenriqueBarbosa/FinOpenPOS) - POS system
- [Chatwoot](https://chatwoot.com) - Customer service inspiration

## 📧 Contact

- Website: [aurelio.app](https://aurelio.app)
- Email: support@aurelio.app
- Twitter: [@aurelio_platform](https://twitter.com/aurelio_platform)

---

Made with ❤️ by the Aurelio Team

