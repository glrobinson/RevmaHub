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


  const [imageData, setImageData] = useState<{ [key: string]: { url: string; alt: string } }>({});

  // Load image URLs from WP media endpoint
  useEffect(() => {
    const loadImages = async () => {
      const loadedImages = await Promise.all(
        resources.map(async (res: Resource) => {
          const id = res.resourcefield?.image?.node?.databaseId;
          if (!id) return { id: null, url: "", alt: "Image not found" };

          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/wp-json/wp/v2/media/${id}`
            );
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

    if (resources.length > 0) loadImages();
  }, [resources]);

  const filteredResources = resources.filter((res) => {
    const categories = res.resourcefield?.category || [];

    const matchesCategory =
  selectedCategory.length > 0
    ? selectedCategory.some((selected) =>
        (res.resourcefield.category || []).some(
          (cat) => cat.toLowerCase() === selected.toLowerCase()
        )
      )
    : true;


      const matchesSearch = searchQuery
      ? res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.resourcefield.description.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    

    return matchesCategory && matchesSearch;
  });

  if (loading) return <p className="text-center">{t("Resources.loading")}</p>;
  if (error) return <p className="text-center text-red-500">{t("Resources.error")}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-10">
      {filteredResources.slice(0, visibleResources).map((res, idx) => {
        const id = res.resourcefield?.image?.node?.databaseId;
        const img = imageData[id];

        return (
          <div
            key={idx}
            className="bg-gray-100 p-4 shadow text-center space-y-2 rounded"
          >
            {/* Category */}
            <p className="text-xs text-gray-500">
            {(res.resourcefield.category || [])
                .map((cat) => t(`CategoryTags.${cat.toLowerCase()}`) || cat)
                .join(", ")}
            </p>


            {/* Title */}
            <p className="font-semibold">{res.title}</p>

            {/* Image */}
            {img?.url ? (
              <div className="h-24 w-full relative">
                <Image
                  src={img.url}
                  alt={img.alt}
                  width={300}
                  height={200}
                  className="object-contain w-full h-24 rounded"
                />
              </div>
            ) : (
              <div className="bg-gray-300 h-24 flex items-center justify-center text-xs text-gray-600">
                {t("Resources.noImage")}
              </div>
            )}

            {/* Description */}
            <p className="text-xs text-gray-700">{res.resourcefield.description}</p>

            {/* Link and/or Download Buttons */}
            <div className="flex justify-center gap-2 pt-2">
            {res.resourcefield.link && (
                <a
                href={res.resourcefield.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-black hover:bg-gray-300 px-4 py-1 rounded text-sm"
                >
                {t("Resources.view")}
                </a>
            )}

            {res.resourcefield.file?.node?.mediaItemUrl && (
                <a
                href={res.resourcefield.file.node.mediaItemUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-black hover:bg-gray-300 px-4 py-1 rounded text-sm"
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
            onClick={() => setVisibleResources((prev) => prev + 4)}
            className="w-full md:w-auto px-6 py-3 rounded-lg bg-white text-gray-800 font-medium border border-gray-300 shadow hover:shadow-md hover:bg-gray-100 transition-all duration-200"
            >
            {t("Resources.loadMore")}
            </button>
        )}
        {visibleResources > 8 && (
            <button
            onClick={() => setVisibleResources((prev) => Math.max(8, prev - 4))}
            className="w-full md:w-auto px-6 py-3 rounded-lg bg-white text-gray-800 font-medium border border-gray-300 shadow hover:shadow-md hover:bg-gray-100 transition-all duration-200"
            >
            {t("Resources.showLess")}
            </button>
        )}
        </div>
    </div>
  );
}
