"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import ContactModal from "./ContactModal";
import { useTranslation } from "../context/TranslationContext";


export function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const { t } = useTranslation();


  const currentLocale = pathname.split("/")[1]; // 'en' or 'el'
  const currentFlag = currentLocale === "el" ? "🇬🇷" : "🇬🇧";

  const navLinks = [
    { href: "/stories", labelKey: "NavBar.teachingRoma" },
    { href: "/resources", labelKey: "NavBar.resourceArchive" },
    { href: "/info", labelKey: "NavBar.information" },
  ];
  

  const switchLanguage = (targetLocale: "en" | "el") => {
    const segments = pathname.split("/");
    segments[1] = targetLocale; // Replace the locale segment
    const newPath = segments.join("/") || `/${targetLocale}`;
    router.push(newPath);
    setLanguageDropdownOpen(false);
  
    // 🛠️ Force a full page reload to trigger language re-init
    setTimeout(() => {
      window.location.href = newPath;
    }, 10);
  };
  

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-black text-white shadow-md">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo + Title */}
        <Link href={`/${currentLocale}`} className="flex items-center gap-3">
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
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-4 text-base">
          <Link
            key="home"
            href={`/${currentLocale}`}
            className={`px-3 py-2 rounded transition duration-200 ${
              pathname === `/${currentLocale}` ? "bg-white text-black" : "hover:bg-white hover:text-black"
            }`}
          >
            {t("NavBar.home")}
          </Link>

          {navLinks.map((link) => {
            const href = `/${currentLocale}${link.href}`;
            const isActive = pathname === href;
            return (
              <Link
                key={link.href}
                href={href}
                className={`px-3 py-2 rounded transition duration-200 ${
                  isActive ? "bg-white text-black" : "hover:bg-white hover:text-black"
                } ${!isActive && "hover:scale-105"}`}
              >
                {t(link.labelKey)}
              </Link>
            );
          })}

          <button
            onClick={() => setIsContactOpen(true)}
            className="px-3 py-2 rounded hover:bg-white hover:text-black text-base transition duration-200"
          >
            {t("NavBar.contactUs")}
          </button>

          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
              className="px-3 py-2 rounded hover:bg-white hover:text-black text-lg transition"
              title={currentLocale === "el" ? "Greek" : "English"}
            >
              {currentFlag}
            </button>
            {languageDropdownOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-white text-black rounded shadow-lg z-50">
                <div className="flex flex-col">
                  <button
                    onClick={() => switchLanguage("en")}
                    className="text-left px-4 py-2 hover:bg-gray-100"
                    title="English"
                  >
                    🇬🇧 English
                  </button>
                  <button
                    onClick={() => switchLanguage("el")}
                    className="text-left px-4 py-2 hover:bg-gray-100"
                    title="Greek"
                  >
                    🇬🇷 Ελληνικά
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black px-6 py-4 space-y-2 text-base">
          <Link
            key="home-mobile"
            href={`/${currentLocale}`}
            onClick={() => setMenuOpen(false)}
            className={`block px-3 py-2 rounded transition duration-200 ${
              pathname === `/${currentLocale}` ? "bg-white text-black" : "hover:bg-white hover:text-black"
            }`}
          >
            {t("NavBar.home")}
          </Link>
          {navLinks.map((link) => {
            const href = `/${currentLocale}${link.href}`;
            const isActive = pathname === href;
            return (
              <Link
                key={link.href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 rounded transition duration-200 ${
                  isActive ? "bg-white text-black" : "hover:bg-white hover:text-black"
                }`}
              >
                {t(link.labelKey)}
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
            {t("NavBar.contactUs")}
          </button>

          {/* Mobile Language Switch */}
          <div className="pt-4">
            <div className="font-semibold mb-1">Language</div>
            <div className="flex flex-col space-y-2 text-xl">
              <button onClick={() => switchLanguage("en")} title="English">
                🇬🇧 English
              </button>
              <button onClick={() => switchLanguage("el")} title="Greek">
                🇬🇷 Ελληνικά
              </button>
            </div>
          </div>
        </div>
      )}

      {isContactOpen && (
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      )}
    </nav>
  );
}
