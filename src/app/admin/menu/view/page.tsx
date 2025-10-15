"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type MenuItem = {
  id: string;
  name: string;
  price?: string;
  desc?: string;
  img?: string;
  ingredients?: string;
  steps?: string;
  categoryId?: string;
};

type Category = {
  id: string;
  title: string;
  items: MenuItem[];
};

function formatRupiah(price: string | null | undefined): string {
  if (!price) return '';
  if (price.toLowerCase().includes('rp')) return price;
  const numStr = price.replace(/[^\d]/g, '');
  if (!numStr) return price;
  const num = parseInt(numStr);
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(num);
}

// Function to download single recipe as text file
function downloadRecipe(item: MenuItem) {
  const ingredients = item.ingredients ? JSON.parse(item.ingredients) : [];
  const steps = item.steps ? JSON.parse(item.steps) : [];

  let content = `RESEP: ${item.name}\n`;
  content += `${'='.repeat(50)}\n\n`;
  
  if (item.price) {
    content += `Harga: ${formatRupiah(item.price)}\n\n`;
  }
  
  if (item.desc) {
    content += `Deskripsi:\n${item.desc}\n\n`;
  }

  if (ingredients.length > 0) {
    content += `BAHAN-BAHAN:\n`;
    content += `${'-'.repeat(50)}\n`;
    ingredients.forEach((ing: string, i: number) => {
      content += `${i + 1}. ${ing}\n`;
    });
    content += '\n';
  }

  if (steps.length > 0) {
    content += `LANGKAH-LANGKAH PEMBUATAN:\n`;
    content += `${'-'.repeat(50)}\n`;
    steps.forEach((step: string, i: number) => {
      content += `${i + 1}. ${step}\n`;
    });
    content += '\n';
  }

  content += `\n${'='.repeat(50)}\n`;
  content += `Generated from Rivea Coffee Shop Admin\n`;
  content += `Date: ${new Date().toLocaleDateString('id-ID')}\n`;

  // Create blob and download
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Resep-${item.name.replace(/\s+/g, '-')}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Function to download all recipes
function downloadAllRecipes(categories: Category[]) {
  let content = `KUMPULAN RESEP - RIVEA COFFEE SHOP\n`;
  content += `${'='.repeat(70)}\n`;
  content += `Generated: ${new Date().toLocaleDateString('id-ID', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })}\n`;
  content += `${'='.repeat(70)}\n\n\n`;

  categories.forEach((cat) => {
    content += `\n\n`;
    content += `${'█'.repeat(70)}\n`;
    content += `█  KATEGORI: ${cat.title.toUpperCase()}\n`;
    content += `${'█'.repeat(70)}\n\n`;

    cat.items.forEach((item, itemIndex) => {
      const ingredients = item.ingredients ? JSON.parse(item.ingredients) : [];
      const steps = item.steps ? JSON.parse(item.steps) : [];

      content += `\n${'-'.repeat(70)}\n`;
      content += `${itemIndex + 1}. ${item.name.toUpperCase()}\n`;
      content += `${'-'.repeat(70)}\n`;
      
      if (item.price) {
        content += `Harga: ${formatRupiah(item.price)}\n`;
      }
      
      if (item.desc) {
        content += `Deskripsi: ${item.desc}\n`;
      }

      if (ingredients.length > 0) {
        content += `\n📋 BAHAN-BAHAN:\n`;
        ingredients.forEach((ing: string, i: number) => {
          content += `   ${i + 1}. ${ing}\n`;
        });
      }

      if (steps.length > 0) {
        content += `\n📝 LANGKAH-LANGKAH:\n`;
        steps.forEach((step: string, i: number) => {
          content += `   ${i + 1}. ${step}\n`;
        });
      }

      if (ingredients.length === 0 && steps.length === 0) {
        content += `\n   ⚠️  Belum ada resep untuk menu ini.\n`;
      }

      content += `\n`;
    });
  });

  content += `\n\n${'='.repeat(70)}\n`;
  content += `Total Menu: ${categories.reduce((acc, cat) => acc + cat.items.length, 0)}\n`;
  content += `Total Kategori: ${categories.length}\n`;
  content += `${'='.repeat(70)}\n`;

  // Create blob and download
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Semua-Resep-Rivea-${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function RecipeModal({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const ingredients = item.ingredients ? JSON.parse(item.ingredients) : [];
  const steps = item.steps ? JSON.parse(item.steps) : [];

  return (
    <div 
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Image */}
        <div className="relative h-64 w-full bg-gray-100">
          <img
            src={item.img || '/images/placeholder.jpg'}
            alt={item.name}
            className="object-cover w-full h-full"
          />
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => downloadRecipe(item)}
              className="bg-green-600 hover:bg-green-700 text-white rounded-full px-4 py-2 flex items-center gap-2 shadow-lg transition"
              title="Download resep ini"
            >
              <span>⬇️</span>
              <span className="text-sm font-medium">Download</span>
            </button>
            <button
              onClick={onClose}
              className="bg-white/90 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-3xl font-serif text-amber-700">{item.name}</h2>
              {item.price && (
                <span className="text-2xl text-amber-600 font-bold mt-2 inline-block">
                  {formatRupiah(item.price)}
                </span>
              )}
            </div>
          </div>

          {item.desc && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Deskripsi</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {/* Ingredients */}
            {ingredients.length > 0 && (
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2">
                  <span>🧾</span>
                  Bahan-bahan
                </h3>
                <ul className="space-y-2">
                  {ingredients.map((ingredient: string, index: number) => (
                    <li key={index} className="flex gap-3 items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                        {index + 1}
                      </span>
                      <p className="flex-1 text-gray-700 pt-0.5">{ingredient}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Steps */}
            {steps.length > 0 && (
              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-amber-700 mb-4 flex items-center gap-2">
                  <span>📝</span>
                  Langkah-langkah
                </h3>
                <ol className="space-y-3">
                  {steps.map((step: string, index: number) => (
                    <li key={index} className="flex gap-3 items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                        {index + 1}
                      </span>
                      <p className="flex-1 text-gray-700 pt-0.5">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          {ingredients.length === 0 && steps.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>Belum ada resep untuk menu ini.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminMenuViewPage() {
  const router = useRouter();
  const [fullMenu, setFullMenu] = useState<Category[]>([]);
  const [filteredMenu, setFilteredMenu] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setFullMenu(data);
      setFilteredMenu(data);
    } catch (err) {
      console.error('Failed to fetch menu:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let filtered = fullMenu;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = fullMenu.filter(cat => cat.id === selectedCategory);
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
  }, [searchQuery, selectedCategory, fullMenu]);

  const totalItems = fullMenu.reduce((acc, cat) => acc + cat.items.length, 0);
  const filteredCount = filteredMenu.reduce((acc, cat) => acc + cat.items.length, 0);

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-gray-600">Loading menu...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">View All Menu</h2>
          <p className="text-sm text-gray-600 mt-1">
            Total: {totalItems} items | Ditampilkan: {filteredCount} items
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => downloadAllRecipes(fullMenu)}
            disabled={fullMenu.length === 0}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
            title="Download semua resep dalam satu file"
          >
            <span>⬇️</span>
            <span>Download Semua Resep</span>
          </button>
          <button
            onClick={() => router.push('/admin/menu')}
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
          >
            ← Kembali ke CRUD
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 Cari menu berdasarkan nama atau deskripsi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option value="all">Semua Kategori</option>
            {fullMenu.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Menu Display */}
      {fullMenu.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-500">Belum ada menu. Silakan tambahkan dari halaman CRUD.</p>
        </div>
      ) : filteredMenu.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-500">
            Tidak ada menu yang cocok dengan pencarian "{searchQuery}"
            {selectedCategory !== 'all' && ' di kategori yang dipilih'}
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredMenu.map((cat) => (
            <div key={cat.id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-amber-700 flex items-center gap-2">
                  <span className="w-1 h-6 bg-amber-600 rounded"></span>
                  {cat.title}
                  <span className="text-sm text-gray-500 font-normal">({cat.items.length} items)</span>
                </h3>
                <button
                  onClick={() => downloadAllRecipes([cat])}
                  className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm flex items-center gap-1"
                  title={`Download semua resep kategori ${cat.title}`}
                >
                  <span>⬇️</span>
                  <span>Download Kategori</span>
                </button>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {cat.items.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition group"
                  >
                    <div 
                      className="relative h-48 bg-gray-100 cursor-pointer"
                      onClick={() => setSelectedItem(item)}
                    >
                      <img
                        src={item.img || '/images/placeholder.jpg'}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center">
                        <span className="bg-amber-600 text-white px-4 py-2 rounded-full text-sm opacity-0 group-hover:opacity-100 transition">
                          Lihat Resep
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-800">{item.name}</h4>
                        {item.price && (
                          <span className="text-amber-600 font-medium text-sm whitespace-nowrap ml-2">
                            {formatRupiah(item.price)}
                          </span>
                        )}
                      </div>
                      
                      {item.desc && (
                        <p className="text-xs text-gray-600 line-clamp-2 mb-2">{item.desc}</p>
                      )}

                      <div className="flex gap-2 text-xs mb-3">
                        {item.ingredients && JSON.parse(item.ingredients).length > 0 && (
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                            🧾 {JSON.parse(item.ingredients).length} bahan
                          </span>
                        )}
                        {item.steps && JSON.parse(item.steps).length > 0 && (
                          <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded">
                            📝 {JSON.parse(item.steps).length} langkah
                          </span>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadRecipe(item);
                        }}
                        className="w-full px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-medium transition flex items-center justify-center gap-1"
                      >
                        <span>⬇️</span>
                        <span>Download Resep</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Recipe Modal */}
      {selectedItem && (
        <RecipeModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
        />
      )}
    </div>
  );
}
