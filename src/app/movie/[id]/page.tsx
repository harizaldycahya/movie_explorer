// app/movie/[imdbID]/page.tsx
import axios from 'axios'

type MovieRating = {
  Source: string
  Value: string
}

type MovieDetail = {
  Title: string
  Year: string
  Genre: string
  Director: string
  Actors: string
  Plot: string
  Poster: string
  imdbRating: string
  Runtime: string
  Language: string
  Country: string
  Awards: string
  BoxOffice: string
  Ratings: MovieRating[]
  Response: string
  Error?: string
}

type Props = {
  params: { id: string }
}

export default async function MovieDetailPage({ params }: Props) {
  console.log('IMDB ID:', params.id)

  const res = await axios.get<MovieDetail>('https://www.omdbapi.com/', {
    params: {
      i: params.id,
      plot: 'full',
      apikey: '13306989',
    },
  })

  const movie = res.data

  if (movie.Response === 'False') {
    return (
      <main className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
        <p>{movie.Error}</p>
      </main>
    )
  }

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : '/fallback.jpg'}
          alt={movie.Title}
          className="w-full md:w-1/3 rounded shadow"
        />

        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">{movie.Title}</h1>
          <p className="text-sm text-gray-500 mb-4">
            {movie.Year} • {movie.Runtime} • {movie.Genre}
          </p>

          <p className="mb-2"><strong>Director:</strong> {movie.Director}</p>
          <p className="mb-2"><strong>Actors:</strong> {movie.Actors}</p>
          <p className="mb-2"><strong>Language:</strong> {movie.Language}</p>
          <p className="mb-2"><strong>Country:</strong> {movie.Country}</p>
          <p className="mb-2"><strong>Awards:</strong> {movie.Awards}</p>
          <p className="mb-2"><strong>Box Office:</strong> {movie.BoxOffice}</p>

          <div className="my-4">
            <h2 className="font-semibold text-lg">Plot</h2>
            <p>{movie.Plot}</p>
          </div>

          {movie.Ratings && movie.Ratings.length > 0 && (
            <div className="mt-4">
              <h2 className="font-semibold text-lg">Ratings</h2>
              <ul className="list-disc ml-5">
                {movie.Ratings.map((rating: MovieRating) => (
                  <li key={rating.Source}>
                    {rating.Source}: {rating.Value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}