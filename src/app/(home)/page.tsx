import { LoadingSpinner } from "@/components/loading"
import { BASE_URL } from "@/constants/base-url"
import Link from "next/link"
import { Suspense } from "react"
import { ProductsResponse } from "../../types/product"
import { ProductCard } from "./product-card"

/**
 * The application should allow the user to filter the products by
category and sort them by price in ascending or descending order.
 */

// 'https://dummyjson.com/products?sortBy=title&order=asc'
async function getAllProducts(
  limit: number,
  skip: number,
  orderBy: "asc" | "desc",
): Promise<ProductsResponse> {
  const res = await fetch(
    `${BASE_URL}/products?limit=${limit.toString()}&skip=${skip.toString()}&sortBy=price&order=${orderBy}`,
  )
  if (!res.ok) {
    throw new Error("Network response is not ok")
  }

  const data = await res.json()
  return data
}

export default async function Home() {
  const data = await getAllProducts(18, 10, "desc")

  if (!data) return <p>Error...</p>

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-semibold">All Product</h1>
      <Suspense fallback={<LoadingSpinner />}>
        <section className="mt-12 grid grid-cols-3 gap-8">
          {!!data.products &&
            data.products.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id}>
                <ProductCard product={product} />
              </Link>
            ))}
        </section>
      </Suspense>
    </main>
  )
}
