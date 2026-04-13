# Next.js Rendering and Routing Learning Project

This project is a learning/demo app for:

- App Router and Pages Router in one project
- SSG, ISR, SSR, and CSR behavior
- Basic Jest + React Testing Library setup
- Basic Google authentication with NextAuth (Auth.js)

## Current Routes

### App Router routes (app/)

| Route | File | Purpose |
|---|---|---|
| `/` | `app/page.tsx` | App Router homepage with auth UI |
| `/app-router` | `app/app-router/page.js` | SSG-like with `fetch(..., { cache: 'force-cache' })` |
| `/app-router/blog` | `app/app-router/blog/page.js` | ISR-like with `revalidate: 10` |
| `/app-router/blog/[slug]` | `app/app-router/blog/[slug]/page.js` | SSR-like with `cache: 'no-store'` |
| `/api/auth/[...nextauth]` | `app/api/auth/[...nextauth]/route.ts` | NextAuth API handlers |

### Pages Router routes (pages/)

| Route | File | Purpose |
|---|---|---|
| `/about` | `pages/about.js` | CSR example |
| `/blog` | `pages/blog/index.js` | ISR with `getStaticProps` + `revalidate` |
| `/blog/[slug]` | `pages/blog/[slug].js` | SSR with `getServerSideProps` |
| `/ssg-example` | `pages/ssg-example.js` | SSG with `getStaticProps` |

Note:

- Root `/` is intentionally handled by App Router (app/page.tsx).
- There is no pages/index.js to avoid route conflicts at `/`.

## Project Structure

```text
nextjs-learning/
|-- app/
|   |-- api/
|   |   `-- auth/
|   |       `-- [...nextauth]/
|   |           `-- route.ts
|   |-- components/
|   |   `-- AuthPanel.tsx
|   |-- layout.tsx
|   |-- page.test.js
|   |-- page.tsx
|   |-- providers.tsx
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
|-- next-env.d.ts
|-- next.config.js
|-- tsconfig.json
`-- package.json
```

## Authentication (NextAuth + Google)

This project uses NextAuth with:

- Google provider
- JWT session strategy (no database)
- SessionProvider in App Router layout
- useSession() on client side for login state

### Auth files

- app/api/auth/[...nextauth]/route.ts
- app/providers.tsx
- app/components/AuthPanel.tsx
- app/layout.tsx
- app/page.tsx

### Required environment variables

Create a local env file named .env.local with:

```dotenv
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=replace_with_a_long_random_secret
NEXTAUTH_URL=http://localhost:3000
```

You can generate a secret with:

```bash
npx auth secret
```

### Google Cloud OAuth setup

Create OAuth Client ID (Web application) and set:

- Authorized JavaScript origins:
	- http://localhost:3000
- Authorized redirect URIs:
	- http://localhost:3000/api/auth/callback/google

For Vercel production, also add:

- https://your-vercel-domain/api/auth/callback/google

Set matching production env vars in Vercel project settings:

- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- NEXTAUTH_SECRET
- NEXTAUTH_URL=https://your-vercel-domain

### Basic usage

- Login button calls signIn('google')
- Logout button calls signOut()
- UI reads session via useSession() and shows user name and email

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

Use production mode to observe true caching behavior for SSG/ISR/SSR and to validate production auth config.

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
- NextAuth requires NEXTAUTH_SECRET in production mode.
