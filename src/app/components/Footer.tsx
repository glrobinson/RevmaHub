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
      <footer className="bg-black text-white pt-12 pb-8 px-6 mt-20 border-t border-gray-800">
  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-sm">
    
    {/* Quick Links */}
    <div className="text-center sm:text-left">
      <h5 className="text-base font-semibold mb-4">{t("Footer.quickLinks")}</h5>
      <ul className="space-y-2">
        <li><Link href="/" className="hover:underline">{t("NavBar.home")}</Link></li>
        <li><Link href="/stories" className="hover:underline">{t("NavBar.teachingRoma")}</Link></li>
        <li><Link href="/resources" className="hover:underline">{t("NavBar.resourceArchive")}</Link></li>
        <li><Link href="/info" className="hover:underline">{t("NavBar.information")}</Link></li>
        <li>
          <button onClick={() => setShowContributors(true)} className="hover:underline">
            {t("Footer.contributors")}
          </button>
        </li>
      </ul>
    </div>

    {/* Contact */}
    <div className="text-center sm:text-left">
      <h5 className="text-base font-semibold mb-4">{t("Footer.getConnected")}</h5>
      <ul className="space-y-2">
        <li className="flex justify-center sm:justify-start items-center gap-2">
          📞 <span>{t("Footer.phone")}: 694 388 4290</span>
        </li>
        <li className="flex justify-center sm:justify-start items-center gap-2">
          ✉️ <a href="mailto:revma.infothess@gmail.com" className="underline text-blue-300 hover:text-blue-400">revma.infothess@gmail.com</a>
        </li>
        <li className="flex justify-center sm:justify-start items-center gap-2">
          🔗 <a href="https://www.facebook.com/REVMA.AMKE/" target="_blank" rel="noopener noreferrer" className="underline text-blue-300 hover:text-blue-400">revmafacebook.org</a>
        </li>
      </ul>
    </div>

    {/* Logo */}
    <div className="flex justify-center items-center">
      <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full flex items-center justify-center">
        <Image
          src="/revma-logo.png"
          alt="Revma Logo"
          width={100}
          height={100}
          className="object-contain"
        />
      </div>
    </div>
  </div>
</footer>



      {/* Contributors Modal */}
    {showContributors && (
      <div className="fixed inset-0 z-50 flex flex-col items-center sm:justify-center px-8 py-10 sm:py-16 overflow-y-auto backdrop-blur-md">


        {/* Dark Background */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-md"
          onClick={() => setShowContributors(false)}
        />

        {/* Modal Content */}
        <section className="relative bg-white w-full max-w-4xl px-6 pt-6 pb-4 sm:px-8 sm:pt-10 sm:pb-6 rounded-lg shadow-xl text-center">

          {/* Close X */}
          <button
            className="absolute top-4 right-4 text-xl font-bold text-gray-600 hover:text-black"
            onClick={() => setShowContributors(false)}
          >
            ✕
          </button>

          <h2 className="text-2xl sm:text-3xl font-semibold mt-4 sm:mt-6 mb-8">
            {t("Footer.meetContributors")}
          </h2>

          {/* Contributors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {contributors.map((person, idx) => (
              <div key={idx} className="flex flex-col items-center space-y-2 sm:space-y-3">
                <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-gray-300 shadow">
                  <Image
                    src={person.image}
                    alt={t(`Footer.names.${person.id}`)}
                    width={150}
                    height={150}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h3 className="font-semibold text-sm sm:text-base text-gray-900">
                  {t(`Footer.names.${person.id}`)}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm text-center">
                  {t(`Footer.roles.${person.id}`)}
                </p>
              </div>
            ))}
          </div>

          {/* Report Button */}
    <div className="mt-4 sm:mt-5">
            <a
              href="https://wpi0-my.sharepoint.com/:w:/g/personal/mzekavat_wpi_edu/EXitGuFrN3NBrrhNllyCKXYBs0IEsTMtR34zZ-RQDNRUeA?e=j2CEuH"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-gray-100 hover:bg-gray-200 text-black rounded hover:bg-yellow-500 transition"
            >
              {t("Footer.reportText")}
            </a>
          </div>

          {/* Bottom Close Button */}
          <button
            className="mt-4 mb-4 px-6 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium shadow"
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
