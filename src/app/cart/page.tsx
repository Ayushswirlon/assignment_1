"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";

type CartItem = {
  id: number;
  title: string;
  price: number;
  quantity?: number;
  image?: string;
};

const Cart: React.FC = () => {
  const { cartItems, removeFromCart } = useCart();

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item: CartItem) => (
              <div
                key={item.id}
                className="flex items-center justify-between border p-4 rounded-lg shadow-md"
              >
                {/* Product Image */}
                {item.image && (
                  <div className="w-20 h-20 relative">
                    <Image
                      src={item.image}
                      alt={item.title}
                      layout="fill"
                      objectFit="contain"
                      className="rounded-md"
                    />
                  </div>
                )}

                {/* Product Details */}
                <div className="flex-1 ml-4">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-gray-600">
                    ${item.price.toFixed(2)} x {item.quantity || 1}
                  </p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Subtotal Section */}
          <div className="mt-6 p-4 border-t flex justify-between items-center">
            <h2 className="text-xl font-semibold">Subtotal:</h2>
            <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="mt-8 flex justify-between items-center p-4 border-t border-gray-300">
            <div>
              <Link href="/checkout">
                <span className="text-blue-500 hover:underline">Edit Cart</span>
              </Link>
            </div>
            <div>
              <Link href="/payment">
                <span className="bg-black border border-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300">
                  Proceed to Pay
                </span>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
