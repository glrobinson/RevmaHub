"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

export function NavBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/stories", label: "Teaching Roma" },
    { href: "/resources", label: "Resource Archive" },
    { href: "/info", label: "Information" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-black text-white shadow-md">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">

        {/* Logo + Title */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/revma-logo.png"
            alt="Amke Revma Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-xl font-bold whitespace-nowrap">Amke Revma</span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-4 text-sm">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded transition duration-200
                  ${isActive ? "bg-white text-black" : "hover:bg-white hover:text-black"}
                  ${!isActive && "hover:scale-105"}
                `}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
