import Link from 'next/link'

/**
 * App Router — cache: 'force-cache'
 * Pages Router equivalent: SSG (getStaticProps with no revalidate)
 *
 * How it works:
 *   - fetch() is extended by Next.js to support caching options.
 *   - `cache: 'force-cache'` stores the response in the Next.js Data Cache indefinitely.
 *   - The cached response is reused on every subsequent request — no network call.
 *   - This is equivalent to what getStaticProps does: fetch once, serve forever.
 *
 * Next.js version note:
 *   - Next.js 14: 'force-cache' was the DEFAULT. You could omit the option.
 *   - Next.js 15: The default changed to 'no-store'. You MUST opt in explicitly now.
 *
 * This entire component is a React Server Component (RSC).
 * It runs only on the server — never in the browser. No useState/useEffect needed.
 */

async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5', {
    cache: 'force-cache', // Cache the response indefinitely (like SSG)
  })
  return res.json()
}

export default async function AppRouterHome() {
  const posts = await getPosts()

  return (
    <div>
      <h1>App Router — <code>cache: &apos;force-cache&apos;</code></h1>
      <p>
        <strong>Pages Router equivalent:</strong> SSG via{' '}
        <code>getStaticProps</code> (no revalidate)
      </p>
      <p>
        <code>{`fetch(url, { cache: 'force-cache' })`}</code> caches the response
        in the Next.js Data Cache indefinitely. The data is fetched once and reused
        on every request until the cache is invalidated or the app rebuilds.
      </p>
      <p>
        <em>No timestamp here — the page is served from cache. Refresh has no effect.</em>
      </p>
      <hr />
      <h2>Posts (cached indefinitely)</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/app-router/blog/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <p>
        <small>
          Compare:{' '}
          <Link href="/app-router/blog">revalidate: 10 (ISR-like)</Link>
          {' | '}
          <Link href="/app-router/blog/1">cache: &apos;no-store&apos; (SSR-like)</Link>
        </small>
      </p>
    </div>
  )
}
