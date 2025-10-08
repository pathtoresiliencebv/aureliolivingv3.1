'use client'

import { useState } from 'react'
import { Button } from '@aurelio/ui'
import Image from 'next/image'

export default function CheckoutPage() {
  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping')
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'mollie'>('stripe')

  const cartItems = [
    {
      name: 'Copenhagen Modular Sofa',
      variant: 'Cream Boucle / Left L-Shape',
      price: 1899,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100',
    },
    {
      name: 'Marble Coffee Table',
      variant: '120cm / Brass',
      price: 599,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1565191999001-551c187427bb?w=100',
    },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 0 // Free shipping
  const tax = subtotal * 0.21
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {['shipping', 'payment', 'review'].map((s, idx) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                    step === s
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {idx + 1}
                </div>
                <span className="ml-2 text-sm font-medium capitalize">{s}</span>
                {idx < 2 && <div className="w-16 h-0.5 bg-gray-200 mx-4" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-8">
              {step === 'shipping' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Shipping Information
                  </h2>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address *
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Postal Code *
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country *
                      </label>
                      <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>Netherlands</option>
                        <option>Belgium</option>
                        <option>Germany</option>
                        <option>France</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Notes (Optional)
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Any special instructions for delivery..."
                      />
                    </div>

                    <Button
                      onClick={() => setStep('payment')}
                      className="w-full py-3"
                    >
                      Continue to Payment
                    </Button>
                  </form>
                </div>
              )}

              {step === 'payment' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Payment Method
                  </h2>

                  <div className="space-y-4 mb-6">
                    <button
                      onClick={() => setPaymentMethod('stripe')}
                      className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                        paymentMethod === 'stripe'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">
                            Credit/Debit Card
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            Pay securely with Stripe
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <span className="px-2 py-1 bg-white border rounded text-xs">Visa</span>
                          <span className="px-2 py-1 bg-white border rounded text-xs">MC</span>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => setPaymentMethod('mollie')}
                      className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                        paymentMethod === 'mollie'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900">
                            iDEAL / PayPal / Bancontact
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            Pay with Mollie
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <span className="px-2 py-1 bg-white border rounded text-xs">
                            iDEAL
                          </span>
                          <span className="px-2 py-1 bg-white border rounded text-xs">
                            PayPal
                          </span>
                        </div>
                      </div>
                    </button>
                  </div>

                  {paymentMethod === 'stripe' && (
                    <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            CVC
                          </label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3 mt-6">
                    <Button
                      variant="outline"
                      onClick={() => setStep('shipping')}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button onClick={() => setStep('review')} className="flex-1">
                      Review Order
                    </Button>
                  </div>
                </div>
              )}

              {step === 'review' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Order</h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Shipping Address</h3>
                      <p className="text-sm text-gray-600">
                        John Doe<br />
                        Keizersgracht 123<br />
                        1015 CJ Amsterdam<br />
                        Netherlands<br />
                        +31 6 12345678
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Payment Method</h3>
                      <p className="text-sm text-gray-600">
                        {paymentMethod === 'stripe' ? 'Credit Card (Stripe)' : 'iDEAL (Mollie)'}
                      </p>
                    </div>

                    <div className="border-t pt-6">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4 text-blue-500" required />
                        <span className="text-sm text-gray-600">
                          I agree to the{' '}
                          <a href="#" className="text-blue-500 hover:underline">
                            Terms & Conditions
                          </a>
                        </span>
                      </label>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={() => setStep('payment')}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button className="flex-1">
                        Place Order - €{total.toFixed(2)}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-4 mb-4">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-16 h-16 relative rounded bg-gray-100 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-800 text-white text-xs rounded-full flex items-center justify-center">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">{item.variant}</p>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        €{item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">€{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (21%)</span>
                  <span className="font-medium">€{tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between mb-6">
                  <span className="text-lg font-medium">Total</span>
                  <span className="text-lg font-bold">€{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-green-500"
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
                  <span>Secure 256-bit SSL encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-green-500"
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
                  <span>PCI DSS compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 text-green-500"
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
                  <span>30-day money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

