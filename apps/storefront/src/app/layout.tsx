import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Button } from '@aurelio/ui'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aurelio Living - Premium Furniture',
  description: 'Discover handcrafted furniture that combines Scandinavian design with timeless elegance',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Aurelio Living</span>
              </Link>

              {/* Navigation */}
              <nav className="hidden md:flex items-center gap-8">
                <Link href="/collections/living-room" className="text-gray-600 hover:text-gray-900">
                  Living Room
                </Link>
                <Link href="/collections/bedroom" className="text-gray-600 hover:text-gray-900">
                  Bedroom
                </Link>
                <Link href="/collections/dining" className="text-gray-600 hover:text-gray-900">
                  Dining
                </Link>
                <Link href="/collections/office" className="text-gray-600 hover:text-gray-900">
                  Office
                </Link>
                <Link href="/about" className="text-gray-600 hover:text-gray-900">
                  About
                </Link>
              </nav>

              {/* Actions */}
              <div className="flex items-center gap-4">
                <button className="text-gray-600 hover:text-gray-900">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                <button className="text-gray-600 hover:text-gray-900">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                <Link href="/cart" className="relative">
                  <button className="text-gray-600 hover:text-gray-900">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center">
                      2
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {children}

        {/* Footer */}
        <footer className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">A</span>
                  </div>
                  <span className="text-xl font-bold">Aurelio Living</span>
                </div>
                <p className="text-gray-400 text-sm">
                  Premium furniture for modern living. Handcrafted with care.
                </p>
              </div>

              <div>
                <h3 className="font-medium mb-4">Shop</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/collections/living-room" className="hover:text-white">Living Room</Link></li>
                  <li><Link href="/collections/bedroom" className="hover:text-white">Bedroom</Link></li>
                  <li><Link href="/collections/dining" className="hover:text-white">Dining</Link></li>
                  <li><Link href="/collections/office" className="hover:text-white">Office</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-4">Support</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                  <li><Link href="/shipping" className="hover:text-white">Shipping Info</Link></li>
                  <li><Link href="/returns" className="hover:text-white">Returns</Link></li>
                  <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium mb-4">Company</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/about" className="hover:text-white">About Us</Link></li>
                  <li><Link href="/sustainability" className="hover:text-white">Sustainability</Link></li>
                  <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
                  <li><Link href="/press" className="hover:text-white">Press</Link></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
              <p className="text-sm text-gray-400">
                © 2024 Aurelio Living. All rights reserved.
              </p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <Link href="/privacy" className="text-sm text-gray-400 hover:text-white">Privacy Policy</Link>
                <Link href="/terms" className="text-sm text-gray-400 hover:text-white">Terms of Service</Link>
                <Link href="/cookies" className="text-sm text-gray-400 hover:text-white">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
