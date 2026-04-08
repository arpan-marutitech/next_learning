import Link from 'next/link'

/**
 * App Router — next: { revalidate: 10 }
 * Pages Router equivalent: ISR (getStaticProps with revalidate: 10)
 *
 * How it works:
 *   - The fetch response is stored in the Next.js Data Cache for 10 seconds.
 *   - After 10 seconds, the cache entry is marked STALE.
 *   - The next request still receives the stale response immediately (fast), but
 *     triggers a background re-fetch to refresh the cache.
 *   - The request AFTER that gets the fresh data.
 *   - Same "stale-while-revalidate" pattern as Pages Router ISR.
 *
 * Alternative — segment-level revalidation (applies to all fetches in this route):
 *   export const revalidate = 10
 *   Then use a plain fetch(url) without any cache option.
 *
 * The two approaches are equivalent. Per-fetch option is more granular.
 */

// Segment-level config (commented out — using per-fetch option instead)
// export const revalidate = 10

async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10', {
    next: { revalidate: 10 }, // Revalidate every 10 seconds (like ISR)
  })
  return res.json()
}

export default async function AppRouterBlog() {
  const posts = await getPosts()
  const renderedAt = new Date().toISOString()

  return (
    <div>
      <h1>App Router Blog — <code>{`next: { revalidate: 10 }`}</code></h1>
      <p>
        <strong>Pages Router equivalent:</strong> ISR via{' '}
        <code>getStaticProps</code> with <code>revalidate: 10</code>
      </p>
      <p>
        <code>{`fetch(url, { next: { revalidate: 10 } })`}</code> caches the
        response for 10 seconds, then re-fetches in the background on the next
        request after the TTL expires.
      </p>
      <p>
        Rendered at: <code>{renderedAt}</code>
      </p>
      <p>
        <em>
          Refresh now → same timestamp. Wait 10s, refresh → same timestamp (background
          rebuild triggered). Refresh again → new timestamp.
        </em>
      </p>
      <hr />
      <h2>Posts (revalidated every 10 seconds)</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/app-router/blog/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
