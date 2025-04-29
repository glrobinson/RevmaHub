"use client";

import Image from "next/image";
import { useQuery } from "@apollo/client";
import { GET_RESOURCES } from "../../../lib/queries";
import client from "../../../lib/apollo";
import { useEffect, useState } from "react";
import { useTranslation } from "../context/TranslationContext";

type Props = {
    selectedCategory: string[];
    searchQuery: string;
    data: any;
    loading: boolean;
    error: any;
    refetch: () => void;
  };
  

type Resource = {
    title: string;
    uri: string;
    resourcefield: {
      text: string;
      description: string;
      category: string[];
      link: string;
      file?: {
        node: {
            mediaItemUrl?: string;
            title: string;
        };
      };
      image: {
        node: {
          databaseId: number;
          sourceUrl: string;
          altText: string;
        };
      };      
    };
  };
  

export default function Resources({ selectedCategory, searchQuery }: Props) {
    const [locale, setLocale] = useState("EN");
    useEffect(() => {
      if (typeof window !== "undefined") {
        const path = window.location.pathname;
        const language = path.split("/")[1]?.toUpperCase() || "EN";
        setLocale(language);
      }
    }, []);
    const { t } = useTranslation();
    const { data, loading, error } = useQuery(GET_RESOURCES, {
        variables: { language: locale },
        client,
    });
  const resources: Resource[] = data?.resources?.nodes || [];
  const [visibleResources, setVisibleResources] = useState(8);
  const [expandedDescriptions, setExpandedDescriptions] = useState<{ [key: number]: boolean }>({});
  const filteredResources = resources.filter((res) => {

    const matchesCategory =
  selectedCategory.length > 0
    ? selectedCategory.some((selected) =>
        (res.resourcefield.category || []).some(
          (cat) => cat.toLowerCase() === selected.toLowerCase()
        )
      )
    : true;

    const matchesSearch = searchQuery
    ? (
        res.resourcefield.text?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.resourcefield.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (res.resourcefield.category || [])
          .some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : true;
  
    return matchesCategory && matchesSearch;
  });

  const toggleDescription = (index: number) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  

  if (loading) return <p className="text-center">{t("Resources.loading")}</p>;
  if (error) return <p className="text-center text-red-500">{t("Resources.error")}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-10">
      {filteredResources.slice(0, visibleResources).map((res, idx) => {
            const imgUrl = res.resourcefield?.image?.node?.sourceUrl;
            const imgAlt = res.resourcefield?.image?.node?.altText || "Image";

            return (
                <div
                key={idx}
                className="bg-white border border-gray-200 p-6 shadow-md hover:shadow-lg rounded-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Title */}
                <p className="text-md font-bold text-gray-900 mb-1">{res.resourcefield.text}</p>
              
                {/* Category */}
                <p className="text-xs text-yellow-600 font-semibold mb-3">
                  {(res.resourcefield.category || [])
                    .map((cat) => t(`CategoryTags.${cat.toLowerCase()}`) || cat)
                    .join(", ")}
                </p>
              
                {/* Image */}
                {imgUrl ? (
                  <div className="h-40 w-full relative mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={imgUrl}
                      alt={imgAlt}
                      width={300}
                      height={200}
                      className="object-cover w-full h-40"
                    />
                  </div>
                ) : (
                  <div className="bg-gray-300 h-40 flex items-center justify-center text-xs text-gray-600 mb-4 rounded-lg">
                    {t("Resources.noImage")}
                  </div>
                )}
              
                {/* Description */}
                <p className={`text-sm text-gray-700 mb-2 ${!expandedDescriptions[idx] ? "line-clamp-3" : ""}`}>
                {res.resourcefield.description}
                </p>
                {res.resourcefield.description.length > 150 && (
                <button
                    onClick={() => toggleDescription(idx)}
                    className="text-xs text-yellow-700 underline focus:outline-none"
                >
                    {expandedDescriptions[idx] ? t("Resources.showLessText") : t("Resources.readMore")}
                </button>
                )}

              
                {/* Buttons */}
                <div className="mt-auto flex flex-wrap justify-center gap-3 pt-2">
                  {res.resourcefield.link && (
                    <a
                      href={res.resourcefield.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white text-black border border-black rounded-lg text-sm hover:bg-gray-200 transition"
                      >
                      {t("Resources.view")}
                    </a>
                  )}
                  {res.resourcefield.file?.node?.mediaItemUrl && (
                    <a
                      href={res.resourcefield.file.node.mediaItemUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-white text-black border border-black rounded-lg text-sm hover:bg-gray-200 transition"
                      >
                      {t("Resources.download")}
                    </a>
                  )}
                </div>
              </div>
              
            );
        })}
      {/* Load More / Show Less Buttons */}
      <div className="col-span-full mt-6 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
        {filteredResources.length > visibleResources && (
            <button
            onClick={() => setVisibleResources((prev) => prev + 8)}
            className="px-6 py-2 bg-yellow-400 text-black font-semibold rounded-lg shadow hover:bg-yellow-500 transition"
            >
            {t("Resources.loadMore")}
            </button>
        )}
        {visibleResources > 8 && (
            <button
            onClick={() => setVisibleResources((prev) => Math.max(8, prev - 8))}
            className="px-6 py-2 text-gray-800 font-semibold rounded-lg border bg-white text-yellow-600 border border-yellow-400 shadow hover:bg-yellow-50 transition"
            >
            {t("Resources.showLess")}
            </button>
        )}
        </div>
    </div>
  );
}
