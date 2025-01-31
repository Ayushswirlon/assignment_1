"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  Menu,
  X,
  ShoppingCart,
  MapPin,
  Utensils,
  Info,
} from "lucide-react";
const NavItem = [
  { name: "Cart", href: "/cart", logo: <ShoppingCart size={24} /> },
  { name: "Location", href: "/location", logo: <MapPin size={24} /> },
  { name: "Stalls", href: "/stalls", logo: <Utensils size={24} /> },
  { name: "Food", href: "/food", logo: <Info size={24} /> },
];

const BottomNav = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md shadow-md md:hidden z-10">
      <div className="flex justify-around py-3">
        {NavItem.map((link) => {
          const isActive =
            pathname === link.href ||
            (pathname.startsWith(link.href) && link.href !== "/");
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex flex-col items-center ${
                isActive ? "text-white" : "text-gray-400"
              }`}
            >
              {link.logo}
              <span className="text-xs">{link.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
