import React from "react";
import Image from "next/image";
import Button from "./Button"; // Ensure correct import path

// Define Product Type
type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
};

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    // ✅ Fetch product data dynamically
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Product not found");
    }

    const product: Product = await response.json();

    return (
      <div className="max-w-4xl mx-auto p-8 bg-white text-black rounded-lg shadow-lg min-h-screen pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          <div className="relative w-full max-w-md h-96 mx-auto">
            <Image
              src={product.image}
              alt={product.title}
              layout="fill"
              objectFit="contain"
              className="rounded-lg shadow-lg"
              priority
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-bold">{product.title}</h1>
            <p className="text-lg sm:text-xl text-gray-700">
              {product.description}
            </p>

            <div className="flex items-center space-x-2 text-gray-600">
              <div className="flex">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-5 h-5 ${
                      index < Math.round(product.rating.rate)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 15.27l4.47 2.33-1.15-5.03L18 7.79l-5.14-.43L10 2 7.14 7.36 2 7.79l4.68 4.78-1.15 5.03L10 15.27z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-500">
                ({product.rating.count} reviews)
              </span>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-2xl font-semibold">
                ${product.price.toFixed(2)}
              </p>
              <span className="text-sm font-semibold uppercase bg-gray-200 px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>

            <Button product={product} value="Add to Cart" />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return (
      <div className="text-center text-red-500 mt-20">Product not found</div>
    );
  }
}
