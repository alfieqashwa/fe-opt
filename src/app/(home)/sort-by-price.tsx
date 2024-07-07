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
    <Select
      onValueChange={(value) => {
        router.push(pathname + "?" + createQueryString("order", value))
      }}
    >
      <SelectTrigger className="w-[180px] capitalize">
        <SelectValue placeholder="Sorted by Price" className="capitalize" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="capitalize">
          <SelectLabel>Categories</SelectLabel>
          <SelectItem value="asc" className="capitalize">
            Price: Low to High
          </SelectItem>
          <SelectItem value="desc" className="capitalize">
            Price: High to Low
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    // <select
    //   // defaultValue={sortOptions.find((option) => option.value === order)}
    //   onChange={handleSortChange}
    //   className="w-[180px]"
    // >
    //   <option value="asc">Price: Low to High</option>
    //   <option value="desc">Price: High to Low</option>
    // </select>

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
