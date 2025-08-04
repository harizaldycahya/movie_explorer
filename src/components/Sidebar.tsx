'use client'

import { useRouter } from 'next/navigation'

const categories = [
  { name: 'Action', keyword: 'Avengers' },
  { name: 'Comedy', keyword: 'Mr Bean' },
  { name: 'Drama', keyword: 'Titanic' },
  { name: 'Horror', keyword: 'Conjuring' },
  { name: 'Sci-Fi', keyword: 'Star Wars' },
  { name: 'Animation', keyword: 'Toy Story' },
  { name: 'Fantasy', keyword: 'Harry Potter' },
  { name: 'Romance', keyword: 'The Notebook' },
  { name: 'Thriller', keyword: 'Inception' },
  { name: 'Mystery', keyword: 'Sherlock Holmes' },
  { name: 'Biography', keyword: 'Steve Jobs' },
]

export default function Sidebar() {
  const router = useRouter()

  const handleCategoryClick = (keyword: string) => {
    router.push(`/?q=${encodeURIComponent(keyword)}`)
  }

  return (
    <aside className="w-48 bg-base-200 h-[calc(100vh-4rem)] p-4 hidden md:block">
      <h2 className="text-lg font-semibold mb-2">Categories</h2>
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat.name}>
            <button
              className="btn btn-sm btn-ghost w-full justify-start"
              onClick={() => handleCategoryClick(cat.keyword)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}