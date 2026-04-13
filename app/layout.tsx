import type { Metadata } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'
import Providers from './providers'

export const metadata: Metadata = {
  title: 'Next.js Learning Project',
  description: 'Routing, rendering, caching strategies, and auth in Next.js',
}

type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <nav
            style={{
              padding: '1rem',
              borderBottom: '2px solid #eee',
              marginBottom: '1rem',
              fontFamily: 'monospace',
            }}
          >
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
        </Providers>
      </body>
    </html>
  )
}