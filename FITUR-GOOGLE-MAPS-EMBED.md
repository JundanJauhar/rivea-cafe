# Fitur Google Maps Embed dan Link

## 📍 Deskripsi Fitur
Fitur ini memungkinkan pengguna untuk:
1. **Melihat lokasi cabang di peta** - melalui Google Maps embed dalam modal
2. **Membuka Google Maps langsung** - klik tombol untuk membuka aplikasi/website Google Maps

## 🎯 Implementasi

### 1. Google Maps Embed
- Modal menampilkan peta interaktif menggunakan iframe Google Maps
- Fungsi `getEmbedUrl()` mengkonversi berbagai format URL Google Maps menjadi embed URL
- Mendukung format URL:
  - Koordinat langsung: `https://maps.google.com/?q=-7.123,110.456`
  - URL dengan koordinat: `https://www.google.com/maps/@-7.123,110.456,15z`
  - URL place: `https://www.google.com/maps/place/Nama+Tempat`

### 2. Link Langsung ke Google Maps
- Tombol "Buka di Google Maps" membuka aplikasi Google Maps
- Fungsi `getDirectMapsLink()` memastikan URL yang valid untuk membuka Google Maps
- Akan membuka di:
  - **Mobile**: Aplikasi Google Maps (jika terinstal)
  - **Desktop**: Website Google Maps di tab baru

## 🔧 Fungsi Utama

### getEmbedUrl(mapsUrl: string)
```typescript
// Mengkonversi URL Google Maps menjadi embed URL
// Input: URL Google Maps dalam berbagai format
// Output: URL embed yang siap digunakan di iframe
```

### getDirectMapsLink(branch: Branch)
```typescript
// Membuat link langsung ke Google Maps
// Input: Data cabang
// Output: URL yang membuka Google Maps dengan lokasi cabang
```

## 📱 User Experience

### Di Kartu Cabang:
1. **Tombol "🗺️ Lihat Peta"** (Hijau)
   - Membuka modal dengan Google Maps embed
   - Peta interaktif dapat di-zoom dan di-pan

2. **Tombol "📍 Buka di Google Maps"** (Biru)
   - Membuka Google Maps di tab/aplikasi baru
   - Langsung menampilkan lokasi cabang

### Di Modal Peta:
- Header: Nama cabang dan alamat
- Body: Google Maps embed interaktif
- Footer: 
  - Tombol "Buka di Google Maps" - buka aplikasi
  - Tombol "Tutup" - tutup modal

## 🎨 Styling
- Shadow effect pada tombol untuk depth
- Hover effect yang smooth
- Responsive design untuk mobile dan desktop
- Gradient background untuk visual appeal

## 💡 Tips Penggunaan

### Untuk Admin (Input Data):
Saat menambahkan cabang baru, `mapsUrl` bisa berupa:
1. **URL lengkap Google Maps**: 
   ```
   https://www.google.com/maps/place/Nama+Tempat/@-7.123,110.456,15z
   ```

2. **URL singkat Google Maps**:
   ```
   https://goo.gl/maps/xxxxx
   ```

3. **Koordinat langsung**:
   ```
   -7.123456,110.456789
   ```

### Cara Mendapatkan URL Google Maps:
1. Buka Google Maps
2. Cari lokasi cabang
3. Klik tombol "Share" atau "Bagikan"
4. Copy link yang diberikan
5. Paste ke field `mapsUrl` saat menambah cabang

## 🔄 Format Data di Database

```typescript
model Branch {
  id          String   @id @default(cuid())
  name        String   // "Rivea Yogyakarta Malioboro"
  address     String   // "Jl. Malioboro No. 123"
  city        String   // "Yogyakarta"
  province    String   // "DI Yogyakarta"
  mapsUrl     String?  // URL Google Maps
  // ... fields lainnya
}
```

## ✅ Keuntungan Implementasi Ini

1. **Fleksibel**: Mendukung berbagai format URL Google Maps
2. **User-friendly**: Mudah digunakan untuk pengunjung
3. **Mobile-friendly**: Otomatis membuka aplikasi Google Maps di mobile
4. **SEO-friendly**: Link langsung ke Google Maps meningkatkan visibilitas
5. **Interaktif**: Pengguna bisa explore peta langsung di website

## 🚀 Pengembangan Selanjutnya (Opsional)

1. **Directions API**: Tambah fitur "Petunjuk Arah" dari lokasi user
2. **Multiple Markers**: Tampilkan semua cabang dalam satu peta
3. **Street View**: Tambahkan preview Street View
4. **Distance Calculator**: Hitung jarak dari lokasi user ke cabang
5. **Nearby Places**: Tampilkan landmark terdekat dari cabang

## 📝 File yang Dimodifikasi

- `src/app/lokasi/page.tsx` - Komponen utama halaman lokasi dengan fitur Google Maps
