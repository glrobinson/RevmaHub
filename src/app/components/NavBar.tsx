"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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


  const currentLocale = pathname.split("/")[1];

  const navLinks = [
    {
      href: "/",
      labelKey: "NavBar.home",
      sections: [
        { id: "#mission", labelKey: "NavBar.sections.mission" },
        { id: "#statements", labelKey: "NavBar.sections.statements" },
      ],
    },
    {
      href: "/stories",
      labelKey: "NavBar.teachingRoma",
      sections: [
        { id: "#testimonials", labelKey: "NavBar.sections.testimonials" },
        { id: "#submit", labelKey: "NavBar.sections.submitAdvice" },
        { id: "#community", labelKey: "NavBar.sections.communityCenters" },
        { id: "#video", labelKey: "NavBar.sections.video" },
      ],
    },
    {
      href: "/resources",
      labelKey: "NavBar.resourceArchive",
      sections: [
        { id: "#categories", labelKey: "NavBar.sections.filters" },
        { id: "#search", labelKey: "NavBar.sections.search" },
        { id: "#results", labelKey: "NavBar.sections.results" },
        { id: "#submit", labelKey: "NavBar.sections.submitResources" },
      ],
    },
    {
      href: "/info",
      labelKey: "NavBar.information",
      sections: [
        { id: "#stats", labelKey: "NavBar.sections.stats" },
        { id: "#infographics", labelKey: "NavBar.sections.infographics" },
      ],
    },
  ];
  
  const switchLanguage = (targetLocale: "el" | "en") => {
    const segments = pathname.split("/");
    segments[1] = targetLocale;
    const newPath = segments.join("/") || `/${targetLocale}`;
    router.push(newPath);
    setLanguageDropdownOpen(false);
  
    setTimeout(() => {
      window.location.href = newPath;
    }, 10);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setLanguageDropdownOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-black text-white shadow-md">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        {/* Logo + Title */}
        <Link href={`/${currentLocale}/`} className="flex items-center gap-3">
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
        <div className="md:hidden flex flex-col items-center gap-1">
          <span className="text-sm font-medium text-white">{t("NavBar.menu")}</span>
          <button
            className="focus:outline-none"
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
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-6 text-base font-medium">
        {navLinks.map((link) => {
          const href = `/${currentLocale}${link.href}`;
          const normalizedPath = pathname.replace(/\/$/, "");
          const normalizedHref = href.replace(/\/$/, "");
          const isActive = normalizedPath === normalizedHref;

          return (
            <div key={link.href} className="relative group">
              {/* Main Nav Link */}
              <Link
                href={href}
                className={`px-4 py-2 rounded-md transition-all duration-200 ${
                  isActive
                    ? "bg-white text-black shadow-sm font-semibold"
                    : "text-white hover:bg-white/10 hover:text-yellow-300"
                }`}
              >
                {t(link.labelKey)}
              </Link>

              {/* Dropdown */}
              <div className="absolute left-0 top-full mt-2 bg-white text-black rounded-lg shadow-xl z-40 hidden group-hover:flex flex-col min-w-[220px] overflow-hidden border border-gray-200">
                {link.sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      const isSamePage = pathname.replace(/\/$/, "") === href.replace(/\/$/, "");
                      if (isSamePage) {
                        const el = document.querySelector(section.id);
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                      } else {
                        sessionStorage.setItem("scrollToSection", section.id);
                        router.push(href);
                      }
                    }}
                    className="text-left px-5 py-3 text-sm hover:bg-gray-100 transition-all font-medium tracking-tight w-full"
                  >
                    {t(section.labelKey)}
                  </button>
                ))}
              </div>
            </div>
          );
        })}

        {/* Contact Us */}
        <button
          onClick={() => setIsContactOpen(true)}
          className="px-4 py-2 text-white hover:text-yellow-300 transition-all"
        >
          {t("NavBar.contactUs")}
        </button>

        {/* Language Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 text-white hover:text-yellow-300 transition-all"
            title={currentLocale === "el" ? "Greek" : "English"}
          >
            <Image
              src={currentLocale === "el" ? "/greece.png" : "/united-kingdom.png"}
              alt={currentLocale === "el" ? "Greek" : "English"}
              width={24}
              height={16}
              className="inline-block"
            />
          </button>

          {languageDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg z-50 min-w-[140px] border border-gray-200">
              <div className="flex flex-col">
                <button
                  onClick={() => switchLanguage("en")}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                >
                  <Image src="/united-kingdom.png" alt="English" width={24} height={16} />
                  English
                </button>
                <button
                  onClick={() => switchLanguage("el")}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                >
                  <Image src="/greece.png" alt="Greek" width={24} height={16} />
                  Ελληνικά
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
  <div className="fixed inset-0 z-40 flex md:hidden">
    {/* Background Overlay */}
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm"
      onClick={() => setMenuOpen(false)}
    />

    {/* Side Drawer */}
    <div className="relative w-4/5 max-w-xs bg-black text-white h-full shadow-lg overflow-y-auto transition-transform duration-300 transform translate-x-0">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Image src="/revma-logo.png" alt="Logo" width={32} height={32} className="rounded-full" />
          <span className="text-lg font-semibold">Amke Revma</span>
        </div>
        <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Navigation Items */}
      <div className="p-4 space-y-6">
        {navLinks.map((link) => {
          const href = `/${currentLocale}${link.href}`;
          const isActive = pathname.replace(/\/$/, "") === href.replace(/\/$/, "");

          return (
            <div key={link.href}>
              <div className="mb-2">
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex justify-between items-center w-full px-3 py-2 text-lg font-semibold rounded border transition ${
                    isActive
                      ? "bg-yellow-400 text-black border-white"
                      : "bg-white/10 text-white border-white hover:bg-white/20"
                  }`}
                >
                  {t(link.labelKey)}
                </Link>
              </div>
              <div className="space-y-2 pl-3">
                {link.sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      const isSamePage = pathname === href;
                      if (isSamePage) {
                        const el = document.querySelector(section.id);
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                      } else {
                        sessionStorage.setItem("scrollToSection", section.id);
                        router.push(href);
                      }
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left text-sm px-3 py-2 rounded bg-white/10 hover:bg-white/20 transition font-medium tracking-tight"
                  >
                    {t(section.labelKey)}
                  </button>
                ))}
              </div>
            </div>
          );
        })}

        {/* Contact Button */}
        <button
          onClick={() => {
            setMenuOpen(false);
            setIsContactOpen(true);
          }}
          className="block w-full text-left text-base mt-4 px-3 py-2 rounded bg-white/10 hover:bg-white/20 transition"
        >
          {t("NavBar.contactUs")}
        </button>

        {/* Language Switch */}
        <div className="pt-6 border-t border-white/10 mt-4">
          <div className="font-semibold mb-2">{t("NavBar.language")}</div>
          <div className="flex gap-4 text-base">
            <button onClick={() => switchLanguage("en")} className="flex items-center gap-2">
              <Image src="/united-kingdom.png" alt="English" width={24} height={16} priority unoptimized />
              English
            </button>
            <button onClick={() => switchLanguage("el")} className="flex items-center gap-2">
              <Image src="/greece.png" alt="Greek" width={24} height={16} priority unoptimized />
              Ελληνικά
            </button>
          </div>
        </div>
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
