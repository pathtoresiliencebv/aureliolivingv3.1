'use client'

import { Button } from '@aurelio/ui'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const featuredProducts = [
    {
      name: 'Copenhagen Modular Sofa',
      price: '€1,899',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600',
      tag: 'Bestseller',
      handle: 'copenhagen-modular-sofa',
    },
    {
      name: 'Marble Coffee Table',
      price: '€599',
      image: 'https://images.unsplash.com/photo-1565191999001-551c187427bb?w=600',
      tag: 'New',
      handle: 'marble-coffee-table',
    },
    {
      name: 'Oak Dining Table',
      price: '€1,299',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600',
      tag: 'Popular',
      handle: 'oak-dining-table',
    },
    {
      name: 'Velvet Dining Chair',
      price: '€299',
      image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600',
      tag: 'Set of 2',
      handle: 'velvet-dining-chair',
    },
  ]

  const collections = [
    { name: 'Living Room', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400', count: 24 },
    { name: 'Bedroom', image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400', count: 18 },
    { name: 'Dining', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400', count: 15 },
    { name: 'Office', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400', count: 12 },
  ]

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Premium Furniture for Modern Living
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover handcrafted pieces that combine Scandinavian design with timeless elegance.
              Free shipping on orders over €500.
            </p>
            <div className="flex gap-4">
              <Link href="/collections/living-room">
                <Button size="lg" className="px-8">Shop Now</Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="px-8">Learn More</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Curated selection of our most popular furniture pieces
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Link key={product.handle} href={`/products/${product.handle}`}>
                <div className="group cursor-pointer">
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white rounded-full text-xs font-medium shadow-sm">
                        {product.tag}
                      </span>
                    </div>
                  </div>
                  <h3 className="font-medium text-gray-900 mb-1 group-hover:text-blue-500 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 font-medium">{product.price}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/collections/all">
              <Button variant="outline" size="lg">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Room</h2>
            <p className="text-gray-600">Find the perfect pieces for every space in your home</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((collection) => (
              <Link key={collection.name} href={`/collections/${collection.name.toLowerCase().replace(' ', '-')}`}>
                <div className="group cursor-pointer">
                  <div className="relative h-64 rounded-lg overflow-hidden mb-3">
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-bold mb-1">{collection.name}</h3>
                      <p className="text-sm">{collection.count} Products</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-gray-600">On orders over €500 across Europe</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">5-10 year warranty on all furniture</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day hassle-free return policy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-blue-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated with Latest Collections
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get 10% off your first order
          </p>
          <form className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button className="bg-white text-blue-500 hover:bg-gray-100 px-8">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </main>
  )
}
