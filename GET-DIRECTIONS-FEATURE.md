# 🧭 Update Fitur Get Directions

## 📍 Perubahan Terbaru

### ✨ Fitur Baru: Get Directions

Menambahkan tombol **"Get Directions"** yang langsung membuka Google Maps dengan mode navigasi/petunjuk arah ke lokasi cafe Rivea.

---

## 🎯 Perbedaan Fitur

| Tombol | Fungsi | Warna | Behavior |
|--------|--------|-------|----------|
| **🗺️ Lihat Peta** | Buka modal dengan embed | 🟢 Hijau | Modal overlay di website |
| **🧭 Get Directions** | Navigasi ke lokasi | 🔵 Biru | Buka Google Maps dalam mode directions |
| **📍 Lihat di Google Maps** | Lihat lokasi saja | ⚫ Abu-abu | Buka Google Maps untuk explore |

---

## 🔧 Cara Kerja Get Directions

### Fungsi `getDirectionsLink(branch)`

```typescript
const getDirectionsLink = (branch: Branch) => {
  // Extract coordinates from mapsUrl if available
  if (branch.mapsUrl) {
    // Try to extract coordinates from URL
    const coordMatch = branch.mapsUrl.match(/(@|=)(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (coordMatch) {
      const lat = coordMatch[2];
      const lng = coordMatch[3];
      // Use directions URL with coordinates
      return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    }
  }
  
  // Fallback: use address for directions
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(branch.address)}`;
};
```

### URL Format yang Dihasilkan

**Dengan Koordinat:**
```
https://www.google.com/maps/dir/?api=1&destination=-7.7925964,110.3645744
```

**Dengan Alamat (fallback):**
```
https://www.google.com/maps/dir/?api=1&destination=Jl.%20Malioboro%20No.%2060,%20Yogyakarta
```

---

## 📱 User Experience

### Di Kartu Cabang

```
┌─────────────────────────────────────┐
│  [Gambar Cabang]                    │
│                                     │
│  Rivea Malioboro                    │
│  📍 Jl. Malioboro No. 60           │
│  📞 +62 274 580000                 │
│  🕐 08:00 - 22:00                  │
│                                     │
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│  ┃ 🗺️ Lihat Peta            ┃  │ ← Preview peta
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│  ┃ 🧭 Get Directions         ┃  │ ← Navigasi
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│  ┃ 📍 Lihat di Google Maps   ┃  │ ← Explore
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
└─────────────────────────────────────┘
```

### Di Modal Peta

```
╔══════════════════════════════════════╗
║ Rivea Malioboro               [X]  ║
║ Jl. Malioboro No. 60               ║
╠══════════════════════════════════════╣
║                                      ║
║   [Google Maps Embed - Interactive]  ║
║                                      ║
╠══════════════════════════════════════╣
║ [🧭 Get Directions]                 ║
║ [📍 Lihat di Google Maps] [Tutup]  ║
╚══════════════════════════════════════╝
```

---

## 🚗 Flow Navigasi

### Scenario: User ingin ke Cafe Rivea

```
Step 1: User buka /lokasi
   ↓
Step 2: User lihat daftar cabang
   ↓
Step 3: User pilih cabang terdekat
   ↓
Step 4: User click "🧭 Get Directions"
   ↓
Step 5: Google Maps terbuka dalam mode navigasi
   ↓
Step 6: Google Maps menunjukkan rute dari lokasi user
   ↓
Step 7: User ikuti petunjuk arah
   ↓
Step 8: Tiba di Cafe Rivea! ☕
```

---

## 📲 Behavior per Device

### Desktop/Laptop

**Click "Get Directions":**
```
1. Tab baru terbuka
2. Google Maps website load
3. Prompt: "Izinkan akses lokasi?" (jika belum)
4. Jika Allow: Rute dari lokasi current ke cafe
5. Jika Deny: Input manual lokasi awal
6. Tampil rute dengan estimasi waktu & jarak
```

### Mobile (iOS)

**Tap "Get Directions":**
```
1. Browser prompt: "Open in Google Maps?"
2. Jika Yes:
   - App Google Maps terbuka
   - Langsung mode navigasi
   - GPS otomatis aktif
   - Voice guidance ready
3. Jika No:
   - Buka di browser mobile
   - Sama seperti desktop
```

### Mobile (Android)

**Tap "Get Directions":**
```
1. Intent resolver muncul (jika multiple apps)
2. Pilih Google Maps
3. App terbuka dalam mode directions
4. Lokasi current auto-detect
5. Rute langsung muncul
6. Tap "Start" untuk mulai navigasi
```

---

## 🎯 Use Cases

### Use Case 1: Pelanggan Baru
```
Problem: Tidak tahu lokasi Rivea
Solution: Click "Get Directions" → GPS guide ke lokasi
Result: Sampai dengan mudah, tidak tersesat
```

### Use Case 2: Order Delivery
```
Problem: Driver perlu petunjuk arah
Solution: Share link "Get Directions" ke driver
Result: Driver tahu rute tercepat
```

### Use Case 3: Meeting Point
```
Problem: Teman belum pernah ke Rivea
Solution: Send directions link via WhatsApp
Result: Teman bisa navigasi sendiri
```

### Use Case 4: Tourist
```
Problem: Wisatawan asing cari cafe
Solution: Click directions, Google Maps support multi-language
Result: International friendly navigation
```

---

## 🆚 Comparison: 3 Tombol

### 1. 🗺️ Lihat Peta (Hijau)

**Kapan digunakan:**
- User ingin preview lokasi dulu
- Cek seberapa jauh dari posisi sekarang
- Lihat area sekitar cafe
- Explore dulu sebelum pergi

**Keuntungan:**
- ✅ Tidak leave website
- ✅ Quick preview
- ✅ Bisa zoom/explore
- ✅ Lihat landmark sekitar

### 2. 🧭 Get Directions (Biru)

**Kapan digunakan:**
- User sudah fix mau pergi ke cafe
- Perlu petunjuk arah real-time
- Ingin tahu estimasi waktu & jarak
- Butuh navigasi GPS

**Keuntungan:**
- ✅ Langsung mode navigasi
- ✅ Real-time GPS tracking
- ✅ Voice guidance (di mobile)
- ✅ Rute alternative
- ✅ Traffic info
- ✅ ETA (Estimated Time Arrival)

### 3. 📍 Lihat di Google Maps (Abu-abu)

**Kapan digunakan:**
- User ingin explore lebih detail
- Cari tempat parkir sekitar
- Lihat street view
- Read reviews di Google Maps
- Save lokasi untuk nanti

**Keuntungan:**
- ✅ Full Google Maps features
- ✅ Street View
- ✅ Reviews & ratings
- ✅ Photos dari user lain
- ✅ Nearby places
- ✅ Save to favorites

---

## 🔍 Technical Details

### URL Parameters Explained

**Directions URL:**
```
https://www.google.com/maps/dir/?api=1&destination=-7.7925964,110.3645744

Breakdown:
- /dir/          → Directions mode
- ?api=1         → Use Maps URL API
- &destination=  → Target location
- -7.79,110.36   → Latitude, Longitude
```

**Query Parameters Available:**

| Parameter | Description | Example |
|-----------|-------------|---------|
| `destination` | Target location | `-7.79,110.36` atau `Rivea+Cafe` |
| `origin` | Starting point (optional) | `-7.80,110.37` |
| `travelmode` | Mode transport | `driving`, `walking`, `bicycling`, `transit` |
| `dir_action` | Navigate action | `navigate` (auto-start) |

### Advanced Usage

**Dengan starting point:**
```javascript
// Jika tahu lokasi user
const userLat = -7.8;
const userLng = 110.4;
const url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=-7.79,110.36`;
```

**Dengan travel mode:**
```javascript
// Force walking mode
const url = `https://www.google.com/maps/dir/?api=1&destination=-7.79,110.36&travelmode=walking`;
```

**Auto-start navigation (mobile):**
```javascript
// Langsung mulai navigasi
const url = `https://www.google.com/maps/dir/?api=1&destination=-7.79,110.36&dir_action=navigate`;
```

---

## ✅ Testing Checklist

### Desktop Testing
- [ ] Click "Get Directions" dari kartu cabang
- [ ] Tab baru terbuka di Google Maps
- [ ] Mode directions aktif
- [ ] Destination = lokasi cafe yang benar
- [ ] Rute ditampilkan jika lokasi user di-allow
- [ ] Manual input origin jika lokasi denied

### Mobile Testing
- [ ] Tap "Get Directions"
- [ ] Prompt "Open in app?" muncul
- [ ] App Google Maps terbuka
- [ ] Langsung dalam mode directions
- [ ] GPS auto-detect lokasi current
- [ ] Rute ditampilkan dengan benar
- [ ] Voice guidance tersedia
- [ ] ETA & jarak akurat

### Modal Testing
- [ ] Buka modal peta
- [ ] Click "Get Directions" di footer
- [ ] Behavior sama dengan button di card
- [ ] Modal tertutup otomatis (optional)

### URL Format Testing
- [ ] URL dengan koordinat → extract correct
- [ ] URL dengan place name → fallback to address
- [ ] Koordinat langsung → work correctly
- [ ] URL rusak → fallback to address work

---

## 🐛 Troubleshooting

### Problem: Directions tidak muncul
**Gejala**: Google Maps terbuka tapi tidak ada rute

**Possible Causes:**
1. Lokasi user tidak di-allow
2. GPS tidak aktif
3. Koordinat tidak valid

**Solution:**
```
1. Check browser location permission
2. Enable GPS di device
3. Manual input starting location
4. Verify koordinat di database valid
```

### Problem: App tidak terbuka di mobile
**Gejala**: Buka di browser instead of app

**Solution:**
```
Normal behavior jika:
- App Google Maps belum terinstal
- Browser setting block app launching
- iOS: Need to tap "Open" di prompt
- Android: Need to select app di intent picker
```

### Problem: Rute tidak akurat
**Gejala**: Rute menunjukkan lokasi yang salah

**Solution:**
```
1. Verifikasi koordinat di mapsUrl
2. Test URL langsung di browser
3. Update mapsUrl dengan koordinat fresh
4. Pastikan koordinat sesuai dengan alamat
```

---

## 📊 Analytics Tracking (Optional)

```typescript
// Track clicks pada Get Directions
const handleGetDirections = (branch: Branch) => {
  // Analytics event
  analytics.track('get_directions_clicked', {
    branch_id: branch.id,
    branch_name: branch.name,
    city: branch.city,
    source: 'website' // atau 'modal'
  });
  
  // Open directions
  window.open(getDirectionsLink(branch), '_blank');
};
```

---

## 🚀 Future Enhancements

### Phase 1: One-click Navigation (Current) ✅
- [x] Get Directions button
- [x] Auto-detect coordinates
- [x] Mobile app integration

### Phase 2: Smart Routing
```typescript
// Detect user location first
navigator.geolocation.getCurrentPosition((position) => {
  const userLat = position.coords.latitude;
  const userLng = position.coords.longitude;
  
  // Include origin in directions URL
  const url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${branchLat},${branchLng}`;
});
```

### Phase 3: Travel Mode Selection
```typescript
// Let user choose: driving, walking, transit
<select onChange={(e) => setTravelMode(e.target.value)}>
  <option value="driving">🚗 Driving</option>
  <option value="walking">🚶 Walking</option>
  <option value="bicycling">🚴 Bicycling</option>
  <option value="transit">🚇 Transit</option>
</select>
```

### Phase 4: Ride-sharing Integration
```typescript
// Quick links to Grab, Gojek
<button onClick={() => openGrab(branch.address)}>
  🚖 Pesan Grab
</button>
```

---

## 📝 Summary

### What Changed:
1. ✅ Added `getDirectionsLink()` function
2. ✅ Added "Get Directions" button (blue) to card
3. ✅ Added "Get Directions" button to modal
4. ✅ Updated button styling and layout
5. ✅ Maintained existing "Lihat Peta" and "Lihat di Google Maps"

### Button Layout:
```
[🗺️ Lihat Peta]           ← Preview in modal
[🧭 Get Directions]         ← Navigate to location ⭐ NEW
[📍 Lihat di Google Maps]  ← Explore in Maps
```

### User Flow:
```
User → Click "Get Directions" → Google Maps opens → Navigate → Arrive! ☕
```

---

**Version**: 1.1.0  
**Last Updated**: October 16, 2025  
**Status**: ✅ Ready for Testing
