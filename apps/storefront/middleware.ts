import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  
  // Extract subdomain or custom domain
  // Format: {tenant}.aurelio.app or custom.domain.com
  const subdomain = hostname.split('.')[0];
  
  // Skip for localhost development
  if (hostname.includes('localhost')) {
    const tenantSlug = request.nextUrl.searchParams.get('tenant') || 'demo';
    const response = NextResponse.next();
    response.headers.set('x-tenant-slug', tenantSlug);
    return response;
  }
  
  // Check if it's a custom domain or subdomain
  const isCustomDomain = !hostname.includes('aurelio.app');
  
  // Fetch tenant information based on domain/subdomain
  // In production, this would query Supabase
  const tenantSlug = isCustomDomain ? hostname : subdomain;
  
  // Set tenant slug in header for downstream consumption
  const response = NextResponse.next();
  response.headers.set('x-tenant-slug', tenantSlug);
  response.headers.set('x-is-custom-domain', isCustomDomain ? 'true' : 'false');
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. /favicon.ico, /robots.txt, etc.
     */
    '/((?!api|_next|_static|favicon.ico|robots.txt).*)',
  ],
};

