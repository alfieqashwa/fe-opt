"use client"

import { useRouter } from "next/navigation"

export function FilteredByCategory({ categories }: { categories: string[] }) {
  const router = useRouter()

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault()

    const category = e.target.value
    router.push(`/categories/${encodeURIComponent(category)}`)
  }

  return (
    <select onChange={handleCategoryChange} className="bg-black capitalize">
      {!!categories &&
        categories.map((option, i) => (
          <option key={i} value={option} className="capitalize">
            {option}
          </option>
        ))}
    </select>
  )
}
