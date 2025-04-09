"use client";

import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-800 pt-12 pb-8 px-6 mt-20 border-t border-gray-300">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">

        {/* Quick Links */}
        <div>
          <h5 className="text-base font-semibold mb-4 text-gray-900">Quick Links</h5>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:underline text-gray-700">Main Page</Link>
            </li>
            <li>
              <Link href="/stories" className="hover:underline text-gray-700">Teaching Roma</Link>
            </li>
            <li>
              <Link href="/resources" className="hover:underline text-gray-700">Resource Archive</Link>
            </li>
            <li>
              <Link href="/info" className="hover:underline text-gray-700">Information</Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h5 className="text-base font-semibold mb-4 text-gray-900">Get Connected</h5>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-center gap-2">
              📞 <span>Phone: 694 388 4290</span>
            </li>
            <li className="flex items-center gap-2">
              ✉️ <a href="mailto:revma.infothess@gmail.com" className="underline">revma.infothess@gmail.com</a>
            </li>
            <li className="flex items-center gap-2">
              🔗 <a
                href="https://www.facebook.com/REVMA.AMKE/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                revmafacebook.org
              </a>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <div className="flex justify-center items-center">
        <div className="w-[140px] h-[140px] rounded-full bg-black flex items-center justify-center">
          <Image
            src="/revma-logo.png"
            alt="Revma Logo"
            width={150}
            height={150}
            className="rounded-full"
          />
        </div>
        </div>
      </div>

      {/* Footer bottom (optional) */}
      <div className="text-center text-xs text-gray-500 mt-10">
        &copy; {new Date().getFullYear()} Revma. All rights reserved.
      </div>
    </footer>
  );
}
