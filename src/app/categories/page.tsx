import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import CarouselCard from "@/components/CarouselCard";

export default async function Home() {
  const response = await fetch(
    "https://fakestoreapi.com/products/categories"
  ).then((res) => res.json());
  const category = await response;
  console.log(
    await fetch(`https://fakestoreapi.com/products/categories/${category[0]}`)
  );
  console.log(category);
  return (
    <div className="min-h-screen p-8 sm:p-20 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-10">Our Products</h1>
      {category.map((categories: string, index: number) => (
        <div key={index} className="mb-10 mt-10">
          <CarouselCard category={categories} key={index} />
        </div>
      ))}
    </div>
  );
}
