#!/bin/bash

# Aurelio Platform - Development Setup Script
# This script helps you set up the development environment

set -e

echo "🚀 Aurelio Platform - Development Setup"
echo "========================================"

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install pnpm first:"
    echo "   npm install -g pnpm"
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "⚠️  Docker is not installed. Some services may not be available."
    echo "   Install Docker from: https://www.docker.com/get-started"
fi

# Create .env.local from .env.example if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo "✅ .env.local created. Please update it with your credentials."
fi

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
pnpm install

# Start Docker services
echo ""
echo "🐳 Starting Docker services..."
if command -v docker &> /dev/null; then
    docker-compose up -d
    echo "✅ Docker services started"
else
    echo "⚠️  Skipping Docker services (Docker not installed)"
fi

# Run database migrations
echo ""
echo "🗄️  Running database migrations..."
echo "⚠️  Make sure to configure your Supabase connection first!"

# Build packages
echo ""
echo "🔨 Building shared packages..."
pnpm --filter @aurelio/ui build
pnpm --filter @aurelio/lib build

echo ""
echo "✅ Development environment is ready!"
echo ""
echo "🎯 Next steps:"
echo "   1. Update .env.local with your Supabase, Stripe, and other API keys"
echo "   2. Run 'pnpm dev' to start all development servers"
echo "   3. Visit http://localhost:3000 for the Super Admin dashboard"
echo "   4. Visit http://localhost:3001 for the User Dashboard"
echo "   5. Visit http://localhost:3002 for the Storefront"
echo ""
echo "📚 Documentation: ./docs/getting-started.md"
echo ""

