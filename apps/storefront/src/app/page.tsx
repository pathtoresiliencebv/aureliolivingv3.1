import { headers } from 'next/headers';
import Link from 'next/link';
import { ShoppingCart, Search, User, Menu } from 'lucide-react';

// This would fetch tenant config from Supabase
async function getTenantConfig(slug: string) {
  return {
    id: '1',
    name: 'Aurelio Living',
    slug: 'aurelio-living',
    subdomain: 'aurelio-living.aurelio.app',
    settings: {
      primaryColor: '#0ea5e9',
      logo: null,
      description: 'Modern furniture for your home',
    },
  };
}

// This would fetch from Medusa API
async function getProducts() {
  return [
    {
      id: '1',
      title: 'Modern Sofa',
      description: 'Comfortable 3-seater sofa',
      price: 1299,
      image: '/images/sofa-placeholder.jpg',
    },
    {
      id: '2',
      title: 'Coffee Table',
      description: 'Elegant wooden coffee table',
      price: 399,
      image: '/images/table-placeholder.jpg',
    },
    {
      id: '3',
      title: 'Floor Lamp',
      description: 'Modern minimalist floor lamp',
      price: 199,
      image: '/images/lamp-placeholder.jpg',
    },
  ];
}

export default async function StorefrontPage() {
  const headersList = headers();
  const tenantSlug = headersList.get('x-tenant-slug') || 'demo';
  
  const tenant = await getTenantConfig(tenantSlug);
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-2xl font-bold text-aurelio-600">
                {tenant.name}
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link href="/products" className="text-gray-600 hover:text-gray-900">
                  Products
                </Link>
                <Link href="/collections" className="text-gray-600 hover:text-gray-900">
                  Collections
                </Link>
                <Link href="/about" className="text-gray-600 hover:text-gray-900">
                  About
                </Link>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                  Contact
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Search className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <User className="h-5 w-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full relative">
                <ShoppingCart className="h-5 w-5 text-gray-600" />
                <span className="absolute top-0 right-0 bg-aurelio-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </button>
              <button className="md:hidden p-2 hover:bg-gray-100 rounded-full">
                <Menu className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-aurelio-50 to-aurelio-100 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Modern Furniture for Your Home
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover our curated collection of contemporary furniture designed for comfort and style.
            </p>
            <Link
              href="/products"
              className="inline-block px-8 py-4 bg-aurelio-600 text-white rounded-lg hover:bg-aurelio-700 transition font-semibold"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <ShoppingCart className="h-16 w-16" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-aurelio-600 transition">
                  {product.title}
                </h3>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-xl font-bold text-gray-900">${product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">{tenant.name}</h3>
              <p className="text-gray-400">{tenant.settings.description}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/products">All Products</Link></li>
                <li><Link href="/collections">Collections</Link></li>
                <li><Link href="/sale">Sale</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/shipping">Shipping Info</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/terms">Terms of Service</Link></li>
                <li><Link href="/returns">Returns</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 {tenant.name}. Powered by Aurelio.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

