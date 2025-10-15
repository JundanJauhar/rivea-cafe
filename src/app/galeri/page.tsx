"use client";

import { useEffect, useState } from "react";
import { useGallery } from "@/hooks/useGallery";

type GalleryItem = {
  id: string;
  title?: string;
  caption?: string;
  img: string;
  branch?: string;
};

export default function GalleryPage() {
  const { items, isLoading, isError } = useGallery();
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  // Extract unique branches from gallery items
  const branches = items ? Array.from(new Set(items.map(item => item.branch).filter(Boolean))) : [];

  useEffect(() => {
    if (items) {
      setFilteredItems(items);
    }
  }, [items]);

  useEffect(() => {
    if (!items) return;
    
    let filtered = items;
    
    if (selectedBranch !== "all") {
      filtered = filtered.filter((item: GalleryItem) => item.branch === selectedBranch);
    }
    
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((item: GalleryItem) => 
        item.title?.toLowerCase().includes(query) || 
        item.caption?.toLowerCase().includes(query)
      );
    }
    
    setFilteredItems(filtered);
  }, [searchQuery, selectedBranch, items]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-amber-50 to-white py-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-amber-600">Memuat galeri...</p>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-amber-50 to-white py-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-red-600">Gagal memuat galeri. Silakan coba lagi.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-white py-16">
      <div className="container mx-auto px-6">
        <header className="text-center mb-8">
          <h2 className="text-4xl font-serif text-amber-700">Galeri Kami</h2>
          <p className="mt-3 text-amber-600 max-w-2xl mx-auto">
            Lihat suasana dan momen indah di berbagai cabang Rivea Coffee Shop
          </p>
        </header>

        {/* Search and Filter Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder=" Cari foto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 rounded-full border-2 border-amber-200 focus:border-amber-500 focus:outline-none shadow-lg text-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  
                </button>
              )}
            </div>

            {/* Branch Dropdown */}
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="px-6 py-4 rounded-full border-2 border-amber-200 focus:border-amber-500 focus:outline-none shadow-lg text-lg bg-white"
            >
              <option value="all"> Semua Cabang</option>
              {branches.map(branch => (
                <option key={branch} value={branch}>
                   {branch}
                </option>
              ))}
            </select>
          </div>

          {/* Results Count */}
          {(searchQuery || selectedBranch !== "all") && (
            <p className="text-center text-sm text-gray-600 mt-4">
              Menampilkan {filteredItems.length} dari {items?.length || 0} foto
            </p>
          )}
        </div>

        {/* Branch Pills Navigation */}
        {!searchQuery && branches.length > 0 && (
          <div className="mb-8 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedBranch("all")}
              className={`px-5 py-2 rounded-full font-medium shadow-md transition ${
                selectedBranch === "all" 
                  ? "bg-amber-600 text-white" 
                  : "bg-white text-amber-700 border border-amber-200 hover:bg-amber-100"
              }`}
            >
              Semua Cabang
            </button>
            {branches.map(branch => (
              <button
                key={branch}
                onClick={() => setSelectedBranch(branch as string)}
                className={`px-5 py-2 rounded-full font-medium shadow-md transition ${
                  selectedBranch === branch 
                    ? "bg-amber-600 text-white" 
                    : "bg-white text-amber-700 border border-amber-200 hover:bg-amber-100"
                }`}
              >
                 {branch}
              </button>
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        {!items || items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-amber-600">Belum ada foto di galeri.</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-amber-600">Tidak ada foto yang cocok dengan pencarian atau filter cabang.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition group"
              >
                <div className="relative h-64 bg-gray-100">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:brightness-95 transition"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center">
                    <span className="text-white text-sm bg-amber-600 px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition">
                      Lihat Detail
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-amber-700 mb-2">{item.title}</h3>
                  {item.branch && (
                    <div className="flex items-center gap-1 text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded mb-2 w-fit">
                      <span>📍</span>
                      <span>{item.branch}</span>
                    </div>
                  )}
                  {item.caption && (
                    <p className="text-sm text-gray-600 line-clamp-2">{item.caption}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Image Detail Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img 
                src={selectedImage.img} 
                alt={selectedImage.title} 
                className="w-full h-auto max-h-[70vh] object-contain bg-gray-100"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
              >
                
              </button>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-serif text-amber-700 mb-3">{selectedImage.title}</h2>
              {selectedImage.branch && (
                <div className="flex items-center gap-2 text-sm bg-amber-100 text-amber-700 px-3 py-2 rounded mb-3 w-fit">
                  <span>📍</span>
                  <span className="font-medium">{selectedImage.branch}</span>
                </div>
              )}
              {selectedImage.caption && (
                <p className="text-gray-600 leading-relaxed">{selectedImage.caption}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}