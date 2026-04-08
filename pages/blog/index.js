import Link from 'next/link'

/**
 * RENDERING STRATEGY: ISR — Incremental Static Regeneration
 *
 * How it works:
 *   - Like SSG: page is pre-rendered at build time.
 *   - Unlike SSG: the `revalidate` option tells Next.js to regenerate the page
 *     in the BACKGROUND after the specified number of seconds.
 *   - The STALE (old) page is still served to the first request after expiry
 *     while the new page is being built.
 *   - The NEXT request after the rebuild receives the fresh page.
 *   - This is called "stale-while-revalidate".
 *
 * Timeline:
 *   t=0   → Page built, generatedAt = T1, revalidate window starts
 *   t=10s → Window expires; next visitor triggers background rebuild
 *   t=10s → That same visitor STILL gets the T1 page (stale)
 *   t=11s → New page ready, generatedAt = T2
 *   t=12s → All visitors now get the T2 page
 *
 * When to use:
 *   - Content that changes infrequently but must stay fresh (news feed, product list).
 *
 * App Router equivalent:
 *   - fetch(url, { next: { revalidate: 10 } })   ← see /app-router/blog
 *   - or: export const revalidate = 10  (segment-level config)
 */
export default function BlogList({ posts, generatedAt }) {
  return (
    <div>
      <h1>Blog — ISR (Incremental Static Regeneration)</h1>
      <p>
        <strong>Mechanism:</strong> <code>getStaticProps</code> with{' '}
        <code>revalidate: 10</code>. Page regenerates in the background after
        10 seconds on the next request.
      </p>
      <p>
        Page generated at: <code>{generatedAt}</code>
      </p>
      <p>
        <em>
          Refresh now → same timestamp. Wait 10 seconds, refresh → same timestamp
          (but a background rebuild started). Refresh one more time → new timestamp.
        </em>
      </p>
      <hr />
      <h2>All Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {/* Each link leads to an SSR page — data fetched fresh on every request */}
            <Link href={`/blog/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ─── Data Fetching ───────────────────────────────────────────────────────────
// Runs at build time AND in the background every `revalidate` seconds.
export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
  const posts = await res.json()

  return {
    props: {
      posts,
      generatedAt: new Date().toISOString(),
    },
    revalidate: 10, // ← This single line turns SSG into ISR
  }
}
