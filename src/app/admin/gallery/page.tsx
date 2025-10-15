"use client";
import { useEffect, useState } from 'react';
import { useGallery } from '@/hooks/useGallery';

type GalleryItem = { id: string; title?: string; caption?: string; img: string; branch?: string };

export default function AdminGalleryPage() {
  const { items: galleryItems, isLoading, mutate } = useGallery();
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([]);
  const [form, setForm] = useState<any>({ title: '', caption: '', img: '', branch: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  
  // Common branches list
  const branches = [
    'Jakarta Pusat',
    'Jakarta Selatan',
    'Jakarta Utara',
    'Bandung',
    'Surabaya',
    'Yogyakarta',
    'Semarang',
    'Bali'
  ];

  useEffect(() => {
    if (galleryItems) {
      setFilteredItems(galleryItems);
    }
  }, [galleryItems]);

  // Filter items based on search and branch
  useEffect(() => {
    if (!galleryItems) return;
    
    let filtered = galleryItems;

    // Filter by branch
    if (selectedBranch !== 'all') {
      filtered = filtered.filter((item: GalleryItem) => item.branch === selectedBranch);
    }

    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((item: GalleryItem) =>
        item.title?.toLowerCase().includes(query) ||
        item.caption?.toLowerCase().includes(query) ||
        item.branch?.toLowerCase().includes(query)
      );
    }

    setFilteredItems(filtered);
  }, [searchQuery, selectedBranch, galleryItems]);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async function uploadImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          // Max width and height untuk gallery
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 800;
          
          let width = img.width;
          let height = img.height;

          // Calculate new dimensions
          if (width > height) {
            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = Math.round((width * MAX_HEIGHT) / height);
              height = MAX_HEIGHT;
            }
          }

          // Create canvas and resize
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            
            // Convert to base64 with compression (0.8 quality)
            const resizedBase64 = canvas.toDataURL('image/jpeg', 0.8);
            resolve(resizedBase64);
          } else {
            reject(new Error('Failed to get canvas context'));
          }
        };
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = e.target?.result as string;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }

  async function create(e: any) {
    e.preventDefault();
    setUploading(true);

    try {
      let imgPath = form.img;
      
      if (imageFile) {
        imgPath = await uploadImage(imageFile);
      }

      const payload = {
        id: String(Date.now()), // Auto-generate ID
        title: form.title,
        caption: form.caption,
        img: imgPath,
        branch: form.branch || null
      };

      await fetch('/api/gallery', { 
        method: 'POST', 
        body: JSON.stringify(payload), 
        headers: { 'Content-Type': 'application/json' } 
      });
      
      setForm({ title: '', caption: '', img: '', branch: '' });
      setImageFile(null);
      setImagePreview('');
      mutate(); // Revalidate cache
    } catch (error) {
      console.error('Failed to create gallery item:', error);
      alert('Failed to create gallery item');
    } finally {
      setUploading(false);
    }
  }

  async function remove(id: string) {
    if (!confirm('Are you sure you want to delete this image?')) return;
    await fetch('/api/gallery?id=' + encodeURIComponent(id), { method: 'DELETE' });
    mutate(); // Revalidate cache
  }

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Gallery Management</h2>

      <form onSubmit={create} className="bg-white p-3 sm:p-4 rounded shadow mb-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input 
              required 
              placeholder="e.g., Interior Cafe, Menu Special" 
              value={form.title} 
              onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 border rounded text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Cabang/Branch *</label>
            <select
              required
              value={form.branch}
              onChange={e => setForm({ ...form, branch: e.target.value })}
              className="w-full px-3 py-2 border rounded text-sm sm:text-base"
            >
              <option value="">-- Pilih Cabang --</option>
              {branches.map(branch => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Caption</label>
          <textarea 
            placeholder="Describe this image..." 
            value={form.caption} 
            onChange={e => setForm({ ...form, caption: e.target.value })}
            className="w-full px-3 py-2 border rounded text-sm sm:text-base"
            rows={2}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image *</label>
          <input 
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required={!form.img}
            className="w-full px-3 py-2 border rounded text-sm"
          />
          {imagePreview && (
            <div className="mt-2">
              <img src={imagePreview} alt="Preview" className="w-full sm:max-w-xs h-48 object-cover rounded" />
            </div>
          )}
        </div>

        <div>
          <button 
            type="submit"
            disabled={uploading}
            className="w-full sm:w-auto px-6 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 disabled:bg-gray-400 text-sm sm:text-base"
          >
            {uploading ? 'Uploading...' : 'Add to Gallery'}
          </button>
        </div>
      </form>

      {/* Search and Filter */}
      <div className="bg-white p-3 sm:p-4 rounded shadow mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 Cari title, caption, cabang..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg"
              >
                ✕
              </button>
            )}
          </div>

          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base"
          >
            <option value="all">Semua Cabang</option>
            {branches.map(branch => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>
        </div>
        {(searchQuery || selectedBranch !== 'all') && (
          <p className="text-xs sm:text-sm text-gray-600 mt-2">
            Ditemukan: {filteredItems.length} dari {galleryItems?.length || 0} gambar
          </p>
        )}
      </div>

      {isLoading ? (
        <div className="bg-white p-6 sm:p-8 rounded shadow text-center text-amber-600 text-sm sm:text-base">
          Memuat galeri...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {!galleryItems || galleryItems.length === 0 ? (
            <div className="col-span-full bg-white p-6 sm:p-8 rounded shadow text-center text-gray-500 text-sm sm:text-base">
              No images in gallery yet. Upload your first image!
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="col-span-full bg-white p-6 sm:p-8 rounded shadow text-center text-gray-500 text-sm sm:text-base">
              Tidak ada gambar yang cocok dengan pencarian atau filter cabang.
            </div>
          ) : (
            <>
              {filteredItems.map(it => (
                <div key={it.id} className="bg-white rounded shadow overflow-hidden group">
                  <div className="relative">
                    <img src={it.img} alt={it.title} className="w-full h-48 object-cover" />
                    <div className="absolute top-2 right-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => remove(it.id)} 
                        className="px-2 sm:px-3 py-1 bg-red-500 text-white rounded text-xs sm:text-sm hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="font-semibold text-amber-700 text-sm sm:text-base">{it.title}</div>
                    {it.branch && (
                      <div className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded inline-block mt-1">
                        📍 {it.branch}
                      </div>
                    )}
                    {it.caption && <div className="text-xs sm:text-sm text-gray-600 mt-2">{it.caption}</div>}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
