"use client";

import Image from "next/image";
import { useQuery } from "@apollo/client";
import { GET_INFOGRAPHICS } from "../../../../lib/queries";
import client from "../../../../lib/apollo";
import { useEffect, useState } from "react";
import { useTranslation } from "../../context/TranslationContext";
import TimelinePreviewCard from "../../components/TimelinePreviewCard";
import { usePathname } from "next/navigation";

interface InfographicImageNode {
  sourceUrl: string;
  altText?: string;
  databaseId?: number;
}

interface InfographicItem {
  infographicsimages: {
    infographicImage: {
      node: InfographicImageNode;
    };
  };
}


export default function InfoPage() {
  const pathname = usePathname();
const rawLocale = pathname?.split("/")[1]?.toUpperCase();
const locale = rawLocale === "EN" ? "EN" : "EL";
  const { t } = useTranslation();
  const { data  } = useQuery(GET_INFOGRAPHICS, {
      variables: { language: locale },
      client,
      skip: !locale,
  });
  const infographics = data?.infographics?.nodes || [];
  const [visibleInfographics, setVisibleInfographics] = useState(6);
  const visibleItems = infographics.slice(0, visibleInfographics);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const statSources = [
    "https://fra.europa.eu/sites/default/files/fra_uploads/fra-2014-roma-survey-dif-education-1_en.pdf",
    "https://fra.europa.eu/sites/default/files/fra_uploads/fra-2014-roma-survey-dif-education-1_en.pdf",
    "https://fra.europa.eu/sites/default/files/fra_uploads/fra-2014-roma-survey-dif-education-1_en.pdf",
    "https://tinyurl.com/2ayykjea",
    "https://fra.europa.eu/sites/default/files/fra_uploads/fra-2014-roma-survey-dif-education-1_en.pdf",
    "https://fra.europa.eu/sites/default/files/fra_uploads/fra-2014-roma-survey-dif-education-1_en.pdf"
  ];

  useEffect(() => {
    const sectionId = sessionStorage.getItem("scrollToSection");
    if (sectionId) {
      setTimeout(() => {
        const el = document.querySelector(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        sessionStorage.removeItem("scrollToSection");
      }, 250);
    }
  }, []);

  return (
    <main className="space-y-5 text-sm">
      {/* Hero Section */}
        <section className="relative h-[400px] w-full overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/classroom.jpg"
              alt={t("InfoPage.heroAlt")}
              fill
              priority
              className="object-cover filter blur-sm scale-105"
              />
            </div>
            <div className="absolute inset-0 z-10 bg-black/30 flex flex-col items-center justify-center text-center px-4">
              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow">
              {t("InfoPage.heroTitle")}
              </h1>
              <p className="text-white text-sm sm:text-base md:text-lg max-w-2xl drop-shadow">
              {t("InfoPage.heroDescription")}
              </p>
            </div>
          </section>

      <section id="stats" className="scroll-mt-24">
      {/* Statistics Section */}
      <section className="bg-gray-100 px-6 py-14 max-w-6xl mx-auto text-center space-y-10">
        <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">
          {t("InfoPage.statsTitle")}
        </h2>
        <p className="text-base text-gray-700">
          {t("InfoPage.statsDescription")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((statNum, index) => (
          <a
          key={statNum}
          href={statSources[index]}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white p-6 rounded shadow-md border border-gray-200 text-center transition duration-200 ease-in-out hover:shadow-xl hover:scale-[1.02] hover:border-yellow-500 hover:bg-yellow-50 cursor-pointer group"
        >
          <p className="text-4xl font-bold text-yellow-500 group-hover:text-yellow-600 transition">
            {t(`InfoPage.stat${statNum}Percent`)}
          </p>
          <p className="text-sm text-gray-700 mt-2 group-hover:text-gray-900 transition">
            {t(`InfoPage.stat${statNum}Text`)}
          </p>
          <p className="text-xs text-gray-500 mt-2 md:hidden">
            {t("InfoPage.tapToSource")}
          </p>
        </a>  
        ))}
      </div>
      </section>
      </section>

    <section id="infographics" className="scroll-mt-24">
    {/* Infographics Section */}
    <section className="py-10 px-6">
        <div className="max-w-6xl mx-auto space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">{t("InfoPage.infographicsTitle")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleItems.map((item: InfographicItem, index: number) => {
              const image = item.infographicsimages?.infographicImage?.node;
              if (!image?.sourceUrl) return null;

              return (
                <div
                  key={image.databaseId || index}
                  className="relative rounded shadow cursor-pointer transform transition duration-300 hover:scale-[1.02] hover:shadow-lg group"
                  onClick={() => setModalImage(image.sourceUrl)}
                >
                  {/* Scrollable image container */}
                  <div
                  className="h-[920px] overflow-y-auto overscroll-auto w-full bg-white rounded relative"
                  style={{
                    scrollbarWidth: 'auto',
                    WebkitOverflowScrolling: 'touch',
                  }}
                >
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-10 md:hidden text-xs text-black pointer-events-none px-3 py-1 rounded text-center w-max max-w-[90%]">
                    {t("InfoPage.scrollToView")}
                  </div>

                  <Image
                    src={image.sourceUrl}
                    alt={image.altText || `Infographic ${index + 1}`}
                    width={700}
                    height={700}
                    className="object-contain w-full"
                  />
                </div>
                  {/* Tap to view message for mobile */}
                  <div className="absolute inset-0 flex items-end justify-center md:hidden pointer-events-none z-30">
                    <div className="text-black text-sm font-semibold px-4 py-2 rounded-t-md w-full text-center shadow-lg tracking-wide">
                      {t("InfoPage.tapToView")}
                    </div>
                  </div>
                </div>
              );
            })}
            <TimelinePreviewCard />
          </div>

        {/* Load More / Show Less Buttons */}
        <div className="col-span-full mt-6 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
          {infographics.length > visibleInfographics && (
            <button
              onClick={() => setVisibleInfographics((prev) => prev + 3)}
              className="w-full md:w-auto px-6 py-3 rounded-lg bg-white text-gray-800 font-medium border border-gray-300 shadow hover:shadow-md hover:bg-gray-100 transition-all duration-200"
            >
              {t("InfoPage.loadMore")}
            </button>
          )}
          {visibleInfographics > 6 && (
            <button
              onClick={() => setVisibleInfographics((prev) => Math.max(6, prev - 3))}
              className="w-full md:w-auto px-6 py-3 rounded-lg bg-white text-gray-800 font-medium border border-gray-300 shadow hover:shadow-md hover:bg-gray-100 transition-all duration-200"
            >
              {t("InfoPage.showLess")}
            </button>
          )}
        </div>
      </div>
    </section>
    </section>

    {/* Image Modal */}
    {modalImage && (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm overflow-y-auto"
      onClick={() => setModalImage(null)}
    >
      <div
        className="relative bg-white p-4 rounded-lg shadow-lg max-w-4xl w-[90%] mx-auto my-10 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* X Close Button */}
        <button
          onClick={() => setModalImage(null)}
          className="absolute top-4 right-4 text-black text-3xl font-bold hover:text-black z-10"
        >
          &times;
        </button>

        {/* Image */}
        <Image
          src={modalImage}
          alt="Full-size infographic"
          width={1200}
          height={1200}
          className="w-full h-auto rounded"
        />

        {/* Download Button at Bottom */}
        <a
          href={modalImage}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white border border-black hover:bg-gray-300 px-4 py-1 rounded text-sm"
        >
          {t("InfoPage.download")}
        </a>
      </div>
    </div>
  )}
    </main>
  );
}
