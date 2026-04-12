# Next.js Rendering and Routing Learning Project

This project is a learning/demo app for:

- App Router and Pages Router in one project
- SSG, ISR, SSR, and CSR behavior
- Basic Jest + React Testing Library setup

## Current Routes

### App Router routes (`app/`)

| Route | File | Purpose |
|---|---|---|
| `/` | `app/page.js` | App Router homepage |
| `/app-router` | `app/app-router/page.js` | SSG-like with `fetch(..., { cache: 'force-cache' })` |
| `/app-router/blog` | `app/app-router/blog/page.js` | ISR-like with `revalidate: 10` |
| `/app-router/blog/[slug]` | `app/app-router/blog/[slug]/page.js` | SSR-like with `cache: 'no-store'` |

### Pages Router routes (`pages/`)

| Route | File | Purpose |
|---|---|---|
| `/about` | `pages/about.js` | CSR example |
| `/blog` | `pages/blog/index.js` | ISR with `getStaticProps` + `revalidate` |
| `/blog/[slug]` | `pages/blog/[slug].js` | SSR with `getServerSideProps` |
| `/ssg-example` | `pages/ssg-example.js` | SSG with `getStaticProps` |

Note:

- Root `/` is intentionally handled by App Router (`app/page.js`).
- There is no `pages/index.js` to avoid route conflicts at `/`.

## Project Structure

```text
nextjs-learning/
|-- app/
|   |-- layout.js
|   |-- page.js
|   |-- page.test.js
|   `-- app-router/
|       |-- page.js
|       `-- blog/
|           |-- page.js
|           `-- [slug]/
|               `-- page.js
|-- pages/
|   |-- _app.js
|   |-- about.js
|   |-- ssg-example.js
|   `-- blog/
|       |-- index.js
|       `-- [slug].js
|-- jest.config.js
|-- jest.setup.js
|-- next.config.js
`-- package.json
```

## Setup

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Run in development

```bash
npm run dev
```

Open `http://localhost:3000`.

### Run production build

```bash
npm run build
npm start
```

Use production mode to observe true caching behavior for SSG/ISR/SSR.

## Testing (Basic)

This project includes a minimal Jest setup for learning.

### Installed packages

- `jest`
- `jest-environment-jsdom`
- `@testing-library/react`
- `@testing-library/jest-dom`

### Config files

- `jest.config.js` uses `next/jest`
- `jest.setup.js` imports `@testing-library/jest-dom`

### Example test

- `app/page.test.js`
- Verifies homepage renders "Home Page"

### Run tests

```bash
npm test
```

## Useful Scripts

```bash
npm run dev
npm run build
npm run start
npm run test
```

## Learning Notes

- In `npm run dev`, data caching behavior differs from production.
- App Router server components can use fetch caching options directly.
- Pages Router uses `getStaticProps` and `getServerSideProps` for data fetching behavior.
