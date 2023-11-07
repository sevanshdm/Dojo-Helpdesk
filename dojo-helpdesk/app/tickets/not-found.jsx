// this 404 page will override the original one in the root of app folder when you a 404 happens in the "/tickets" route
// Because it's in the /tickets segment

import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <main className="text-center">
        <h2 className="text-3xl">There was a problem.</h2>
        <p>We could not find the page you were looking for.</p>
        <p>Go back to all <Link href="/tickets">tickets</Link></p>
    </main>
  )
}
