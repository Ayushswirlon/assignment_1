"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ProductCard from "./ProductCard";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  discount?: number; // Optional discount percentage
};

export default function CarouselCard({ category }: { category: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/category/${category}`
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-center mb-4 capitalize">
        {category}
      </h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <>
          {/* Show carousel on large screens */}
          <div className="hidden md:block">
            <Carousel opts={{ align: "start" }} className="w-full">
              <CarouselContent className="-ml-1">
                {products.map((product) => (
                  <CarouselItem
                    key={product.id}
                    className="pl-1 md:basis-1/3 lg:basis-1/3"
                  >
                    <ProductCard product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          {/* Show top 6 products on mobile */}
          <div className="md:hidden grid grid-cols-2 sm:grid-cols-3 gap-4">
            {products.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            <button className="col-span-full bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 text-center">
              View More
            </button>
          </div>
        </>
      )}
    </div>
  );
}
