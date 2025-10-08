# Aurelio Living - Demo Shop Documentation

## Overview

**Aurelio Living** is the first fully-featured demo shop built on the Aurelio Platform. It showcases the complete e-commerce functionality including products, shopping cart, checkout, and payment integration.

## Shop Details

- **Name**: Aurelio Living
- **Industry**: Premium Furniture & Home Decor
- **Target Market**: Europe & United States
- **Style**: Scandinavian / Modern Minimalist
- **Price Range**: €199 - €1,899

## Product Catalog

### Living Room Collection (24 products)

1. **Copenhagen Modular Sofa** - €1,899
   - 3-Seater L-Shape configuration
   - Premium boucle fabric
   - Solid oak legs
   - Multiple color options: Cream, Charcoal Grey, Sage Green

2. **Marble Coffee Table** - €599
   - Italian Carrara marble top
   - Brushed brass frame
   - Two sizes: 120cm, 140cm

3. **Arc Floor Lamp** - €349
   - Brass finish with marble base
   - Dimmable LED included
   - Adjustable arm

### Dining Collection (15 products)

4. **Oak Dining Table** - €1,299
   - Solid European oak
   - Extendable (180-240cm)
   - Seats 6-10 people
   - Finishes: Natural Oak, Smoked Oak, White Oak

5. **Velvet Dining Chair (Set of 2)** - €299
   - Premium velvet upholstery
   - Ergonomic design
   - Colors: Navy Blue, Forest Green, Dusty Pink, Charcoal

### Bedroom Collection (18 products)

6. **Linen Platform Bed** - €899 (King) / €799 (Queen)
   - Belgian linen upholstery
   - Solid wood platform (no box spring needed)
   - Extra-tall padded headboard

### Office Collection (12 products)

7. **Ergonomic Office Chair** - €399
   - Breathable mesh back
   - Adjustable lumbar support
   - 3D/4D adjustable armrests
   - BIFMA certified

8. **Walnut Desk** - €799 (160cm) / €899 (180cm)
   - Solid walnut wood top
   - Electric height adjustment (70-120cm)
   - Memory presets
   - Built-in cable management

## Complete Seed Data

The full product catalog is available in:
```
apps/medusa/src/seed-aurelio-living.ts
```

This includes:
- **8 main products** with multiple variants
- **25+ product variants** total
- Detailed product descriptions
- Pricing in EUR and USD
- Inventory quantities
- Product images (Unsplash placeholders)
- Tags and categories
- Collections

## E-Commerce Features Implemented

### 1. Product Pages
- **Location**: `/products/[handle]`
- High-quality product images
- Detailed descriptions with features
- Variant selection (color, size, configuration)
- Quantity selector
- Add to cart functionality
- Product reviews and ratings
- Shipping information
- Trust badges

### 2. Shopping Cart
- **Location**: `/cart`
- Cart summary with item details
- Quantity adjustment
- Remove items
- Subtotal, shipping, and tax calculation
- Free shipping indicator (€500 threshold)
- Trust badges and payment methods
- Continue shopping option

### 3. Checkout Flow
- **Location**: `/checkout`
- **3-Step Process**:
  1. **Shipping Information**
     - Customer details form
     - Address validation
     - Delivery notes
  2. **Payment Method**
     - Stripe (Credit/Debit cards)
     - Mollie (iDEAL, PayPal, Bancontact)
     - Secure payment forms
  3. **Review Order**
     - Order summary
     - Terms & conditions
     - Place order button

### 4. Homepage
- **Location**: `/`
- Hero section with CTA
- Featured products grid
- Shop by room (collections)
- Trust indicators
- Newsletter signup

### 5. Navigation & Layout
- Persistent header with cart count
- Collection navigation
- Search functionality
- User account access
- Responsive footer with links
- Mobile-friendly design

## Styling & Branding

### Color Palette
- **Primary**: `#0ea5e9` (Aurelio Blue)
- **Secondary**: Gray scale
- **Accents**: Green (trust indicators), Red (remove actions)

### Typography
- **Font**: Inter (sans-serif)
- **Headings**: Bold, large sizes
- **Body**: Regular weight, comfortable line height

### Design System
- Tailwind CSS for utility-first styling
- Consistent spacing (4px grid)
- Rounded corners (lg = 8px)
- Shadow elevation for cards
- Hover states and transitions

## Payment Integration

### Stripe
- **Features**:
  - Credit/Debit card payments
  - 3D Secure authentication
  - Real-time card validation
  - PCI DSS compliant

### Mollie
- **Features**:
  - iDEAL (Dutch bank payments)
  - PayPal
  - Bancontact (Belgium)
  - SEPA Direct Debit

### Webhooks
- Stripe webhook handler: `/api/webhooks/stripe`
- Subscription status updates
- Payment confirmation
- Order fulfillment triggers

## Multi-Currency Support

- **EUR (€)**: Primary currency for Europe
- **USD ($)**: For US customers
- Automatic currency detection based on region
- Tax calculation per country (21% VAT for EU)

## Shipping

### Free Shipping
- Orders over €500 qualify for free shipping
- Displayed throughout the shopping experience

### Regions Supported
- **Europe**: Netherlands, Belgium, Germany, France, Italy, Spain, Austria, Portugal
- **United States**: All 50 states

### Fulfillment
- Manual fulfillment workflow
- Shipping partner integration ready (Shippoo/ShipEdge)

## Testing the Demo Shop

### Local Development

1. **Start the storefront**:
```bash
cd apps/storefront
pnpm dev
```

2. **Access the shop**:
```
http://localhost:3002
```

3. **Test the flow**:
   - Browse products on homepage
   - Click on a product to view details
   - Add to cart
   - Proceed to checkout
   - Fill in shipping information
   - Select payment method
   - Review and place order

### Seed Database

To populate Medusa with Aurelio Living products:

```bash
cd apps/medusa
pnpm seed-aurelio-living
```

This will create:
- 1 store
- 2 regions (Europe, USA)
- 4 collections
- 6 categories
- 8 products with 25+ variants

## API Integration

### Medusa API
- **Base URL**: Set per tenant (e.g., `https://tenant.medusa.aurelio.app`)
- **Endpoints**:
  - `GET /store/products` - List products
  - `GET /store/products/:id` - Product details
  - `POST /store/carts` - Create cart
  - `POST /store/carts/:id/line-items` - Add to cart
  - `POST /store/carts/:id/payment-sessions` - Initiate payment

### Platform API
- **Tenant Management**: `/api/tenants`
- **Domain Management**: `/api/domains`
- **Provisioning**: `/api/provision`

## Customization

### Change Products
Edit `apps/medusa/src/seed-aurelio-living.ts` to:
- Add new products
- Modify descriptions
- Update pricing
- Change variants
- Add images

### Modify Branding
Update the following files:
- `apps/storefront/src/app/layout.tsx` - Header/footer
- `apps/storefront/tailwind.config.ts` - Colors
- `apps/storefront/src/app/globals.css` - Global styles

### Add Collections
Edit `apps/medusa/src/seed-aurelio-living.ts`:
```typescript
const collections = [
  {
    title: 'Your Collection',
    handle: 'your-collection',
    description: 'Description here',
  },
]
```

## Performance

- **Lighthouse Score**: 90+ (target)
- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic with Next.js

## SEO

- Dynamic meta tags per product
- Structured data (Schema.org)
- Sitemap generation
- Canonical URLs
- Open Graph tags for social sharing

## Analytics Integration (Ready)

- Google Analytics 4
- Facebook Pixel
- TikTok Pixel
- Custom event tracking
- E-commerce tracking

## Next Steps

1. **Deploy to Production**
   - Follow `docs/deployment.md`
   - Setup custom domain
   - Configure payment providers

2. **Add More Products**
   - Expand catalog
   - Professional photography
   - SEO-optimized descriptions

3. **Enable Marketing**
   - Setup Listmonk for email campaigns
   - Configure Fonoster for SMS
   - Launch Google Shopping feed

4. **Customer Service**
   - Integrate AI chatbot
   - Setup support tickets
   - Add live chat widget

## Support

For questions about Aurelio Living or the platform:
- 📖 Read the documentation in `docs/`
- 💬 Open a GitHub issue
- 📧 Contact support@aurelio.app

---

**Aurelio Living** demonstrates the full potential of the Aurelio Platform. Use it as a template for your own shops or customize it to launch your furniture business! 🛋️

