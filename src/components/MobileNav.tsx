import React from "react";
import Link from "next/link";
import { X } from "lucide-react";

const MobileNav = ({ isOpen, setIsOpen, navLinks, pathname }) => {
  return (
    <div
      className={`${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed top-0 left-0 w-3/4 h-full bg-black shadow-lg p-6 flex flex-col transition-transform duration-300 md:hidden z-10`}
    >
      <button
        className="self-end mb-4 text-white"
        onClick={() => setIsOpen(false)}
      >
        <X size={28} />
      </button>
      {navLinks.map((link) => {
        const isActive =
          pathname === link.href ||
          (pathname.startsWith(link.href) && link.href !== "/");
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`py-2 text-lg ${
              isActive ? "text-white font-bold" : "text-gray-400"
            } border-b`}
            onClick={() => setIsOpen(false)}
          >
            {link.name}
          </Link>
        );
      })}
      <div className="mt-6 flex flex-col gap-3">
        <button className="px-4 py-2 bg-transparent text-white rounded-full border border-white">
          Login
        </button>
        <button className="px-4 py-2 bg-white text-black rounded-full">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default MobileNav;
