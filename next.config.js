const {i18n} = require('./next-i18next.config');

module.exports = {
  i18n,
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    BADGE_BASE_URL: new URL(
      '/badges/',
      process.env.NODE_ENV === 'development'
        ? process.env.BASE_URL
        : process.env.VERCEL_URL,
    ).toString(),
  },
  rewrites() {
    return [{source: '/badges/:path*', destination: '/api/:path*'}];
  },
};
