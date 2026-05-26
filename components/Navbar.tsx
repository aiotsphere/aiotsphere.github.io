"use client"

import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-bold">AIOTSphere</Link>
        <nav className="space-x-4">
          <Link href="/about" className="text-sm">About</Link>
          <Link href="/activities" className="text-sm">Activities</Link>
        </nav>
      </div>
    </header>
  )
}
