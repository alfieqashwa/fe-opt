"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

export function SortByPrice() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  type Option = {
    value: "asc" | "desc"
    label: string
  }
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  const sortOptions: Option[] = [
    { value: "asc", label: "Price: Low to High" },
    { value: "desc", label: "Price: High to Low" },
  ]

  const handleSortChange = (
    selectedOption: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    router.push(
      pathname +
        ("?" + createQueryString("order", selectedOption.target.value)),
    )
  }

  return (
    <select
      // defaultValue={sortOptions.find((option) => option.value === order)}
      onChange={handleSortChange}
      className="w-[180px] bg-black"
    >
      <option value="asc">Price: Low to High</option>
      <option value="desc">Price: High to Low</option>
    </select>

    // <div className="flex flex-col items-end space-y-2">
    //   <button
    //     onClick={() => {
    //       router.push(pathname + "?" + createQueryString("order", "asc"))
    //     }}
    //   >
    //     ASC
    //   </button>
    //   <button
    //     onClick={() => {
    //       router.push(pathname + "?" + createQueryString("order", "desc"))
    //     }}
    //   >
    //     DESC
    //   </button>
    // </div>
  )
}
