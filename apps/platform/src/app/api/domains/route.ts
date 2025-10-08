import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import axios from 'axios';

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;

/**
 * Get all domains for a tenant
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tenantId = searchParams.get('tenantId');

    if (!tenantId) {
      return NextResponse.json({ error: 'Tenant ID is required' }, { status: 400 });
    }

    const { data: domains, error } = await supabaseAdmin
      .from('domains')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ domains });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * Add a custom domain
 */
export async function POST(request: NextRequest) {
  try {
    const { tenantId, domain } = await request.json();

    if (!tenantId || !domain) {
      return NextResponse.json(
        { error: 'Tenant ID and domain are required' },
        { status: 400 }
      );
    }

    // Validate domain format
    const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/;
    if (!domainRegex.test(domain)) {
      return NextResponse.json({ error: 'Invalid domain format' }, { status: 400 });
    }

    // Check if domain already exists
    const { data: existing } = await supabaseAdmin
      .from('domains')
      .select('id')
      .eq('domain', domain)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'Domain is already in use' },
        { status: 409 }
      );
    }

    // Add domain to Vercel project
    let vercelDomainId = null;
    if (VERCEL_TOKEN && VERCEL_PROJECT_ID) {
      try {
        const vercelResponse = await addDomainToVercel(domain);
        vercelDomainId = vercelResponse.uid;
      } catch (error: any) {
        console.error('Vercel API error:', error);
        // Continue even if Vercel fails (can be added manually)
      }
    }

    // Create domain record
    const { data: newDomain, error } = await supabaseAdmin
      .from('domains')
      .insert({
        tenant_id: tenantId,
        domain,
        verified: false,
        ssl_enabled: false,
        vercel_domain_id: vercelDomainId,
      })
      .select()
      .single();

    if (error) throw error;

    // Get DNS configuration
    const dnsConfig = await getDnsConfiguration(domain);

    return NextResponse.json({
      domain: newDomain,
      dnsConfig,
      message: 'Domain added. Please configure DNS records to verify.',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * Add domain to Vercel project
 */
async function addDomainToVercel(domain: string) {
  const url = VERCEL_TEAM_ID
    ? `https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}/domains?teamId=${VERCEL_TEAM_ID}`
    : `https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}/domains`;

  const response = await axios.post(
    url,
    {
      name: domain,
    },
    {
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
}

/**
 * Get DNS configuration for domain
 */
async function getDnsConfiguration(domain: string) {
  return {
    instructions: [
      {
        type: 'A',
        name: '@',
        value: '76.76.21.21',
        ttl: 3600,
      },
      {
        type: 'CNAME',
        name: 'www',
        value: 'cname.vercel-dns.com',
        ttl: 3600,
      },
    ],
    notes: [
      'Add these DNS records at your domain registrar',
      'DNS propagation can take 24-48 hours',
      'Once configured, verification will happen automatically',
    ],
  };
}

