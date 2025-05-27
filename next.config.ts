import type { NextConfig } from 'next';

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value:
      'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=()',
  },
  {
    key: 'Content-Security-Policy',
    value:
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' https://lh3.googleusercontent.com data:; font-src 'self'; connect-src 'self' https://llm.nnoc.cloud:8842 https://api.iconify.design https://*.digitaloceanspaces.com; media-src 'self' https://*.digitaloceanspaces.com; frame-src 'self' https://app.powerbi.com; frame-ancestors 'self' https://aicoe.dev https://ai.tm.com.my; form-action 'self'; base-uri 'self'; object-src 'none'",
  },
  {
    key: 'Cross-Origin-Resource-Policy',
    value: 'cross-origin',
  },
  {
    key: 'Cross-Origin-Embedder-Policy',
    value: 'unsafe-none',
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  basePath: '/demo-community',
  assetPrefix: '/demo-community',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
    ],
    minimumCacheTTL: 60,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  webpack: (config: any) => {
    config.module = {
      ...config.module,
      exprContextRegExp: /$^/,
      exprContextCritical: false,
    };
    return config;
  },
};

export default nextConfig;
