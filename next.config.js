/** @type {import('next').NextConfig} */
const nextConfig = {
  // pages/ and app/ directories coexist out of the box in Next.js 13+
  // Routes must not overlap:
  //   Pages Router → /   /about   /blog   /blog/[slug]
  //   App Router   → /app-router/*
}

module.exports = nextConfig
