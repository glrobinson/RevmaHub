"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import ContactModal from "./ContactModal";

export function NavBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/stories", label: "Teaching Roma" },
    { href: "/resources", label: "Resource Archive" },
    { href: "/info", label: "Learn More" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-black text-white shadow-md">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">

        {/* Logo + Title */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/revma-logo.png"
            alt="Amke Revma Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <span className="text-2xl font-bold whitespace-nowrap">Amke Revma</span>
        </Link>

        {/* Hamburger Icon (Mobile) */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-4 text-base">
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
          <button
          onClick={() => setIsContactOpen(true)}
          className="px-3 py-2 rounded hover:bg-white hover:text-black text-base transition duration-200"
        >
          Contact Us
        </button>
        <div id="google_translate_element"></div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black px-6 py-4 space-y-2 text-base">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 rounded transition duration-200
                  ${isActive ? "bg-white text-black" : "hover:bg-white hover:text-black"}
                `}
              >
                {link.label}
              </Link>
            );
          })}
          <button
          onClick={() => {
            setMenuOpen(false);
            setIsContactOpen(true);
          }}
          className="block w-full text-left px-3 py-2 rounded hover:bg-white hover:text-black"
        >
          Contact Us
        </button>
        </div>
      )}

    {isContactOpen && (
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    )}
    </nav>
  );
}
