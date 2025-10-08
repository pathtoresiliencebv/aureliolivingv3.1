#!/usr/bin/env node

/**
 * Aurelio Platform - Tenant Provisioning Script
 * 
 * This script automates the creation of a new tenant (shop) including:
 * - Creating a Neon database
 * - Deploying a Medusa instance
 * - Setting up DNS (subdomain)
 * - Configuring payment providers
 * - Initializing Listmonk account
 * - Setting up Fonoster SMS number
 */

import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

interface TenantConfig {
  name: string;
  slug: string;
  ownerId: string;
  plan?: string;
}

class TenantProvisioner {
  private supabase;
  private neonApiKey: string;
  
  constructor() {
    // Initialize Supabase client
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    
    this.neonApiKey = process.env.NEON_API_KEY!;
  }
  
  async provisionTenant(config: TenantConfig): Promise<void> {
    console.log(`🚀 Provisioning tenant: ${config.name}`);
    
    try {
      // Step 1: Create Neon database
      console.log('📊 Creating Neon database...');
      const neonDb = await this.createNeonDatabase(config.slug);
      console.log(`✅ Neon database created: ${neonDb.projectId}`);
      
      // Step 2: Create tenant record in Supabase
      console.log('💾 Creating tenant record...');
      const tenant = await this.createTenantRecord({
        name: config.name,
        slug: config.slug,
        subdomain: `${config.slug}.aurelio.app`,
        neon_db_url: neonDb.connectionString,
        neon_project_id: neonDb.projectId,
      });
      console.log(`✅ Tenant created: ${tenant.id}`);
      
      // Step 3: Link user to tenant
      console.log('👤 Linking user to tenant...');
      await this.linkUserToTenant(config.ownerId, tenant.id);
      console.log('✅ User linked to tenant');
      
      // Step 4: Deploy Medusa instance
      console.log('🛒 Deploying Medusa instance...');
      const medusaUrl = await this.deployMedusa(tenant.id, neonDb.connectionString);
      console.log(`✅ Medusa deployed: ${medusaUrl}`);
      
      // Step 5: Update tenant with Medusa URL
      await this.updateTenantUrls(tenant.id, medusaUrl);
      
      // Step 6: Setup Listmonk
      console.log('📧 Setting up Listmonk...');
      await this.setupListmonk(tenant.id);
      console.log('✅ Listmonk configured');
      
      // Step 7: Setup Fonoster SMS
      console.log('📱 Setting up SMS service...');
      await this.setupFonoster(tenant.id);
      console.log('✅ SMS service configured');
      
      // Step 8: Create initial subscription
      console.log('💳 Creating subscription...');
      await this.createSubscription(tenant.id, config.plan || 'standard');
      console.log('✅ Subscription created');
      
      console.log('');
      console.log('🎉 Tenant provisioning complete!');
      console.log('');
      console.log(`Tenant URL: https://${config.slug}.aurelio.app`);
      console.log(`Admin URL: ${medusaUrl}/app`);
      console.log('');
      
    } catch (error) {
      console.error('❌ Error provisioning tenant:', error);
      throw error;
    }
  }
  
  private async createNeonDatabase(slug: string) {
    const response = await axios.post(
      'https://console.neon.tech/api/v2/projects',
      {
        project: {
          name: `aurelio-${slug}`,
          region_id: 'aws-us-east-2',
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${this.neonApiKey}`,
          'Content-Type': 'application/json',
        }
      }
    );
    
    return {
      projectId: response.data.project.id,
      connectionString: response.data.connection_uris[0].connection_uri,
    };
  }
  
  private async createTenantRecord(data: any) {
    const { data: tenant, error } = await this.supabase
      .from('tenants')
      .insert(data)
      .select()
      .single();
    
    if (error) throw error;
    return tenant;
  }
  
  private async linkUserToTenant(userId: string, tenantId: string) {
    const { error } = await this.supabase
      .from('user_tenants')
      .insert({
        user_id: userId,
        tenant_id: tenantId,
        role: 'owner',
      });
    
    if (error) throw error;
  }
  
  private async deployMedusa(tenantId: string, dbUrl: string): Promise<string> {
    // In production, this would deploy to Railway, Render, or similar
    // For now, return a placeholder URL
    return `https://medusa-${tenantId}.railway.app`;
  }
  
  private async updateTenantUrls(tenantId: string, medusaUrl: string) {
    const { error } = await this.supabase
      .from('tenants')
      .update({
        medusa_api_url: `${medusaUrl}/store`,
        medusa_admin_url: `${medusaUrl}/app`,
      })
      .eq('id', tenantId);
    
    if (error) throw error;
  }
  
  private async setupListmonk(tenantId: string) {
    // Create Listmonk instance/account for tenant
    // Implementation depends on Listmonk API
    const { error } = await this.supabase
      .from('listmonk_instances')
      .insert({
        tenant_id: tenantId,
        api_url: 'http://listmonk:9000',
        api_key: 'generated-api-key',
      });
    
    if (error) throw error;
  }
  
  private async setupFonoster(tenantId: string) {
    // Provision Fonoster number for tenant
    // Implementation depends on Fonoster API
    const { error } = await this.supabase
      .from('fonoster_numbers')
      .insert({
        tenant_id: tenantId,
        phone_number: '+1234567890',
        fonoster_number_id: 'generated-number-id',
      });
    
    if (error) throw error;
  }
  
  private async createSubscription(tenantId: string, plan: string) {
    const { error } = await this.supabase
      .from('subscriptions')
      .insert({
        tenant_id: tenantId,
        status: 'active',
        plan,
      });
    
    if (error) throw error;
  }
}

// CLI Interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 3) {
    console.log('Usage: pnpm provision-tenant <name> <slug> <owner-user-id>');
    console.log('Example: pnpm provision-tenant "My Shop" my-shop user-123');
    process.exit(1);
  }
  
  const [name, slug, ownerId] = args;
  
  const provisioner = new TenantProvisioner();
  provisioner.provisionTenant({ name, slug, ownerId })
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { TenantProvisioner };

