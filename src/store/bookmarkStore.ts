// src/store/bookmarkStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Movie = {
  imdbID: string
  Title: string
  Year: string
  Poster: string
}

type BookmarkStore = {
  bookmarks: Movie[]
  addBookmark: (movie: Movie) => void
  removeBookmark: (id: string) => void
  isBookmarked: (id: string) => boolean
}

export const useBookmarkStore = create<BookmarkStore>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      addBookmark: (movie) =>
        set((state) => {
          if (state.bookmarks.find((b) => b.imdbID === movie.imdbID)) return state
          return { bookmarks: [...state.bookmarks, movie] }
        }),
      removeBookmark: (id) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((b) => b.imdbID !== id),
        })),
      isBookmarked: (id) =>
        get().bookmarks.some((b) => b.imdbID === id),
    }),
    {
      name: 'movie-bookmarks', // 🔒 LocalStorage key
    }
  )
)