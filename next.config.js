const {i18n} = require('./next-i18next.config');

module.exports = {
  i18n,
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  rewrites() {
    return [{source: '/badges/:path*', destination: '/api/:path*'}];
  },
  env: {
    BADGE_BASE_URL: new URL(
      '/badges/',
      process.env.BASE_URL || `https://${process.env.VERCEL_URL}`,
    ).toString(),
  },
};
