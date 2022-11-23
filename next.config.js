const { withAxiom } = require("next-axiom");

/** @type {import('next').NextConfig} */
const nextConfig = withAxiom({
  reactStrictMode: true,
  swcMinify: true,
  env: {
    clerkFrontendApiKey: process.env.NEXT_PUBLIC_CLERK_FRONTEND_API,
    clerkApiKey: process.env.CLERK_API_KEY,
    clerkJwtKey: process.env.CLERK_JWT_KEY,
    clerkWebhookSecret: process.env.SVIX_SECRET,
  },
});

module.exports = nextConfig;
