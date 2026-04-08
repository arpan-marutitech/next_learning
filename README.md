# Next.js Rendering Strategies — Learning Project

A hands-on reference project that demonstrates **all four rendering strategies** in Next.js using both the **Pages Router** and the **App Router** side by side.

---

## What This Project Covers

| Strategy | Pages Router | App Router | Route |
|---|---|---|---|
| **SSG** — Static Site Generation | `getStaticProps` | `cache: 'force-cache'` | `/` and `/app-router` |
| **ISR** — Incremental Static Regeneration | `getStaticProps` + `revalidate` | `next: { revalidate: 10 }` | `/blog` and `/app-router/blog` |
| **SSR** — Server-Side Rendering | `getServerSideProps` | `cache: 'no-store'` | `/blog/[slug]` and `/app-router/blog/[slug]` |
| **CSR** — Client-Side Rendering | `useEffect` | `'use client'` + `useEffect` | `/about` |

---

## Project Structure

```
nextjs-learning/
├── app/                          # App Router (Next.js 13+)
│   ├── layout.js                 # Root layout — wraps all App Router routes
│   └── app-router/
│       ├── page.js               # SSG-like  → cache: 'force-cache'
│       └── blog/
│           ├── page.js           # ISR-like  → next: { revalidate: 10 }
│           └── [slug]/
│               └── page.js       # SSR-like  → cache: 'no-store'
├── pages/                        # Pages Router (classic)
│   ├── _app.js                   # Root wrapper for all Pages Router routes
│   ├── index.js                  # SSG        → getStaticProps
│   ├── about.js                  # CSR        → useEffect
│   └── blog/
│       ├── index.js              # ISR        → getStaticProps + revalidate: 10
│       └── [slug].js             # SSR        → getServerSideProps
├── next.config.js
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
```

### Development mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **Note:** In dev mode, all caching is **disabled**. `getStaticProps`, ISR revalidation, and `fetch` cache options are all ignored — every request re-fetches fresh data. This is intentional so changes are reflected immediately without rebuilding.

### Production mode (to see real caching behaviour)

```bash
npm run build   # build the production app
npm start       # serve on http://localhost:3000
```

Production mode is required to observe the correct behaviour of SSG, ISR, and SSR.

---

## Rendering Strategies Explained

### SSG — Static Site Generation

- Data is fetched **once at build time**.
- The page is pre-rendered to static HTML and served from a CDN.
- The timestamp on the page **never changes** on refresh (frozen at build time).
- **Pages Router:** `getStaticProps` with no `revalidate`.
- **App Router:** `fetch(url, { cache: 'force-cache' })`.

> Next.js 14: `force-cache` was the default. Next.js 15+: default changed to `no-store` — must opt in explicitly.

---

### ISR — Incremental Static Regeneration

- Like SSG, but the page is **regenerated in the background** after a TTL expires.
- Uses a **stale-while-revalidate** pattern:
  1. Page is built at deploy time.
  2. After 10 seconds, the next request gets the stale page but triggers a background rebuild.
  3. The request after that gets the freshly rebuilt page.
- **Pages Router:** `getStaticProps` with `revalidate: 10`.
- **App Router:** `fetch(url, { next: { revalidate: 10 } })` or `export const revalidate = 10`.

---

### SSR — Server-Side Rendering

- The page is **re-rendered on the server for every single request**.
- The timestamp changes on every refresh.
- Suitable for real-time data, personalised content, or pages that need request-time context (cookies, headers).
- **Pages Router:** `getServerSideProps`.
- **App Router:** `fetch(url, { cache: 'no-store' })`.

---

### CSR — Client-Side Rendering

- Next.js serves an **empty HTML shell**. Data is fetched entirely in the browser after hydration.
- Uses `useState` + `useEffect`.
- Not SEO-friendly. Visible as a Fetch/XHR request in browser DevTools.
- **Pages Router:** plain `useEffect` (no data fetching function needed).
- **App Router:** add `'use client'` directive at the top, then use `useEffect` the same way.

---

## Data Source

All pages fetch from [JSONPlaceholder](https://jsonplaceholder.typicode.com) — a free fake REST API. No database or backend setup required.

---

## Key Takeaway

| Mode | Caching active? | Use for |
|---|---|---|
| `npm run dev` | No — always refetches | Development |
| `npm start` | Yes — SSG/ISR/SSR work as designed | Observing real behaviour |
