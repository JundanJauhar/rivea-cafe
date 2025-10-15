"use client";

import { useState } from "react";

export default function KontakPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Open mail client with prefilled subject/body
    const subject = encodeURIComponent(`Pesan dari ${name || "Pengunjung"}`);
    const body = encodeURIComponent(`Nama: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:info@rivea.example?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <main className="min-h-screen bg-white py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-serif text-amber-700 mb-4">Kontak Kami</h1>
        <p className="text-amber-600 mb-8">
          Punya pertanyaan, kerjasama, atau permintaan khusus? Tinggalkan pesan di bawah
          dan kami akan menghubungi Anda.
        </p>

        {/* Social Media Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <a 
            href="https://wa.me/6281234567890" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-green-50 p-4 rounded-lg border-2 border-green-200 hover:bg-green-100 transition group"
          >
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl group-hover:scale-110 transition">
              📱
            </div>
            <div>
              <div className="font-semibold text-green-700">WhatsApp</div>
              <div className="text-sm text-green-600">+62 812-3456-7890</div>
            </div>
          </a>

          <a 
            href="https://instagram.com/riveajogja" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-pink-50 p-4 rounded-lg border-2 border-pink-200 hover:bg-pink-100 transition group"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl group-hover:scale-110 transition">
              📷
            </div>
            <div>
              <div className="font-semibold text-pink-700">Instagram</div>
              <div className="text-sm text-pink-600">@riveacoffee</div>
            </div>
          </a>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-amber-50 p-6 rounded-lg shadow-sm">
          <div>
            <label className="block text-sm font-medium text-amber-700">Nama</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-3"
              placeholder="Nama Anda"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-3"
              placeholder="email@domain.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-amber-700">Pesan</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-200 shadow-sm p-3 h-36"
              placeholder="Tulis pesan Anda di sini..."
              required
            />
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="submit"
              className="bg-amber-700 text-white px-5 py-2 rounded-md hover:bg-amber-800 transition"
            >
              Kirim
            </button>

            {sent && (
              <p className="text-sm text-amber-700">Mail client dibuka — lengkapi dan kirim pesan Anda.</p>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
