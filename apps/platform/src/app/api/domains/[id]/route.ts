import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import axios from 'axios';

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;
const VERCEL_TEAM_ID = process.env.VERCEL_TEAM_ID;

/**
 * Delete a domain
 */
export async function DELETE(
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

    // Remove from Vercel if exists
    if (VERCEL_TOKEN && domain.vercel_domain_id) {
      try {
        await removeDomainFromVercel(domain.domain);
      } catch (error) {
        console.error('Vercel removal error:', error);
        // Continue even if Vercel fails
      }
    }

    // Delete from database
    const { error: deleteError } = await supabaseAdmin
      .from('domains')
      .delete()
      .eq('id', params.id);

    if (deleteError) throw deleteError;

    return NextResponse.json({
      success: true,
      message: 'Domain removed successfully',
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function removeDomainFromVercel(domain: string) {
  const url = VERCEL_TEAM_ID
    ? `https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}/domains/${domain}?teamId=${VERCEL_TEAM_ID}`
    : `https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}/domains/${domain}`;

  await axios.delete(url, {
    headers: {
      Authorization: `Bearer ${VERCEL_TOKEN}`,
    },
  });
}

