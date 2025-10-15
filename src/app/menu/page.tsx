"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCategories } from '@/hooks/useCategories';

type MenuItem = {
  id: string;
  name: string;
  price?: string;
  desc?: string;
  img?: string;
  categoryId?: string;
};

type Category = {
  id: string;
  title: string;
  items: MenuItem[];
};

function formatRupiah(price: string | null | undefined): string {
  if (!price) return '';
  
  // Jika sudah ada format Rp, return as is
  if (price.toLowerCase().includes('rp')) return price;
  
  // Ekstrak angka dari string
  const numStr = price.replace(/[^\d]/g, '');
  if (!numStr) return price;
  
  const num = parseInt(numStr);
  
  // Format ke Rupiah Indonesia
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(num);
}

export default function MenuPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const { categories, isLoading, isError } = useCategories();
  const [filteredMenu, setFilteredMenu] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Update selected category from URL parameter
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    if (categories) {
      setFilteredMenu(categories);
    }
  }, [categories]);

  useEffect(() => {
    if (!categories) return;
    
    let filtered = categories;

    // Filter by category if selected
    if (selectedCategory) {
      filtered = categories.filter(cat => 
        cat.title.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.map(cat => ({
        ...cat,
        items: cat.items.filter(item => 
          item.name.toLowerCase().includes(query) ||
          item.desc?.toLowerCase().includes(query)
        )
      })).filter(cat => cat.items.length > 0);
    }

    setFilteredMenu(filtered);
  }, [searchQuery, categories, selectedCategory]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-amber-50 to-white py-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-amber-600">Memuat menu...</p>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-amber-50 to-white py-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-red-600">Gagal memuat menu. Silakan coba lagi.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-white py-16">
      <div className="container mx-auto px-6">
        <header className="text-center mb-8">
          <h2 className="text-4xl font-serif text-amber-700">Menu Kami</h2>
          <p className="mt-3 text-amber-600 max-w-2xl mx-auto">
            Pilihan kopi dan cemilan yang diracik untuk momen berharga — temukan favoritmu.
          </p>
        </header>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 Cari menu... (e.g., Cappuccino, Latte)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 rounded-full border-2 border-amber-200 focus:border-amber-500 focus:outline-none shadow-lg text-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="text-center text-sm text-gray-600 mt-2">
              Ditemukan {filteredMenu.reduce((acc, cat) => acc + cat.items.length, 0)} menu
            </p>
          )}
        </div>

        {/* Selected Category Badge */}
        {selectedCategory && (
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="text-gray-600">Menampilkan kategori:</span>
            <span className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full font-medium">
              {selectedCategory}
            </span>
            <a
              href="/menu"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition"
            >
              ✕ Hapus Filter
            </a>
          </div>
        )}

        {!categories || categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-amber-600">Belum ada menu tersedia. Silakan tambahkan menu dari halaman admin.</p>
          </div>
        ) : filteredMenu.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-amber-600">
              {searchQuery 
                ? `Tidak ada menu yang cocok dengan pencarian "${searchQuery}"` 
                : `Tidak ada menu dalam kategori "${selectedCategory}"`
              }
            </p>
          </div>
        ) : (
          <>
            {/* Category Filter */}
            {!searchQuery && !selectedCategory && (
              <div className="mb-8 bg-amber-50/95 py-4 -mx-6 px-6 rounded-lg">
                <div className="flex flex-wrap justify-center gap-3">
                  <a 
                    href="#all" 
                    className="px-5 py-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 transition font-medium shadow-md"
                  >
                    Semua Menu
                  </a>
                  {categories.map((cat) => (
                    <a
                      key={cat.id}
                      href={`#${cat.id}`}
                      className="px-5 py-2 bg-white text-amber-700 rounded-full hover:bg-amber-100 transition font-medium shadow-md border border-amber-200"
                    >
                      {cat.title}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Menu Items */}
            <div className="space-y-12" id="all">
              {filteredMenu.map((cat) => (
                <section key={cat.id} id={cat.id} className="scroll-mt-32">
                  <h3 className="text-2xl font-serif text-amber-700 mb-6 flex items-center gap-2">
                    <span className="w-2 h-8 bg-amber-600 rounded"></span>
                    {cat.title}
                    <span className="text-sm text-gray-500 font-normal">({cat.items.length} items)</span>
                  </h3>
                  {cat.items.length === 0 ? (
                    <p className="text-gray-500 italic">Belum ada item dalam kategori ini.</p>
                  ) : (
                    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {cat.items.map((item) => (
                        <article
                          key={item.id}
                          className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition flex flex-col"
                        >
                          <div className="relative h-72 w-full bg-gray-100">
                            <img
                              src={item.img || '/images/placeholder.jpg'}
                              alt={item.name}
                              className="object-cover w-full h-full"
                            />
                          </div>

                          <div className="p-6 flex-1 flex flex-col">
                            <div className="flex items-start justify-between mb-3">
                              <h4 className="text-lg font-semibold text-amber-700">{item.name}</h4>
                              {item.price && <span className="text-amber-600 font-medium whitespace-nowrap ml-2">{formatRupiah(item.price)}</span>}
                            </div>

                            {item.desc && <p className="text-sm text-gray-600 mt-auto">{item.desc}</p>}
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
