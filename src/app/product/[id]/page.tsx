import { ProductCard } from "@/app/(home)/product-card"
import { LoadingSpinner } from "@/components/loading"
import { BASE_URL } from "@/constants/base-url"
import { Product } from "@/types/product"
import { Home } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

async function getProductById(id: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`)
  if (!res.ok) {
    throw new Error("network response is not ok!")
  }
  return await res.json()
}

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getProductById(params.id)

  return (
    <div className="p-12">
      <Suspense fallback={<LoadingSpinner />}>
        <Link href={"/"}>
          <Home size={32} className="mb-6" />
        </Link>
      </Suspense>
      <ProductCard product={data} width={400} height={400} />
    </div>
  )
}
