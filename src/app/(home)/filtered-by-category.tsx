"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"

export function FilteredByCategory({ categories }: { categories: string[] }) {
  const router = useRouter()

  // const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const category = e.target.value
  //   router.push(`/categories/${encodeURIComponent(category)}`)
  // }

  return (
    <Select
      onValueChange={(value) => {
        router.push(`/categories/${encodeURIComponent(value)}`)
      }}
    >
      <SelectTrigger className="w-[180px] capitalize">
        <SelectValue placeholder="Select a category" className="capitalize" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="capitalize">
          <SelectLabel>Categories</SelectLabel>
          {categories?.map((cat, i) => (
            <SelectItem value={cat} key={i} className="capitalize">
              {cat}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
    // <select onChange={handleCategoryChange} className="capitalize">
    //   {!!categories &&
    //     categories.map((option, i) => (
    //       <option key={i} value={option} className="capitalize">
    //         {option}
    //       </option>
    //     ))}
    // </select>
  )
}
