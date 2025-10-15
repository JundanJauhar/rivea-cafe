"use client";

import { useEffect, useState } from "react";

type Announcement = {
  id: string;
  title: string;
  content: string;
  img?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch only active announcements
    fetch('/api/announcements?active=true')
      .then(res => res.json())
      .then(data => {
        setAnnouncements(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch announcements:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-amber-50 to-white py-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-amber-600">Memuat pengumuman...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-serif text-amber-700 mb-3">
            📢 Pengumuman
          </h1>
          <p className="text-amber-600 max-w-2xl mx-auto text-sm sm:text-base">
            Informasi terbaru, promo, dan update dari Rivea Coffee Shop
          </p>
        </header>

        {announcements.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-gray-500 text-lg">Belum ada pengumuman saat ini</p>
            <p className="text-gray-400 text-sm mt-2">Silakan cek kembali nanti untuk update terbaru</p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6 ">
            {announcements.map((item) => (
              <article 
                key={item.id} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                style={{ wordBreak: 'break-word' }}
              >
                {/* Image - if exists */}
                {item.img && (
                  <div className="relative w-full bg-gray-100 overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-auto max-h-[400px] object-contain bg-gray-50"
                      style={{ display: 'block' }}
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6 sm:p-8">
                  {/* Date Badge */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-amber-600 mb-3">
                    <span className="inline-flex items-center gap-1">
                      📅 {new Date(item.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl sm:text-2xl font-serif font-semibold text-amber-800 mb-4">
                    {item.title}
                  </h2>

                  {/* Content */}
                  <div className="prose prose-sm sm:prose-base max-w-none">
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {item.content}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-400 italic">
                      Update terakhir: {new Date(item.updatedAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Call to Action */}
        {announcements.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm mb-4">
              Ada pertanyaan tentang pengumuman ini?
            </p>
            <a
              href="/home#kontak"
              className="inline-block px-6 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition font-medium shadow-lg hover:shadow-xl"
            >
              Hubungi Kami
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
