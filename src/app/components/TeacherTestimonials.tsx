"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_STORIES_TESTIMONIALS } from "../../../lib/queries";
import client from "../../../lib/apollo";
import { useTranslation } from "../context/TranslationContext";
import { Dialog } from "@headlessui/react";

type Testimonial = {
    testimonialfields?: {
      text?: string;
      name?: string;
    };
  };  

export default function TeacherTestimonials() {
  const [locale, setLocale] = useState("EL");
  const [visibleTestimonials, setVisibleTestimonials] = useState(2);
  const [expandedTestimonial, setExpandedTestimonial] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      const language = path.split("/")[1]?.toUpperCase() || "EL";
      setLocale(language);
    }
  }, []);

  const { data, loading, error } = useQuery(GET_STORIES_TESTIMONIALS, {
    variables: { language: locale },
    client,
    skip: !locale || locale === "",
  });

  const testimonials = data?.testimonials?.nodes || [];

  return (
    <section className="relative py-16 bg-white">
      <div className="max-w-6xl mx-auto py-16 px-6 space-y-10 bg-gray-50 rounded-3xl shadow-sm p-8 sm:p-10">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">
            {t("TeachingTestimonials.testimonialsTitle")}
          </h2>
          <p className="text-base text-gray-700">
            {t("TeachingTestimonials.subtitle")}
          </p>
        </div>

        {/* Testimonials */}
        {loading ? (
          <p className="text-center">{t("TeachingTestimonials.loading")}</p>
        ) : error ? (
          <p className="text-center text-red-500">{t("TeachingTestimonials.error")}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.slice(0, visibleTestimonials).map((testimonial: Testimonial, i: number) => {
              const text = testimonial.testimonialfields?.text || "";
              const name = testimonial.testimonialfields?.name || t("TeachingTestimonials.anonymous");
              const isLong = text.length > 200;

              return (
                <div
                    key={i}
                    className="bg-white border border-gray-200 p-6 shadow-md hover:shadow-lg rounded-xl transition-all duration-200"
                    >
                    <p className="italic text-gray-800 mb-4 flex items-start gap-2">
                        <span className="text-yellow-500 text-2xl leading-none">“</span>
                        <span>{isLong ? text.slice(0, 200) + "..." : text}</span>
                    </p>
                    {isLong && (
                        <button
                        onClick={() => setExpandedTestimonial(text)}
                        className="text-sm text-yellow-600 hover:underline font-semibold"
                        >
                        {t("TeachingTestimonials.expand")}
                        </button>
                    )}
                    <p className="text-right text-sm font-semibold text-gray-700 mt-2">– {name}</p>
                    </div>
              );
            })}
          </div>
        )}

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {testimonials.length > visibleTestimonials && (
            <button
              onClick={() => setVisibleTestimonials((prev) => prev + 2)}
              className="px-6 py-2 bg-yellow-400 text-black font-semibold rounded-lg shadow hover:bg-yellow-500 transition"
            >
              {t("TeachingTestimonials.loadMore")}
            </button>
          )}
          {visibleTestimonials > 2 && (
            <button
              onClick={() => setVisibleTestimonials((prev) => Math.max(2, prev - 2))}
              className="px-6 py-2 text-gray-800 font-semibold rounded-lg border bg-white text-yellow-600 border border-yellow-400 shadow hover:bg-yellow-50 transition"
            >
              {t("TeachingTestimonials.showLess")}
            </button>
          )}
        </div>
      </div>

      {/* Expand Modal */}
      {expandedTestimonial && (
        <Dialog open={true} onClose={() => setExpandedTestimonial(null)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <Dialog.Panel className="bg-white max-w-xl w-full mx-4 rounded-lg p-6 shadow-xl relative max-h-[80vh] overflow-y-auto">
            <button
                onClick={() => setExpandedTestimonial(null)}
                className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl font-bold"
            >
                ✕
            </button>
            <p className="text-gray-800 whitespace-pre-wrap">“{expandedTestimonial}”</p>
            </Dialog.Panel>
        </Dialog>
        )}
    </section>
  );
}
