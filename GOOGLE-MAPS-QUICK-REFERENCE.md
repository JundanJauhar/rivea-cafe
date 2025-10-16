# 🎯 Quick Reference - Google Maps Features

## 📋 TL;DR (Too Long; Didn't Read)

### Fitur yang Sudah Diimplementasikan:
✅ **Lihat Peta** - Modal dengan Google Maps embed  
✅ **Buka Google Maps** - Link langsung ke aplikasi/website  
✅ **Auto-detect** berbagai format URL Google Maps  
✅ **Mobile-friendly** dengan app deep linking  
✅ **Responsive design** untuk semua device  

---

## 🚀 Quick Start

### 1. Tambah Cabang dengan Google Maps

**Via Admin Panel** (`/admin/branches`):

1. Click **"+ Tambah Cabang"**
2. Isi data cabang (nama, alamat, kota, provinsi)
3. Di field **"Google Maps URL"**, paste salah satu:
   ```
   https://www.google.com/maps/@-7.7925964,110.3645744,15z
   ```
   atau
   ```
   -7.7925964,110.3645744
   ```
4. Upload gambar cabang (optional)
5. Set jam operasional (optional)
6. Click **"Tambah Cabang"**

### 2. Cara Dapat URL Google Maps

**Paling Mudah**:
1. Buka https://google.com/maps
2. Search lokasi cabang
3. Click "Share" / "Bagikan"
4. Copy link
5. Paste ke admin panel

---

## 🎨 User Interface

### Di Halaman Lokasi (`/lokasi`)

```
┌───────────────────────────────────────────┐
│  [Foto Cabang]                            │
├───────────────────────────────────────────┤
│  Rivea Malioboro                          │
│  📍 Jl. Malioboro No. 60, Yogyakarta     │
│  📞 +62 274 580000                        │
│  🕐 Senin-Minggu: 08:00 - 22:00          │
│                                           │
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│  ┃ 🗺️ Lihat Peta                 ┃  │ ← Tombol Hijau
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│  ┃ 📍 Buka di Google Maps         ┃  │ ← Tombol Biru
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
└───────────────────────────────────────────┘
```

### Modal Peta
```
╔═══════════════════════════════════════════╗
║ Rivea Malioboro               [X] Close ║
║ Jl. Malioboro No. 60, Yogyakarta        ║
╠═══════════════════════════════════════════╣
║                                           ║
║    🗺️  Google Maps (Interactive)        ║
║                                           ║
║    [Bisa zoom, pan, explore]             ║
║                                           ║
╠═══════════════════════════════════════════╣
║ [📍 Buka di Google Maps]      [Tutup]   ║
╚═══════════════════════════════════════════╝
```

---

## 💡 Format URL yang Didukung

| Format | Contoh | Status |
|--------|--------|--------|
| **URL Lengkap** | `https://www.google.com/maps/place/Malioboro/@-7.79,110.36,15z` | ✅ |
| **URL dengan @** | `https://www.google.com/maps/@-7.79,110.36,15z` | ✅ |
| **Short Link** | `https://goo.gl/maps/abc123xyz` | ✅ |
| **Koordinat** | `-7.7925964,110.3645744` | ✅ |
| **Place Name** | `https://www.google.com/maps/place/Malioboro` | ✅ |

**Semua format di atas otomatis terdeteksi dan dikonversi!** 🎉

---

## 📱 Behavior per Device

### Desktop/Laptop
| Action | Result |
|--------|--------|
| Click "Lihat Peta" | Modal terbuka dengan embed |
| Click "Buka Google Maps" | Tab baru → Google Maps website |
| Zoom peta | Mouse scroll atau +/- button |
| Pan peta | Click & drag |

### Mobile (iOS/Android)
| Action | Result |
|--------|--------|
| Tap "Lihat Peta" | Full-screen modal |
| Tap "Buka Google Maps" | Prompt → Open in app? |
| Pinch gesture | Zoom in/out |
| Swipe gesture | Pan peta |
| Tap outside modal | Close modal |

---

## 🔧 Fungsi Teknis

### `getEmbedUrl(mapsUrl)`
**Input**: URL Google Maps (format apapun)  
**Output**: URL embed untuk iframe  
**Contoh**:
```javascript
Input:  "https://www.google.com/maps/@-7.79,110.36,15z"
Output: "https://maps.google.com/maps?q=-7.79,110.36&hl=id&z=15&output=embed"
```

### `getDirectMapsLink(branch)`
**Input**: Object branch  
**Output**: URL untuk membuka Google Maps  
**Contoh**:
```javascript
Input:  { mapsUrl: "https://goo.gl/maps/abc" }
Output: "https://goo.gl/maps/abc"
```

---

## ✅ Checklist Testing Cepat

Buka `/lokasi` dan test:

- [ ] Cabang dengan `mapsUrl` show 2 tombol maps
- [ ] Click "Lihat Peta" → modal terbuka
- [ ] Peta load dengan benar di modal
- [ ] Bisa zoom in/out peta
- [ ] Bisa drag/pan peta
- [ ] Click X → modal tertutup
- [ ] Click "Buka Google Maps" → tab baru terbuka
- [ ] Location di Google Maps sesuai

**Mobile tambahan**:
- [ ] Responsive layout (tombol full width)
- [ ] Modal full screen
- [ ] Pinch zoom works
- [ ] App deep link works (buka app Google Maps)

---

## 🐛 Troubleshooting Cepat

| Problem | Solution |
|---------|----------|
| **Peta tidak muncul** | Cek URL valid, coba format lain (koordinat) |
| **Tombol tidak ada** | Pastikan `mapsUrl` tidak null di database |
| **Link error 404** | Test URL di browser dulu, paste fresh URL |
| **App tidak buka** | Normal jika app belum terinstal, akan buka browser |
| **Modal slow** | Normal, tergantung koneksi internet |

---

## 📚 File Dokumentasi

| File | Isi |
|------|-----|
| `FITUR-GOOGLE-MAPS-EMBED.md` | Dokumentasi lengkap fitur |
| `GOOGLE-MAPS-COMPLETE-GUIDE.md` | Panduan teknis detail |
| `GOOGLE-MAPS-TESTING-GUIDE.md` | Cara testing dan troubleshoot |
| `GOOGLE-MAPS-TESTING-EXAMPLES.md` | Contoh test cases |
| `GOOGLE-MAPS-QUICK-REFERENCE.md` | **⭐ File ini** |

---

## 📞 Need Help?

1. **Check console** browser untuk error messages
2. **Test URL** di Google Maps langsung
3. **Clear cache** dan reload page
4. **Try different format** URL (koordinat paling reliable)
5. **Check database** pastikan mapsUrl tersimpan

---

## 🎯 Best Practices

✅ **DO**:
- Gunakan URL fresh dari Google Maps
- Test URL sebelum save
- Prefer URL lengkap atau koordinat
- Upload gambar cabang untuk UX lebih baik
- Set jam operasional untuk info lengkap

❌ **DON'T**:
- Jangan gunakan URL yang kadaluarsa
- Jangan hard-code koordinat tanpa verify
- Jangan skip testing setelah add cabang baru
- Jangan assume semua format URL sama

---

## 📊 Feature Status

| Feature | Status | Notes |
|---------|--------|-------|
| Modal embed | ✅ Done | Interactive map |
| Direct link | ✅ Done | Opens in new tab/app |
| Mobile responsive | ✅ Done | Full-screen modal |
| App deep linking | ✅ Done | iOS & Android |
| Multiple URL formats | ✅ Done | 5+ formats supported |
| Error handling | ✅ Done | Graceful degradation |
| Directions API | 🔜 Future | Coming soon |
| Multi-marker map | 🔜 Future | Roadmap |
| Distance calculator | 🔜 Future | Planned |

---

## 🚀 Example Workflow

### Admin menambah cabang baru:
```
1. Login → /admin/branches
2. Click "+ Tambah Cabang"
3. Isi: Nama, Alamat, Kota, Provinsi
4. Buka Google Maps → Search lokasi
5. Click "Share" → Copy link
6. Paste ke field "Google Maps URL"
7. Upload gambar cabang
8. Set jam operasional
9. Click "Tambah Cabang"
10. ✅ Done!
```

### User mencari lokasi cabang:
```
1. Buka website → /lokasi
2. Browse atau filter by provinsi
3. Lihat info cabang (alamat, telp, jam buka)
4. Click "Lihat Peta" → Preview lokasi
5. Explore peta, zoom in/out
6. Click "Buka di Google Maps" → Get directions
7. ✅ Sampai di lokasi!
```

---

## 🎉 Summary

**Fitur ini memberikan**:
- 🗺️ Preview peta langsung di website
- 📍 Link ke Google Maps untuk fitur lengkap
- 📱 Support mobile dengan app integration
- 🔄 Fleksibilitas berbagai format URL
- ✨ UX yang smooth dan intuitive

**Total files modified**: 2
- `src/app/lokasi/page.tsx` (main feature)
- `src/app/admin/branches/page.tsx` (admin panel)

**Total files created**: 4
- `FITUR-GOOGLE-MAPS-EMBED.md`
- `GOOGLE-MAPS-COMPLETE-GUIDE.md`
- `GOOGLE-MAPS-TESTING-GUIDE.md`
- `GOOGLE-MAPS-TESTING-EXAMPLES.md`

---

**Version**: 1.0.0  
**Last Updated**: October 16, 2025  
**Status**: ✅ Production Ready

---

**Need more info?** Baca file dokumentasi lengkap di atas! 📚
