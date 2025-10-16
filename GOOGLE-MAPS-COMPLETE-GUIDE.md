# 📍 Panduan Lengkap Google Maps - Rivea Cafe

## 🎯 Overview

Halaman lokasi (`/lokasi`) memiliki 2 fitur utama untuk Google Maps:

1. **🗺️ Lihat Peta** (Tombol Hijau) - Menampilkan peta dalam modal
2. **📍 Buka di Google Maps** (Tombol Biru) - Membuka aplikasi/website Google Maps

---

## 🔧 Cara Kerja Teknis

### 1. Lihat Peta (Modal dengan Embed)

**Fungsi**: `getEmbedUrl(mapsUrl: string)`

**Proses**:
```
Input: URL Google Maps dari database
  ↓
Fungsi menganalisis format URL
  ↓
Konversi ke format embed
  ↓
Tampilkan di iframe dalam modal
```

**Format URL yang Didukung**:

| Format Input | Contoh | Output Embed |
|-------------|---------|--------------|
| URL dengan koordinat | `https://www.google.com/maps/@-7.79,110.36,15z` | `https://maps.google.com/maps?q=-7.79,110.36&hl=id&z=15&output=embed` |
| URL place | `https://www.google.com/maps/place/Malioboro` | `https://maps.google.com/maps?q=Malioboro&hl=id&z=15&output=embed` |
| Koordinat langsung | `-7.792596,110.364574` | `https://maps.google.com/maps?q=-7.792596,110.364574&hl=id&z=15&output=embed` |
| URL embed | `https://maps.google.com/maps?...&output=embed` | *(Return as-is)* |

**Kode**:
```typescript
const getEmbedUrl = (mapsUrl: string) => {
  // 1. Jika sudah embed URL, return langsung
  if (mapsUrl.includes('embed')) {
    return mapsUrl;
  }

  // 2. Cek format dengan koordinat (@lat,lng)
  if (mapsUrl.includes('/@')) {
    const match = mapsUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (match) {
      return `https://maps.google.com/maps?q=${match[1]},${match[2]}&hl=id&z=15&output=embed`;
    }
  }

  // 3. Cek format place
  if (mapsUrl.includes('place/')) {
    const placeMatch = mapsUrl.match(/place\/([^/]+)/);
    if (placeMatch) {
      return `https://maps.google.com/maps?q=${encodeURIComponent(placeMatch[1])}&hl=id&z=15&output=embed`;
    }
  }

  // 4. Cek koordinat langsung
  const coordMatch = mapsUrl.match(/(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (coordMatch) {
    return `https://maps.google.com/maps?q=${coordMatch[1]},${coordMatch[2]}&hl=id&z=15&output=embed`;
  }

  // 5. Fallback: gunakan input sebagai query
  return `https://maps.google.com/maps?q=${encodeURIComponent(mapsUrl)}&hl=id&z=15&output=embed`;
};
```

---

### 2. Buka di Google Maps (Link Langsung)

**Fungsi**: `getDirectMapsLink(branch: Branch)`

**Proses**:
```
Input: Data cabang
  ↓
Cek apakah mapsUrl mengandung 'google.com/maps'
  ↓
Ya: Return URL asli
Tidak: Buat URL search dengan alamat
  ↓
Link dibuka di tab/aplikasi baru
```

**Behavior**:
- **Desktop**: Membuka Google Maps di browser tab baru
- **Mobile**: Membuka aplikasi Google Maps (jika terinstal)
- **Mobile (no app)**: Membuka Google Maps di browser mobile

**Kode**:
```typescript
const getDirectMapsLink = (branch: Branch) => {
  if (!branch.mapsUrl) return '#';
  
  // Jika URL sudah valid Google Maps, gunakan langsung
  if (branch.mapsUrl.includes('google.com/maps')) {
    return branch.mapsUrl;
  }
  
  // Jika bukan, buat search query dengan alamat
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.address)}`;
};
```

---

## 📱 User Flow

### Scenario 1: User ingin melihat peta di website
```
1. User masuk ke halaman /lokasi
2. User melihat list cabang
3. User klik tombol "🗺️ Lihat Peta" (hijau)
4. Modal terbuka dengan Google Maps embed
5. User bisa zoom, pan, explore peta
6. User klik X atau di luar modal untuk tutup
```

### Scenario 2: User ingin buka Google Maps
```
1. User masuk ke halaman /lokasi
2. User melihat list cabang
3. User klik tombol "📍 Buka di Google Maps" (biru)
4. Tab/aplikasi baru terbuka dengan Google Maps
5. Lokasi cabang langsung terlihat di Google Maps
6. User bisa gunakan fitur lengkap Google Maps (directions, street view, dll)
```

### Scenario 3: User lihat peta dulu, lalu buka Maps
```
1. User klik "🗺️ Lihat Peta" → Modal terbuka
2. User explore peta di modal
3. User klik "📍 Buka di Google Maps" di footer modal
4. Google Maps terbuka di tab/aplikasi baru
5. User bisa dapatkan petunjuk arah, save lokasi, dll
```

---

## 🎨 UI/UX Design

### Kartu Cabang
```
┌─────────────────────────────────────┐
│  [Gambar Cabang]                    │
├─────────────────────────────────────┤
│  📍 Nama Cabang                     │
│  📍 Alamat Lengkap                  │
│  📞 Nomor Telepon                   │
│  🕐 Jam Operasional                 │
│                                     │
│  ┌──────────────────────────────┐  │
│  │ 🗺️ Lihat Peta (Hijau)       │  │
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │ 📍 Buka di Google Maps (Biru)│  │
│  └──────────────────────────────┘  │
└─────────────────────────────────────┘
```

### Modal Peta
```
┌─────────────────────────────────────┐
│ Nama Cabang              [X] Close  │
│ Alamat Lengkap                      │
├─────────────────────────────────────┤
│                                     │
│    [Google Maps Embed - Interactive]│
│    (Bisa zoom, pan, dll)            │
│                                     │
├─────────────────────────────────────┤
│ [📍 Buka di Google Maps]  [Tutup]  │
└─────────────────────────────────────┘
```

---

## 🔍 Input Data di Admin Panel

### Form Cabang Baru

**Field: Google Maps URL**
```
Label: Google Maps URL
Type: text
Required: No (optional)
Placeholder: https://www.google.com/maps/place/...
```

**Cara Mendapatkan URL**:

#### Metode 1: Via Website (Recommended)
1. Buka https://www.google.com/maps
2. Search nama tempat atau alamat cabang
3. Klik marker atau card lokasi
4. Klik tombol **"Share"** atau **"Bagikan"**
5. Tab pertama akan show link
6. Klik **"Copy link"**
7. Paste ke form admin

**Contoh URL yang didapat**:
```
https://www.google.com/maps/place/Malioboro/@-7.7925964,110.3645744,15z/data=...
```
atau
```
https://goo.gl/maps/abc123xyz
```

#### Metode 2: Via Right-Click (Untuk Koordinat)
1. Buka Google Maps
2. Right-click pada lokasi yang tepat
3. Koordinat muncul di top (contoh: `-7.792596, 110.364574`)
4. Click koordinat untuk copy
5. Paste ke form admin

**Contoh**:
```
-7.792596,110.364574
```

#### Metode 3: Via Mobile App
1. Buka app Google Maps
2. Search lokasi cabang
3. Tap marker lokasi
4. Tap tombol **"Share"**
5. Pilih **"Copy link"** atau **"Salin tautan"**
6. Paste ke form admin (via PC/web)

---

## ✅ Testing Checklist

### Test di Admin Panel
- [ ] Bisa input URL Google Maps (format apapun)
- [ ] Preview URL muncul setelah input
- [ ] Link "Lihat di Google Maps" berfungsi
- [ ] Data tersimpan dengan benar
- [ ] Edit cabang mempertahankan URL

### Test di Halaman Lokasi
- [ ] Cabang dengan mapsUrl menampilkan 2 tombol
- [ ] Cabang tanpa mapsUrl tidak show tombol maps
- [ ] Klik "Lihat Peta" → modal terbuka
- [ ] Peta di modal load dengan benar
- [ ] Marker/pin di lokasi yang tepat
- [ ] Bisa zoom in/out peta
- [ ] Bisa pan/drag peta
- [ ] Klik X → modal tertutup
- [ ] Klik di luar modal → modal tertutup
- [ ] Klik "Buka di Google Maps" (kartu) → tab baru terbuka
- [ ] Klik "Buka di Google Maps" (modal) → tab baru terbuka
- [ ] URL yang terbuka benar (sesuai lokasi)

### Test di Mobile
- [ ] Tombol tampil dengan baik (responsive)
- [ ] Modal tampil full screen
- [ ] Peta embed berfungsi di mobile
- [ ] Klik "Buka di Google Maps" → buka app (jika ada)
- [ ] Touch gesture di peta berfungsi (zoom, pan)

### Test URL Formats
- [ ] URL lengkap: `https://www.google.com/maps/place/...`
- [ ] URL short: `https://goo.gl/maps/xxx`
- [ ] URL dengan @: `https://www.google.com/maps/@-7.79,110.36,15z`
- [ ] Koordinat: `-7.792596,110.364574`
- [ ] Place name: `Malioboro, Yogyakarta`

---

## 🐛 Troubleshooting

### Masalah 1: Peta tidak muncul di modal
**Gejala**: Modal terbuka tapi kosong/blank

**Penyebab Mungkin**:
- URL tidak valid
- Format URL tidak didukung
- Network issue

**Solusi**:
```javascript
// Check console browser untuk error
// Coba format URL lain:
// 1. Gunakan koordinat langsung
-7.792596,110.364574

// 2. Atau URL standar Google Maps
https://www.google.com/maps/place/Malioboro/@-7.7925964,110.3645744,15z
```

### Masalah 2: Tombol tidak muncul
**Gejala**: Cabang tidak punya tombol maps

**Penyebab**:
- Field `mapsUrl` kosong di database
- Data belum tersimpan

**Solusi**:
1. Check database: `SELECT mapsUrl FROM Branch WHERE id = '...'`
2. Pastikan ada value, bukan NULL
3. Re-edit cabang di admin panel
4. Save ulang dengan URL yang valid

### Masalah 3: Link membuka halaman error
**Gejala**: Klik "Buka di Google Maps" → 404 atau error

**Penyebab**:
- URL rusak/invalid
- Special characters tidak di-encode

**Solusi**:
1. Test URL di browser terlebih dahulu
2. Pastikan URL valid
3. Coba copy fresh URL dari Google Maps
4. Update di admin panel

### Masalah 4: Aplikasi tidak terbuka di mobile
**Gejala**: Buka browser instead of app

**Penyebab**:
- App tidak terinstal
- Browser setting

**Behavior Normal**:
- Jika app terinstal: akan prompt "Open in app?"
- Jika tidak: langsung buka di browser mobile
- Ini adalah behavior default browser/OS

---

## 🚀 Future Enhancements

### Phase 2: Directions API
```typescript
// Tambahkan tombol "Petunjuk Arah"
// Menggunakan Geolocation API untuk lokasi user
// Generate directions dari lokasi user ke cabang
```

### Phase 3: Multi-marker Map
```typescript
// Tampilkan semua cabang dalam satu peta
// Filter cabang by province/city
// Click marker untuk lihat detail cabang
```

### Phase 4: Distance Calculator
```typescript
// Hitung jarak dari user ke setiap cabang
// Sort by distance
// Show "Cabang Terdekat" badge
```

### Phase 5: Street View
```typescript
// Tambahkan tab "Street View"
// Preview suasana di sekitar cabang
// 360° view
```

---

## 📊 Analytics (Optional)

Track user interaction:
```typescript
// Event: View Map Modal
analytics.track('map_modal_opened', {
  branch_id: branch.id,
  branch_name: branch.name,
  city: branch.city
});

// Event: Open Google Maps
analytics.track('google_maps_opened', {
  branch_id: branch.id,
  source: 'card' | 'modal'
});
```

---

## 🔐 Security Notes

1. **XSS Protection**: URL di-sanitize sebelum digunakan
2. **iframe sandbox**: Embed punya limitasi security
3. **CORS**: Google Maps embed tidak perlu CORS header
4. **HTTPS Required**: Website harus HTTPS untuk embed
5. **No API Key Needed**: Public embed tidak perlu key

---

## 📝 Summary

| Fitur | Fungsi | Button Color | Target |
|-------|--------|--------------|--------|
| Lihat Peta | Modal dengan embed | 🟢 Hijau | Modal overlay |
| Buka Google Maps | Link langsung | 🔵 Biru | New tab/app |

**Keuntungan Dual-Button Approach**:
- ✅ User bisa preview cepat tanpa leave page
- ✅ User bisa akses fitur lengkap Google Maps jika perlu
- ✅ Fleksibel untuk berbagai use case
- ✅ Mobile-friendly (auto detect app)
- ✅ Desktop-friendly (new tab)

**Best Practice**:
- Selalu test URL sebelum save
- Gunakan URL fresh dari Google Maps
- Prefer URL lengkap dibanding short link
- Koordinat langsung paling reliable

---

## 💬 FAQ

**Q: Apakah perlu API key Google Maps?**
A: Tidak, untuk embed public tidak perlu API key.

**Q: Berapa limit request Google Maps embed?**
A: Tidak ada limit untuk public embed standar.

**Q: Apakah bisa custom marker/pin?**
A: Untuk embed basic tidak bisa. Perlu Google Maps JavaScript API (berbayar).

**Q: Kenapa peta kadang lambat load?**
A: Normal, tergantung koneksi internet user. Sudah ada lazy loading.

**Q: Bisa tambah multiple marker?**
A: Tidak di embed basic. Perlu upgrade ke Maps JavaScript API.

**Q: Apakah work offline?**
A: Tidak, Google Maps embed perlu internet connection.

---

**Last Updated**: October 16, 2025
**Version**: 1.0.0
**Author**: Rivea Development Team
