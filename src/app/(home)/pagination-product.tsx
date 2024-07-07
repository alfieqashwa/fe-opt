"use client"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { PRODUCTS_PER_PAGE } from "@/constants/products-per-page"
import { usePathname, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"

type Props = {
  total: number
  skip: number
  limit: number
}
export function PaginationProduct({ total, skip, limit }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [page, setPage] = useState(1)

  const createQueryString = useCallback(
    (name: string, value: number) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value.toString())

      return params.toString()
    },
    [searchParams],
  )

  const calculateSkip = (index: number) => {
    const skip = index * PRODUCTS_PER_PAGE
    return skip
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        {Array.from({ length: total / limit + page }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href={
                pathname + "?" + createQueryString("skip", calculateSkip(i))
              }
              isActive
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
