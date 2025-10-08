'use client';

import { useState, useEffect } from 'next/

';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, CheckCircle, XCircle, RefreshCw, Trash2 } from 'lucide-react';

interface Domain {
  id: string;
  domain: string;
  verified: boolean;
  ssl_enabled: boolean;
  created_at: string;
}

interface DnsConfig {
  type: string;
  name: string;
  value: string;
  ttl: number;
}

export default function TenantDomainsPage() {
  const params = useParams();
  const tenantId = params.id as string;
  
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDomain, setShowAddDomain] = useState(false);
  const [newDomain, setNewDomain] = useState('');
  const [dnsConfig, setDnsConfig] = useState<DnsConfig[]>([]);
  const [verifying, setVerifying] = useState<string | null>(null);

  useEffect(() => {
    fetchDomains();
  }, [tenantId]);

  const fetchDomains = async () => {
    try {
      const response = await fetch(`/api/domains?tenantId=${tenantId}`);
      const data = await response.json();
      setDomains(data.domains || []);
    } catch (error) {
      console.error('Error fetching domains:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDomain = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/domains', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tenantId, domain: newDomain }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Failed to add domain');
        return;
      }

      setDnsConfig(data.dnsConfig.instructions);
      setNewDomain('');
      fetchDomains();
    } catch (error) {
      console.error('Error adding domain:', error);
      alert('Failed to add domain');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyDomain = async (domainId: string) => {
    setVerifying(domainId);

    try {
      const response = await fetch(`/api/domains/${domainId}/verify`, {
        method: 'POST',
      });

      const data = await response.json();
      alert(data.message);
      
      if (data.verified) {
        fetchDomains();
      }
    } catch (error) {
      console.error('Error verifying domain:', error);
      alert('Failed to verify domain');
    } finally {
      setVerifying(null);
    }
  };

  const handleDeleteDomain = async (domainId: string) => {
    if (!confirm('Are you sure you want to remove this domain?')) {
      return;
    }

    try {
      const response = await fetch(`/api/domains/${domainId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchDomains();
      }
    } catch (error) {
      console.error('Error deleting domain:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href={`/dashboard/tenants/${tenantId}`}
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tenant
        </Link>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Domain Management</h1>
            <p className="text-gray-600 mt-1">Manage custom domains for this shop</p>
          </div>
          <button
            onClick={() => setShowAddDomain(!showAddDomain)}
            className="px-4 py-2 bg-aurelio-600 text-white rounded-lg hover:bg-aurelio-700 flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Domain
          </button>
        </div>

        {/* Add Domain Form */}
        {showAddDomain && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Add Custom Domain</h2>
            <form onSubmit={handleAddDomain} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Domain Name
                </label>
                <input
                  type="text"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  placeholder="example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-aurelio-600"
                  required
                />
                <p className="mt-2 text-sm text-gray-500">
                  Enter your domain without www (e.g., example.com)
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-aurelio-600 text-white rounded-lg hover:bg-aurelio-700 disabled:bg-gray-400"
                >
                  {loading ? 'Adding...' : 'Add Domain'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddDomain(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>

            {/* DNS Configuration */}
            {dnsConfig.length > 0 && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-3">
                  DNS Configuration Required
                </h3>
                <p className="text-sm text-blue-700 mb-4">
                  Add these DNS records at your domain registrar:
                </p>
                <div className="space-y-2">
                  {dnsConfig.map((record, index) => (
                    <div
                      key={index}
                      className="bg-white p-3 rounded border border-blue-200 font-mono text-sm"
                    >
                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <span className="text-gray-500">Type:</span> {record.type}
                        </div>
                        <div>
                          <span className="text-gray-500">Name:</span> {record.name}
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-500">Value:</span> {record.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-blue-600 mt-3">
                  ⏱️ DNS propagation can take 24-48 hours
                </p>
              </div>
            )}
          </div>
        )}

        {/* Domains List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Configured Domains</h2>
          </div>
          
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading domains...</div>
          ) : domains.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No custom domains configured yet
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {domains.map((domain) => (
                <div key={domain.id} className="p-6 flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-lg font-medium text-gray-900">
                        {domain.domain}
                      </h3>
                      {domain.verified ? (
                        <span className="flex items-center text-green-600 text-sm">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Verified
                        </span>
                      ) : (
                        <span className="flex items-center text-yellow-600 text-sm">
                          <XCircle className="h-4 w-4 mr-1" />
                          Pending Verification
                        </span>
                      )}
                      {domain.ssl_enabled && (
                        <span className="text-green-600 text-sm">🔒 SSL</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Added {new Date(domain.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {!domain.verified && (
                      <button
                        onClick={() => handleVerifyDomain(domain.id)}
                        disabled={verifying === domain.id}
                        className="px-4 py-2 text-sm bg-aurelio-600 text-white rounded-lg hover:bg-aurelio-700 flex items-center disabled:bg-gray-400"
                      >
                        <RefreshCw className={`h-4 w-4 mr-2 ${verifying === domain.id ? 'animate-spin' : ''}`} />
                        {verifying === domain.id ? 'Verifying...' : 'Verify'}
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteDomain(domain.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-3">Need Help?</h3>
          <ul className="space-y-2 text-sm text-blue-700">
            <li>• DNS changes can take 24-48 hours to propagate globally</li>
            <li>• Make sure to add both A and CNAME records</li>
            <li>• SSL certificates are automatically provisioned after verification</li>
            <li>• Contact support if you encounter any issues</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

