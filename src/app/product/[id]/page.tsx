import { getProductById } from "@/app/lib/product"
import { BackButton } from "@/components/back-button"
import { LoadingSpinner } from "@/components/loading"
import { ProductCard } from "@/components/product-card"
import { Home } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getProductById(params.id)

  return (
    <div className="p-12">
      <div className="flex items-start justify-center space-x-4">
        <BackButton />
        <Link href={"/"}>
          <Home size={32} className="mb-6" />
        </Link>
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        <ProductCard product={data} width={400} height={400} />
      </Suspense>
    </div>
  )
}
