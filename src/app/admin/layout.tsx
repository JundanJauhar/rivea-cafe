"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="pt-4 sm:pt-6 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Mobile Menu Button */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full bg-white p-3 rounded shadow flex justify-between items-center"
          >
            <span className="font-semibold text-amber-700">☰ Menu Admin</span>
            <span className="text-amber-700">{sidebarOpen ? '✕' : '▼'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 sm:gap-6">
          {/* Sidebar - Hidden on mobile unless toggled */}
          <aside className={`
            md:col-span-1 bg-white p-4 rounded shadow
            ${sidebarOpen ? 'block' : 'hidden md:block'}
          `}>
            <h3 className="font-semibold mb-3 text-amber-700 text-base sm:text-lg">Admin Panel</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  href="/admin" 
                  className="block py-2 px-3 rounded hover:bg-amber-50 text-amber-700 font-medium transition"
                  onClick={() => setSidebarOpen(false)}
                  prefetch={true}
                >
                  🏠 Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/menu" 
                  className="block py-2 px-3 rounded hover:bg-amber-50 transition"
                  onClick={() => setSidebarOpen(false)}
                  prefetch={true}
                >
                  📝 Menu (CRUD)
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/menu/view" 
                  className="block py-2 px-3 rounded hover:bg-amber-50 transition"
                  onClick={() => setSidebarOpen(false)}
                  prefetch={true}
                >
                  📖 View Menu
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/gallery" 
                  className="block py-2 px-3 rounded hover:bg-amber-50 transition"
                  onClick={() => setSidebarOpen(false)}
                  prefetch={true}
                >
                  🖼️ Gallery
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/announcements" 
                  className="block py-2 px-3 rounded hover:bg-amber-50 transition"
                  onClick={() => setSidebarOpen(false)}
                  prefetch={true}
                >
                  📢 Pengumuman
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/reviews" 
                  className="block py-2 px-3 rounded hover:bg-amber-50 transition"
                  onClick={() => setSidebarOpen(false)}
                  prefetch={true}
                >
                  ⭐ Reviews
                </Link>
              </li>
            </ul>
            
            {/* Back to Home Link */}
            <div className="mt-6 pt-4 border-t">
              <Link 
                href="/" 
                className="block py-2 px-3 rounded bg-gray-100 hover:bg-gray-200 text-center transition text-sm"
                onClick={() => setSidebarOpen(false)}
                prefetch={true}
              >
                ← Kembali ke Home
              </Link>
            </div>
          </aside>

          <section className="md:col-span-5">
            {children}
          </section>
        </div>
      </div>
    </div>
  );
}
