import { LoadingSpinner } from "@/components/loading"
import Link from "next/link"
import { Suspense } from "react"
import { getAllProducts, getCategoryList } from "../lib/product"
import { ProductCard } from "./product-card"
import { SortByPrice } from "./sort-by-price"
import { FilteredByCategory } from "./filtered-by-category"

export default async function Home({
  searchParams,
}: {
  searchParams: { order?: "asc" | "desc" }
}) {
  const order = searchParams.order || "desc"

  const [data, categories] = await Promise.all([
    getAllProducts(order),
    getCategoryList(),
  ])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-semibold">All Products</h1>
      <div className="flex w-full items-center justify-between">
        <div>
          <FilteredByCategory categories={categories} />
        </div>
        <div>
          <SortByPrice />
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
