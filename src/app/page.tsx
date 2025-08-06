'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useBookmarkStore } from '@/store/bookmarkStore'
import { useSearchParams } from 'next/navigation'

type Movie = {
  Title: string
  Year: string
  imdbID: string
  Poster: string
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''

  const { addBookmark, removeBookmark, isBookmarked } = useBookmarkStore()

  const fetchMovies = async (term: string) => {
    if (!term) return
    setLoading(true)
    try {
      const res = await axios.get('https://www.omdbapi.com/', {
        params: {
          s: term,
          apikey: '13306989',
        },
      })
      setMovies(res.data.Search || [])
    } catch (err) {
      console.error(err)
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  // Handle both search and default trending
  useEffect(() => {
    const initialQuery = query || 'Avengers' // 🔥 default trending search
    setSearchTerm(query)
    fetchMovies(initialQuery)
  }, [query])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchTerm.trim()) return
    fetchMovies(searchTerm)
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {query ? `Results for "${query}"` : '🔥 Trending Movies'}
      </h1>

      {/* 🔍 Search Bar */}
      <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}

      {!loading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {movies.length > 0 ? (
            movies.map((movie) => (
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
                  <button
                    className={`btn btn-sm mt-2 ${
                      isBookmarked(movie.imdbID) ? 'btn-error' : 'btn-secondary'
                    }`}
                    onClick={() =>
                      isBookmarked(movie.imdbID)
                        ? removeBookmark(movie.imdbID)
                        : addBookmark(movie)
                    }
                  >
                    {isBookmarked(movie.imdbID)
                      ? 'Remove Bookmark'
                      : 'Add to Bookmark'}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No movies found.</p>
          )}
        </div>
      )}
    </main>
  )
}