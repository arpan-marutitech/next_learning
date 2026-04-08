import Link from 'next/link'

// _app.js is the root wrapper for ALL Pages Router pages.
// It is the Pages Router equivalent of app/layout.js in the App Router.
// pageProps contains the data returned by getStaticProps / getServerSideProps.

export default function App({ Component, pageProps }) {
  return (
    <>
      <nav style={{ padding: '1rem', borderBottom: '2px solid #eee', marginBottom: '1rem', fontFamily: 'monospace' }}>
        <div>
          <strong>Pages Router: </strong>
          <Link href="/">Home (SSG)</Link>
          {' | '}
          <Link href="/about">About (CSR)</Link>
          {' | '}
          <Link href="/blog">Blog (ISR)</Link>
        </div>
        <div style={{ marginTop: '0.25rem' }}>
          <strong>App Router: </strong>
          <Link href="/app-router">force-cache (SSG-like)</Link>
          {' | '}
          <Link href="/app-router/blog">revalidate:10 (ISR-like)</Link>
          {' | '}
          <Link href="/app-router/blog/1">no-store (SSR-like)</Link>
        </div>
      </nav>
      <main style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
        <Component {...pageProps} />
      </main>
    </>
  )
}
