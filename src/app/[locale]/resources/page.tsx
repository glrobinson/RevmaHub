"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import Resources from "../../components/Resources";
import { useQuery } from "@apollo/client";
import { GET_RESOURCES } from "../../../../lib/queries";
import client from "../../../../lib/apollo";
import { useTranslation } from "../../context/TranslationContext";


export default function ResourcesPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { data, loading, error, refetch } = useQuery(GET_RESOURCES, { client });
  const { t } = useTranslation();


  const categories = [
    { title: t("ResourcesPage.categoryInclusive"), summary: t("ResourcesPage.categoryInclusiveDesc"), img: "/inclusivity.png", tag: "inclusive practices" },
    { title: t("ResourcesPage.categoryLinguistics"), summary: t("ResourcesPage.categoryLinguisticsDesc"), img: "/translator.png", tag: "linguistics" },
    { title: t("ResourcesPage.categoryRomaHistory"), summary: t("ResourcesPage.categoryRomaHistoryDesc"), img: "/history.png", tag: "roma history" },
    { title: t("ResourcesPage.categoryClassroom"), summary: t("ResourcesPage.categoryClassroomDesc"), img: "/training.png", tag: "classroom activities" },
    { title: t("ResourcesPage.categoryGame"), summary: t("ResourcesPage.categoryGameDesc"), img: "/play.png", tag: "interactive game" },
    { title: t("ResourcesPage.categoryPlatform"), summary: t("ResourcesPage.categoryPlatformDesc"), img: "/platform.png", tag: "teaching platform" },
  ];
  

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (formRef.current) {
      emailjs.sendForm(
        "service_fyjza4t",
        "template_kse9rie",
        formRef.current,
        "_c4qW0hFnGM9EYoMZ"
      )
      .then(() => {
        alert("Submission sent!");
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.error("Failed to send:", err);
      });
    }
  };

  return (
    <main className="space-y-5 text-sm">
      {/* Hero */}
      <section className="relative h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/activities2.jpg"
            alt={t("ResourcesPage.heroAlt")}
            fill
            priority
            className="object-cover filter blur-sm scale-105"
          />
        </div>
        <div className="absolute inset-0 z-10 bg-black/30 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow">
          {t("ResourcesPage.heroTitle")}
          </h1>
          <p className="text-white text-sm sm:text-base md:text-lg max-w-2xl drop-shadow">
          {t("ResourcesPage.heroDescription")}
          </p>
        </div>
      </section>

      {/* Category Icons */}
      <section className="max-w-8xl mx-auto px-4">
        <div className="flex justify-center flex-wrap gap-x-16 gap-y-8 text-center text-xs">
          {categories.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedCategories((prev) =>
                  prev.includes(item.tag)
                    ? prev.filter((tag) => tag !== item.tag)
                    : [...prev, item.tag]
                );
              }}
              
              className={`flex flex-col items-center w-[160px] p-4 rounded transition transform hover:bg-yellow-50 ${
                selectedCategories.includes(item.tag) ? "bg-gray-200" : ""
              }`}
            >
              <img
                src={item.img}
                alt={item.title}
                className="mb-2"
                style={{ width: "50px", height: "50px", objectFit: "contain" }}
              />
              <p className="font-semibold text-sm mb-1">{item.title}</p>
              <p className="text-gray-500 text-xs leading-tight">{item.summary}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Search */}
      <section className="px-6 max-w-6xl mx-auto">
        <div className="relative w-full max-w-xl mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("ResourcesPage.search")}
            className="w-full py-3 pl-6 pr-12 border border-black rounded-full shadow-sm placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </section>

      {/* Filter Tags */}
      <section className="px-6 max-w-6xl mx-auto space-y-6 text-sm">
        <h2 className="text-lg font-bold">{t("ResourcesPage.filterTitle")}</h2>
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={() => setSelectedCategories([])}
            className={`px-4 py-1 rounded-full border border-black font-semibold tracking-wide transition ${
              selectedCategories.length === 0
                ? "bg-black text-white"
                : "text-black hover:bg-black hover:text-white"
            }`}
          >
            {t("ResourcesPage.filterAll")}
          </button>

          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedCategories((prev) =>
                  prev.includes(cat.tag)
                    ? prev.filter((tag) => tag !== cat.tag)
                    : [...prev, cat.tag]
                );
              }}
              className={`px-4 py-1 rounded-full border border-black font-semibold tracking-wide transition ${
                selectedCategories.includes(cat.tag)
                  ? "bg-black text-white"
                  : "text-black hover:bg-black hover:text-white"
              }`}
            >
              {cat.title}
            </button>
          ))}

          {selectedCategories.length > 0 && (
            <button
              onClick={() => setSelectedCategories([])}
              className="ml-4 px-4 py-1 text-sm underline text-black hover:text-red-600 transition"
            >
              {t("ResourcesPage.filterClear")}
            </button>
          )}
        </div>
      </section>


      {/* Dynamic Resources from WP */}
      <section className="px-4 py-5">
        <div className="max-w-6xl mx-auto">
        <Resources
        searchQuery={searchQuery}
        selectedCategory={selectedCategories}
        data={data}
        loading={loading}
        error={error}
        refetch={refetch}
      />
        </div>
      </section>

      {/* Submit CTA */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-3xl mx-auto text-center bg-gray-50 rounded-2xl p-10 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{t("ResourcesPage.submitTitle")}</h2>
          <p className="text-base text-gray-700 mb-6">
          {t("ResourcesPage.submitText")}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 rounded-lg bg-yellow-400 text-black font-semibold shadow hover:bg-yellow-500 transition">
            {t("ResourcesPage.submitButton")}
          </button>
        </div>
      </section>


      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white p-10 rounded-lg w-full max-w-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-black font-bold"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-gray-700">
              {t("ResourcesPage.modalInstructions")}
              </p>
              <input
                type="text"
                name="first_name"
                placeholder={t("ResourcesPage.modalFirstName")}
                required
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="last_name"
                placeholder={t("ResourcesPage.modalLastName")}
                required
                className="w-full border p-2 rounded"
              />
              <input
                type="email"
                name="email"
                placeholder={t("ResourcesPage.modalEmail")}
                required
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="phone"
                placeholder={t("ResourcesPage.modalPhone")}
                className="w-full border p-2 rounded"
              />
              <textarea
                name="description"
                placeholder={t("ResourcesPage.modalDescription")}
                required
                className="w-full border p-2 rounded h-24"
              />
              <input
                type="text"
                name="resource_type"
                placeholder={t("ResourcesPage.modalType")}
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="file_link"
                placeholder={t("ResourcesPage.modalLink")}
                className="w-full border p-2 rounded"
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  {t("ResourcesPage.modalCancel")}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-yellow-400 rounded hover:bg-yellow-500"
                >
                  {t("ResourcesPage.modalSubmit")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
