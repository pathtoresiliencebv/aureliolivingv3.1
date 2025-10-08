'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Store } from 'lucide-react';

export default function NewTenantPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    ownerId: 'temp-user-id', // In real app, get from auth
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/tenants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create shop');
      }

      // Redirect to tenant page
      router.push(`/dashboard/tenants/${data.tenant.id}`);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Store className="h-8 w-8 text-aurelio-600" />
              <span className="ml-2 text-xl font-bold text-aurelio-900">Aurelio Admin</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Shop</h1>
          <p className="text-gray-600 mb-8">
            Set up a new e-commerce shop. We'll handle the database, domain, and configuration
            automatically.
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Shop Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aurelio-600 focus:border-transparent"
                placeholder="e.g., Aurelio Living"
              />
              <p className="mt-2 text-sm text-gray-500">
                This will be used as your shop name and to generate your subdomain
              </p>
              {formData.name && (
                <p className="mt-2 text-sm text-aurelio-600">
                  Your domain will be: <strong>{formData.name.toLowerCase().replace(/\s+/g, '-')}.aurelio.app</strong>
                </p>
              )}
            </div>

            <div className="bg-aurelio-50 border border-aurelio-200 rounded-lg p-4">
              <h3 className="font-semibold text-aurelio-900 mb-2">What happens next?</h3>
              <ul className="space-y-2 text-sm text-aurelio-700">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>We'll create a dedicated database for your shop</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Deploy your Medusa e-commerce backend</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Setup your subdomain (shop-name.aurelio.app)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Configure payment providers (Stripe & Mollie)</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Initialize email and SMS marketing tools</span>
                </li>
              </ul>
              <p className="mt-3 text-sm text-aurelio-600">
                <strong>Estimated time:</strong> 2-3 minutes
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-aurelio-600 text-white rounded-lg hover:bg-aurelio-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition font-semibold"
              >
                {loading ? 'Creating Shop...' : 'Create Shop'}
              </button>
              <Link
                href="/dashboard"
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h2>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl font-bold text-aurelio-600">$10</span>
            <span className="text-gray-600">/month</span>
            <span className="text-sm text-gray-500">+ 2% transaction fee</span>
          </div>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>✓ Unlimited products</li>
            <li>✓ Custom domain support</li>
            <li>✓ AI customer service</li>
            <li>✓ Email & SMS marketing</li>
            <li>✓ Mobile admin app</li>
            <li>✓ 24/7 support</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

