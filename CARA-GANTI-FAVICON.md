# 🎨 Cara Mengganti Icon Web (Favicon)

## ✅ Yang Sudah Dilakukan:
1. ✅ Menambahkan konfigurasi icon di `src/app/layout.tsx`
2. ✅ Membuat dynamic icon di `src/app/icon.tsx`

## 📍 Cara Mengganti Icon Web:

### **Metode 1: Menggunakan File Gambar Sederhana**

1. **Siapkan file icon Anda dengan format:**
   - **favicon.ico** (16x16 atau 32x32 pixels) - RECOMMENDED
   - **icon.png** (32x32 atau 512x512 pixels)
   - **apple-icon.png** (180x180 pixels untuk iOS)

2. **Simpan file di folder `public`:**
   ```
   my-app/
   └── public/
       ├── favicon.ico     ← Letakkan di sini
       ├── icon.png        ← Atau di sini
       └── apple-icon.png  ← Untuk iOS
   ```

3. **Next.js akan otomatis mendeteksi file-file ini!**

### **Metode 2: Menggunakan Logo yang Sudah Ada**

Sudah dikonfigurasi di `layout.tsx` untuk menggunakan `logo-cafe-rivea.png`

Jika ingin menggunakan logo lain:
```tsx
export const metadata: Metadata = {
  icons: {
    icon: '/nama-file-anda.png',
    apple: '/nama-file-anda.png',
  },
};
```

### **Metode 3: Dynamic Icon (Sudah Dibuat)**

File `src/app/icon.tsx` sudah dibuat dengan huruf "R" (Rivea).

Untuk customize:
1. Buka file `src/app/icon.tsx`
2. Ubah:
   - `background: '#78350f'` → Warna background
   - `color: '#fef3c7'` → Warna text
   - `R` → Text atau emoji yang ingin ditampilkan

## 🎯 Rekomendasi Terbaik:

1. **Buat file `favicon.ico`** (ukuran 32x32 pixels)
2. **Simpan di folder `public/favicon.ico`**
3. **Restart development server**

## 🔧 Tools Online untuk Membuat Favicon:

- **Favicon.io** - https://favicon.io/
  - Convert PNG to ICO
  - Generate dari text
  - Generate dari emoji ☕

- **RealFaviconGenerator** - https://realfavicongenerator.net/
  - Generate semua ukuran sekaligus
  - Support semua platform (iOS, Android, Windows)

## 📱 Format Icon yang Dibutuhkan:

```
favicon.ico        → 32x32 atau 16x16 (untuk browser)
icon.png          → 32x32 (fallback)
apple-icon.png    → 180x180 (untuk iOS/Safari)
icon-192.png      → 192x192 (untuk Android)
icon-512.png      → 512x512 (untuk Android)
```

## 🚀 Setelah Mengganti Icon:

1. **Hapus cache browser:**
   - Chrome: Ctrl + Shift + Delete
   - Firefox: Ctrl + Shift + Delete
   - Safari: Cmd + Option + E

2. **Restart development server:**
   ```bash
   npm run dev
   ```

3. **Hard reload di browser:**
   - Windows: Ctrl + F5
   - Mac: Cmd + Shift + R

## 💡 Tips:

- Gunakan gambar **square** (persegi) untuk hasil terbaik
- Ukuran minimal **32x32 pixels**
- Format **ICO lebih baik** dari PNG untuk compatibility
- Gunakan **warna kontras** agar terlihat di tab browser
- Jika menggunakan logo kopi ☕, pastikan **jelas saat diperkecil**

## 🎨 Contoh Icon Kopi yang Bagus:

```
☕ (Emoji kopi)
🏪 (Emoji toko)
🍵 (Emoji teh/kopi)
```

Atau gunakan logo Rivea Coffee yang sudah ada di `public/logo-cafe-rivea.png`

---

**Current Setup:**
- ✅ Default icon: Huruf "R" dengan background coklat
- ✅ Apple icon: logo-cafe-rivea.png
- ✅ Ready to use!
