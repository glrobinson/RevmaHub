"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { GET_STORIES_TESTIMONIALS } from "../../../lib/queries";
import client from "../../../lib/apollo";
import { useTranslation } from "../context/TranslationContext";


export default function TeacherTestimonials() {
    const [locale, setLocale] = useState("EN");
    useEffect(() => {
    if (typeof window !== "undefined") {
        const path = window.location.pathname;
        const language = path.split("/")[1]?.toUpperCase() || "EN";
        setLocale(language);
    }
    }, []);
    const { t } = useTranslation();
    const { data, loading, error } = useQuery(GET_STORIES_TESTIMONIALS, {
      variables: { language: locale },
      client,
    });
  
    const [visibleTestimonials, setVisibleTestimonials] = useState(2);
    const testimonials = data?.testimonials?.nodes || [];
  

  return (
    <section className="relative py-12">
      <div className="max-w-6xl mx-auto px-6 space-y-6">
        <h2 className="text-xl sm:text-3xl font-semibold mb-4 text-center">
        {t("TeachingTestimonials.testimonialsTitle")}
        </h2>
        {loading ? (
          <p className="text-center">{t("TeachingTestimonials.loading")}</p>
        ) : error ? (
          <p className="text-center text-red-500">{t("TeachingTestimonials.error")}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.slice(0, visibleTestimonials).map((t: any, i: number) => {
            const text = t.testimonialfields?.text || "";
            const name = t.testimonialfields?.name || t("TeachingTestimonials.anonymous");
            

            return (
                <div key={i} className="bg-gray-100 p-6 rounded-lg shadow-md">
                <p className="italic text-gray-700 mb-4">“{text}”</p>
                <p className="text-right font-medium">– {name}</p>
                </div>
            );
            })}
          </div>
        )}

        {/* Load More / Show Less Buttons */}
        <div className="col-span-full mt-6 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
        {testimonials.length > visibleTestimonials && (
            <button
            onClick={() => setVisibleTestimonials((prev) => prev + 2)}
            className="w-full md:w-auto px-6 py-3 rounded-lg bg-white text-gray-800 font-medium border border-gray-300 shadow hover:shadow-md hover:bg-gray-100 transition-all duration-200"
            >
            {t("TeachingTestimonials.loadMore")}
            </button>
        )}
        {visibleTestimonials > 2 && (
            <button
            onClick={() => setVisibleTestimonials((prev) => Math.max(2, prev - 2))}
            className="w-full md:w-auto px-6 py-3 rounded-lg bg-white text-gray-800 font-medium border border-gray-300 shadow hover:shadow-md hover:bg-gray-100 transition-all duration-200"
            >
            {t("TeachingTestimonials.showLess")}
            </button>
        )}
        </div>
      </div>
    </section>
  );
}
