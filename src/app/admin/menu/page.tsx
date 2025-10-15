"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCategories } from '@/hooks/useCategories';

type Item = { id: string; name: string; price?: string; desc?: string; img?: string; ingredients?: string; steps?: string; categoryId?: string };
type Category = { id: string; title: string; items: Item[] };

export default function AdminMenuPage() {
  const router = useRouter();
  const { categories, isLoading, mutate } = useCategories();
  const [uploading, setUploading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [form, setForm] = useState<any>({ 
    name: '', 
    price: '', 
    desc: '', 
    img: '', 
    ingredients: [''], // Array of ingredients
    steps: [''], // Array of steps
    categoryId: '',
    categoryTitle: '',
    useExisting: 'true' // 'true' = use existing, 'false' = create new
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [editCategoryId, setEditCategoryId] = useState<string | null>(null);
  const [editCategoryTitle, setEditCategoryTitle] = useState<string>('');

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async function uploadImage(file: File): Promise<string> {
    // Convert file to base64 with resize to prevent large images
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          // Max width and height untuk menu items
          const MAX_WIDTH = 800;
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
            
            // Convert to base64 with compression (0.85 quality for menu items)
            const resizedBase64 = canvas.toDataURL('image/jpeg', 0.85);
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

  function formatPriceInput(value: string): string {
    // Remove non-numeric characters except comma and dot
    const numStr = value.replace(/[^\d]/g, '');
    if (!numStr) return '';
    
    // Format with thousand separator
    return new Intl.NumberFormat('id-ID').format(parseInt(numStr));
  }

  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatPriceInput(e.target.value);
    setForm({ ...form, price: formatted });
  }

  function addIngredient() {
    setForm({ ...form, ingredients: [...form.ingredients, ''] });
  }

  function removeIngredient(index: number) {
    const newIngredients = form.ingredients.filter((_: any, i: number) => i !== index);
    setForm({ ...form, ingredients: newIngredients });
  }

  function updateIngredient(index: number, value: string) {
    const newIngredients = [...form.ingredients];
    newIngredients[index] = value;
    setForm({ ...form, ingredients: newIngredients });
  }

  function addStep() {
    setForm({ ...form, steps: [...form.steps, ''] });
  }

  function removeStep(index: number) {
    const newSteps = form.steps.filter((_: any, i: number) => i !== index);
    setForm({ ...form, steps: newSteps });
  }

  function updateStep(index: number, value: string) {
    const newSteps = [...form.steps];
    newSteps[index] = value;
    setForm({ ...form, steps: newSteps });
  }

  async function createItem(e: any) {
    e.preventDefault();
    setUploading(true);

    try {
      let imgPath = form.img;
      
      // Upload image if file is selected
      if (imageFile) {
        imgPath = await uploadImage(imageFile);
      }

      // Filter out empty ingredients and steps, convert to JSON string
      const ingredientsFiltered = form.ingredients.filter((s: string) => s.trim() !== '');
      const ingredientsJson = ingredientsFiltered.length > 0 ? JSON.stringify(ingredientsFiltered) : null;

      const stepsFiltered = form.steps.filter((s: string) => s.trim() !== '');
      const stepsJson = stepsFiltered.length > 0 ? JSON.stringify(stepsFiltered) : null;

      const payload: any = {
        name: form.name,
        price: form.price,
        desc: form.desc,
        img: imgPath,
        ingredients: ingredientsJson,
        steps: stepsJson,
        ...(form.useExisting === 'true' 
          ? { categoryId: form.categoryId }
          : { categoryTitle: form.categoryTitle }
        )
      };

      const method = editMode ? 'PUT' : 'POST';
      if (editMode) {
        payload.id = editingId;
      }

      await fetch('/api/menu', { 
        method, 
        body: JSON.stringify(payload), 
        headers: { 'Content-Type': 'application/json' } 
      });
      
      resetForm();
      mutate(); // Revalidate cache
    } catch (error) {
      console.error('Failed to save item:', error);
      alert('Failed to save item');
    } finally {
      setUploading(false);
    }
  }

  function resetForm() {
    setForm({ 
      name: '', 
      price: '', 
      desc: '', 
      img: '', 
      ingredients: [''],
      steps: [''],
      categoryId: '',
      categoryTitle: '',
      useExisting: 'true'
    });
    setImageFile(null);
    setImagePreview('');
    setEditMode(false);
    setEditingId(null);
  }

  function startEdit(item: Item) {
    setEditMode(true);
    setEditingId(item.id);
    
    // Parse ingredients from JSON string
    let ingredientsArray = [''];
    if (item.ingredients) {
      try {
        ingredientsArray = JSON.parse(item.ingredients);
      } catch (e) {
        ingredientsArray = [''];
      }
    }
    
    // Parse steps from JSON string
    let stepsArray = [''];
    if (item.steps) {
      try {
        stepsArray = JSON.parse(item.steps);
      } catch (e) {
        stepsArray = [''];
      }
    }
    
    setForm({
      name: item.name,
      price: item.price || '',
      desc: item.desc || '',
      img: item.img || '',
      ingredients: ingredientsArray,
      steps: stepsArray,
      categoryId: item.categoryId || '',
      categoryTitle: '',
      useExisting: 'true'
    });
    setImagePreview(item.img || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function deleteItem(id: string) {
    if (!confirm('Are you sure you want to delete this item?')) return;
    await fetch('/api/menu?id=' + encodeURIComponent(id), { method: 'DELETE' });
    mutate(); // Revalidate cache
  }

  async function updateCategory(catId: string) {
    if (!editCategoryTitle.trim()) {
      alert('Category title cannot be empty');
      return;
    }
    
    try {
      await fetch('/api/categories', {
        method: 'PUT',
        body: JSON.stringify({ id: catId, title: editCategoryTitle }),
        headers: { 'Content-Type': 'application/json' }
      });
      setEditCategoryId(null);
      setEditCategoryTitle('');
      mutate(); // Revalidate cache
    } catch (error) {
      console.error('Failed to update category:', error);
      alert('Failed to update category');
    }
  }

  async function deleteCategory(catId: string) {
    if (!confirm('Are you sure you want to delete this category and all its items?')) return;
    
    try {
      await fetch('/api/categories?id=' + encodeURIComponent(catId), { method: 'DELETE' });
      mutate(); // Revalidate cache
    } catch (error) {
      console.error('Failed to delete category:', error);
      alert('Failed to delete category');
    }
  }

  // Filter items based on search
  const filteredCats = categories ? categories.map((cat: Category) => ({
    ...cat,
    items: cat.items.filter((item: Item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter((cat: Category) => searchQuery === '' || cat.items.length > 0) : [];

  return (
    <div className="p-3 sm:p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold">Menu Management (CRUD)</h2>
        <button
          onClick={() => router.push('/admin/menu/view')}
          className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm sm:text-base whitespace-nowrap"
        >
          📖 Lihat Menu & Resep
        </button>
      </div>

      <form onSubmit={createItem} className="bg-white p-3 sm:p-4 rounded shadow mb-6 space-y-4">
        {editMode && (
          <div className="bg-blue-50 border border-blue-200 rounded p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <span className="text-blue-700 font-medium text-sm sm:text-base">✏️ Edit Mode: Updating item</span>
            <button 
              type="button"
              onClick={resetForm}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Cancel Edit
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Item Name *</label>
            <input 
              required 
              placeholder="e.g., Cappuccino, Espresso, Latte" 
              value={form.name} 
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2 border rounded text-sm sm:text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price (Rupiah)</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-500 text-sm sm:text-base">Rp</span>
              <input 
                type="text"
                placeholder="25.000" 
                value={form.price} 
                onChange={handlePriceChange}
                className="w-full px-3 py-2 pl-10 border rounded text-sm sm:text-base"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Format otomatis: 25000 → 25.000</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea 
            placeholder="Describe the item..." 
            value={form.desc} 
            onChange={e => setForm({ ...form, desc: e.target.value })}
            className="w-full px-3 py-2 border rounded text-sm sm:text-base"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">🧾 Bahan-bahan</label>
          <div className="space-y-2">
            {form.ingredients.map((ingredient: string, index: number) => (
              <div key={index} className="flex gap-2 items-start">
                <span className="px-2 sm:px-3 py-2 bg-green-100 text-green-700 font-medium rounded min-w-[32px] sm:min-w-[40px] text-center text-xs sm:text-sm">
                  {index + 1}
                </span>
                <input
                  type="text"
                  placeholder={`Bahan ${index + 1}: e.g., 20g Espresso Shot`}
                  value={ingredient}
                  onChange={(e) => updateIngredient(index, e.target.value)}
                  className="flex-1 px-2 sm:px-3 py-2 border rounded text-xs sm:text-sm"
                />
                {form.ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="px-2 sm:px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-xs sm:text-sm shrink-0"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addIngredient}
              className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-xs sm:text-sm"
            >
              + Tambah Bahan
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">Daftar bahan-bahan yang dibutuhkan untuk membuat menu ini</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">📝 Langkah-langkah Pembuatan</label>
          <div className="space-y-2">
            {form.steps.map((step: string, index: number) => (
              <div key={index} className="flex gap-2 items-start">
                <span className="px-2 sm:px-3 py-2 bg-amber-100 text-amber-700 font-medium rounded min-w-[32px] sm:min-w-[40px] text-center text-xs sm:text-sm">
                  {index + 1}
                </span>
                <textarea
                  placeholder={`Langkah ${index + 1}: e.g., Panaskan air 90°C`}
                  value={step}
                  onChange={(e) => updateStep(index, e.target.value)}
                  className="flex-1 px-2 sm:px-3 py-2 border rounded text-xs sm:text-sm"
                  rows={2}
                />
                {form.steps.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeStep(index)}
                    className="px-2 sm:px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-xs sm:text-sm shrink-0"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addStep}
              className="w-full sm:w-auto px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 text-xs sm:text-sm"
            >
              + Tambah Langkah
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">Urutan langkah-langkah pembuatan/penyajian menu ini</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-2">
            <label className="flex items-center text-xs sm:text-sm">
              <input 
                type="radio" 
                name="categoryOption"
                checked={form.useExisting === 'true'}
                onChange={() => setForm({ ...form, useExisting: 'true', categoryTitle: '' })}
                className="mr-2"
              />
              Use Existing Category
            </label>
            <label className="flex items-center text-xs sm:text-sm">
              <input 
                type="radio" 
                name="categoryOption"
                checked={form.useExisting === 'false'}
                onChange={() => setForm({ ...form, useExisting: 'false', categoryId: '' })}
                className="mr-2"
              />
              Create New Category
            </label>
          </div>

          {form.useExisting === 'true' ? (
            <select 
              required
              value={form.categoryId}
              onChange={e => setForm({ ...form, categoryId: e.target.value })}
              className="w-full px-3 py-2 border rounded text-sm sm:text-base"
            >
              <option value="">-- Select Category --</option>
              {categories && categories.map((cat: Category) => (
                <option key={cat.id} value={cat.id}>{cat.title}</option>
              ))}
            </select>
          ) : (
            <input 
              required
              placeholder="New category name (e.g., Coffee, Snacks)" 
              value={form.categoryTitle} 
              onChange={e => setForm({ ...form, categoryTitle: e.target.value })}
              className="w-full px-3 py-2 border rounded text-sm sm:text-base"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <input 
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border rounded text-sm"
          />
          {imagePreview && (
            <div className="mt-2">
              <img src={imagePreview} alt="Preview" className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded" />
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button 
            type="submit"
            disabled={uploading || isLoading}
            className="w-full sm:w-auto px-6 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 disabled:bg-gray-400 text-sm sm:text-base"
          >
            {uploading ? 'Uploading...' : editMode ? 'Update Item' : 'Create Item'}
          </button>
          {editMode && (
            <button 
              type="button"
              onClick={resetForm}
              className="w-full sm:w-auto px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 text-sm sm:text-base"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Search Bar */}
      <div className="bg-white p-3 sm:p-4 rounded shadow mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="🔍 Cari menu untuk edit/delete..."
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
        {searchQuery && (
          <p className="text-xs sm:text-sm text-gray-600 mt-2">
            Ditemukan: {filteredCats.reduce((acc: number, cat: Category) => acc + cat.items.length, 0)} menu
          </p>
        )}
      </div>

      {isLoading ? <div className="text-center py-4">Loading...</div> : (
        <div className="space-y-4">
          {!categories || categories.length === 0 ? (
            <div className="bg-white p-4 sm:p-6 rounded shadow text-center text-gray-500 text-sm sm:text-base">
              No categories yet. Create your first menu item with a new category!
            </div>
          ) : filteredCats.length === 0 ? (
            <div className="bg-white p-4 sm:p-6 rounded shadow text-center text-gray-500 text-sm sm:text-base">
              Tidak ada menu yang cocok dengan pencarian "{searchQuery}"
            </div>
          ) : (
            filteredCats.map((c: Category) => (
              <div key={c.id} className="bg-white p-3 sm:p-4 rounded shadow">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3">
                  {editCategoryId === c.id ? (
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full">
                      <input 
                        type="text"
                        value={editCategoryTitle}
                        onChange={e => setEditCategoryTitle(e.target.value)}
                        className="px-3 py-1 border rounded flex-1 text-sm sm:text-base"
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <button 
                          onClick={() => updateCategory(c.id)}
                          className="flex-1 sm:flex-none px-3 py-1 bg-green-500 text-white rounded text-xs sm:text-sm hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button 
                          onClick={() => {
                            setEditCategoryId(null);
                            setEditCategoryTitle('');
                          }}
                          className="flex-1 sm:flex-none px-3 py-1 bg-gray-400 text-white rounded text-xs sm:text-sm hover:bg-gray-500"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-bold text-base sm:text-lg text-amber-700">
                        {c.title} <span className="text-xs sm:text-sm text-gray-500">({c.items.length} items)</span>
                      </h3>
                      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                        <button 
                          onClick={() => {
                            setEditCategoryId(c.id);
                            setEditCategoryTitle(c.title);
                          }}
                          className="px-3 py-1 text-xs sm:text-sm bg-blue-500 text-white rounded hover:bg-blue-600 whitespace-nowrap"
                        >
                          Edit Category
                        </button>
                        <button 
                          onClick={() => deleteCategory(c.id)}
                          className="px-3 py-1 text-xs sm:text-sm bg-red-500 text-white rounded hover:bg-red-600 whitespace-nowrap"
                        >
                          Delete Category
                        </button>
                      </div>
                    </>
                  )}
                </div>
                {c.items.length === 0 ? (
                  <p className="text-xs sm:text-sm text-gray-400 mt-2">No items in this category yet.</p>
                ) : (
                  <ul className="mt-2 space-y-3">
                    {c.items.map((it: Item) => (
                      <li key={it.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 py-3 border-b last:border-b-0">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          {it.img && (
                            <img 
                              src={it.img} 
                              alt={it.name} 
                              className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded shrink-0"
                            />
                          )}
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-sm sm:text-base truncate">{it.name}</div>
                            <div className="text-xs sm:text-sm text-gray-500">Rp {it.price}</div>
                            {it.desc && <div className="text-xs text-gray-400 line-clamp-2">{it.desc}</div>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <button 
                            onClick={() => startEdit(it)}
                            className="flex-1 sm:flex-none px-2 sm:px-3 py-1 text-xs sm:text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => deleteItem(it.id)} 
                            className="flex-1 sm:flex-none px-2 sm:px-3 py-1 text-xs sm:text-sm bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
