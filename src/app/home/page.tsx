import ReviewSection from "@/components/ReviewSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center bg-cover bg-center relative" style={{ backgroundImage: "url('bg-home.jpg')" }}>
        {/* overlay for better contrast */}
        <div className="absolute inset-0 bg-black/30 mix-blend-multiply pointer-events-none" />
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Image */}
            <div className="order-2 md:order-1">
              {/* Placeholder untuk gambar cafe - ganti dengan gambar asli */}
              <div className="w-full h-full bg-gradient-to-br flex items-center justify-center">
                <img src="/images/coffe2.png" alt="" className="w-md h-md" />
              </div>
            </div>

            {/* Right Side - Text Content */}
            <div className="order-1 md:order-2 space-y-6 relative z-10 text-white">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight">
                Temukan Rasa, Nikmati Cerita di Coffe Rivea
              </h1>
              
              
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16" id="tentang">
        <div className="container mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <p className="text-amber-600 text-lg leading-relaxed">
                Tempat di mana setiap cangkir kopi bercerita — tentang aroma, kebersamaan, dan rasa yang mengalir.
              </p>

              <ul className="mt-4 list-disc list-inside text-gray-700 space-y-2">
                <li>Memilih biji kopi berkualitas dari sumber terbaik.</li>
                <li>Mengutamakan teknik seduh yang tepat untuk rasa konsisten.</li>
                <li>Menciptakan suasana hangat untuk berkumpul dan bekerja.</li>
              </ul>
            </div>

            {/* Images Grid */}
            <div className="grid grid-cols-2 gap-4 ">
              <div className="row-span-2 overflow-hidden rounded-xl shadow-lg">
                <img src="suasana-rivea2.jpg" alt="Suasana Rivea" className="w-full h-full object-cover" />
              </div>
              <div className="overflow-hidden rounded-xl shadow-lg">
                <img src="suasana-rivea.jpg" alt="Area seating" className="w-full h-60 object-cover" />
              </div>
              <div className="overflow-hidden rounded-xl shadow-lg">
                <img src="suasana-rivea5.jpg" alt="Coffee closeup" className="w-full h-60 object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Review Section */}
      <ReviewSection />
    </div>
  );
}
