import Image from 'next/image';

export default function TentangKamiPage() {
  return (
    <main className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-6">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-serif text-amber-700">Tentang Kami</h1>
          <p className="mt-3 text-amber-600 max-w-2xl mx-auto">
            RIVEA — tempat di mana kopi, cerita, dan komunitas bertemu. Kami menyajikan lebih dari sekadar minuman.
          </p>
        </header>

        <section className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <h2 className="text-2xl font-semibold text-amber-700 mb-4">Sejarah Singkat</h2>
            <p className="text-gray-700 leading-relaxed text-justify">
              <span className="font-bold text-2xl">RIVÉA</span> diambil dari kata 'River' dan 'Idea', adalah ruang yang mengalirkan rasa – tempat bertemu, berproses, dan pulang. Riverside Cafe and Space menggambarkan sebuah tempat di pinggir sungai yang tidak hanya menyajikan kopi dan makanan, tapi juga pengalaman dan ketenangan.
            </p>
          </div>

          <div className="rounded-lg overflow-hidden shadow-lg">
            <img src="rivea-cafe-build.jpg" alt="Our space" className="w-full h-96 object-cover" />
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold text-amber-700 mb-4">Visi & Misi</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-amber-50 rounded-lg">
              <h4 className="font-semibold text-amber-700">Visi</h4>
              <p className="text-gray-700 mt-3">Menjadi ruang kopi pilihan yang menyatukan rasa dan cerita lokal.</p>
            </div>

            <div className="p-6 bg-amber-50 rounded-lg">
              <h4 className="font-semibold text-amber-700">Misi</h4>
              <ul className="list-disc list-inside text-gray-700 mt-3">
                <li>Menyajikan kopi berkualitas dari biji terbaik.</li>
                <li>Menciptakan suasana ramah dan nyaman untuk semua.</li>
                <li>Mendukung komunitas lokal dan keberlanjutan.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-amber-50 p-6 rounded-lg text-center">
          <h4 className="text-xl font-semibold text-amber-700">Ingin berkunjung atau bekerjasama?</h4>
          <p className="text-gray-700 mt-2">Hubungi kami atau kunjungi lokasi. Kami senang mendengar dari Anda.</p>
          <div className="mt-4">
            <a href="/kontak" className="inline-block bg-amber-700 text-white px-6 py-2 rounded-md">Kontak Kami</a>
          </div>
        </section>
      </div>
    </main>
  );
}
