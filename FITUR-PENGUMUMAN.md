# 📢 Fitur Pengumuman - Dokumentasi

## ✅ Yang Sudah Dibuat:

### 1. **Database Schema**
File: `prisma/schema.prisma`
- Tabel `Announcement` dengan field:
  - `id` (String) - Primary key
  - `title` (String) - Judul pengumuman
  - `content` (String) - Isi pengumuman
  - `img` (String?) - Gambar opsional
  - `isActive` (Boolean) - Status tampil/tidak
  - `createdAt` (DateTime) - Tanggal dibuat
  - `updatedAt` (DateTime) - Tanggal update

### 2. **API Routes**
File: `src/app/api/announcements/route.ts`
- **GET** `/api/announcements` - Ambil semua pengumuman
- **GET** `/api/announcements?active=true` - Ambil pengumuman aktif saja
- **POST** `/api/announcements` - Buat pengumuman baru
- **PUT** `/api/announcements` - Update pengumuman
- **DELETE** `/api/announcements?id=xxx` - Hapus pengumuman

### 3. **Admin Page**
File: `src/app/admin/announcements/page.tsx`
Fitur:
- ✅ CRUD lengkap (Create, Read, Update, Delete)
- ✅ Upload gambar opsional
- ✅ Toggle active/inactive
- ✅ Search pengumuman
- ✅ Filter by status (all/active/inactive)
- ✅ Mobile responsive
- ✅ Preview gambar sebelum upload
- ✅ Edit mode dengan prefill data

### 4. **Customer Page**
File: `src/app/pengumuman/page.tsx`
Fitur:
- ✅ Menampilkan semua pengumuman yang aktif
- ✅ Design card yang modern
- ✅ Responsive untuk semua device
- ✅ Tampilkan tanggal publish
- ✅ Gambar opsional (jika ada)
- ✅ Call to action ke halaman kontak

### 5. **Navigation Updates**
- ✅ Navbar: Ditambahkan menu "PENGUMUMAN"
- ✅ Admin Sidebar: Ditambahkan "📢 Pengumuman"
- ✅ Mobile menu support

### 6. **Kontak Updates**
File: `src/components/Kontak.tsx`
- ✅ WhatsApp: +62 812-3456-7890
- ✅ Instagram: @riveacoffee
- ✅ Link ke wa.me
- ✅ Link ke Instagram
- ✅ Design card dengan icon

## 🚀 Cara Menggunakan:

### **Untuk Admin:**

1. **Login ke Admin Panel**
   ```
   http://localhost:3000/admin
   ```

2. **Masuk ke Menu Pengumuman**
   - Klik "📢 Pengumuman" di sidebar

3. **Membuat Pengumuman Baru:**
   - Isi "Judul Pengumuman" (wajib)
   - Isi "Konten Pengumuman" (wajib)
   - Upload gambar (opsional)
   - Centang "Active" jika ingin langsung tampil
   - Klik "Buat Pengumuman"

4. **Edit Pengumuman:**
   - Klik tombol "Edit" pada pengumuman yang ingin diubah
   - Form akan terisi otomatis
   - Edit sesuai kebutuhan
   - Klik "Update"

5. **Toggle Active/Inactive:**
   - Klik tombol "Nonaktifkan" untuk menyembunyikan dari customer
   - Klik tombol "Aktifkan" untuk menampilkan kembali

6. **Hapus Pengumuman:**
   - Klik tombol "Delete"
   - Konfirmasi penghapusan

### **Untuk Customer:**

1. **Lihat Pengumuman**
   ```
   http://localhost:3000/pengumuman
   ```

2. Customer hanya melihat pengumuman yang **Active**
3. Pengumuman ditampilkan dari yang terbaru

## 📝 Update Nomor Kontak:

Untuk mengganti nomor WA dan Instagram, edit file:
`src/components/Kontak.tsx`

```tsx
// Ganti nomor WhatsApp
href="https://wa.me/6281234567890"  // Ganti dengan nomor Anda
<div className="text-sm text-green-600">+62 812-3456-7890</div>

// Ganti username Instagram
href="https://instagram.com/riveacoffee"  // Ganti dengan username Anda
<div className="text-sm text-pink-600">@riveacoffee</div>
```

## 🎨 Contoh Penggunaan:

### **Contoh Pengumuman 1: Promo**
```
Judul: 🎉 Promo Beli 2 Gratis 1!
Konten: 
Dapatkan promo spesial minggu ini!
Beli 2 kopi ukuran large, gratis 1 kopi ukuran regular.

Periode: 15-20 Oktober 2025
Berlaku di semua cabang Rivea Coffee.

Syarat & ketentuan berlaku.
Gambar: [Upload gambar promo]
Active: ✅
```

### **Contoh Pengumuman 2: Update Jam Buka**
```
Judul: Update Jam Operasional
Konten:
Mulai tanggal 20 Oktober 2025, kami akan buka lebih awal!

Jam baru:
- Senin-Jumat: 07.00 - 22.00
- Sabtu-Minggu: 08.00 - 23.00

Terima kasih atas dukungan Anda! ☕
Gambar: [Tidak perlu]
Active: ✅
```

### **Contoh Pengumuman 3: Pembukaan Cabang Baru**
```
Judul: 🏪 Cabang Baru di Bali!
Konten:
Kami dengan senang hati mengumumkan pembukaan cabang baru Rivea Coffee di Bali!

Lokasi: Jl. Sunset Road No. 123, Kuta
Grand Opening: 1 November 2025

Dapatkan diskon 30% untuk 100 pembeli pertama!

#RiveaBali #NewBranch
Gambar: [Upload foto cabang baru]
Active: ✅
```

## 🔧 Troubleshooting:

### **Error: Property 'announcement' does not exist**
- Sudah di-fix dengan prisma migrate
- Jika masih error, jalankan:
  ```bash
  npx prisma generate
  ```

### **Data tidak muncul di customer page**
- Pastikan pengumuman status "Active"
- Check di admin panel apakah isActive = true

### **Gambar tidak muncul**
- Pastikan file gambar sudah ter-upload dengan benar
- Check console browser untuk error
- Gambar disimpan sebagai base64 di database

## 📱 Mobile Responsive:

✅ Semua halaman sudah responsive:
- Admin Announcements: Grid auto-adjust
- Customer Page: Card full-width di mobile
- Form: Stack vertical di mobile
- Image: Auto resize

## 🎯 Next Steps (Opsional):

1. **Rich Text Editor** - Untuk format text lebih lengkap
2. **Push Notifications** - Notif saat ada pengumuman baru
3. **Kategori Pengumuman** - Misalnya: Promo, Info, Event
4. **Scheduled Posts** - Pengumuman dijadwalkan publish otomatis
5. **View Counter** - Hitung berapa kali pengumuman dilihat

---

**Status:** ✅ READY TO USE
**Database:** ✅ Migrated
**API:** ✅ Working
**Admin Page:** ✅ Complete with CRUD
**Customer Page:** ✅ Complete
**Navigation:** ✅ Updated
