"use client";

import Image from "next/image";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  discount?: number;
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const discountedPrice = product.discount
    ? (product.price - (product.price * product.discount) / 100).toFixed(2)
    : product.price.toFixed(2);

  return (
    <div className="bg-white rounded-xl shadow-md p-4 transition transform hover:-translate-y-2 hover:shadow-lg flex flex-col items-center text-center w-full max-w-xs mx-auto">
      {/* Image Section */}
      <Link href={`/Product/${product.id}`}>
        <div className="relative w-full h-40 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            width={160}
            height={160}
            className="object-contain  mx-auto w-full h-full"
          />
          {product.discount && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-grow w-full mt-3">
          <h2 className="text-sm font-semibold line-clamp-1">
            {product.title}
          </h2>

          <div className="flex items-center justify-center text-xs text-gray-600 mt-1">
            <span className="text-green-600 font-bold">
              ⭐ {product.rating.rate}
            </span>
            <span className="text-gray-400 ml-1">({product.rating.count})</span>
          </div>

          <p className="text-lg font-bold text-black mt-2">
            ${discountedPrice}
            {product.discount && (
              <span className="text-sm text-gray-400 line-through ml-2">
                ${product.price.toFixed(2)}
              </span>
            )}
          </p>
        </div>
      </Link>
      {/* Add to Cart Button at the Bottom */}
      <button
        onClick={() => addToCart(product)}
        className="mt-auto bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800 transition w-full"
      >
        🛒 Order Now
      </button>
    </div>
  );
}
