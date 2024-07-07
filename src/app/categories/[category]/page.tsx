import { FilteredByCategory } from "@/app/(home)/filtered-by-category"
import { getCategoryList, getProductsByCategory } from "@/app/lib/product"
import { BackButton } from "@/components/back-button"
import { LoadingSpinner } from "@/components/loading"
import { ProductCard } from "@/components/product-card"
import { Home } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

export default async function Page({
  params,
}: {
  params: { category: string; order?: "asc" | "desc" }
}) {
  const [data, categories] = await Promise.all([
    getProductsByCategory(params.category),
    getCategoryList(),
  ])

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex w-full items-end justify-center space-x-8">
        <h1 className="text-4xl font-semibold capitalize">
          Products By {params.category}
        </h1>
      </div>
      <div className="mt-4 flex w-full items-center justify-between">
        <div className="flex w-full items-end justify-between">
          <FilteredByCategory categories={categories} />
          <div className="mt-4 flex justify-center space-x-6">
            <BackButton />
            <Link href={"/"}>
              <Home size={32} />
            </Link>
          </div>
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
