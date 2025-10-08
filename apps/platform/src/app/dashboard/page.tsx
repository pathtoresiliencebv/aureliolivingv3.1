import { Suspense } from 'react';
import Link from 'next/link';
import { Store, Users, DollarSign, TrendingUp, Plus } from 'lucide-react';

// This would fetch from API in real implementation
async function getStats() {
  return {
    totalTenants: 42,
    activeTenants: 38,
    totalRevenue: 45280,
    monthlyGrowth: 12.5,
  };
}

async function getTenants() {
  // This would fetch from API
  return [
    {
      id: '1',
      name: 'Aurelio Living',
      slug: 'aurelio-living',
      subdomain: 'aurelio-living.aurelio.app',
      status: 'active',
      created_at: '2025-01-15T10:00:00Z',
    },
  ];
}

export default async function DashboardPage() {
  const stats = await getStats();
  const tenants = await getTenants();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Store className="h-8 w-8 text-aurelio-600" />
              <span className="ml-2 text-xl font-bold text-aurelio-900">Aurelio Admin</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard/settings"
                className="text-gray-600 hover:text-gray-900"
              >
                Settings
              </Link>
              <button className="px-4 py-2 bg-aurelio-600 text-white rounded-lg hover:bg-aurelio-700">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your e-commerce platform</p>
          </div>
          <Link
            href="/dashboard/tenants/new"
            className="inline-flex items-center px-4 py-2 bg-aurelio-600 text-white rounded-lg hover:bg-aurelio-700 transition"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Shop
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-aurelio-100 rounded-lg">
                <Store className="h-6 w-6 text-aurelio-600" />
              </div>
              <span className="text-sm text-green-600 font-semibold">+12%</span>
            </div>
            <p className="text-gray-600 text-sm">Total Shops</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalTenants}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm text-green-600 font-semibold">+8%</span>
            </div>
            <p className="text-gray-600 text-sm">Active Shops</p>
            <p className="text-3xl font-bold text-gray-900">{stats.activeTenants}</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <span className="text-sm text-green-600 font-semibold">+15%</span>
            </div>
            <p className="text-gray-600 text-sm">Total Revenue</p>
            <p className="text-3xl font-bold text-gray-900">
              ${(stats.totalRevenue / 1000).toFixed(1)}k
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-sm text-green-600 font-semibold">+{stats.monthlyGrowth}%</span>
            </div>
            <p className="text-gray-600 text-sm">Growth</p>
            <p className="text-3xl font-bold text-gray-900">{stats.monthlyGrowth}%</p>
          </div>
        </div>

        {/* Tenants Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">All Shops</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Shop Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Domain
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tenants.map((tenant) => (
                  <tr key={tenant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{tenant.name}</div>
                      <div className="text-sm text-gray-500">{tenant.slug}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {tenant.subdomain}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {tenant.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(tenant.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/dashboard/tenants/${tenant.id}`}
                        className="text-aurelio-600 hover:text-aurelio-900 mr-4"
                      >
                        View
                      </Link>
                      <Link
                        href={`/dashboard/tenants/${tenant.id}/edit`}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

