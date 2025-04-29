"use client";

import Image from "next/image";
import { useState } from "react";
import TimelineInfographic from "../components/TimelineInfographic";
import { useTranslation } from "../context/TranslationContext";

export default function TimelinePreviewCard() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, language } = useTranslation();
  const imageSrc = language === "el" ? "/timeline_gr.png" : "/timeline.png";


  return (
    <>
      {/* The Preview Card */}
      <div
        className="relative rounded overflow-hidden shadow cursor-pointer transform transition duration-300 hover:scale-[1.02] hover:shadow-lg group"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={imageSrc}
          alt="Timeline of Greek Roma Policies"
          width={700}
          height={700}
          className="object-cover w-full h-full transition duration-300 group-hover:opacity-90"
        />
        {/* Mobile "tap to view" */}
        <div className="absolute inset-0 flex items-end justify-center md:hidden pointer-events-none z-10">
          <div className="text-black text-sm font-semibold px-4 py-2 rounded-t-md w-full text-center shadow-lg tracking-wide">
            {t("Timeline.tapToView")}
          </div>
        </div>
      </div>

      {/* The Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm overflow-y-auto"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative bg-white p-4 rounded-lg shadow-lg max-w-3xl w-[90%] mx-auto my-10 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-700 text-3xl font-bold hover:text-black z-10"
            >
              &times;
            </button>
            
            <TimelineInfographic />
          </div>
        </div>
      )}
    </>
  );
}
