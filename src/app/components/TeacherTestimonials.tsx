"use client";

import { useState } from "react";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { GET_STORIES_TESTIMONIALS } from "../../../lib/queries";
import client from "../../../lib/apollo";

export default function TeacherTestimonials() {
  const { data, loading, error } = useQuery(GET_STORIES_TESTIMONIALS, { client });
  const [visibleTestimonials, setVisibleTestimonials] = useState(2);

  const testimonials = data?.testimonials?.nodes || [];

  return (
    <section className="relative py-12">
      <div className="max-w-6xl mx-auto px-6 space-y-6">
        <h2 className="text-xl sm:text-3xl font-semibold mb-4 text-center">
          Teacher Advice & Testimonials
        </h2>
        {loading ? (
          <p className="text-center">Loading testimonials...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error loading testimonials.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.slice(0, visibleTestimonials).map((t: any, i: number) => (
              <div
                key={i}
                className="bg-gray-100 p-6 rounded-lg shadow-md"
              >
                <p className="italic text-gray-700 mb-4">“{t.testimonialfields?.text}”</p>
                <p className="text-right font-medium">
                  – {t.testimonialfields?.name || "Anonymous"}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Load More / Show Less Buttons */}
        <div className="col-span-full mt-6 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
        {testimonials.length > visibleTestimonials && (
            <button
            onClick={() => setVisibleTestimonials((prev) => prev + 2)}
            className="w-full md:w-auto px-6 py-3 rounded-lg bg-white text-gray-800 font-medium border border-gray-300 shadow hover:shadow-md hover:bg-gray-100 transition-all duration-200"
            >
            Load More
            </button>
        )}
        {visibleTestimonials > 2 && (
            <button
            onClick={() => setVisibleTestimonials((prev) => Math.max(2, prev - 2))}
            className="w-full md:w-auto px-6 py-3 rounded-lg bg-white text-gray-800 font-medium border border-gray-300 shadow hover:shadow-md hover:bg-gray-100 transition-all duration-200"
            >
            Show Less
            </button>
        )}
        </div>
      </div>
    </section>
  );
}
