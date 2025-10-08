/**
 * Aurelio Platform Types
 */

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  subdomain: string;
  neon_db_url: string;
  neon_project_id: string;
  medusa_api_url?: string;
  medusa_admin_url?: string;
  status: 'active' | 'suspended' | 'deleted';
  settings: Record<string, any>;
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface UserTenant {
  user_id: string;
  tenant_id: string;
  role: 'owner' | 'admin' | 'staff';
  created_at: string;
}

export interface Subscription {
  id: string;
  tenant_id: string;
  stripe_subscription_id?: string;
  mollie_subscription_id?: string;
  status: 'active' | 'paused' | 'canceled';
  plan: string;
  current_period_end?: string;
  created_at: string;
}

export interface Transaction {
  id: string;
  tenant_id: string;
  amount: number;
  fee_amount: number;
  type: 'subscription' | 'transaction_fee' | 'sms' | 'email';
  status: string;
  metadata: Record<string, any>;
  created_at: string;
}

export interface Domain {
  id: string;
  tenant_id: string;
  domain: string;
  verified: boolean;
  ssl_enabled: boolean;
  vercel_domain_id?: string;
  created_at: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: {
    message: string;
    code?: string;
  };
}

