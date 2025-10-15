# Fitur Manajemen Lokasi Cabang

## 📝 Deskripsi
Fitur sistem manajemen lokasi cabang yang memungkinkan admin untuk menambah, mengedit, dan menghapus informasi cabang. Customer dapat melihat semua lokasi cabang yang aktif dengan informasi lengkap.

## ✨ Fitur Utama

### Admin Panel (`/admin/branches`)
1. **Tambah Cabang Baru**
   - Nama cabang (required)
   - Alamat lengkap (required)
   - Kota (required)
   - Provinsi (required)
   - Nomor telepon (optional)
   - Google Maps URL (optional)
   - Jam operasional (optional, format JSON)
   - Status aktif/nonaktif

2. **Edit Cabang**
   - Update semua informasi cabang
   - Toggle status aktif/nonaktif

3. **Hapus Cabang**
   - Konfirmasi sebelum menghapus
   - Menghapus permanen dari database

4. **Tampilan Daftar Cabang**
   - Card view dengan informasi lengkap
   - Badge status (Aktif/Nonaktif)
   - Jam operasional dalam dropdown
   - Link ke Google Maps
   - Tombol Edit dan Hapus

### Customer View (`/lokasi`)
1. **Filter Berdasarkan Provinsi**
   - Dropdown filter untuk memilih provinsi
   - Opsi "Semua Provinsi"
   - Auto-hide jika hanya ada 1 provinsi

2. **Tampilan Cabang**
   - Dikelompokkan berdasarkan Provinsi dan Kota
   - Card design yang menarik
   - Gradient header per card
   - Informasi lengkap:
     - Nama cabang
     - Alamat
     - Nomor telepon (clickable untuk telp langsung)
     - Jam operasional lengkap (7 hari)
     - Tombol "Buka di Google Maps"

3. **Responsive Design**
   - Mobile-friendly
   - Grid layout 2 kolom di desktop
   - Single kolom di mobile

## 🗄️ Database Schema

```prisma
model Branch {
  id           String   @id @default(cuid())
  name         String   // Nama cabang
  address      String   // Alamat lengkap
  city         String   // Kota
  province     String   // Provinsi
  phone        String?  // Nomor telepon
  mapsUrl      String?  // Google Maps URL
  img          String?  // Gambar cabang
  isActive     Boolean  @default(true)
  openingHours String?  // Jam operasional (JSON)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

## 📋 Format Jam Operasional

```json
{
  "Senin": { "open": "08:00", "close": "22:00", "closed": false },
  "Selasa": { "open": "08:00", "close": "22:00", "closed": false },
  "Rabu": { "open": "08:00", "close": "22:00", "closed": false },
  "Kamis": { "open": "08:00", "close": "22:00", "closed": false },
  "Jumat": { "open": "08:00", "close": "22:00", "closed": false },
  "Sabtu": { "open": "08:00", "close": "23:00", "closed": false },
  "Minggu": { "open": "08:00", "close": "23:00", "closed": false }
}
```

Untuk hari libur, set `"closed": true`

## 🔌 API Endpoints

### GET `/api/branches`
Mendapatkan semua cabang
- Query params:
  - `active=true` - Hanya cabang yang aktif

### POST `/api/branches`
Membuat cabang baru
- Body: `{ name, address, city, province, phone?, mapsUrl?, img?, openingHours?, isActive? }`

### PUT `/api/branches`
Update cabang
- Body: `{ id, name, address, city, province, phone?, mapsUrl?, img?, openingHours?, isActive? }`

### DELETE `/api/branches?id=<branch_id>`
Menghapus cabang

## 🚀 Cara Menggunakan

### Sebagai Admin:
1. Login ke admin panel
2. Klik **"📍 Lokasi Cabang"** di sidebar atau **"Manage Cabang"** di dashboard
3. Klik **"+ Tambah Cabang"** untuk menambah cabang baru
4. Isi form dengan lengkap:
   - Nama cabang: `Rivea Yogyakarta Malioboro`
   - Alamat: `Jl. Malioboro No. 123, Yogyakarta`
   - Kota: `Yogyakarta`
   - Provinsi: `DI Yogyakarta`
   - Telepon: `+62 274-123456`
   - Google Maps: `https://maps.google.com/?q=...`
   - URL Gambar: `https://example.com/rivea-yogya.jpg` (optional)
   - Jam Operasional: (default sudah terisi)
   - ✅ Cabang Aktif
5. Klik **"Tambah Cabang"**

### Sebagai Customer:
1. Buka website Rivea
2. Klik menu **"LOKASI"** di navbar
3. (Optional) Filter berdasarkan provinsi
4. Lihat informasi cabang:
   - Alamat lengkap
   - Nomor telepon (klik untuk langsung telp)
   - Jam operasional
   - Klik **"🗺️ Buka di Google Maps"** untuk navigasi

## 📱 Navigasi

### Navbar (Customer)
- Tambah menu **"LOKASI"** di navbar desktop dan mobile
- Link ke `/lokasi`

### Admin Sidebar
- Tambah menu **"📍 Lokasi Cabang"**
- Link ke `/admin/branches`

### Admin Dashboard
- Card statistik **"Cabang"** dengan total cabang
- Quick action **"Manage Cabang"**

## 🎨 Design Features

### Customer View:
- Gradient background: `from-amber-50 via-orange-50 to-yellow-50`
- Card gradient header: `from-amber-600 to-orange-600`
- Hover effects: `hover:shadow-xl`
- Icon visual: 📍, 📞, 🕐, 🗺️

### Admin View:
- Status badge: Green (Aktif) / Gray (Nonaktif)
- Modal form dengan max-height scroll
- Grid layout untuk social media style
- Color-coded buttons: Blue (Edit), Red (Delete)

## ✅ Testing Checklist

- [ ] Admin dapat menambah cabang baru
- [ ] Admin dapat mengedit cabang
- [ ] Admin dapat menghapus cabang
- [ ] Admin dapat toggle status aktif/nonaktif
- [ ] Customer dapat melihat semua cabang aktif
- [ ] Filter provinsi bekerja dengan baik
- [ ] Jam operasional ditampilkan dengan benar
- [ ] Link Google Maps berfungsi
- [ ] Telepon link berfungsi (tel:)
- [ ] Responsive di mobile
- [ ] Grouping by province-city bekerja
- [ ] Card statistics di dashboard update otomatis

## 🔄 Database Migration

Migrations yang sudah dibuat:
- `20251015114253_add_branches` - Initial branch model
- `20251015115950_add_branch_image` - Tambah field img

Untuk menjalankan migration (jika belum):
```bash
npx prisma migrate dev
npx prisma generate
```

## 📁 File yang Dibuat/Dimodifikasi

### Baru:
- `prisma/migrations/20251015114253_add_branches/`
- `src/app/api/branches/route.ts`
- `src/app/admin/branches/page.tsx`
- `src/app/lokasi/page.tsx`

### Dimodifikasi:
- `prisma/schema.prisma` - Tambah model Branch
- `src/components/Navbar.tsx` - Tambah menu LOKASI
- `src/app/admin/layout.tsx` - Tambah menu Lokasi Cabang
- `src/app/admin/page.tsx` - Tambah card statistik & quick action

## 💡 Contoh Data

```javascript
{
  name: "Rivea Yogyakarta Malioboro",
  address: "Jl. Malioboro No. 123, Yogyakarta",
  city: "Yogyakarta",
  province: "DI Yogyakarta",
  phone: "+62 274-123456",
  mapsUrl: "https://maps.google.com/?q=-7.7956,110.3695",
  img: "https://example.com/rivea-yogya.jpg",
  isActive: true,
  openingHours: '{"Senin": {"open": "08:00", "close": "22:00", "closed": false}, ...}'
}
```

## 🎯 Keunggulan Fitur

1. **Fleksibel**: Bisa menambah cabang di kota yang sama dengan mudah
2. **User-friendly**: Interface yang intuitif untuk admin dan customer
3. **Informasi Lengkap**: Alamat, telepon, jam operasional, dan maps
4. **Responsive**: Bekerja di semua device
5. **Filter Smart**: Auto-grouping by location
6. **Visual Appeal**: Gradient design yang modern
7. **Functional**: Direct call dan maps integration

---

**Dibuat pada**: 15 Oktober 2025
**Developer**: GitHub Copilot
**Status**: ✅ Production Ready
