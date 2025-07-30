'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

type Movie = {
  Title: string
  Year: string
  imdbID: string
  Poster: string
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get('https://www.omdbapi.com/', {
          params: {
            s: 'Pocong',
            apikey: '13306989',
          },
        })
        setMovies(res.data.Search || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Movie Results</h1>
      {loading && <p>Loading...</p>}
      {!loading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {movies.map((movie) => (
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
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}