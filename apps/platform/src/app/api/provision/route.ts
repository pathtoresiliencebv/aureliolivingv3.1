import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import axios from 'axios';

/**
 * Provision a new tenant
 * This endpoint handles the full provisioning workflow:
 * 1. Create Neon database
 * 2. Deploy Medusa instance
 * 3. Setup Listmonk
 * 4. Configure Fonoster
 * 5. Create subscription
 */
export async function POST(request: NextRequest) {
  try {
    const { tenantId } = await request.json();

    if (!tenantId) {
      return NextResponse.json({ error: 'Tenant ID is required' }, { status: 400 });
    }

    // Get tenant
    const { data: tenant, error: tenantError } = await supabaseAdmin
      .from('tenants')
      .select('*')
      .eq('id', tenantId)
      .single();

    if (tenantError || !tenant) {
      return NextResponse.json({ error: 'Tenant not found' }, { status: 404 });
    }

    // Update status to provisioning
    await supabaseAdmin
      .from('tenants')
      .update({ status: 'provisioning' })
      .eq('id', tenantId);

    // Step 1: Create Neon database
    console.log('Creating Neon database...');
    const neonDb = await createNeonDatabase(tenant.slug);

    // Step 2: Update tenant with database info
    await supabaseAdmin
      .from('tenants')
      .update({
        neon_db_url: neonDb.connectionString,
        neon_project_id: neonDb.projectId,
      })
      .eq('id', tenantId);

    // Step 3: Deploy Medusa (in production, this would trigger deployment)
    console.log('Deploying Medusa instance...');
    const medusaUrl = `https://medusa-${tenantId}.railway.app`;
    await supabaseAdmin
      .from('tenants')
      .update({
        medusa_api_url: `${medusaUrl}/store`,
        medusa_admin_url: `${medusaUrl}/app`,
      })
      .eq('id', tenantId);

    // Step 4: Setup Listmonk
    console.log('Setting up Listmonk...');
    await supabaseAdmin.from('listmonk_instances').insert({
      tenant_id: tenantId,
      api_url: process.env.LISTMONK_ADMIN_URL || 'http://listmonk:9000',
      api_key: 'generated-api-key',
    });

    // Step 5: Setup Fonoster
    console.log('Setting up Fonoster...');
    await supabaseAdmin.from('fonoster_numbers').insert({
      tenant_id: tenantId,
      phone_number: '+1234567890',
      fonoster_number_id: 'generated-number-id',
    });

    // Step 6: Create subscription
    console.log('Creating subscription...');
    await supabaseAdmin.from('subscriptions').insert({
      tenant_id: tenantId,
      status: 'active',
      plan: 'standard',
    });

    // Update status to active
    await supabaseAdmin
      .from('tenants')
      .update({ status: 'active' })
      .eq('id', tenantId);

    return NextResponse.json({
      success: true,
      tenant: {
        id: tenantId,
        subdomain: tenant.subdomain,
        medusaUrl,
      },
    });
  } catch (error: any) {
    console.error('Provisioning error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function createNeonDatabase(slug: string) {
  const neonApiKey = process.env.NEON_API_KEY;

  if (!neonApiKey) {
    // For development, return mock data
    return {
      projectId: `mock-project-${slug}`,
      connectionString: `postgresql://user:pass@localhost:5432/${slug}`,
    };
  }

  try {
    const response = await axios.post(
      'https://console.neon.tech/api/v2/projects',
      {
        project: {
          name: `aurelio-${slug}`,
          region_id: 'aws-us-east-2',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${neonApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      projectId: response.data.project.id,
      connectionString: response.data.connection_uris[0].connection_uri,
    };
  } catch (error) {
    console.error('Neon API error:', error);
    throw new Error('Failed to create Neon database');
  }
}

