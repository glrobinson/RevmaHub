import Image from "next/image";

export default function InfoPage() {
  return (
    <main className="space-y-5 text-sm">

      {/* Header */}
      <section className="relative h-[200px] sm:h-[200px] md:h-[200px] w-full">
        <div className="absolute inset-0 bg-white flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-black text-3xl sm:text-4xl md:text-5xl font-bold mb-4 drop-shadow">
                Learn More About Roma Experiences, History, and Education
            </h1>
            <p className="text-black text-sm sm:text-base md:text-lg max-w-2xl drop-shadow">
                Explore key facts, concepts, and questions about Roma communities and education.
            </p>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gray-100 px-6 py-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="bg-gray-300 h-40 rounded flex items-center justify-center text-sm text-gray-700 shadow-sm"
            >
              Statistics
            </div>
          ))}
        </div>
      </section>

      {/* Infographics Section */}
      <section className="py-10 px-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <h2 className="text-xl sm:text-3xl font-semibold mb-4">Important Pieces to Highlight</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-gray-300 h-80 rounded flex items-center justify-center text-sm text-gray-700 shadow-sm"
              >
                Info graphic
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
