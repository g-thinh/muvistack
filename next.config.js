const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    clerkFrontendApiKey: process.env.NEXT_PUBLIC_CLERK_FRONTEND_API,
    clerkApiKey: process.env.CLERK_API_KEY,
    clerkJwtKey: process.env.CLERK_JWT_KEY,
    clerkWebhookSecret: process.env.SVIX_SECRET,
    sentryClientDsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    sentryServerDsn: process.env.SENTRY_DSN,
    ablyApiKey: process.env.ABLY_API_KEY,
    apiRoot: process.env.API_ROOT,
    ablyClientId: process.env.ABLY_CLIENT_ID,
  },
  sentry: {
    // Use `hidden-source-map` rather than `source-map` as the Webpack `devtool`
    // for client-side builds. (This will be the default starting in
    // `@sentry/nextjs` version 8.0.0.) See
    // https://webpack.js.org/configuration/devtool/ and
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-hidden-source-map
    // for more information.
    hideSourceMaps: true,
  },
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
