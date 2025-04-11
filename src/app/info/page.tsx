import Image from "next/image";

export default function InfoPage() {
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
