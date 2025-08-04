// src/components/Navbar.tsx
'use client'

import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import { Home, Bookmark, Flame } from 'lucide-react'

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      <div className="flex-1">
        <Link href="/" className="text-2xl font-bold text-primary">
          🎬 Movie Explorer
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        <Link href="/" className="flex items-center gap-1 text-sm">
          <Home size={16} /> Home
        </Link>
        <Link href="/bookmarks" className="flex items-center gap-1 text-sm">
          <Bookmark size={16} /> Bookmarks
        </Link>
        <Link href="/trending" className="flex items-center gap-1 text-sm">
          <Flame size={16} /> Trending
        </Link>
        <ThemeToggle />
      </div>
    </div>
  )
}
