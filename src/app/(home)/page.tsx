import { LoadingSpinner } from "@/components/loading"
import Link from "next/link"
import { Suspense } from "react"
import { getAllProducts } from "../lib/product"
import { ProductCard } from "./product-card"
import { SortByPrice } from "./sort-by-price"

export default async function Home({
  searchParams,
}: {
  searchParams: { order?: "asc" | "desc" }
}) {
  const order = searchParams.order || "desc"
  const data = await getAllProducts(18, 10, order)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-semibold">All Product</h1>
      <div className="flex w-full items-center justify-between">
        <div>
          <p>Filter by Category</p>
        </div>
        <div>
          <Suspense fallback={<LoadingSpinner />}>
            <SortByPrice />
          </Suspense>
        </div>
      </div>
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
