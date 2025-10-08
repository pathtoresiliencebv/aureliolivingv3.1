'use client'

import { useState } from 'react'
import { Button } from '@aurelio/ui'
import Image from 'next/image'

interface ProductPageProps {
  params: {
    handle: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const [selectedVariant, setSelectedVariant] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  // Mock product data - in production, fetch from Medusa API
  const product = {
    title: 'Copenhagen Modular Sofa',
    subtitle: '3-Seater L-Shape in Boucle Fabric',
    description: `Experience ultimate comfort with our Copenhagen Modular Sofa. Handcrafted with premium boucle fabric and solid oak legs.`,
    price: '€1,899',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
    ],
    options: [
      {
        name: 'Color',
        values: ['Cream Boucle', 'Charcoal Grey', 'Sage Green'],
      },
      {
        name: 'Configuration',
        values: ['Left L-Shape', 'Right L-Shape', 'Straight 3-Seater'],
      },
    ],
    features: [
      'Premium boucle fabric upholstery',
      'Solid oak wooden legs with natural finish',
      'High-density foam cushions',
      'Removable and washable covers',
      'Made in Europe',
    ],
    inStock: true,
    rating: 4.8,
    reviews: 127,
  }

  const handleAddToCart = () => {
    console.log('Adding to cart:', { selectedVariant, quantity })
    // In production: call cart API
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square relative rounded-lg overflow-hidden bg-gray-100 border-2 ${
                      selectedImage === idx
                        ? 'border-blue-500'
                        : 'border-transparent'
                    }`}
                  >
                    <Image src={image} alt={`View ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
                <p className="mt-2 text-lg text-gray-600">{product.subtitle}</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="ml-1 text-sm font-medium text-gray-900">
                    {product.rating}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {product.reviews} reviews
                </span>
              </div>

              <div className="text-3xl font-bold text-gray-900">{product.price}</div>

              <div className="space-y-4">
                <p className="text-gray-600">{product.description}</p>

                {/* Options */}
                {product.options.map((option) => (
                  <div key={option.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {option.name}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {option.values.map((value) => (
                        <button
                          key={value}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 text-sm font-medium transition-colors"
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="space-y-3">
                <Button
                  onClick={handleAddToCart}
                  className="w-full py-4 text-lg"
                  disabled={!product.inStock}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
                <Button variant="outline" className="w-full py-4">
                  Add to Wishlist
                </Button>
              </div>

              {/* Features */}
              <div className="border-t pt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-green-500 mt-0.5">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Shipping */}
              <div className="border-t pt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                  <span className="text-gray-600">Free shipping on orders over €500</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-gray-600">30-day return policy</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span className="text-gray-600">Secure payment with Stripe & Mollie</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

