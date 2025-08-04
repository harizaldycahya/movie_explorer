'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { useBookmarkStore } from '@/store/bookmarkStore'

type Movie = {
  Title: string
  Year: string
  imdbID: string
  Poster: string
  Type: string
}

const categories = [
  { title: '🔥 Trending Now', query: 'Avengers' },
  { title: '🎬 Top Action Movies', query: 'Mission Impossible' },
  { title: '😂 Love', query: 'Love' },
  { title: '📺 Popular TV Series', query: 'Series'},
  { title: '🧒 Animation & Kids', query: '3D' },
  { title: '👻 Horror Picks', query: 'City' },
]

export default function Home() {
  const [movieSections, setMovieSections] = useState<Record<string, Movie[]>>({})
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarkStore()

  const fetchCategoryMovies = async () => {
    const results: Record<string, Movie[]> = {}

    await Promise.all(
      categories.map(async ({ title, query, type }) => {
        try {
          const res = await axios.get('https://www.omdbapi.com/', {
            params: {
              s: query,
              type: type || 'movie',
              apikey: '13306989',
            },
          })
          results[title] = (res.data.Search || []).slice(0, 4)
        } catch (err) {
          results[title] = []
        }
      })
    )

    setMovieSections(results)
  }

  useEffect(() => {
    fetchCategoryMovies()
  }, [])

  return (
    <main className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">Movie Explorer</h1>

      {categories.map(({ title }) => (
        <section key={title}>
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {movieSections[title]?.length ? (
              movieSections[title].map((movie) => (
                <div key={movie.imdbID} className="card bg-base-100 shadow">
                  <figure>
                    <img
                      src={movie.Poster !== 'N/A' ? movie.Poster : '/fallback.jpg'}
                      alt={movie.Title}
                      className="w-full h-60 object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <h3 className="card-title text-sm">{movie.Title}</h3>
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
        </section>
      ))}
    </main>
  )
}