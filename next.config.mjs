/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'],
  },
  // Cloudflare Pages compatibility
  output: 'standalone',
};

export default nextConfig;

