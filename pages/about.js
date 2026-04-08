import { useState, useEffect } from 'react'

/**
 * RENDERING STRATEGY: CSR — Client-Side Rendering
 *
 * How it works:
 *   - No `getStaticProps` or `getServerSideProps`.
 *   - Next.js serves an empty shell HTML with no data.
 *   - After the JS bundle hydrates in the browser, `useEffect` fires and
 *     fetches the data client-side.
 *
 * When to use:
 *   - User-specific dashboards, real-time data, anything that requires
 *     browser APIs or logged-in state.
 *
 * App Router equivalent:
 *   - Add `'use client'` at the top of the file, then use useState + useEffect
 *     exactly the same way. The directive opts the component out of React
 *     Server Components so it runs in the browser.
 *
 * Trade-offs compared to SSG/SSR:
 *   - Slower initial paint (data loads after JS hydration).
 *   - Not SEO-friendly (crawlers may not execute JS).
 *   - Open DevTools → Network → Fetch/XHR to watch the request fire in the browser.
 */
export default function About() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // useEffect runs only in the browser, after the component mounts.
  // This is the classic CSR data-fetching pattern.
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1')
      .then((res) => res.json())
      .then((data) => {
        setUser(data)
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <h1>About — CSR (Client-Side Rendering)</h1>
      <p>
        <strong>Mechanism:</strong> <code>useEffect</code> fetches data in the browser
        after the component mounts. The initial HTML has NO user data.
      </p>
      <p>
        <em>
          Open DevTools → Network → Fetch/XHR and refresh to see the fetch happen
          entirely in the browser.
        </em>
      </p>
      <hr />
      {loading ? (
        <p>⏳ Fetching user data from the browser...</p>
      ) : (
        <div>
          <h2>{user.name}</h2>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Website: {user.website}</p>
          <p>Company: {user.company.name}</p>
        </div>
      )}
    </div>
  )
}

// No getStaticProps or getServerSideProps = CSR
// The page is rendered as an empty shell on the server.
