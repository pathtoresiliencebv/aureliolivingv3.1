import { loadEnv, defineConfig } from '@medusajs/framework/utils';

loadEnv(process.env.NODE_ENV || 'development', process.cwd());

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
    http: {
      storeCors: process.env.STORE_CORS || 'http://localhost:3002,http://localhost:3000',
      adminCors: process.env.ADMIN_CORS || 'http://localhost:3000,http://localhost:3001',
      authCors: process.env.AUTH_CORS || 'http://localhost:3002,http://localhost:3000',
      jwtSecret: process.env.JWT_SECRET || 'supersecret',
      cookieSecret: process.env.COOKIE_SECRET || 'supersecret',
    },
  },
  admin: {
    backendUrl: process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000',
  },
  modules: [
    {
      resolve: '@medusajs/payment-stripe',
      options: {
        apiKey: process.env.STRIPE_SECRET_KEY,
        webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
        capture: true,
      },
    },
    // Mollie payment provider would be configured here
  ],
  plugins: [
    {
      resolve: '@medusajs/admin',
      options: {
        develop: {
          open: process.env.OPEN_BROWSER !== 'false',
        },
      },
    },
  ],
});

