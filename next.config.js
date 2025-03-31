/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['remotive.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'remotive.com',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig; 