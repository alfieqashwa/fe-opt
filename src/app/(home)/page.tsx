import { BASE_URL } from "@/constants/base-url"
import Link from "next/link"
import { ProductsResponse } from "../../types/product"
import { ProductCard } from "./product-card"

async function getAllProducts(): Promise<ProductsResponse> {
  const res = await fetch(`${BASE_URL}/products`)
  if (!res.ok) {
    throw new Error("Network response is not ok")
  }

  const data = await res.json()
  return data
}

export default async function Home() {
  const data = await getAllProducts()

  if (!data) return <p>Error...</p>

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-semibold">All Product</h1>
      <section className="mt-12 grid grid-cols-3 gap-8">
        {!!data.products &&
          data.products.map((product) => (
            <Link href={`/product/${product.id}`} key={product.id}>
              <ProductCard product={product} />
            </Link>
          ))}
      </section>
    </main>
  )
}
