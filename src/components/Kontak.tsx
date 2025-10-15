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
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50 py-20 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-serif text-amber-700 mb-3">Hubungi Kami</h1>
          <p className="text-amber-600 text-sm sm:text-base">
            Punya pertanyaan atau ingin berbagi cerita? Kami siap mendengar!
          </p>
        </div>

        {/* Unified Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-8">
          
          {/* Social Media Section - Combined */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span>📱</span> Hubungi Langsung
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a 
                href="https://wa.me/6282256613521" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-green-500 text-white p-4 rounded-xl hover:bg-green-600 transition-all hover:shadow-lg group"
              >
                <span className="text-2xl group-hover:scale-110 transition">📱</span>
                <div className="text-left">
                  <div className="font-semibold">WhatsApp</div>
                  <div className="text-xs opacity-90">+62 822-5661-3521</div>
                </div>
              </a>

              <a 
                href="https://instagram.com/riveajogja" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white p-4 rounded-xl hover:shadow-lg transition-all group"
              >
                <span className="text-2xl group-hover:scale-110 transition">📷</span>
                <div className="text-left">
                  <div className="font-semibold">Instagram</div>
                  <div className="text-xs opacity-90">@riveajogja</div>
                </div>
              </a>

              <a 
                href="https://www.tiktok.com/@riveajogja" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-black text-white p-4 rounded-xl hover:bg-gray-800 transition-all hover:shadow-lg group"
              >
                <span className="text-2xl group-hover:scale-110 transition">🎵</span>
                <div className="text-left">
                  <div className="font-semibold">TikTok</div>
                  <div className="text-xs opacity-90">@riveajogja</div>
                </div>
              </a>

              <a 
                href="https://linktr.ee/riveajogja" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-400 to-blue-500 text-white p-4 rounded-xl hover:shadow-lg transition-all group"
              >
                <span className="text-2xl group-hover:scale-110 transition">🔗</span>
                <div className="text-left">
                  <div className="font-semibold">Linktree</div>
                  <div className="text-xs opacity-90">Semua Link</div>
                </div>
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">atau</span>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span>✉️</span> Kirim Pesan
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition"
                  placeholder="Nama Anda"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition"
                  placeholder="email@domain.com"
                  required
                />
              </div>

              <div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 shadow-sm p-3 h-32 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition resize-none"
                  placeholder="Tulis pesan Anda di sini..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition font-semibold shadow-md hover:shadow-lg"
              >
                Kirim Pesan
              </button>

              {sent && (
                <p className="text-sm text-green-600 text-center bg-green-50 p-3 rounded-lg">
                  ✅ Mail client dibuka — lengkapi dan kirim pesan Anda.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
