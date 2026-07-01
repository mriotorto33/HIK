/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'customer-assets.emergentagent.com',
      },
    ],
  },
  // /api/* is proxied by src/app/api/[...path]/route.js
  // which attaches the GCP identity token when running on Cloud Run
};

export default nextConfig;

