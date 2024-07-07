import Image from "next/image";

const BASE_URL = "https://dummyjson.com";

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  thumbnail: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

async function getAllProducts(): Promise<ProductsResponse | undefined> {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) return;

  const data = await res.json();
  return data;
}

export default async function Home() {
  const data = await getAllProducts();

  if (!data) return <p>Error...</p>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-semibold">All Product</h1>
      <ul className="grid mt-12 grid-cols-3 gap-8">
        {/* title, description, price and a
picture of the product. */}
        {!!data.products &&
          data.products.map((product) => (
            <li key={product.id} className="p-4 border rounded-md">
              <div className="bg-zinc-50 rounded-md shadow-md">
                <Image
                  src={product.thumbnail}
                  alt="Product Thumbnail"
                  loading="lazy"
                  width={200}
                  height={200}
                  className="aspect-square mx-auto"
                />
              </div>
              <article className="grid justify-start grid-cols-4 mt-4">
                <p className="font-medium">Title:</p>
                <p className="font-medium text-left col-span-3">
                  {product.title}
                </p>
                <p className="font-medium">Desc</p>
                <p className="col-span-3">{product.description}</p>
                <p className="font-medium">Price:</p>
                <p className="col-span-3">{product.price}</p>
                <p className="font-medium">Category:</p>
                <p className="col-span-3 capitalize">{product.category}</p>
              </article>
            </li>
          ))}
      </ul>
    </main>
  );
}
