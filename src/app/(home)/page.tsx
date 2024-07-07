import { getAllProducts, getCategoryList } from "@/app/lib/product"
import { LoadingSpinner } from "@/components/loading"
import { ProductCard } from "@/components/product-card"
import { PRODUCTS_PER_PAGE } from "@/constants/products-per-page"
import Link from "next/link"
import { Suspense } from "react"
import { FilteredByCategory } from "./filtered-by-category"
import { PaginationProduct } from "./pagination-product"
import { SortByPrice } from "./sort-by-price"

export default async function Home({
  searchParams,
}: {
  searchParams: { order?: "asc" | "desc"; skip: number; limit: number }
}) {
  const order = searchParams.order || "desc"
  const skip = searchParams.skip

  const [data, categories] = await Promise.all([
    getAllProducts(order, PRODUCTS_PER_PAGE, skip),
    getCategoryList(),
  ])

  // console.log({ total: data.total, limit: data.limit, skip: data.skip })
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
      <div className="mt-16">
        {!!data && (
          <PaginationProduct
            total={data.total}
            skip={data.skip}
            limit={data.limit}
          />
        )}
      </div>
    </main>
  )
}
