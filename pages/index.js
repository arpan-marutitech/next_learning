import Link from 'next/link'

/**
 * RENDERING STRATEGY: SSG — Static Site Generation
 *
 * How it works:
 *   - `getStaticProps` runs at BUILD TIME on the server.
 *   - Next.js pre-renders this page to static HTML once.
 *   - Every visitor gets the exact same pre-built HTML — no server involved at request time.
 *   - The `generatedAt` timestamp below is fixed at build time; it never changes on refresh.
 *
 * When to use:
 *   - Marketing pages, documentation, blog home, any page where data rarely changes.
 *
 * To convert this to ISR, add `revalidate: N` to the returned object (see /blog).
 */
export default function Home({ posts, generatedAt }) {
  return (
    <div>
      <h1>Home — SSG (Static Site Generation)</h1>
      <p>
        <strong>Mechanism:</strong> <code>getStaticProps</code> runs at build time.
        The page is pre-rendered as static HTML and served from a CDN.
      </p>
      <p>
        Built at: <code>{generatedAt}</code>
      </p>
      <p>
        <em>Refresh the page — this timestamp does NOT change (fixed at build time).</em>
      </p>
      <hr />
      <h2>Latest Posts (fetched at build time)</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/blog/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <p>
        <small>
          See <Link href="/blog">Blog (ISR)</Link> for automatic revalidation,
          or click a post for <strong>SSR</strong>.
        </small>
      </p>
    </div>
  )
}

// ─── Data Fetching ───────────────────────────────────────────────────────────
// Runs ONCE at build time (and never again unless you add `revalidate`).
// The return value is serialized and embedded in the page HTML.
export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
  const posts = await res.json()

  return {
    props: {
      posts,
      generatedAt: new Date().toISOString(),
    },
    // No `revalidate` here → pure SSG.
    // Add `revalidate: 10` here to enable ISR (see pages/blog/index.js).
  }
}
