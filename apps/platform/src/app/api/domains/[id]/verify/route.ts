import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import axios from 'axios';

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;

/**
 * Verify domain DNS configuration
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get domain from database
    const { data: domain, error: domainError } = await supabaseAdmin
      .from('domains')
      .select('*')
      .eq('id', params.id)
      .single();

    if (domainError || !domain) {
      return NextResponse.json({ error: 'Domain not found' }, { status: 404 });
    }

    if (domain.verified) {
      return NextResponse.json({
        verified: true,
        message: 'Domain is already verified',
      });
    }

    // Check Vercel domain status
    let isVerified = false;
    let sslEnabled = false;

    if (VERCEL_TOKEN && domain.vercel_domain_id) {
      try {
        const vercelStatus = await checkVercelDomainStatus(domain.domain);
        isVerified = vercelStatus.verified;
        sslEnabled = vercelStatus.sslEnabled;
      } catch (error) {
        console.error('Vercel verification error:', error);
      }
    } else {
      // Fallback: Check DNS records directly
      isVerified = await checkDnsRecords(domain.domain);
    }

    // Update domain status
    if (isVerified) {
      await supabaseAdmin
        .from('domains')
        .update({
          verified: true,
          ssl_enabled: sslEnabled,
        })
        .eq('id', params.id);

      return NextResponse.json({
        verified: true,
        sslEnabled,
        message: 'Domain verified successfully!',
      });
    } else {
      return NextResponse.json({
        verified: false,
        message: 'Domain not verified yet. Please check DNS configuration.',
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function checkVercelDomainStatus(domain: string) {
  const url = VERCEL_TEAM_ID
    ? `https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}/domains/${domain}?teamId=${VERCEL_TEAM_ID}`
    : `https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}/domains/${domain}`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${VERCEL_TOKEN}`,
    },
  });

  return {
    verified: response.data.verified,
    sslEnabled: response.data.sslEnabled || false,
  };
}

async function checkDnsRecords(domain: string): Promise<boolean> {
  // In production, use DNS lookup API or library
  // For now, return false (manual verification needed)
  return false;
}

