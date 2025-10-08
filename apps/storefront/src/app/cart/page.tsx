'use client'

import { useState } from 'react'
import { Button } from '@aurelio/ui'
import Image from 'next/image'
import Link from 'next/link'

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Copenhagen Modular Sofa',
      variant: 'Cream Boucle / Left L-Shape',
      price: 1899,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200',
    },
    {
      id: '2',
      name: 'Marble Coffee Table',
      variant: '120cm / Brass',
      price: 599,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1565191999001-551c187427bb?w=200',
    },
  ])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    )
  }

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 500 ? 0 : 49
  const tax = subtotal * 0.21
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <svg
              className="w-24 h-24 mx-auto text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <h2 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">
              Start shopping to add items to your cart
            </p>
            <Link href="/">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm p-6 flex gap-6"
                >
                  <div className="w-24 h-24 relative rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.variant}</p>

                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-50"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      €{(item.price * item.quantity).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      €{item.price.toLocaleString()} each
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">€{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `€${shipping}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (21%)</span>
                    <span className="font-medium">€{tax.toFixed(2)}</span>
                  </div>

                  {shipping > 0 && (
                    <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded">
                      Add €{(500 - subtotal).toFixed(2)} more for free shipping
                    </div>
                  )}
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-lg font-medium">Total</span>
                    <span className="text-lg font-bold">€{total.toFixed(2)}</span>
                  </div>
                </div>

                <Link href="/checkout">
                  <Button className="w-full py-3">Proceed to Checkout</Button>
                </Link>

                <Link href="/">
                  <Button variant="outline" className="w-full mt-3">
                    Continue Shopping
                  </Button>
                </Link>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                      />
                    </svg>
                    <span>30-day returns</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Quality guaranteed</span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-6 pt-6 border-t">
                  <p className="text-xs text-gray-500 text-center mb-3">
                    We accept
                  </p>
                  <div className="flex items-center justify-center gap-3 flex-wrap">
                    <div className="px-3 py-2 border rounded text-xs font-medium text-gray-600">
                      Visa
                    </div>
                    <div className="px-3 py-2 border rounded text-xs font-medium text-gray-600">
                      Mastercard
                    </div>
                    <div className="px-3 py-2 border rounded text-xs font-medium text-gray-600">
                      PayPal
                    </div>
                    <div className="px-3 py-2 border rounded text-xs font-medium text-gray-600">
                      iDEAL
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

