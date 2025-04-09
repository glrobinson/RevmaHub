"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import { useQuery } from "@apollo/client";
import { GET_STORIES_TESTIMONIALS } from "../../../lib/queries";
import client from "../../../lib/apollo";
import TeacherTestimonials from "../components/TeacherTestimonials";

export default function TeachingRomaPage() {
    const { data, loading, error } = useQuery(GET_STORIES_TESTIMONIALS, { client });
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ email: "", message: "" });
    const [visibleTestimonials, setVisibleTestimonials] = useState(2);

  const testimonials = [
    { id: 1, name: "Teacher 1" },
    { id: 2, name: "Teacher 2" },
    { id: 3, name: "Teacher 3" },
    { id: 4, name: "Teacher 4" },
    { id: 5, name: "Teacher 5" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      formData,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    )
      .then(() => {
        alert("Testimonial submitted successfully!");
        setShowModal(false);
        setFormData({ email: "", message: "" });
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("There was an error. Please try again.");
      });
  };

  return (
    <main className="space-y-5 text-sm">

      {/* Hero Section */}
      <section className="relative h-[200px] sm:h-[200px] md:h-[200px] w-full">
        <div className="absolute inset-0 bg-white flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-black text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow">
            Supporting Teachers of Roma Students
          </h1>
          <p className="text-black text-sm sm:text-base md:text-lg max-w-2xl drop-shadow">
            Revma is here to support educators with meaningful tools, resources, and real advice from teachers who have worked with Roma students across different communities.
          </p>
        </div>
      </section>

      {/* Teacher Testimonials Section */}
      <TeacherTestimonials />


      {/* Submit Section */}
      <section className="bg-gray-50 px-6 py-10 text-center shadow-inner">
        <h2 className="text-lg font-semibold mb-2">Want to Share Your Experience?</h2>
        <p className="text-sm text-gray-700 mb-4">
          If you’re a teacher of Roma students, we’d love to hear your story or advice for others.
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="w-full md:w-auto px-6 py-3 rounded-lg bg-white text-gray-800 font-medium border border-gray-300 shadow hover:shadow-md hover:bg-gray-100 transition-all duration-200"
        >
          Submit Your Advice or Testimonial
        </button>
      </section>

      {/* Community Centers */}
      <section className="px-6 py-12 bg-white text-center">
        <h2 className="text-xl sm:text-3xl font-semibold mb-4">Community Centers Supporting Roma Education</h2>
        <p className="max-w-xl mx-auto text-gray-700 mb-8">
          These centers offer valuable resources and support to teachers working with Roma students.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            { name: "Roma Inclusion Center – Athens", description: "Workshops, teaching guides, and mentorship.", link: "#" },
            { name: "Roma Education Hub – Thessaloniki", description: "Interactive activities and multilingual tools.", link: "#" },
            { name: "Roma Culture Center – Larissa", description: "Cultural support and professional development.", link: "#" },
          ].map((center, idx) => (
            <a
              key={idx}
              href={center.link}
              className="p-6 rounded-lg border hover:shadow-lg transition text-left bg-gray-50 hover:bg-white"
            >
              <h3 className="font-semibold text-md mb-1">{center.name}</h3>
              <p className="text-gray-600 text-sm">{center.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center space-y-4 py-10 bg-gray-100">
        <h2 className="text-lg font-semibold">New to Teaching Roma Students?</h2>
        <p className="text-gray-700 max-w-xl mx-auto text-sm">
          If you’re a new teacher of Roma students, or simply looking for helpful educational materials and resources to better support your class, we’ve got you covered.
        </p>
        <Link href="/resources">
          <button className="w-full md:w-auto px-6 py-3 rounded-lg bg-white text-gray-800 font-medium border border-gray-300 shadow hover:shadow-md hover:bg-gray-100 transition-all duration-200">
            Explore Teaching Resources
          </button>
        </Link>
      </section>

      {/* Testimonial Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h3 className="w-full md:w-auto px-6 py-3 rounded-lg bg-white text-gray-800 font-medium border border-gray-300 shadow hover:shadow-md hover:bg-gray-100 transition-all duration-200">Submit Your Advice or Testimonial</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                required
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border rounded px-3 py-2"
              />
              <textarea
                required
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full border rounded px-3 py-2 h-32"
              />
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ email: "", message: "" });
                  }}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
