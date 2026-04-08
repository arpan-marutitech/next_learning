import Link from 'next/link'

/**
 * App Router — cache: 'no-store'
 * Pages Router equivalent: SSR (getServerSideProps)
 *
 * How it works:
 *   - `cache: 'no-store'` completely bypasses the Next.js Data Cache.
 *   - The network request fires fresh on every single request to this page.
 *   - The response is never stored in any cache.
 *   - This makes the page fully dynamic — equivalent to getServerSideProps.
 *
 * Next.js 15 note:
 *   - In Next.js 15, 'no-store' became the DEFAULT behavior.
 *   - You can omit the cache option entirely and get the same result.
 *   - We write it explicitly here for clarity.
 *
 * Dynamic params in Next.js 15:
 *   - `params` is now a Promise in Next.js 15 App Router.
 *   - Must be awaited before accessing properties.
 *   - Using `await params` also works in Next.js 14 (await on a plain object is a no-op).
 */

async function getPost(slug) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`, {
    cache: 'no-store', // Never cache — always fetch fresh (like SSR)
  })
  return res.json()
}

export default async function AppRouterBlogPost({ params }) {
  // In Next.js 15, params is a Promise — must be awaited.
  // In Next.js 14, params is a plain object — await is a no-op, so this works in both.
  const { slug } = await params
  const post = await getPost(slug)
  const fetchedAt = new Date().toISOString()

  return (
    <div>
      <h1>App Router Post #{post.id} — <code>cache: &apos;no-store&apos;</code></h1>
      <p>
        <strong>Pages Router equivalent:</strong> SSR via{' '}
        <code>getServerSideProps</code>
      </p>
      <p>
        <code>{`fetch(url, { cache: 'no-store' })`}</code> fetches fresh data on
        every request, bypassing all caches. The page is never stored in the CDN.
      </p>
      <p>
        Fetched at: <code>{fetchedAt}</code>
      </p>
      <p>
        <em>Refresh the page — this timestamp CHANGES every time (fresh fetch each request).</em>
      </p>
      <hr />
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>
        <small>Post ID: {post.id} | User ID: {post.userId}</small>
      </p>
      <br />
      <Link href="/app-router/blog">← Back to App Router Blog</Link>
      {' | '}
      <Link href={`/blog/${slug}`}>View same post in Pages Router (SSR)</Link>
    </div>
  )
}
