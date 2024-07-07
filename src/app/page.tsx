import Image from "next/image";

const BASE_URL = "https://dummyjson.com";

async function getAllProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) return;
  const data = await res.json();
  return data;
}

export default async function Home() {
  const getProducts = await getAllProducts();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>All Producst</h1>
      <div>
        <pre>{JSON.stringify(getProducts, null, 2)}</pre>
      </div>
    </main>
  );
}
