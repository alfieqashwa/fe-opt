import { BASE_URL } from "@/constants/base-url"
import { Product, ProductsResponse } from "@/types/product"

export async function getAllProducts(
  orderBy: "asc" | "desc" = "desc",
  limit: number = 18,
  skip: number = 10,
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

export async function getProductById(id: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`)
  if (!res.ok) {
    throw new Error("network response is not ok!")
  }
  return await res.json()
}

export async function getCategoryList(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/products/category-list`)
  if (!res.ok) throw new Error("Network response is not ok")
  return await res.json()
}

export async function getProductsByCategory(
  category: string,
): Promise<ProductsResponse> {
  const res = await fetch(`${BASE_URL}/products/category/${category}`)
  if (!res.ok) throw new Error("Network response is not ok")
  return await res.json()
}
