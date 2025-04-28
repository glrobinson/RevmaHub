"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import { useQuery } from "@apollo/client";
import { GET_MEDIA_ITEMS, GET_STORIES_TESTIMONIALS, GET_TEACHING_ROMA_IMAGES } from "../../../../lib/queries";
import client from "../../../../lib/apollo";
import TeacherTestimonials from "../../components/TeacherTestimonials";
import { useTranslation } from "../../context/TranslationContext";
import { useParams } from "next/navigation";


export default function TeachingRomaPage() {
    const { data, loading, error } = useQuery(GET_STORIES_TESTIMONIALS, { client });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const { data: imageData } = useQuery(GET_TEACHING_ROMA_IMAGES, { client });
    const { t } = useTranslation();
    const params = useParams();
    const locale = params.locale;



    const imageFields = imageData?.page?.teachingRomaImages || {};
    const imageIds = Object.values(imageFields)
      .map((img: any) => img?.node?.databaseId)
      .filter(Boolean);

    const { data: mediaData } = useQuery(GET_MEDIA_ITEMS, {
      variables: { ids: imageIds },
      skip: imageIds.length === 0,
      client,
    });

    const imageRow = mediaData?.mediaItems?.nodes || [];


  const testimonials = [
    { id: 1, name: "Teacher 1" },
    { id: 2, name: "Teacher 2" },
    { id: 3, name: "Teacher 3" },
    { id: 4, name: "Teacher 4" },
    { id: 5, name: "Teacher 5" },
  ];

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (formRef.current) {
      emailjs.sendForm(
        "service_fyjza4t",
        "template_1a8pq99",
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

  const centers = [
    {
      name: t("TeachingRoma.communityCentersAthenName"),
      description: t("TeachingRoma.communityCentersAthenDescription"),
      link: "#",
    },
    {
      name: t("TeachingRoma.communityCentersThessalonikiName"),
      description: t("TeachingRoma.communityCentersThessalonikiDescription"),
      link: "#",
    },
    {
      name: t("TeachingRoma.communityCentersLarissaName"),
      description: t("TeachingRoma.communityCentersLarissaDescription"),
      link: "#",
    },
  ];

  return (
    <main className="space-y-2 text-sm ">
        {/* Hero Section with Blurred Background */}
        <section className="relative h-[400px] w-full overflow-hidden">
        {/* Blurred background image layer */}
        <div className="absolute inset-0 z-0">
            <Image
            src="/teaching.jpg"
            alt={t("TeachingRoma.heroAlt")}
            fill
            priority
            className="object-cover filter blur-sm scale-105"
            />
        </div>

        {/* Overlay and text */}
        <div className="absolute inset-0 z-10 bg-black/30 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow">
            {t("TeachingRoma.heroTitle")}
            </h1>
            <p className="text-white text-sm sm:text-base md:text-lg max-w-2xl drop-shadow">
            {t("TeachingRoma.heroDescription")}
            </p>
        </div>
        </section>

      {/* Teacher Testimonials Section */}
      <TeacherTestimonials />

      {/* Submit Section */}
      <section className="bg-white px-6 py-16 text-center border-t border-gray-200">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            {t("TeachingRoma.submitSectionTitle")}
          </h2>
          <p className="text-base text-gray-700">
            {t("TeachingRoma.submitSectionText")}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-block mt-4 px-8 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow hover:bg-yellow-500 transition-all"
          >
            {t("TeachingRoma.submitButton")}
          </button>
        </div>
      </section>


      {/* Image Row Section */}
      <section className="px-6 py-3 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
        {imageRow.map((img: any, index: number) => (
          img?.sourceUrl && (
            <div key={img.databaseId || index} className="rounded overflow-hidden shadow">
              <Image
                src={img.sourceUrl}
                alt={img.altText || `Roma Education Image ${index + 1}`}
                width={500}
                height={500}
                className="object-cover w-full h-60"
              />
            </div>
          )
        ))}
        </div>
      </section>

      {/* Divider Line */}
      <div className="border-t border-gray-200 mx-auto w-full my-10" />

      {/* Community Centers */}
      <section className="bg-gray-50 px-6 py-16">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900">
            {t("TeachingRoma.communitySectionTitle")}
          </h2>
          <p className="text-base text-gray-700 max-w-2xl mx-auto">
            {t("TeachingRoma.communityDescription")}
          </p>

          {/* Grid of Community Centers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 text-center font-bold text-base">
            {[
              {
                name: t("TeachingRoma.communityCentersPavlosMelasName"),
                link: "#",
              },
              {
                name: t("TeachingRoma.communityCentersAmpelokipiName"),
                link: "#",
              },
              {
                name: t("TeachingRoma.communityCentersIrakleiaName"),
                link: "#",
              },
              {
                name: t("TeachingRoma.communityCentersKateriniName"),
                link: "#",
              },
              {
                name: t("TeachingRoma.communityCentersKarditsaName"),
                link: "#",
              },
              {
                name: t("TeachingRoma.communityCentersTrikalaName"),
                link: "#",
              },
            ].map((center, idx) => (
              <a
                key={idx}
                href={center.link}
                className="p-6 rounded-xl border bg-white hover:shadow-lg transition-all border-gray-200 shadow-sm"
              >
                <h3 className="font-semibold text-md text-gray-800">{center.name}</h3>
              </a>
            ))}
          </div>

          {/* Embedded Google Map - with spacing! */}
          <div className="mt-10 max-w-4xl mx-auto w-full rounded-lg overflow-hidden shadow-lg">
                  <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3094.4807064375937!2d22.944419915689427!3d40.64006397933806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a838f3c6b37b69%3A0x400bd2ce2b97450!2sThessaloniki%2C%20Greece!5e0!3m2!1sen!2sus!4v1649849102016!5m2!1sen!2sus"
                  width="100%"
                  height="400"
                  allowFullScreen
                  loading="lazy"
                  style={{ border: 0 }}
                  ></iframe>
              </div>
        </div>
      </section>

      {/* Learn More Video Section */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {t("TeachingRoma.learnMoreTitle")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base">
            {t("TeachingRoma.learnMoreDescription")}
          </p>

          <div className="relative w-full h-0 pb-[56.25%] rounded-xl overflow-hidden shadow-2xl mt-8">
          <div className="flex justify-center mt-8">
          <iframe width="760" height="515" src="https://www.youtube.com/embed/W-BodPznjBY" frameBorder="0" allowFullScreen></iframe>
          </div>
          </div>
        </div>
      </section>


      {/* CTA */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-3xl mx-auto text-center bg-gray-50 rounded-2xl p-10 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {t("TeachingRoma.ctaTitle")}
          </h2>
          <p className="text-base text-gray-700 mb-6">
            {t("TeachingRoma.ctaDescription")}
          </p>
          <Link href={`/${locale}/resources`}>
            <button className="px-6 py-3 rounded-lg bg-yellow-400 text-black font-semibold shadow hover:bg-yellow-500 transition">
              {t("TeachingRoma.ctaButton")}
            </button>
          </Link>
        </div>
      </section>


      {/* Testimonial Modal */}
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
            <input
              type="email"
              name="email"
              placeholder={t("TeachingRoma.formEmail")}
              required
              className="w-full border p-2 rounded"
            />

            <input
              type="text"
              name="role"
              placeholder={t("TeachingRoma.formRole")}
              className="w-full border p-2 rounded"
            />

            <textarea
              name="message"
              placeholder={t("TeachingRoma.formMessage")}
              required
              className="w-full border p-2 rounded h-24"
            />

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                {t("TeachingRoma.formCancel")}
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-400 rounded hover:bg-yellow-500"
              >
                {t("TeachingRoma.formSubmit")}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
    </main>
  );
}
