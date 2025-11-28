/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  // Allow cross-origin requests in development
  ...(process.env.NODE_ENV === 'development' && {
    async headers() {
      return [
        {
          source: '/api/:path*',
          headers: [
            { key: 'Access-Control-Allow-Origin', value: '*' },
            { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
            { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
          ],
        },
      ]
    },
  }),
}

module.exports = nextConfig

