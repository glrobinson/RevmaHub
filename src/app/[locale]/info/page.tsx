"use client";

import Image from "next/image";
import { useQuery } from "@apollo/client";
import { GET_INFOGRAPHICS } from "../../../../lib/queries";
import client from "../../../../lib/apollo";
import { useEffect, useState } from "react";
import { useTranslation } from "../../context/TranslationContext";

export default function InfoPage() {
  const [locale, setLocale] = useState("EN");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const language = path.split("/")[1]?.toUpperCase() || "EN";
      setLocale(language);
    }
  }, []);
  const { t } = useTranslation();
  const { data, loading, error } = useQuery(GET_INFOGRAPHICS, {
      variables: { language: locale },
      client,
  });
  const infographics = data?.infographics?.nodes || [];
  const [visibleInfographics, setVisibleInfographics] = useState(6);
  const visibleItems = infographics.slice(0, visibleInfographics);
  const [modalImage, setModalImage] = useState<string | null>(null);
  return (
    <main className="space-y-5 text-sm">


      {/* Hero Section with Blurred Background */}
        <section className="relative h-[400px] w-full overflow-hidden">
          {/* Blurred background image layer */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/classroom.jpg"
              alt={t("InfoPage.heroAlt")}
              fill
              priority
              className="object-cover filter blur-sm scale-105"
              />
            </div>
                  
            {/* Overlay and text */}
            <div className="absolute inset-0 z-10 bg-black/30 flex flex-col items-center justify-center text-center px-4">
              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow">
              {t("InfoPage.heroTitle")}
              </h1>
              <p className="text-white text-sm sm:text-base md:text-lg max-w-2xl drop-shadow">
              {t("InfoPage.heroDescription")}
              </p>
            </div>
          </section>

      {/* Statistics Section */}
      <section className="bg-gray-100 px-6 py-14 max-w-6xl mx-auto text-center space-y-10">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
          {t("InfoPage.statsTitle")}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {t("InfoPage.statsDescription")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((statNum) => (
            <div
              key={statNum}
              className="bg-white p-6 rounded shadow-md border border-gray-200 text-center"
            >
              <p className="text-4xl font-bold text-yellow-500">
                {t(`InfoPage.stat${statNum}Percent`)}
              </p>
              <p className="text-sm text-gray-700 mt-2">
                {t(`InfoPage.stat${statNum}Text`)}
              </p>
            </div>
          ))}
        </div>
      </section>

    {/* Infographics Section */}
    <section className="py-10 px-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <h2 className="text-xl sm:text-3xl font-semibold mb-4">{t("InfoPage.infographicsTitle")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleItems.map((item: any, index: number) => {
              const image = item.infographicsimages?.infographicImage?.node;
              if (!image?.sourceUrl) return null;

              return (
                <div
                  key={image.databaseId || index}
                  className="rounded overflow-hidden shadow cursor-pointer"
                  onClick={() => setModalImage(image.sourceUrl)}
                >
                  <Image
                    src={image.sourceUrl}
                    alt={image.altText || `Infographic ${index + 1}`}
                    width={700}
                    height={700}
                    className="object-cover w-full h-full"
                  />
                </div>
              );
            })}
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

    {/* Image Modal */}
    {modalImage && (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm overflow-y-auto"
      onClick={() => setModalImage(null)}
    >
      <div
        className="relative bg-white p-4 rounded-lg shadow-lg max-w-4xl w-[90%] mx-auto my-10 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()} // prevent close on click inside
      >
        {/* X Close Button */}
        <button
          onClick={() => setModalImage(null)}
          className="absolute top-4 right-4 text-gray-700 text-3xl font-bold hover:text-black z-10"
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
          className="w-full md:w-auto px-6 py-3 rounded-lg bg-white text-gray-800 font-medium border border-gray-300 shadow hover:shadow-md hover:bg-gray-100 transition-all duration-200"
        >
          {t("InfoPage.download")}
        </a>
      </div>
    </div>
  )}
    </main>
  );
}
