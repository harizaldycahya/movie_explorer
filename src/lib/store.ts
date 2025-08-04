// lib/store.ts
import { create } from 'zustand'

type Movie = {
  imdbID: string
  Title: string
  Year: string
  Poster: string
}

type Store = {
  bookmarks: Movie[]
  addBookmark: (movie: Movie) => void
  removeBookmark: (imdbID: string) => void
  isBookmarked: (imdbID: string) => boolean
}

export const useMovieStore = create<Store>((set, get) => ({
  bookmarks: [],
  addBookmark: (movie) =>
    set((state) =>
      get().isBookmarked(movie.imdbID)
        ? state
        : { bookmarks: [...state.bookmarks, movie] }
    ),
  removeBookmark: (imdbID) =>
    set((state) => ({
      bookmarks: state.bookmarks.filter((m) => m.imdbID !== imdbID),
    })),
  isBookmarked: (imdbID) => get().bookmarks.some((m) => m.imdbID === imdbID),
}))