"use client";

import Image from "next/image";
import { useQuery } from "@apollo/client";
import { GET_INFOGRAPHICS } from "../../../../lib/queries";
import client from "../../../../lib/apollo";
import { useState } from "react";

export default function InfoPage() {
  const { data, loading, error } = useQuery(GET_INFOGRAPHICS, { client });
  const infographics = data?.infographics?.nodes || [];
  const [visibleInfographics, setVisibleInfographics] = useState(6);
  const visibleItems = infographics.slice(0, visibleInfographics);
  const [modalImage, setModalImage] = useState<string | null>(null);
  return (
    <main className="space-y-5 text-sm">


      {/* Hero Section with Blurred Background */}
        <section className="relative h-[400px] w-full overflow-hidden">
          {/* Blurred background image layer */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/classroom.jpg"
              alt="Teaching Roma Students"
              fill
              priority
              className="object-cover filter blur-sm scale-105"
              />
            </div>
                  
            {/* Overlay and text */}
            <div className="absolute inset-0 z-10 bg-black/30 flex flex-col items-center justify-center text-center px-4">
              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow">
                 Learn More About Roma Experiences, History, and Education
              </h1>
              <p className="text-white text-sm sm:text-base md:text-lg max-w-2xl drop-shadow">
                Explore key facts, concepts, and questions about Roma communities and education.
              </p>
            </div>
          </section>

      {/* Statistics Section */}
<section className="bg-gray-100 px-6 py-14 max-w-6xl mx-auto text-center space-y-10">
  <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
    Roma Education in Numbers
  </h2>
  <p className="text-gray-600 max-w-2xl mx-auto">
    These figures highlight the educational challenges and disparities faced by Roma communities across Europe. Understanding these statistics is crucial to fostering inclusive and equitable education.
  </p>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Stat 1 */}
    <div className="bg-white p-6 rounded shadow-md border border-gray-200 text-center">
      <p className="text-4xl font-bold text-yellow-500">84%</p>
      <p className="text-sm text-gray-700 mt-2">
        of Roma youth in Europe leave school early—before completing secondary education.
      </p>
    </div>

    {/* Stat 2 */}
    <div className="bg-white p-6 rounded shadow-md border border-gray-200 text-center">
      <p className="text-4xl font-bold text-yellow-500">34%</p>
      <p className="text-sm text-gray-700 mt-2">
        of Roma children in Greece attend segregated or Roma-majority schools.
      </p>
    </div>

    {/* Stat 3 */}
    <div className="bg-white p-6 rounded shadow-md border border-gray-200 text-center">
      <p className="text-4xl font-bold text-yellow-500">10%</p>
      <p className="text-sm text-gray-700 mt-2">
        of Roma children across the EU report facing discrimination in school environments.
      </p>
    </div>

    {/* Stat 4 */}
    <div className="bg-white p-6 rounded shadow-md border border-gray-200 text-center">
      <p className="text-4xl font-bold text-yellow-500">20%</p>
      <p className="text-sm text-gray-700 mt-2">
      of Romani guardians and students felt discriminated against when in contact with a school authority because of being Romani.
      </p>
    </div>

    {/* Stat 5 */}
    <div className="bg-white p-6 rounded shadow-md border border-gray-200 text-center">
      <p className="text-4xl font-bold text-yellow-500">80%</p>
      <p className="text-sm text-gray-700 mt-2">
        of Roma children live in households at risk of poverty or social exclusion.
      </p>
    </div>

    {/* Stat 6 */}
    <div className="bg-white p-6 rounded shadow-md border border-gray-200 text-center">
      <p className="text-4xl font-bold text-yellow-500">57%</p>
      <p className="text-sm text-gray-700 mt-2">
        of Roma that are school aged attend school.
      </p>
    </div>
  </div>
</section>

    {/* Infographics Section */}
    <section className="py-10 px-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <h2 className="text-xl sm:text-3xl font-semibold mb-4">Important Pieces to Highlight</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleItems.map((item: any, index: number) => {
              const image = item.infographicsimages?.infographicImage?.node;
              if (!image?.sourceUrl) return null;

              return (
                <div
                  key={image.databaseId || index}
                  className="rounded overflow-hidden shadow cursor-pointer"
                  onClick={() => setModalImage(image.sourceUrl)}
                >
                  <Image
                    src={image.sourceUrl}
                    alt={image.altText || `Infographic ${index + 1}`}
                    width={700}
                    height={700}
                    className="object-cover w-full h-full"
                  />
                </div>
              );
            })}
          </div>

        {/* Load More / Show Less Buttons */}
        <div className="col-span-full mt-6 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
          {infographics.length > visibleInfographics && (
            <button
              onClick={() => setVisibleInfographics((prev) => prev + 3)}
              className="w-full md:w-auto px-6 py-3 rounded-lg bg-white text-gray-800 font-medium border border-gray-300 shadow hover:shadow-md hover:bg-gray-100 transition-all duration-200"
            >
              Load More
            </button>
          )}
          {visibleInfographics > 6 && (
            <button
              onClick={() => setVisibleInfographics((prev) => Math.max(6, prev - 3))}
              className="w-full md:w-auto px-6 py-3 rounded-lg bg-white text-gray-800 font-medium border border-gray-300 shadow hover:shadow-md hover:bg-gray-100 transition-all duration-200"
            >
              Show Less
            </button>
          )}
        </div>
      </div>
    </section>

    {/* Image Modal */}
    {modalImage && (
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center overflow-y-auto"
        onClick={() => setModalImage(null)}
      >
        <div
          className="relative bg-white p-4 rounded-lg shadow-lg max-w-4xl w-[90%] my-10"
          onClick={(e) => e.stopPropagation()} // prevents modal from closing when clicking inside
        >
          <Image
            src={modalImage}
            alt="Full-size infographic"
            width={1200}
            height={1200}
            className="w-full h-auto rounded"
          />
          <button
            onClick={() => setModalImage(null)}
            className="absolute top-3 right-4 text-gray-700 text-3xl font-bold hover:text-black"
          >
            &times;
          </button>
        </div>
      </div>
    )}
    </main>
  );
}
