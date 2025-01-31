"use client";
import React from "react";
import { useCart } from "@/context/CartContext";

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

const Button = ({ product, value }: { product: Product; value: string }) => {
  const { addToCart } = useCart();

  return (
    <div className="relative pb-6">
      <button
        onClick={() => addToCart(product)}
        className="w-full py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-300 shadow-lg"
      >
        {value}
      </button>
    </div>
  );
};

export default Button;
