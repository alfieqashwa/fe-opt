"use client"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { PRODUCTS_PER_PAGE } from "@/constants/products-per-page"
import { usePathname, useSearchParams } from "next/navigation"
import { useCallback } from "react"

type Props = {
  total: number
  skip: number
  limit: number
}
export function PaginationProduct({ total, skip, limit }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: number) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value.toString())

      return params.toString()
    },
    [searchParams],
  )

  const totalPage = Math.floor(total / PRODUCTS_PER_PAGE + 1)
  console.log({ totalPage })

  const calculateSkip = (index: number) => {
    const skip = index * PRODUCTS_PER_PAGE
    return skip
  }

  const previousPage = (skip: number) => {
    if (skip === 0) return skip
    return skip - PRODUCTS_PER_PAGE
  }

  const nextPage = (skip: number) => {
    if (skip > total - PRODUCTS_PER_PAGE) return skip
    return skip + PRODUCTS_PER_PAGE
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          {/*
          disabled prev/next pagination:
          source: https://github.com/shadcn-ui/ui/discussions/2149
        */}
          <PaginationPrevious
            aria-disabled={skip === 0}
            tabIndex={skip === 0 ? -1 : undefined}
            href={
              pathname + "?" + createQueryString("skip", previousPage(skip))
            }
            className={
              skip === 0 ? "pointer-events-none opacity-50" : undefined
            }
          />
        </PaginationItem>
        {Array.from({ length: totalPage }, (_, i) => {
          const currentPage = i + 1
          return (
            <PaginationItem key={i}>
              <PaginationLink
                href={
                  pathname + "?" + createQueryString("skip", calculateSkip(i))
                }
                isActive={skip === calculateSkip(i)}
              >
                {currentPage}
              </PaginationLink>
            </PaginationItem>
          )
        })}
        {/* // TODO: <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}

        <PaginationItem aria-disabled>
          <PaginationNext
            aria-disabled={skip > total - PRODUCTS_PER_PAGE}
            tabIndex={skip > total - PRODUCTS_PER_PAGE ? -1 : undefined}
            href={pathname + "?" + createQueryString("skip", nextPage(skip))}
            className={
              skip > total - PRODUCTS_PER_PAGE
                ? "pointer-events-none opacity-50"
                : undefined
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
