"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import { useQuery } from "@apollo/client";
import { GET_STORIES_TESTIMONIALS } from "../../../lib/queries";
import client from "../../../lib/apollo";
import TeacherTestimonials from "../components/TeacherTestimonials";

export default function TeachingRomaPage() {
    const { data, loading, error } = useQuery(GET_STORIES_TESTIMONIALS, { client });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const formRef = useRef<HTMLFormElement>(null);

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

  return (
    <main className="space-y-2 text-sm ">
        {/* Hero Section with Blurred Background */}
        <section className="relative h-[400px] w-full overflow-hidden">
        {/* Blurred background image layer */}
        <div className="absolute inset-0 z-0">
            <Image
            src="/teaching.jpg"
            alt="Teaching Roma Students"
            fill
            priority
            className="object-cover filter blur-sm scale-105"
            />
        </div>

        {/* Overlay and text */}
        <div className="absolute inset-0 z-10 bg-black/30 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow">
            Supporting Teachers of Roma Students
            </h1>
            <p className="text-white text-sm sm:text-base md:text-lg max-w-2xl drop-shadow">
            Revma is here to support educators with meaningful tools, resources, and real advice from teachers who have worked with Roma students across different communities.
            </p>
        </div>
        </section>

      {/* Teacher Testimonials Section */}
      <TeacherTestimonials />

      {/* Submit Section */}
      <section className="bg-gray-50 px-6 py-10 text-center shadow-md">
        <h2 className="text-lg font-semibold mb-2">Want to Share Your Experience?</h2>
        <p className="text-sm text-gray-700 mb-4">
          If you’re a teacher of Roma students, we’d love to hear your story or advice for others.
        </p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full md:w-auto px-6 py-3 rounded-lg bg-white text-gray-800 font-medium border border-gray-300 shadow hover:shadow-md hover:bg-gray-100 transition-all duration-200"
        >
          Submit Your Advice or Testimonial
        </button>
      </section>

      {/* Image Row Section */}
    <section className="px-6 py-3 bg-white">
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="rounded overflow-hidden shadow">
        <Image
            src="/classroom.jpg"
            alt="Roma Education 1"
            width={500}
            height={500}
            className="object-cover w-full h-48"
        />
        </div>
        <div className="rounded overflow-hidden shadow">
        <Image
            src="/classroom2.jpg"
            alt="Roma Education 2"
            width={500}
            height={500}
            className="object-cover w-full h-48"
        />
        </div>
        <div className="rounded overflow-hidden shadow">
        <Image
            src="/teaching.jpg"
            alt="Roma Education 3"
            width={500}
            height={500}
            className="object-cover w-full h-48"
        />
        </div>
    </div>
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
      </section>

      {/* CTA */}
      <section className="text-center space-y-4 py-10 bg-gray-100 shadow-inner shadow-md">
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
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white p-10 rounded-lg w-full max-w-lg relative">
            <button className="absolute top-4 right-4 text-black font-bold" onClick={() => setIsModalOpen(false)}>✕</button>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <input type="email" name="email" placeholder="Email" required className="w-full border p-2 rounded" />
              <textarea name="message" placeholder="Message" required className="w-full border p-2 rounded h-24" />
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
