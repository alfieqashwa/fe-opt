import { BASE_URL } from "@/constants/base-url"
import { ProductsResponse } from "@/types/product"

export async function getAllProducts(
  limit: number = 18,
  skip: number = 10,
  orderBy: "asc" | "desc" = "desc",
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
