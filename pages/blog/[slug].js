import Link from 'next/link'

/**
 * RENDERING STRATEGY: SSR — Server-Side Rendering
 *
 * How it works:
 *   - `getServerSideProps` runs on the server for EVERY single request.
 *   - The page is re-rendered fresh each time — no caching at the Next.js layer.
 *   - The `fetchedAt` timestamp below changes on every refresh.
 *
 * When to use:
 *   - Data that must always be real-time (stock prices, personalised feeds).
 *   - Pages that require request-time context: cookies, auth headers, query params.
 *
 * Trade-offs vs ISR/SSG:
 *   - Always fresh, but SLOWER (no cache hit; server must render before responding).
 *   - Cannot be served from a CDN edge cache.
 *
 * App Router equivalent:
 *   - fetch(url, { cache: 'no-store' })  ← see /app-router/blog/[slug]
 */
export default function BlogPost({ post, fetchedAt }) {
  return (
    <div>
      <h1>Blog Post #{post.id} — SSR (Server-Side Rendering)</h1>
      <p>
        <strong>Mechanism:</strong> <code>getServerSideProps</code> runs on the
        server on every request. No caching — always fresh.
      </p>
      <p>
        Server fetched at: <code>{fetchedAt}</code>
      </p>
      <p>
        <em>Refresh the page — this timestamp CHANGES every time (re-fetched each request).</em>
      </p>
      <hr />
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>
        <small>Post ID: {post.id} | User ID: {post.userId}</small>
      </p>
      <br />
      <Link href="/blog">← Back to Blog (ISR)</Link>
    </div>
  )
}

// ─── Data Fetching ───────────────────────────────────────────────────────────
// Runs on the server for EVERY request. `params.slug` comes from [slug].js filename.
// No `revalidate` option exists here — SSR is always dynamic.
export async function getServerSideProps({ params }) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.slug}`
  )
  const post = await res.json()

  return {
    props: {
      post,
      fetchedAt: new Date().toISOString(),
    },
  }
}
