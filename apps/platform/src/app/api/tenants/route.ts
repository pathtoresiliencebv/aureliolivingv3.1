import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { slugify } from '@aurelio/lib';

export async function GET(request: NextRequest) {
  try {
    const { data: tenants, error } = await supabaseAdmin
      .from('tenants')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ tenants });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, ownerId } = body;

    if (!name || !ownerId) {
      return NextResponse.json(
        { error: 'Name and ownerId are required' },
        { status: 400 }
      );
    }

    // Generate slug from name
    const slug = slugify(name);
    const subdomain = `${slug}.aurelio.app`;

    // Check if slug already exists
    const { data: existing } = await supabaseAdmin
      .from('tenants')
      .select('id')
      .eq('slug', slug)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'A shop with this name already exists' },
        { status: 409 }
      );
    }

    // Create placeholder for Neon database (will be created by provisioning)
    const tenant = {
      name,
      slug,
      subdomain,
      neon_db_url: 'pending',
      neon_project_id: 'pending',
      status: 'provisioning',
      settings: {},
    };

    const { data: newTenant, error } = await supabaseAdmin
      .from('tenants')
      .insert(tenant)
      .select()
      .single();

    if (error) throw error;

    // Link user to tenant
    const { error: linkError } = await supabaseAdmin
      .from('user_tenants')
      .insert({
        user_id: ownerId,
        tenant_id: newTenant.id,
        role: 'owner',
      });

    if (linkError) throw linkError;

    // Trigger provisioning (this would call the provisioning script)
    // For now, we'll return the tenant
    return NextResponse.json({ tenant: newTenant }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

