"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import BottomNav from "./BottomNav";
import MobileNav from "./MobileNav";
import { useSearch } from "@/context/SearchContext";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Categories", href: "/categories" },
  { name: "Menu", href: "/menu" },
  { name: "Location", href: "/location" },
  { name: "Help", href: "/help" },
  { name: "Cart", href: "/cart" },
];

export default function Navigation({}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { setQuery } = useSearch();
  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="relative flex items-center justify-between px-6 py-4 bg-black shadow-md">
        {/* Logo & Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <Link className="text-xl font-bold text-white" href="/">
            MyApp
          </Link>
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Search Bar (Hidden on Mobile) */}

        <div className="hidden sm:flex relative w-64 md:w-80">
          <div className="relative w-full">
            <input
              type="text"
              className="w-full py-2 pl-10 pr-4 text-white bg-black border border-gray-600 rounded-lg focus:outline-none focus:border-white"
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
            />
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
          </div>
        </div>

        {/* Desktop Navigation Links & Auth Buttons */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (pathname.startsWith(link.href) && link.href !== "/");
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-2 py-1 text-lg font-medium transition-all duration-300
                  ${
                    isActive
                      ? "text-white after:w-full"
                      : "text-gray-400 hover:text-white after:w-0 hover:after:w-full"
                  }
                  after:block after:h-[2px] after:bg-white after:transition-all after:duration-300`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-transparent text-white rounded-full border border-white">
              Login
            </button>
            <button className="px-4 py-2 bg-white text-black rounded-full">
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <MobileNav
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        navLinks={navLinks}
        pathname={pathname}
      />

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
