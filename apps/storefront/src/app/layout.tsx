import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { headers } from 'next/headers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Aurelio Store',
  description: 'Powered by Aurelio',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get tenant from headers (set by middleware)
  const headersList = headers();
  const tenantSlug = headersList.get('x-tenant-slug') || 'demo';

  return (
    <html lang="en">
      <body className={inter.className}>
        <div data-tenant={tenantSlug}>{children}</div>
      </body>
    </html>
  );
}

