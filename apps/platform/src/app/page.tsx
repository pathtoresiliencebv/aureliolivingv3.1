import Link from 'next/link';
import { ArrowRight, Store, Users, CreditCard, BarChart3, Package, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-aurelio-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-2">
            <Store className="h-8 w-8 text-aurelio-600" />
            <span className="text-2xl font-bold text-aurelio-900">Aurelio</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="px-4 py-2 text-aurelio-700 hover:text-aurelio-900 transition"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2 bg-aurelio-600 text-white rounded-lg hover:bg-aurelio-700 transition"
            >
              Get Started
            </Link>
          </div>
        </nav>

        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-aurelio-950 mb-6">
            Build Your E-Commerce Empire
          </h1>
          <p className="text-xl text-aurelio-700 mb-8">
            Create, manage, and scale multiple online stores from one powerful platform. 
            AI-powered customer service, marketing automation, and everything you need to succeed.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/signup"
              className="px-8 py-4 bg-aurelio-600 text-white rounded-lg hover:bg-aurelio-700 transition flex items-center gap-2 text-lg font-semibold"
            >
              Start Free Trial
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/demo"
              className="px-8 py-4 border-2 border-aurelio-600 text-aurelio-700 rounded-lg hover:bg-aurelio-50 transition text-lg font-semibold"
            >
              View Demo
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center text-aurelio-950 mb-12">
          Everything You Need to Succeed
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Store,
              title: 'Multi-Store Management',
              description: 'Manage unlimited stores from a single dashboard. Each store gets its own database and domain.'
            },
            {
              icon: Zap,
              title: 'AI Customer Service',
              description: 'GPT-4 powered chatbot handles customer inquiries 24/7 across all channels.'
            },
            {
              icon: Package,
              title: 'Smart Shipping',
              description: 'Automatic carrier selection, label generation, and tracking updates with AI routing.'
            },
            {
              icon: CreditCard,
              title: 'Dual Payments',
              description: 'Accept payments via Stripe and Mollie with automatic invoicing and subscription management.'
            },
            {
              icon: BarChart3,
              title: 'Marketing Automation',
              description: 'Email campaigns, SMS marketing, and social media ads all in one place.'
            },
            {
              icon: Users,
              title: 'Point of Sale',
              description: 'Sell in-store with our touch-optimized POS system. Sync online and offline inventory.'
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-aurelio-100 hover:shadow-md transition">
              <feature.icon className="h-12 w-12 text-aurelio-600 mb-4" />
              <h3 className="text-xl font-semibold text-aurelio-950 mb-2">{feature.title}</h3>
              <p className="text-aurelio-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-aurelio-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-aurelio-950 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-center text-aurelio-700 mb-12">No hidden fees. Cancel anytime.</p>
          
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 border-2 border-aurelio-600">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-aurelio-950 mb-2">Standard Plan</h3>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl font-bold text-aurelio-600">$10</span>
                <span className="text-aurelio-700">/month per store</span>
              </div>
              <p className="text-sm text-aurelio-600 mt-2">+ 2% transaction fee</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              {[
                'Unlimited products',
                'Custom domain',
                'AI customer service',
                'Email & SMS marketing',
                'Google Ads integration',
                'Mobile admin app',
                'POS system included',
                '24/7 support'
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-aurelio-100 flex items-center justify-center flex-shrink-0">
                    <ArrowRight className="h-3 w-3 text-aurelio-600" />
                  </div>
                  <span className="text-aurelio-700">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/signup"
              className="w-full block text-center px-6 py-3 bg-aurelio-600 text-white rounded-lg hover:bg-aurelio-700 transition font-semibold"
            >
              Start Your Free Trial
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-aurelio-950 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Store className="h-6 w-6" />
                <span className="text-xl font-bold">Aurelio</span>
              </div>
              <p className="text-aurelio-300">
                The complete e-commerce platform for ambitious entrepreneurs.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-aurelio-300">
                <li><Link href="/features">Features</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/docs">Documentation</Link></li>
                <li><Link href="/api">API</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-aurelio-300">
                <li><Link href="/about">About</Link></li>
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/careers">Careers</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-aurelio-300">
                <li><Link href="/privacy">Privacy</Link></li>
                <li><Link href="/terms">Terms</Link></li>
                <li><Link href="/security">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-aurelio-800 mt-8 pt-8 text-center text-aurelio-400">
            <p>&copy; 2025 Aurelio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

