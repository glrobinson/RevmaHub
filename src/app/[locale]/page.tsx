"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { useQuery } from "@apollo/client";
import client from "../../../lib/apollo";
import {
  GET_MEDIA_ITEMS,
  GET_HOMEPAGE_CAROUSEL_IMAGES,
  GET_TEACHER_STATEMENTS,
} from "../../../lib/queries";
import TeacherStatements from "../components/TeacherStatements";
import { useTranslation } from "../context/TranslationContext";


const carouselImages = [
  "/activities4.jpg",
  "/activities2.jpg",
  "/activities3.jpg",
  "/activities1.jpg",
  "/activities5.jpg",
];

export default function Home() {
  const { t } = useTranslation();
  const { pathname } = window.location;
  const locale = pathname.split("/")[1]?.toUpperCase() || "EN";

  const { data } = useQuery(GET_TEACHER_STATEMENTS, {
    variables: { language: locale },
    client,
  });

  const statements = data?.statements?.nodes || [];

  const { data: idData } = useQuery(GET_HOMEPAGE_CAROUSEL_IMAGES, { client });
  const imageFields = idData?.page?.homepageCarouselImages || {};

  const imageIds = Object.values(imageFields)
    .map((img: any) => img?.node?.databaseId)
    .filter(Boolean);

  const { data: mediaData } = useQuery(GET_MEDIA_ITEMS, {
    variables: { ids: imageIds },
    skip: imageIds.length === 0,
    client,
  });

  const images = mediaData?.mediaItems?.nodes || [];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => setSelectedIndex(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  return (
    <main className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/groupstaff.jpg"
            alt="Teaching Roma Students"
            fill
            priority
            className="object-cover filter blur-sm scale-105"
          />
        </div>
        <div className="absolute inset-0 z-10 bg-black/30 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow">
          {t("HomePage.heroTitle")}
        </h1>
        </div>
      </section>

      {/* Mission Section */}
      <section className="text-center">
        <h2 className="text-xl sm:text-3xl font-semibold mb-4">
          {t("HomePage.missionTitle")}
        </h2>
        <p className="text-gray-700 max-w-xl mx-auto mb-6 text-sm sm:text-base">
          {t("HomePage.missionText")}
        </p>

      <div className="max-w-4xl mx-auto relative">
        {/* Carousel Viewport */}
        <div className="overflow-hidden rounded-lg" ref={emblaRef}>
            <div className="flex">
            {images.map((img: { databaseId: number; sourceUrl: string; altText?: string }, index: number) => (
            <div
              key={img.databaseId}
              className="flex-shrink-0 relative w-full h-56 sm:h-64 md:h-80"
            >
              <Image
                src={img.sourceUrl}
                alt={img.altText || `Carousel image ${index + 1}`}
                fill
                className="object-cover rounded"
              />
            </div>
          ))}
          </div>
        </div>

        {/* Left Arrow */}
        <button
          onClick={() => emblaApi && emblaApi.scrollPrev()}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 sm:p-3 hover:bg-gray-200 transition z-10"
          aria-label="Previous"
        >
          <span className="text-lg sm:text-xl">←</span>
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => emblaApi && emblaApi.scrollNext()}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full shadow p-2 sm:p-3 hover:bg-gray-200 transition z-10"
          aria-label="Next"
        >
          <span className="text-lg sm:text-xl">→</span>
        </button>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-3 h-3 rounded-full transition ${
                selectedIndex === index ? "bg-black" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>


    {/* Teacher & Staff Statements */}
    <TeacherStatements />

{/* CTA Section */}
<section className="text-center py-16 bg-gray-50 px-4 mb-12">
        <h4 className="text-2xl font-semibold mb-8 text-gray-800">
          {t("HomePage.ctaTitle")}
        </h4>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Link href="/stories">
            <button className="w-full md:w-auto px-6 py-3 rounded-lg bg-white text-gray-800 font-medium border border-gray-300 shadow hover:shadow-md hover:bg-gray-100 transition-all duration-200">
              {t("HomePage.teachingRomaBtn")}
            </button>
          </Link>
          <Link href="/resources">
            <button className="w-full md:w-auto px-6 py-3 rounded-lg bg-white text-gray-800 font-medium border border-gray-300 shadow hover:shadow-md hover:bg-gray-100 transition-all duration-200">
              {t("HomePage.resourceArchiveBtn")}
            </button>
          </Link>
          <Link href="/info">
            <button className="w-full md:w-auto px-6 py-3 rounded-lg bg-white text-gray-800 font-medium border border-gray-300 shadow hover:shadow-md hover:bg-gray-100 transition-all duration-200">
              {t("HomePage.infoBtn")}
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}