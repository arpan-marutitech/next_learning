/** @type {import('next').NextConfig} */
const nextConfig = {
  // pages/ and app/ directories coexist out of the box in Next.js 13+
  // Routes must not overlap:
  //   Pages Router → /about   /blog   /blog/[slug]
  //   App Router   → /app-router/*

  // ─── Common next.config.js Examples ──────────────────────────────────────

  // 1. React Strict Mode (recommended)
  reactStrictMode: true,

  // 2. Custom page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'], 

  // 3. Environment variables exposed to the browser
  env: {
    NEXT_PUBLIC_API_URL: 'https://api.example.com',
  },

  // 4. Redirects
  async redirects() {
    return [
      {
        source: '/old-blog/:slug',   // matches /old-blog/anything
        destination: '/blog/:slug',  // sends to   /blog/anything
        permanent: true,             // 308 (permanent) — search engines update index
        // permanent: false          // 307 (temporary) — search engines keep old URL
      },
    ];
  },

  // 5. Rewrites (proxy requests without changing the URL)
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'https://external-api.example.com/:path*',
  //     },
  //   ];
  // },

  // 6. Custom HTTP headers
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: [
  //         { key: 'X-Frame-Options', value: 'DENY' },
  //         { key: 'X-Content-Type-Options', value: 'nosniff' },
  //       ],
  //     },
  //   ];
  // },

  // 7. Image optimization — allowed external domains
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'images.unsplash.com',
  //     },
  //   ],
  // },

  // 8. Internationalization (i18n)
  // i18n: {
  //   locales: ['en', 'fr', 'de'],
  //   defaultLocale: 'en',
  // },

  // 9. Custom webpack config
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     use: ['@svgr/webpack'],
  //   });
  //   return config;
  // },

  // 10. Trailing slash behaviour
  trailingSlash: true,

  // 11. Base path (useful when deploying under a sub-path)
  // basePath: '/my-app',

  // 12. Output mode
  // output: 'standalone', // self-contained build for Docker
  // output: 'export',     // static HTML export (no server required)

  // 13. TypeScript
  // By default Next.js fails the production build on type errors.
  // Set ignoreBuildErrors: true only to temporarily unblock a deploy.
  // typescript: {
  //   ignoreBuildErrors: false, // default — recommended to keep false
  //   // tsconfigPath: './tsconfig.custom.json', // use a custom tsconfig
  // },

  // 14. ESLint
  // By default Next.js runs ESLint on all files in the project during `next build`.
  // dirs — limit linting to specific directories to speed up builds.
  // Set ignoreDuringBuilds: true only to temporarily skip lint checks.
  // eslint: {
  //   dirs: ['app', 'pages', 'components', 'lib'], // only lint these dirs
  //   ignoreDuringBuilds: false, // default — recommended to keep false
  // },

  // ─── Optimizations ───────────────────────────────────────────────────────

  // 15. Image Optimization (next/image)
  // Control formats, sizes, and caching for the built-in <Image> component.
  // images: {
  //   formats: ['image/avif', 'image/webp'], // prefer AVIF, fall back to WebP
  //   deviceSizes: [640, 750, 828, 1080, 1200, 1920], // responsive breakpoints
  //   minimumCacheTTL: 60, // cache optimised images for at least 60 seconds
  //   remotePatterns: [
  //     { protocol: 'https', hostname: 'images.unsplash.com' },
  //   ],
  // },

  // 16. Font Optimization (next/font)
  // next/font is configured per-import, not here. Example in a component:
  //
  //   import { Inter } from 'next/font/google';
  //   const inter = Inter({ subsets: ['latin'], display: 'swap' });
  //
  // To opt out of automatic font optimization (not recommended):
  // optimizeFonts: false,

  // 17. Script Optimization (next/script)
  // next/script strategy is set per-component (<Script strategy="lazyOnload">).
  // You can set a default strategy for all scripts here:
  // experimental: {
  //   nextScriptWorkers: true, // offload scripts to a web worker (Partytown)
  // },

  // 18. Bundle Analyzer (@next/bundle-analyzer)
  // Visualise what's inside your JS bundles.
  // Install: npm install @next/bundle-analyzer
  // Usage: ANALYZE=true npm run build
  //
  // const withBundleAnalyzer = require('@next/bundle-analyzer')({
  //   enabled: process.env.ANALYZE === 'true',
  // });
  // module.exports = withBundleAnalyzer(nextConfig); // wrap export (see below)

  // 19. Compiler — SWC minification & dead-code removal
  // SWC is enabled by default. These are explicit opt-in extras:
  // compiler: {
  //   removeConsole: { exclude: ['error'] }, // strip console.* in production
  // },

  // 20. Lazy Loading
  // Lazy loading is done per-component with next/dynamic, not in config.
  // Example in a page/component:
  //
  //   import dynamic from 'next/dynamic';
  //   const HeavyChart = dynamic(() => import('../components/HeavyChart'), {
  //     loading: () => <p>Loading…</p>,
  //     ssr: false, // skip server-side rendering for client-only libs
  //   });
}

module.exports = nextConfig
