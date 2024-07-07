"use client"

import { LoadingSpinner } from "@/components/loading"
import { Badge } from "@/components/ui/badge"
import { Product } from "@/types/product"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { CarouselImage } from "./carousel-image"

type ProductCardProps = {
  product: Product
  width?: number
  height?: number
}
export const ProductCard = ({
  product,
  width = 200,
  height = 200,
}: ProductCardProps) => {
  const pathname = usePathname()

  const renderProductImage =
    // render only on home page or on categories dynamic pages
    pathname === "/" || pathname.includes("categories") ? (
      product.thumbnail ? (
        <Image
          src={product.thumbnail}
          alt="Product Thumbnail"
          loading="lazy"
          width={width}
          height={height}
          className="mx-auto aspect-square"
        />
      ) : (
        <LoadingSpinner />
      )
    ) : !!product.images ? (
      <CarouselImage images={product.images} width={width} height={height} />
    ) : (
      <Image
        src={product.thumbnail}
        alt="Product Thumbnail"
        loading="lazy"
        width={width}
        height={height}
        className="mx-auto aspect-square"
      />
    )
  return (
    <div className="rounded-md border-2 p-4">
      <div className="rounded-md bg-rose-50 shadow-md">
        {renderProductImage}
      </div>
      <article className="mt-4 grid grid-cols-4 justify-start space-y-1">
        <p className="font-medium">Title:</p>
        <p className="col-span-3 text-left font-medium">{product.title}</p>
        <p className="font-medium">Desc</p>
        <p className="col-span-3">{product.description}</p>
        <p className="font-medium">Price:</p>
        <p className="col-span-3">{product.price}</p>
        <p className="font-medium">Category:</p>
        <p className="col-span-3 capitalize">{product.category}</p>
        <p className="font-medium">Status:</p>
        <Badge className="col-span-3 w-20 whitespace-nowrap text-xs font-semibold capitalize">
          <span className="mx-auto">{product.availabilityStatus}</span>
        </Badge>
      </article>
    </div>
  )
}
