/**
 * Seed script for Aurelio Living - Premium Furniture Store
 * Includes real product data for testing the complete e-commerce flow
 */

import { MedusaContainer } from '@medusajs/framework/types'

interface Product {
  title: string
  subtitle: string
  description: string
  handle: string
  is_giftcard: boolean
  weight: number
  images: string[]
  options: Array<{
    title: string
    values: string[]
  }>
  variants: Array<{
    title: string
    sku: string
    prices: Array<{
      amount: number
      currency_code: string
    }>
    inventory_quantity: number
    options: Record<string, string>
  }>
  tags?: string[]
  collection?: string
  categories?: string[]
}

const collections = [
  {
    title: 'Living Room',
    handle: 'living-room',
    description: 'Elegant furniture for your living space',
  },
  {
    title: 'Bedroom',
    handle: 'bedroom',
    description: 'Comfortable and stylish bedroom furniture',
  },
  {
    title: 'Dining',
    handle: 'dining',
    description: 'Perfect pieces for family meals',
  },
  {
    title: 'Office',
    handle: 'office',
    description: 'Professional furniture for your workspace',
  },
]

const categories = [
  { name: 'Sofas & Couches', handle: 'sofas-couches' },
  { name: 'Tables', handle: 'tables' },
  { name: 'Chairs', handle: 'chairs' },
  { name: 'Beds', handle: 'beds' },
  { name: 'Storage', handle: 'storage' },
  { name: 'Lighting', handle: 'lighting' },
]

const products: Product[] = [
  // Living Room
  {
    title: 'Copenhagen Modular Sofa',
    subtitle: '3-Seater L-Shape in Boucle Fabric',
    description: `Experience ultimate comfort with our Copenhagen Modular Sofa. Handcrafted with premium boucle fabric and solid oak legs, this sofa combines Scandinavian design with modern luxury.

Features:
• Premium boucle fabric upholstery
• Solid oak wooden legs with natural finish
• High-density foam cushions for maximum comfort
• Modular design - rearrange as needed
• Removable and washable covers
• Dimensions: 280cm W x 160cm D x 85cm H
• Made in Europe

Perfect for modern living rooms, this sofa seats up to 5 people comfortably. The neutral cream color complements any interior style.`,
    handle: 'copenhagen-modular-sofa',
    is_giftcard: false,
    weight: 85000,
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
    ],
    options: [
      {
        title: 'Color',
        values: ['Cream Boucle', 'Charcoal Grey', 'Sage Green'],
      },
      {
        title: 'Configuration',
        values: ['Left L-Shape', 'Right L-Shape', 'Straight 3-Seater'],
      },
    ],
    variants: [
      {
        title: 'Cream Boucle / Left L-Shape',
        sku: 'CMS-CB-LLS',
        prices: [
          { amount: 189900, currency_code: 'eur' },
          { amount: 199900, currency_code: 'usd' },
        ],
        inventory_quantity: 15,
        options: { Color: 'Cream Boucle', Configuration: 'Left L-Shape' },
      },
      {
        title: 'Cream Boucle / Right L-Shape',
        sku: 'CMS-CB-RLS',
        prices: [
          { amount: 189900, currency_code: 'eur' },
          { amount: 199900, currency_code: 'usd' },
        ],
        inventory_quantity: 12,
        options: { Color: 'Cream Boucle', Configuration: 'Right L-Shape' },
      },
      {
        title: 'Charcoal Grey / Left L-Shape',
        sku: 'CMS-CG-LLS',
        prices: [
          { amount: 189900, currency_code: 'eur' },
          { amount: 199900, currency_code: 'usd' },
        ],
        inventory_quantity: 8,
        options: { Color: 'Charcoal Grey', Configuration: 'Left L-Shape' },
      },
    ],
    tags: ['bestseller', 'premium', 'scandinavian'],
    collection: 'living-room',
    categories: ['sofas-couches'],
  },
  {
    title: 'Marble Coffee Table',
    subtitle: 'Italian Carrara Marble with Brass Frame',
    description: `Elevate your living space with this stunning marble coffee table. Featuring genuine Italian Carrara marble and a handcrafted brass frame.

Features:
• Authentic Carrara marble top
• Brushed brass steel frame
• Anti-slip rubber pads
• Heat and stain resistant
• Dimensions: 120cm W x 70cm D x 45cm H
• Weight capacity: 100kg
• Easy to clean and maintain

The natural veining in the marble makes each piece unique. This timeless design complements both modern and classic interiors.`,
    handle: 'marble-coffee-table',
    is_giftcard: false,
    weight: 45000,
    images: [
      'https://images.unsplash.com/photo-1565191999001-551c187427bb?w=800',
      'https://images.unsplash.com/photo-1617096200347-cb04ae810b1d?w=800',
    ],
    options: [
      {
        title: 'Size',
        values: ['120cm', '140cm'],
      },
      {
        title: 'Frame Color',
        values: ['Brass', 'Black Steel', 'Chrome'],
      },
    ],
    variants: [
      {
        title: '120cm / Brass',
        sku: 'MCT-120-BR',
        prices: [
          { amount: 59900, currency_code: 'eur' },
          { amount: 64900, currency_code: 'usd' },
        ],
        inventory_quantity: 25,
        options: { Size: '120cm', 'Frame Color': 'Brass' },
      },
      {
        title: '140cm / Brass',
        sku: 'MCT-140-BR',
        prices: [
          { amount: 69900, currency_code: 'eur' },
          { amount: 74900, currency_code: 'usd' },
        ],
        inventory_quantity: 18,
        options: { Size: '140cm', 'Frame Color': 'Brass' },
      },
    ],
    tags: ['luxury', 'marble', 'italian'],
    collection: 'living-room',
    categories: ['tables'],
  },
  // Dining
  {
    title: 'Oak Dining Table',
    subtitle: 'Solid Wood Extendable Table',
    description: `A timeless dining table crafted from solid European oak. Features an innovative extension mechanism for hosting larger gatherings.

Features:
• 100% solid European oak
• Natural oil finish
• Extends from 180cm to 240cm
• Seats 6-10 people
• Smooth extension mechanism
• Dimensions: 180-240cm L x 90cm W x 75cm H
• Sustainable FSC certified wood
• 10-year structural warranty

Perfect for family dinners and entertaining guests. The natural grain patterns showcase the beauty of authentic oak wood.`,
    handle: 'oak-dining-table',
    is_giftcard: false,
    weight: 72000,
    images: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800',
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800',
    ],
    options: [
      {
        title: 'Finish',
        values: ['Natural Oak', 'Smoked Oak', 'White Oak'],
      },
      {
        title: 'Base Style',
        values: ['Classic Legs', 'Trestle Base'],
      },
    ],
    variants: [
      {
        title: 'Natural Oak / Classic Legs',
        sku: 'ODT-NO-CL',
        prices: [
          { amount: 129900, currency_code: 'eur' },
          { amount: 139900, currency_code: 'usd' },
        ],
        inventory_quantity: 12,
        options: { Finish: 'Natural Oak', 'Base Style': 'Classic Legs' },
      },
      {
        title: 'Smoked Oak / Classic Legs',
        sku: 'ODT-SO-CL',
        prices: [
          { amount: 139900, currency_code: 'eur' },
          { amount: 149900, currency_code: 'usd' },
        ],
        inventory_quantity: 8,
        options: { Finish: 'Smoked Oak', 'Base Style': 'Classic Legs' },
      },
    ],
    tags: ['bestseller', 'wood', 'extendable'],
    collection: 'dining',
    categories: ['tables'],
  },
  {
    title: 'Velvet Dining Chair',
    subtitle: 'Set of 2 - Upholstered in Premium Velvet',
    description: `Add a touch of elegance to your dining room with these luxurious velvet chairs. Sold as a set of 2.

Features:
• Premium velvet upholstery
• High-density foam padding
• Solid beech wood legs
• Weight capacity: 150kg per chair
• Dimensions: 48cm W x 56cm D x 88cm H (Seat height: 48cm)
• Non-slip leg caps
• Easy assembly (15 minutes)

The ergonomic backrest provides excellent lumbar support for comfortable dining. Available in multiple colors to match your interior.`,
    handle: 'velvet-dining-chair',
    is_giftcard: false,
    weight: 9000,
    images: [
      'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800',
      'https://images.unsplash.com/photo-1586158291800-2665f07bba79?w=800',
    ],
    options: [
      {
        title: 'Color',
        values: ['Navy Blue', 'Forest Green', 'Dusty Pink', 'Charcoal'],
      },
      {
        title: 'Quantity',
        values: ['Set of 2', 'Set of 4', 'Set of 6'],
      },
    ],
    variants: [
      {
        title: 'Navy Blue / Set of 2',
        sku: 'VDC-NB-2',
        prices: [
          { amount: 29900, currency_code: 'eur' },
          { amount: 32900, currency_code: 'usd' },
        ],
        inventory_quantity: 40,
        options: { Color: 'Navy Blue', Quantity: 'Set of 2' },
      },
      {
        title: 'Forest Green / Set of 2',
        sku: 'VDC-FG-2',
        prices: [
          { amount: 29900, currency_code: 'eur' },
          { amount: 32900, currency_code: 'usd' },
        ],
        inventory_quantity: 35,
        options: { Color: 'Forest Green', Quantity: 'Set of 2' },
      },
      {
        title: 'Navy Blue / Set of 4',
        sku: 'VDC-NB-4',
        prices: [
          { amount: 56900, currency_code: 'eur' },
          { amount: 62900, currency_code: 'usd' },
        ],
        inventory_quantity: 20,
        options: { Color: 'Navy Blue', Quantity: 'Set of 4' },
      },
    ],
    tags: ['dining', 'velvet', 'set'],
    collection: 'dining',
    categories: ['chairs'],
  },
  // Bedroom
  {
    title: 'Linen Platform Bed',
    subtitle: 'King Size with Upholstered Headboard',
    description: `Experience luxury sleep with our Linen Platform Bed. Features a sophisticated upholstered headboard and sturdy platform base.

Features:
• Premium Belgian linen upholstery
• Solid wood platform base (no box spring needed)
• Extra-tall padded headboard (ideal for reading)
• Central support beam for durability
• Dimensions: 180cm W x 200cm L (King Size)
• Compatible with all mattress types
• Easy assembly with included tools
• 5-year warranty

The natural linen fabric creates a serene, luxurious atmosphere in your bedroom. Strong platform supports up to 250kg.`,
    handle: 'linen-platform-bed',
    is_giftcard: false,
    weight: 68000,
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800',
    ],
    options: [
      {
        title: 'Size',
        values: ['Queen (160x200cm)', 'King (180x200cm)'],
      },
      {
        title: 'Color',
        values: ['Natural Linen', 'Grey Linen', 'Navy Linen'],
      },
    ],
    variants: [
      {
        title: 'King (180x200cm) / Natural Linen',
        sku: 'LPB-K-NL',
        prices: [
          { amount: 89900, currency_code: 'eur' },
          { amount: 99900, currency_code: 'usd' },
        ],
        inventory_quantity: 15,
        options: { Size: 'King (180x200cm)', Color: 'Natural Linen' },
      },
      {
        title: 'Queen (160x200cm) / Natural Linen',
        sku: 'LPB-Q-NL',
        prices: [
          { amount: 79900, currency_code: 'eur' },
          { amount: 89900, currency_code: 'usd' },
        ],
        inventory_quantity: 18,
        options: { Size: 'Queen (160x200cm)', Color: 'Natural Linen' },
      },
      {
        title: 'King (180x200cm) / Grey Linen',
        sku: 'LPB-K-GL',
        prices: [
          { amount: 89900, currency_code: 'eur' },
          { amount: 99900, currency_code: 'usd' },
        ],
        inventory_quantity: 12,
        options: { Size: 'King (180x200cm)', Color: 'Grey Linen' },
      },
    ],
    tags: ['bedroom', 'premium', 'linen'],
    collection: 'bedroom',
    categories: ['beds'],
  },
  // Office
  {
    title: 'Ergonomic Office Chair',
    subtitle: 'Premium Mesh with Lumbar Support',
    description: `Work comfortably all day with our ergonomic office chair. Designed with input from physiotherapists.

Features:
• Breathable mesh back
• Adjustable lumbar support
• 3D adjustable armrests
• Synchronized tilt mechanism
• Gas lift height adjustment (45-55cm)
• Heavy-duty casters for all floor types
• Weight capacity: 150kg
• Dimensions: 65cm W x 60cm D x 110-120cm H
• BIFMA certified
• 5-year warranty

Reduces back pain and improves posture during long work sessions. Perfect for home offices and corporate environments.`,
    handle: 'ergonomic-office-chair',
    is_giftcard: false,
    weight: 18000,
    images: [
      'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800',
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800',
    ],
    options: [
      {
        title: 'Color',
        values: ['Black', 'Grey', 'Blue'],
      },
      {
        title: 'Armrest Type',
        values: ['Fixed', '3D Adjustable', '4D Adjustable'],
      },
    ],
    variants: [
      {
        title: 'Black / 3D Adjustable',
        sku: 'EOC-BK-3D',
        prices: [
          { amount: 39900, currency_code: 'eur' },
          { amount: 44900, currency_code: 'usd' },
        ],
        inventory_quantity: 50,
        options: { Color: 'Black', 'Armrest Type': '3D Adjustable' },
      },
      {
        title: 'Grey / 3D Adjustable',
        sku: 'EOC-GR-3D',
        prices: [
          { amount: 39900, currency_code: 'eur' },
          { amount: 44900, currency_code: 'usd' },
        ],
        inventory_quantity: 45,
        options: { Color: 'Grey', 'Armrest Type': '3D Adjustable' },
      },
      {
        title: 'Black / 4D Adjustable',
        sku: 'EOC-BK-4D',
        prices: [
          { amount: 49900, currency_code: 'eur' },
          { amount: 54900, currency_code: 'usd' },
        ],
        inventory_quantity: 30,
        options: { Color: 'Black', 'Armrest Type': '4D Adjustable' },
      },
    ],
    tags: ['office', 'ergonomic', 'bestseller'],
    collection: 'office',
    categories: ['chairs'],
  },
  {
    title: 'Walnut Desk',
    subtitle: 'Modern Standing Desk with Cable Management',
    description: `A beautiful walnut desk with electric height adjustment. Perfect for modern work-from-home setups.

Features:
• Solid walnut wood top
• Electric height adjustment (70-120cm)
• Memory presets for 3 positions
• Anti-collision technology
• Built-in cable management
• USB charging ports (2x USB-A, 1x USB-C)
• Dimensions: 160cm W x 80cm D
• Load capacity: 80kg
• Whisper-quiet motor
• 3-year warranty

Switch between sitting and standing throughout your workday. Promotes better posture and increased energy.`,
    handle: 'walnut-desk',
    is_giftcard: false,
    weight: 52000,
    images: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800',
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800',
    ],
    options: [
      {
        title: 'Size',
        values: ['140cm', '160cm', '180cm'],
      },
      {
        title: 'Wood Finish',
        values: ['Natural Walnut', 'Dark Walnut', 'White Oak'],
      },
    ],
    variants: [
      {
        title: '160cm / Natural Walnut',
        sku: 'WD-160-NW',
        prices: [
          { amount: 79900, currency_code: 'eur' },
          { amount: 89900, currency_code: 'usd' },
        ],
        inventory_quantity: 20,
        options: { Size: '160cm', 'Wood Finish': 'Natural Walnut' },
      },
      {
        title: '180cm / Natural Walnut',
        sku: 'WD-180-NW',
        prices: [
          { amount: 89900, currency_code: 'eur' },
          { amount: 99900, currency_code: 'usd' },
        ],
        inventory_quantity: 15,
        options: { Size: '180cm', 'Wood Finish': 'Natural Walnut' },
      },
    ],
    tags: ['office', 'standing-desk', 'modern'],
    collection: 'office',
    categories: ['tables'],
  },
  // Lighting
  {
    title: 'Arc Floor Lamp',
    subtitle: 'Modern Brass with Marble Base',
    description: `Make a statement with this elegant arc floor lamp. Features an adjustable arm and dimmable LED.

Features:
• Brushed brass finish
• Heavy marble base (12kg) for stability
• Adjustable arc arm
• Dimmable LED bulb included (2700K, 1200 lumens)
• Touch dimmer on base
• Fabric lampshade (40cm diameter)
• Maximum height: 210cm
• 2m fabric-covered cord
• Energy efficient (12W LED)

Perfect for reading corners or as ambient lighting over your sofa. The warm light creates a cozy atmosphere.`,
    handle: 'arc-floor-lamp',
    is_giftcard: false,
    weight: 15000,
    images: [
      'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800',
    ],
    options: [
      {
        title: 'Finish',
        values: ['Brass', 'Matte Black', 'Chrome'],
      },
      {
        title: 'Shade Color',
        values: ['White', 'Grey', 'Cream'],
      },
    ],
    variants: [
      {
        title: 'Brass / White',
        sku: 'AFL-BR-WH',
        prices: [
          { amount: 34900, currency_code: 'eur' },
          { amount: 39900, currency_code: 'usd' },
        ],
        inventory_quantity: 30,
        options: { Finish: 'Brass', 'Shade Color': 'White' },
      },
      {
        title: 'Matte Black / Grey',
        sku: 'AFL-MB-GR',
        prices: [
          { amount: 34900, currency_code: 'eur' },
          { amount: 39900, currency_code: 'usd' },
        ],
        inventory_quantity: 25,
        options: { Finish: 'Matte Black', 'Shade Color': 'Grey' },
      },
    ],
    tags: ['lighting', 'modern', 'statement-piece'],
    collection: 'living-room',
    categories: ['lighting'],
  },
]

export default async function seedAurelioLiving(container: MedusaContainer) {
  const productModuleService = container.resolve('productModuleService')
  const salesChannelService = container.resolve('salesChannelService')
  const regionService = container.resolve('regionService')
  const storeService = container.resolve('storeService')

  console.log('🌱 Seeding Aurelio Living...')

  // 1. Create store
  console.log('Creating store...')
  const store = await storeService.create({
    name: 'Aurelio Living',
    default_currency_code: 'eur',
    currencies: ['eur', 'usd'],
  })

  // 2. Create regions
  console.log('Creating regions...')
  const europeRegion = await regionService.create({
    name: 'Europe',
    currency_code: 'eur',
    countries: ['nl', 'be', 'de', 'fr', 'it', 'es', 'at', 'pt'],
    payment_providers: ['stripe', 'mollie'],
    fulfillment_providers: ['manual'],
  })

  const usaRegion = await regionService.create({
    name: 'United States',
    currency_code: 'usd',
    countries: ['us'],
    payment_providers: ['stripe'],
    fulfillment_providers: ['manual'],
  })

  // 3. Create default sales channel
  console.log('Creating sales channel...')
  const salesChannel = await salesChannelService.create({
    name: 'Webshop',
    description: 'Main online store',
    is_disabled: false,
  })

  // 4. Create collections
  console.log('Creating collections...')
  const createdCollections: any[] = []
  for (const col of collections) {
    const collection = await productModuleService.createCollections(col)
    createdCollections.push(collection)
    console.log(`  ✓ Collection: ${col.title}`)
  }

  // 5. Create categories
  console.log('Creating categories...')
  const createdCategories: any[] = []
  for (const cat of categories) {
    const category = await productModuleService.createCategories({
      name: cat.name,
      handle: cat.handle,
      is_active: true,
    })
    createdCategories.push(category)
    console.log(`  ✓ Category: ${cat.name}`)
  }

  // 6. Create products
  console.log('Creating products...')
  for (const productData of products) {
    try {
      const product = await productModuleService.create({
        title: productData.title,
        subtitle: productData.subtitle,
        description: productData.description,
        handle: productData.handle,
        is_giftcard: productData.is_giftcard,
        weight: productData.weight,
        status: 'published',
        thumbnail: productData.images[0],
        images: productData.images.map((url) => ({ url })),
        options: productData.options,
        variants: productData.variants,
        tags: productData.tags?.map((tag) => ({ value: tag })),
      })

      console.log(`  ✓ Product: ${productData.title}`)
    } catch (error) {
      console.error(`  ✗ Failed to create ${productData.title}:`, error)
    }
  }

  console.log('✅ Aurelio Living seeding completed!')
  console.log(`
📊 Summary:
   - Store: 1
   - Regions: 2 (Europe, USA)
   - Collections: ${collections.length}
   - Categories: ${categories.length}
   - Products: ${products.length}
   - Total variants: ${products.reduce((sum, p) => sum + p.variants.length, 0)}
   
🎉 Aurelio Living is ready for business!
  `)
}

