import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React's experimental features
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
    serverComponentsExternalPackages: ["@prisma/client", "bcryptjs"],
  },
  
  // Ensure proper handling of static assets and redirects
  images: {
    domains: ["lh3.googleusercontent.com"], // For Google profile images
  },
  
  // Configure webpack for better bundle optimization
  webpack: (config) => {
    // Important: return the modified config
    return config;
  },
  
  // Add security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
