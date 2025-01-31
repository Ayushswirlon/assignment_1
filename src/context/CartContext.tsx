"use client";
import { Toaster, toast } from "react-hot-toast";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type CartItem = {
  id: number;
  quantity?: number;
  title: string;
  price: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add to cart function
  const addToCart = (cartItem: CartItem) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === cartItem.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === cartItem.id
            ? { ...item, quantity: (item.quantity ?? 1) + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...cartItem, quantity: 1 }];
      }
    });

    toast.success("Item added to cart"); // Moved toast outside of setCartItems
  };

  // Remove from cart function
  const removeFromCart = (id: number) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.id !== id));
    toast.success("Item removed from cart"); // Fixed the message
  };

  // Clear cart function
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
    toast.success("Cart cleared");
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      <Toaster position="top-right" containerClassName="z-50" />
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook for using the Cart Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

export { CartProvider };
