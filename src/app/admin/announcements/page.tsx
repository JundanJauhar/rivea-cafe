"use client";
import { useEffect, useState } from 'react';

type Announcement = {
  id: string;
  title: string;
  content: string;
  img?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterActive, setFilterActive] = useState<string>('all'); // 'all', 'active', 'inactive'
  
  const [form, setForm] = useState({
    title: '',
    content: '',
    img: '',
    isActive: true
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  async function loadAnnouncements() {
    setLoading(true);
    try {
      const res = await fetch('/api/announcements');
      const data = await res.json();
      setAnnouncements(data);
      setFilteredAnnouncements(data);
    } catch (error) {
      console.error('Failed to load announcements:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAnnouncements();
  }, []);

  // Filter announcements based on search and active status
  useEffect(() => {
    let filtered = announcements;

    // Filter by active status
    if (filterActive === 'active') {
      filtered = filtered.filter(item => item.isActive);
    } else if (filterActive === 'inactive') {
      filtered = filtered.filter(item => !item.isActive);
    }

    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query)
      );
    }

    setFilteredAnnouncements(filtered);
  }, [searchQuery, filterActive, announcements]);

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
          // Max width and height untuk mencegah gambar terlalu besar
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setUploading(true);

    try {
      let imgPath = form.img;

      // Upload image if selected
      if (imageFile) {
        imgPath = await uploadImage(imageFile);
      }

      const payload = {
        id: editMode ? editingId : String(Date.now()),
        title: form.title,
        content: form.content,
        img: imgPath || null,
        isActive: form.isActive
      };

      const method = editMode ? 'PUT' : 'POST';
      await fetch('/api/announcements', {
        method,
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
      });

      resetForm();
      loadAnnouncements();
    } catch (error) {
      console.error('Failed to save announcement:', error);
      alert('Failed to save announcement');
    } finally {
      setUploading(false);
    }
  }

  function resetForm() {
    setForm({ title: '', content: '', img: '', isActive: true });
    setImageFile(null);
    setImagePreview('');
    setEditMode(false);
    setEditingId(null);
  }

  function editAnnouncement(item: Announcement) {
    setForm({
      title: item.title,
      content: item.content,
      img: item.img || '',
      isActive: item.isActive
    });
    setImagePreview(item.img || '');
    setEditMode(true);
    setEditingId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function deleteAnnouncement(id: string) {
    if (!confirm('Are you sure you want to delete this announcement?')) return;
    
    try {
      await fetch('/api/announcements?id=' + encodeURIComponent(id), { method: 'DELETE' });
      loadAnnouncements();
    } catch (error) {
      console.error('Failed to delete announcement:', error);
      alert('Failed to delete announcement');
    }
  }

  async function toggleActive(item: Announcement) {
    try {
      await fetch('/api/announcements', {
        method: 'PUT',
        body: JSON.stringify({
          id: item.id,
          title: item.title,
          content: item.content,
          img: item.img,
          isActive: !item.isActive
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      loadAnnouncements();
    } catch (error) {
      console.error('Failed to toggle active status:', error);
    }
  }

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Pengumuman Management</h2>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-6 rounded shadow mb-6">
        <h3 className="text-lg font-semibold mb-4">
          {editMode ? 'Edit Pengumuman' : 'Buat Pengumuman Baru'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Judul Pengumuman *</label>
            <input
              required
              placeholder="Misal: Promo Spesial Akhir Tahun"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 border rounded text-sm sm:text-base"
            />
          </div>

          {/* Content */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Konten Pengumuman *</label>
            <textarea
              required
              placeholder="Tulis detail pengumuman di sini..."
              value={form.content}
              onChange={e => setForm({ ...form, content: e.target.value })}
              className="w-full px-3 py-2 border rounded text-sm sm:text-base h-32"
            />
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Gambar (Opsional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border rounded text-sm"
            />
            {imagePreview && (
              <div className="mt-3">
                <img src={imagePreview} alt="Preview" className="w-full max-w-md h-48 object-cover rounded" />
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview('');
                    setForm({ ...form, img: '' });
                  }}
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  Hapus Gambar
                </button>
              </div>
            )}
          </div>

          {/* Active Status */}
          <div className="md:col-span-2 flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={form.isActive}
              onChange={e => setForm({ ...form, isActive: e.target.checked })}
              className="w-4 h-4"
            />
            <label htmlFor="isActive" className="text-sm font-medium">
              Tampilkan di halaman customer (Active)
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <button
            type="submit"
            disabled={uploading}
            className="px-6 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 disabled:bg-gray-400 text-sm sm:text-base"
          >
            {uploading ? 'Menyimpan...' : editMode ? 'Update' : 'Buat Pengumuman'}
          </button>
          {editMode && (
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 text-sm sm:text-base"
            >
              Batal
            </button>
          )}
        </div>
      </form>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded shadow mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="🔍 Cari pengumuman..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="px-3 py-2 border rounded text-sm sm:text-base"
          />
          <select
            value={filterActive}
            onChange={e => setFilterActive(e.target.value)}
            className="px-3 py-2 border rounded text-sm sm:text-base"
          >
            <option value="all">Semua Status</option>
            <option value="active">Active Saja</option>
            <option value="inactive">Inactive Saja</option>
          </select>
        </div>
        {(searchQuery || filterActive !== 'all') && (
          <p className="text-xs sm:text-sm text-gray-600 mt-2">
            Ditemukan: {filteredAnnouncements.length} pengumuman
          </p>
        )}
      </div>

      {/* Announcements List */}
      {loading ? (
        <div className="text-center py-8 text-gray-500">Loading...</div>
      ) : filteredAnnouncements.length === 0 ? (
        <div className="bg-white p-8 rounded shadow text-center text-gray-500">
          {searchQuery || filterActive !== 'all' 
            ? 'Tidak ada pengumuman yang cocok dengan filter'
            : 'Belum ada pengumuman. Buat pengumuman pertama Anda!'}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAnnouncements.map(item => (
            <div key={item.id} className="bg-white p-4 rounded shadow">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Image */}
                {item.img && (
                  <div className="md:w-48 shrink-0">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-32 md:h-full object-cover rounded"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-amber-700">{item.title}</h3>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className={`text-xs px-2 py-1 rounded ${
                        item.isActive 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {item.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 whitespace-pre-wrap">{item.content}</p>
                  
                  <div className="text-xs text-gray-400 mb-3">
                    Dibuat: {new Date(item.createdAt).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => toggleActive(item)}
                      className={`px-3 py-1 text-sm rounded ${
                        item.isActive
                          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          : 'bg-green-200 text-green-700 hover:bg-green-300'
                      }`}
                    >
                      {item.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                    </button>
                    <button
                      onClick={() => editAnnouncement(item)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteAnnouncement(item.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
