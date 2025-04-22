"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "../context/TranslationContext";


export function Footer() {
  const [showContributors, setShowContributors] = useState(false);
  const { t } = useTranslation();


  const contributors = [
    {
      id: "GraceRobinson",
      role: "BS/MS in Computer Science and Data Science",
      image: "/grace.jpg",
    },
    {
      id: "AnnaKelly",
      role: "BS in Electical and Computer Engineering",
      image: "/anna.jpg",
    },
    {
      id: "MelicaZekavat",
      role: "BS in Biomedical Engineering with a Minor in Data Science and Computer Science",
      image: "/melica.jpg",
    },
    {
      id: "PrakritiPragya",
      role: "BS in Robotics Engineering with a Minor in Computer Science",
      image: "/prakriti.jpg",
    },
  ];

  return (
    <>
      <footer className="bg-gray-100 text-gray-800 pt-12 pb-8 px-6 mt-20 border-t border-gray-300">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">
          {/* Quick Links */}
          <div>
            <h5 className="text-base font-semibold mb-4 text-gray-900">{t("Footer.quickLinks")}</h5>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:underline text-gray-700">{t("NavBar.home")}</Link></li>
              <li><Link href="/stories" className="hover:underline text-gray-700">{t("NavBar.teachingRoma")}</Link></li>
              <li><Link href="/resources" className="hover:underline text-gray-700">{t("NavBar.resourceArchive")}</Link></li>
              <li><Link href="/info" className="hover:underline text-gray-700">{t("NavBar.information")}</Link></li>
              <li>
                <button onClick={() => setShowContributors(true)} className="text-gray-700 hover:underline hover:text-gray-900">
                {t("Footer.contributors")}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-base font-semibold mb-4 text-gray-900">{t("Footer.getConnected")}</h5>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">📞 <span>{t("Footer.phone")}: 694 388 4290</span></li>
              <li className="flex items-center gap-2">✉️ <a href="mailto:revma.infothess@gmail.com" className="underline">revma.infothess@gmail.com</a></li>
              <li className="flex items-center gap-2">🔗 <a href="https://www.facebook.com/REVMA.AMKE/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">revmafacebook.org</a></li>
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

        <div className="text-center text-xs text-gray-500 mt-10">
          &copy; {new Date().getFullYear()} Revma. {t("Footer.rights")}
        </div>
      </footer>

      {/* Contributors Modal */}
      {showContributors && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div
            className="absolute inset-0 backdrop-blur-md bg-black/50"
            onClick={() => setShowContributors(false)}
          />

          {/* Modal Content */}
          <section className="relative bg-white max-w-4xl w-full mx-4 px-6 py-10 rounded-lg shadow-xl text-center z-50">
          <button
              className="absolute top-4 right-4 text-xl font-bold text-gray-600 hover:text-black"
              onClick={() => setShowContributors(false)}
            >
              ✕
            </button>
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6">{t("Footer.meetContributors")}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {contributors.map((person, idx) => (
                <div key={idx} className="flex flex-col items-center space-y-4">
                  <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-gray-300 shadow-md">
                    <Image
                      src={person.image}
                      alt={t(`Footer.names.${person.id}`)}
                      width={160}
                      height={160}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-lg text-gray-900">{t(`Footer.names.${person.id}`)}</h3>
                  <p className="text-gray-600 text-sm text-center leading-snug">
                    {t(`Footer.roles.${person.id}`)}
                  </p>
                </div>
              ))}
            </div>

            {/* Close Button */}
            <button
              className="mt-4 px-6 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium shadow"
              onClick={() => setShowContributors(false)}
            >
              {t("Footer.close")}
            </button>
          </section>
        </div>
      )}
    </>
  );
}
