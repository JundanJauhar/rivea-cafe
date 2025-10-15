'use client';

import { useState, useEffect } from 'react';

interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  province: string;
  phone: string | null;
  mapsUrl: string | null;
  img: string | null;
  openingHours: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface OpeningHours {
  [key: string]: { open: string; close: string; closed: boolean };
}

const defaultOpeningHours: OpeningHours = {
  'Senin': { open: '08:00', close: '22:00', closed: false },
  'Selasa': { open: '08:00', close: '22:00', closed: false },
  'Rabu': { open: '08:00', close: '22:00', closed: false },
  'Kamis': { open: '08:00', close: '22:00', closed: false },
  'Jumat': { open: '08:00', close: '22:00', closed: false },
  'Sabtu': { open: '08:00', close: '23:00', closed: false },
  'Minggu': { open: '08:00', close: '23:00', closed: false },
};

export default function BranchesAdmin() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    province: '',
    phone: '',
    mapsUrl: '',
    img: '',
    openingHours: JSON.stringify(defaultOpeningHours, null, 2),
    isActive: true
  });

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await fetch('/api/branches');
      const data = await response.json();
      setBranches(data);
    } catch (error) {
      console.error('Error fetching branches:', error);
      alert('Gagal memuat data cabang');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = '/api/branches';
      const method = editingBranch ? 'PUT' : 'POST';
      const body = editingBranch 
        ? { ...formData, id: editingBranch.id }
        : formData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (!response.ok) throw new Error('Failed to save branch');

      alert(editingBranch ? 'Cabang berhasil diperbarui!' : 'Cabang berhasil ditambahkan!');
      setIsModalOpen(false);
      resetForm();
      fetchBranches();
    } catch (error) {
      console.error('Error saving branch:', error);
      alert('Gagal menyimpan cabang');
    }
  };

  const handleEdit = (branch: Branch) => {
    setEditingBranch(branch);
    setFormData({
      name: branch.name,
      address: branch.address,
      city: branch.city,
      province: branch.province,
      phone: branch.phone || '',
      mapsUrl: branch.mapsUrl || '',
      img: branch.img || '',
      openingHours: branch.openingHours || JSON.stringify(defaultOpeningHours, null, 2),
      isActive: branch.isActive
    });
    setImagePreview(branch.img || '');
    setIsModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('File harus berupa gambar!');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal 5MB!');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload/branch-image', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      
      // Update form data with uploaded image URL
      setFormData(prev => ({ ...prev, img: data.imageUrl }));
      setImagePreview(data.imageUrl);
      
      alert('Gambar berhasil diupload!');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Gagal mengupload gambar');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Yakin ingin menghapus cabang "${name}"?`)) return;

    try {
      const response = await fetch(`/api/branches?id=${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete branch');

      alert('Cabang berhasil dihapus!');
      fetchBranches();
    } catch (error) {
      console.error('Error deleting branch:', error);
      alert('Gagal menghapus cabang');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      city: '',
      province: '',
      phone: '',
      mapsUrl: '',
      img: '',
      openingHours: JSON.stringify(defaultOpeningHours, null, 2),
      isActive: true
    });
    setImagePreview('');
    setEditingBranch(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Kelola Cabang</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Tambah Cabang
        </button>
      </div>

      <div className="grid gap-4">
        {branches.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-lg">Belum ada cabang yang terdaftar</p>
          </div>
        ) : (
          branches.map((branch) => (
            <div key={branch.id} className="bg-white rounded-lg shadow-md border overflow-hidden">
              {/* Image Section */}
              {branch.img && (
                <div className="w-full h-48 bg-gray-100">
                  <img 
                    src={branch.img} 
                    alt={branch.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{branch.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        branch.isActive 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {branch.isActive ? 'Aktif' : 'Nonaktif'}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-1">📍 {branch.address}</p>
                    <p className="text-gray-600 mb-1">🏙️ {branch.city}, {branch.province}</p>
                  
                  {branch.phone && (
                    <p className="text-gray-600 mb-1">📞 {branch.phone}</p>
                  )}
                  
                  {branch.mapsUrl && (
                    <a 
                      href={branch.mapsUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline inline-block mb-1"
                    >
                      🗺️ Lihat di Google Maps
                    </a>
                  )}
                  
                  {branch.openingHours && (
                    <details className="mt-2">
                      <summary className="cursor-pointer text-gray-700 font-medium">
                        🕐 Jam Operasional
                      </summary>
                      <div className="mt-2 pl-4">
                        {(() => {
                          try {
                            const hours: OpeningHours = JSON.parse(branch.openingHours);
                            return Object.entries(hours).map(([day, time]) => (
                              <div key={day} className="text-sm text-gray-600">
                                <span className="font-medium">{day}:</span>{' '}
                                {time.closed ? 'Tutup' : `${time.open} - ${time.close}`}
                              </div>
                            ));
                          } catch {
                            return <p className="text-sm text-gray-500">Format jam operasional tidak valid</p>;
                          }
                        })()}
                      </div>
                    </details>
                  )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(branch)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(branch.id, branch.name)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                {editingBranch ? 'Edit Cabang' : 'Tambah Cabang Baru'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Nama Cabang <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Contoh: Rivea Yogyakarta Malioboro"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Alamat Lengkap <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Jl. Malioboro No. 123"
                    rows={3}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Kota <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Yogyakarta"
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Provinsi <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.province}
                      onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                      placeholder="DI Yogyakarta"
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Nomor Telepon</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+62 274-123456"
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Google Maps URL</label>
                  <input
                    type="url"
                    value={formData.mapsUrl}
                    onChange={(e) => setFormData({ ...formData, mapsUrl: e.target.value })}
                    placeholder="https://maps.google.com/?q=..."
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Gambar Cabang
                  </label>
                  <div className="space-y-3">
                    {/* File Upload Input */}
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={isUploading}
                        className="block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-lg file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100
                          disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                      {isUploading && (
                        <div className="text-sm text-blue-600">Uploading...</div>
                      )}
                    </div>

                    <p className="text-xs text-gray-500">
                      Format: JPG, PNG, GIF (Max 5MB)
                    </p>

                    {/* Image Preview */}
                    {imagePreview && (
                      <div className="mt-2">
                        <p className="text-xs text-gray-500 mb-1">Preview:</p>
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-48 object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, img: '' });
                            setImagePreview('');
                          }}
                          className="mt-2 text-sm text-red-600 hover:text-red-700"
                        >
                          Hapus Gambar
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Jam Operasional (Format JSON)
                  </label>
                  <textarea
                    value={formData.openingHours}
                    onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                    rows={8}
                    className="w-full border rounded-lg px-3 py-2 font-mono text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Format: {`{"Senin": {"open": "08:00", "close": "22:00", "closed": false}}`}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label htmlFor="isActive" className="text-sm font-medium">
                    Cabang Aktif
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    {editingBranch ? 'Perbarui' : 'Tambah'} Cabang
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      resetForm();
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
