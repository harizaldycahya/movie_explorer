// app/bookmarks/page.tsx
'use client'

import Link from 'next/link'
import { useBookmarkStore } from '@/store/bookmarkStore'

export default function BookmarksPage() {
  const { bookmarks, removeBookmark } = useBookmarkStore()

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Bookmarked Movies</h1>

      {bookmarks.length === 0 ? (
        <p className="text-gray-500">No bookmarks yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {bookmarks.map((movie) => (
            <div key={movie.imdbID} className="card bg-base-100 shadow">
              <figure>
                <img
                  src={movie.Poster !== 'N/A' ? movie.Poster : '/fallback.jpg'}
                  alt={movie.Title}
                  className="w-full h-60 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-sm">{movie.Title}</h2>
                <p className="text-xs">{movie.Year}</p>
                <div className="flex flex-col gap-2 mt-2">
                  <Link
                    href={`/movie/${movie.imdbID}`}
                    className="btn btn-sm btn-primary"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => removeBookmark(movie.imdbID)}
                    className="btn btn-sm btn-error"
                  >
                    Remove Bookmark
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}