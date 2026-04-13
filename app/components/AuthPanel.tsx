'use client'

import { signIn, signOut, useSession } from 'next-auth/react'

export default function AuthPanel() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <p>Checking session...</p>
  }

  if (!session?.user) {
    return (
      <div style={{ marginTop: '1rem' }}>
        <p>You are not logged in.</p>
        <button type="button" onClick={() => signIn('google')}>
          Login with Google
        </button>
      </div>
    )
  }

  return (
    <div style={{ marginTop: '1rem' }}>
      <p>
        Logged in as <strong>{session.user.name ?? 'Unknown User'}</strong>
      </p>
      <p>Email: {session.user.email ?? 'No email available'}</p>
      <button type="button" onClick={() => signOut()}>
        Logout
      </button>
    </div>
  )
}