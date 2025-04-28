"use client";

import Image from "next/image";
import { useQuery } from "@apollo/client";
import { GET_TEACHER_STATEMENTS } from "../../../lib/queries";
import client from "../../../lib/apollo";
import { useEffect, useState } from "react";
import { useTranslation } from "../context/TranslationContext";


const decodeWpId = (encodedId: string): number | null => {
  try {
    const decoded = atob(encodedId);
    const match = decoded.match(/:(\d+)$/);
    return match ? parseInt(match[1], 10) : null;
  } catch {
    return null;
  }
};

const fetchImageDetails = async (imageId: number) => {
    const res = await fetch(`https://ed.hub.revmaorg.gr/wp-json/wp/v2/media/${imageId}`);
    if (!res.ok) throw new Error("Failed to fetch image data");
    const data = await res.json();
    return {
      url: data.source_url,
      alt: data.alt_text || "Testimonial image",
    };
  };

export default function TeacherStatements() {
    const [locale, setLocale] = useState("EN");
    useEffect(() => {
      if (typeof window !== "undefined") {
        const path = window.location.pathname;
        const language = path.split("/")[1]?.toUpperCase() || "EN";
        setLocale(language);
      }
    }, []);
  const { t } = useTranslation();
  const { data, error, loading } = useQuery(GET_TEACHER_STATEMENTS, {
    variables: { language: locale },
    client,
  });
  const statements = data?.statements?.nodes || [];
  const [visibleStatements, setVisibleStatements] = useState(3);

  const [imageData, setImageData] = useState<{ [key: string]: { url: string; alt: string } }>({});

  useEffect(() => {
  const loadImages = async () => {
    const loadedImages = await Promise.all(
        statements.map(async (t: any) => {
        const id = t.teacherFields?.image?.node?.databaseId;
        if (!id) return { id: null, url: "", alt: "Image not found" };

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/media/${id}`);
          if (!res.ok) throw new Error("Failed to fetch image");
          const data = await res.json();
          return { id, url: data.source_url, alt: data.alt_text || "Image" };
        } catch {
          return { id, url: "", alt: "Failed to load" };
        }
      })
    );

    const imageMap: { [key: string]: { url: string; alt: string } } = {};
    loadedImages.forEach(({ id, url, alt }) => {
      if (id) imageMap[id] = { url, alt };
    });

    setImageData(imageMap);
  };

  if (statements.length > 0) loadImages();
}, [statements]);


  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error loading statements.</p>;

  return (
    <section className="px-6">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-center text-gray-900">
        {t("TeacherStatements.title")}
        </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {statements.slice(0, visibleStatements).map((item: any, index: number) => {
        const id = item.teacherFields?.image?.node?.databaseId;
        const img = imageData[id];
        const text = item.teacherFields?.text || "";
        const name = item.teacherFields?.name || "Anonymous";

        return (
            <div
            key={index}
            className="bg-white border border-gray-200 p-6 shadow-md hover:shadow-lg rounded-xl transition-all duration-200"
            >
            {img?.url && (
                <div className="h-40 w-full relative mb-4">
                <Image
                    src={img.url}
                    alt={img.alt}
                    width={300}
                    height={200}
                    className="object-cover w-full h-40 rounded"
                />
                </div>
            )}
            <p className="italic text-gray-800 mb-4 flex items-start gap-2">
                <span className="text-yellow-500 text-2xl leading-none">“</span>
                <span>{text}</span>
            </p>
            <p className="text-right text-sm font-semibold text-gray-700 mt-2">– {name}</p>
            </div>
        );
        })}

      {/* Load More / Show Less Buttons */}
      <div className="col-span-full mt-6 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
        {statements.length > visibleStatements && (
            <button
            onClick={() => setVisibleStatements((prev) => prev + 3)}
            className="px-6 py-2 bg-yellow-400 text-black font-semibold rounded-lg shadow hover:bg-yellow-500 transition"
          >
            {t("TeacherStatements.loadMore")}
          </button>          
        )}
        {visibleStatements > 3 && (
            <button
            onClick={() => setVisibleStatements((prev) => Math.max(3, prev - 3))}
            className="px-6 py-2 text-gray-800 font-semibold rounded-lg border bg-white text-yellow-600 border border-yellow-400 shadow hover:bg-yellow-50 transition"
          >
            {t("TeacherStatements.showLess")}
          </button>          
        )}
        </div>
      </div>
    </section>
  );
}
