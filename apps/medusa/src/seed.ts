/**
 * Aurelio Medusa - Seed Data
 * This creates default data for a new tenant
 */

import { MedusaContainer } from '@medusajs/framework/types';

export default async function seedData(container: MedusaContainer) {
  const productService = container.resolve('productService');
  const regionService = container.resolve('regionService');
  const storeService = container.resolve('storeService');

  // Create default region
  const region = await regionService.create({
    name: 'Default Region',
    currency_code: 'usd',
    tax_rate: 0,
    countries: ['us', 'ca'],
  });

  // Create default store
  await storeService.update({
    name: 'Aurelio Store',
    default_currency_code: 'usd',
  });

  // Create sample products (for demo)
  const sampleProducts = [
    {
      title: 'Modern Sofa',
      description: 'A comfortable modern sofa perfect for your living room',
      handle: 'modern-sofa',
      variants: [
        {
          title: 'Default Variant',
          sku: 'SOFA-001',
          prices: [
            {
              amount: 129900,
              currency_code: 'usd',
              region_id: region.id,
            },
          ],
          inventory_quantity: 10,
        },
      ],
    },
    {
      title: 'Coffee Table',
      description: 'Elegant wooden coffee table',
      handle: 'coffee-table',
      variants: [
        {
          title: 'Default Variant',
          sku: 'TABLE-001',
          prices: [
            {
              amount: 39900,
              currency_code: 'usd',
              region_id: region.id,
            },
          ],
          inventory_quantity: 25,
        },
      ],
    },
  ];

  for (const product of sampleProducts) {
    await productService.create(product);
  }

  console.log('✅ Seed data created successfully!');
}

