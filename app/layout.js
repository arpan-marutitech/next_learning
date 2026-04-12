import Link from 'next/link'

export const metadata = {
  title: 'Next.js Learning Project',
  description: 'Routing, rendering, and caching strategies in Next.js',
}

/**
 * Root Layout — REQUIRED for the App Router.
 *
 * Every route under app/ is wrapped by this layout.
 * Must render <html> and <body> tags exactly once.
 *
 * This layout does NOT affect routes under pages/ — those use pages/_app.js instead.
 * The two routers have separate rendering pipelines and separate root wrappers.
 *
 * Server Component by default — no 'use client' needed unless you add state/effects.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav style={{ padding: '1rem', borderBottom: '2px solid #eee', marginBottom: '1rem', fontFamily: 'monospace' }}>
          <div>
            <strong>App Router: </strong>
            <Link href="/">Home</Link>
            {' | '}
            <Link href="/app-router">force-cache (SSG-like)</Link>
            {' | '}
            <Link href="/app-router/blog">revalidate:10 (ISR-like)</Link>
          </div>
          <div style={{ marginTop: '0.25rem' }}>
            <strong>Pages Router: </strong>
            <Link href="/ssg-example">SSG Example</Link>
            {' | '}
            <Link href="/about">About (CSR)</Link>
            {' | '}
            <Link href="/blog">Blog (ISR)</Link>
          </div>
        </nav>
        <main style={{ padding: '1rem', fontFamily: 'sans-serif' }}>{children}</main>
      </body>
    </html>
  )
}
