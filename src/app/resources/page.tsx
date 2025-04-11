"use client";
import { useRef, useState } from "react";
import React from "react";
import Image from "next/image";
import emailjs from "@emailjs/browser";

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const categories = [
    { title: "Inclusive Practices", summary: "Quick sentence summary", img: "/inclusivity.png", tag: "inclusive" },
    { title: "Linguistics", summary: "Quick sentence summary", img: "/translator.png", tag: "linguistics" },
    { title: "Roma History", summary: "Quick sentence summary", img: "/history.png", tag: "history" },
    { title: "Classroom Activities", summary: "Quick sentence summary", img: "/training.png", tag: "classroom" },
    { title: "Interactive Game", summary: "Quick sentence summary", img: "/play.png", tag: "game" },
    { title: "Teaching Platform", summary: "Quick sentence summary", img: "/platform.png", tag: "platform" },
  ];

  const allResources = [
    {
      title: "Inclusive Lesson Plan",
      level: "Student Level",
      description: "A short description of what the resource is.",
      image: "1",
      category: "inclusive",
    },
    {
      title: "Roma History Timeline",
      level: "Student Level",
      description: "A short description of what the resource is.",
      image: "2",
      category: "history",
    },
    {
      title: "Language Matching Game",
      level: "Student Level",
      description: "A short description of what the resource is.",
      image: "3",
      category: "game",
    },
    {
      title: "Teacher Portal Guide",
      level: "Student Level",
      description: "A short description of what the resource is.",
      image: "4",
      category: "platform",
    },
  ];

  const filteredResources = allResources.filter((res) => {
    const matchesCategory = selectedCategory ? res.category === selectedCategory : true;
    const matchesSearch = searchQuery
      ? res.title.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (formRef.current) {
      emailjs.sendForm(
        "service_fyjza4t", // replace with your service ID
        "template_kse9rie", // replace with your template ID
        formRef.current,
        "_c4qW0hFnGM9EYoMZ" // replace with your public key
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
      

      {/* Hero Section with Blurred Background */}
                    <section className="relative h-[400px] w-full overflow-hidden">
                    {/* Blurred background image layer */}
                    <div className="absolute inset-0 z-0">
                        <Image
                        src="/activities2.jpg"
                        alt="Teaching Roma Students"
                        fill
                        priority
                        className="object-cover filter blur-sm scale-105"
                        />
                    </div>
            
                    {/* Overlay and text */}
                    <div className="absolute inset-0 z-10 bg-black/30 flex flex-col items-center justify-center text-center px-4">
                        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow">
                        Explore Our Teaching Resources
                        </h1>
                        <p className="text-white text-sm sm:text-base md:text-lg max-w-2xl drop-shadow">
                        Lesson plans, activity guides, and cultural materials created to support Roma education.
                        </p>
                    </div>
                    </section>

      {/* Category Icons */}
      <section className="max-w-8xl mx-auto px-4">
        <div className="flex justify-center flex-wrap gap-x-16 gap-y-8 text-center text-xs">
          {categories.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(selectedCategory === item.tag ? null : item.tag)}
              className={`flex flex-col items-center w-[160px] p-4 rounded transition transform hover:scale-105 hover:bg-gray-100 ${selectedCategory === item.tag ? "bg-gray-200" : ""}`}
            >
              <img src={item.img} alt={item.title} className="mb-2" style={{ width: "50px", height: "50px", objectFit: "contain" }} />
              <p className="font-semibold text-sm mb-1">{item.title}</p>
              <p className="text-gray-500 text-xs leading-tight">{item.summary}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Search Bar */}
      <section className="px-6 max-w-6xl mx-auto">
        <div className="relative w-full max-w-xl mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full py-3 pl-6 pr-12 border border-black rounded-full shadow-sm placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 max-w-6xl mx-auto space-y-6 text-sm">
        <h2 className="text-lg font-bold">Filter By:</h2>
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-1 rounded-full border border-black font-semibold tracking-wide transition ${!selectedCategory ? "bg-black text-white" : "text-black hover:bg-black hover:text-white"}`}
          >
            All
          </button>
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(selectedCategory === cat.tag ? null : cat.tag)}
              className={`px-4 py-1 rounded-full border border-black font-semibold tracking-wide transition ${selectedCategory === cat.tag ? "bg-black text-white" : "text-black hover:bg-black hover:text-white"}`}
            >
              {cat.title}
            </button>
          ))}
          {selectedCategory && (
            <button onClick={() => setSelectedCategory(null)} className="ml-4 px-4 py-1 text-sm underline text-black hover:text-red-600 transition">
              Clear Filter
            </button>
          )}
        </div>
      </section>

      {/* Resources */}
      <section className="px-4 py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredResources.map((res, idx) => (
            <div key={idx} className="bg-gray-100 p-4 shadow text-center space-y-2 rounded">
              <p className="text-xs text-gray-500">{res.level}</p>
              <p className="font-semibold">{res.title}</p>
              <div className="bg-gray-300 h-24 flex items-center justify-center text-xs text-gray-600">Resource Image {res.image}</div>
              <p className="text-xs text-gray-700">{res.description}</p>
              <button className="bg-white border border-black hover:bg-gray-300 px-4 py-1 rounded">View</button>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-8">
          <button className="w-full md:w-auto px-6 py-3 rounded-lg bg-white text-gray-800 font-medium border border-gray-300 shadow hover:shadow-md hover:bg-gray-100 transition-all duration-200">Load More</button>
        </div>

        {/* Submit CTA */}
        <div className="py-10 text-center space-y-4 px-4">
          <h2 className="font-semibold">Want to Share More Resources?</h2>
          <button onClick={() => setIsModalOpen(true)} className="w-full md:w-auto px-6 py-3 rounded-lg bg-white text-gray-800 font-medium border border-gray-300 shadow hover:shadow-md hover:bg-gray-100 transition-all duration-200">
            Submit Resource
          </button>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white p-10 rounded-lg w-full max-w-lg relative">
            <button className="absolute top-4 right-4 text-black font-bold" onClick={() => setIsModalOpen(false)}>✕</button>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="first_name" placeholder="First name" required className="w-full border p-2 rounded" />
              <input type="text" name="last_name" placeholder="Last name" required className="w-full border p-2 rounded" />
              <input type="email" name="email" placeholder="Email" required className="w-full border p-2 rounded" />
              <input type="text" name="phone" placeholder="Phone Number" className="w-full border p-2 rounded" />
              <textarea name="description" placeholder="Resource Description" required className="w-full border p-2 rounded h-24" />
              <input type="text" name="resource_type" placeholder="Resource Type" className="w-full border p-2 rounded" />
              <input type="text" name="file_link" placeholder="Paste a download link (Google Drive, Dropbox, etc.)" className="w-full border p-2 rounded"/>
              <div className="flex justify-between">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-yellow-400 rounded hover:bg-yellow-500">Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
