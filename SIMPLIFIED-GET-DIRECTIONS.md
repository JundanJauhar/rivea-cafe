# 🎯 Simplified Get Directions Feature

## ✨ Update Terbaru

### Perubahan:
- ❌ **Dihapus**: Tombol "Lihat Peta" (modal)
- ❌ **Dihapus**: Tombol "Lihat di Google Maps"
- ✅ **Tetap**: Hanya 1 tombol **"Get Directions"**
- ✅ **Diperbaiki**: Presisi koordinat untuk navigasi

---

## 🎯 Simple & Direct

Sekarang setiap cabang hanya memiliki **1 tombol besar**:

```
┌─────────────────────────────────┐
│  [Gambar Cabang]                │
│                                 │
│  Rivea Malioboro                │
│  📍 Jl. Malioboro No. 60       │
│  📞 +62 274 580000             │
│  🕐 08:00 - 22:00              │
│                                 │
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│  ┃  Get Directions        ┃  │
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
└─────────────────────────────────┘
```

---

## 🔧 Improved Coordinate Extraction

Fungsi `getDirectionsLink()` sekarang lebih presisi dengan 5 metode ekstraksi koordinat:

### Method 1: @ Symbol Format (Paling Common)
```
Input: https://www.google.com/maps/@-7.7925964,110.3645744,15z
Extract: -7.7925964, 110.3645744
Output: https://www.google.com/maps/dir/?api=1&destination=-7.7925964,110.3645744
```

### Method 2: Place URL with Coordinates
```
Input: https://www.google.com/maps/place/Rivea/@-7.7925964,110.3645744,15z
Extract: -7.7925964, 110.3645744
Output: https://www.google.com/maps/dir/?api=1&destination=-7.7925964,110.3645744
```

### Method 3: Query Parameter
```
Input: https://www.google.com/maps?q=-7.7925964,110.3645744
Extract: -7.7925964, 110.3645744
Output: https://www.google.com/maps/dir/?api=1&destination=-7.7925964,110.3645744
```

### Method 4: Direct Coordinates
```
Input: -7.7925964,110.3645744
Extract: -7.7925964, 110.3645744
Output: https://www.google.com/maps/dir/?api=1&destination=-7.7925964,110.3645744
```

### Method 5: Data Parameter Format
```
Input: ...!3d-7.7925964!4d110.3645744...
Extract: -7.7925964, 110.3645744
Output: https://www.google.com/maps/dir/?api=1&destination=-7.7925964,110.3645744
```

### Fallback: Name + Address
```
Input: (no coordinates found)
Output: https://www.google.com/maps/dir/?api=1&destination=Rivea+Malioboro,+Jl.+Malioboro+No.+60
```

---

## 📍 Cara Mendapatkan URL yang Presisi

### ✅ **RECOMMENDED: Copy URL dengan Koordinat**

**Langkah-langkah:**

1. **Buka Google Maps** di browser
   ```
   https://www.google.com/maps
   ```

2. **Cari lokasi Rivea Cafe yang TEPAT**
   - Search: "Rivea Riverside Cafe and Space"
   - Atau navigate ke lokasi dengan zoom

3. **Pastikan PIN di lokasi yang BENAR**
   - Klik tepat di lokasi cafe
   - Jangan klik di lokasi sekitarnya

4. **Copy URL dari Address Bar**
   - URL akan seperti ini:
   ```
   https://www.google.com/maps/@-7.7925964,110.3645744,17z
   ```
   - Atau seperti ini:
   ```
   https://www.google.com/maps/place/Rivea+Riverside+Cafe/@-7.7925964,110.3645744,17z
   ```

5. **Paste URL ke Admin Panel**
   - Field: "Google Maps URL"
   - Paste seluruh URL

---

## 🔍 Cara Verify Koordinat Sudah Benar

### Method 1: Check di Google Maps

1. Copy koordinat dari URL:
   ```
   -7.7925964,110.3645744
   ```

2. Paste ke Google Maps search box:
   ```
   -7.7925964,110.3645744
   ```

3. Verify pin muncul di lokasi Rivea yang benar

### Method 2: Using Browser Console

1. Buka halaman `/lokasi`
2. Open DevTools (F12)
3. Run di console:
   ```javascript
   // Test extraction
   const testUrl = "PASTE_YOUR_MAPS_URL_HERE";
   const coordMatch = testUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
   if (coordMatch) {
     console.log(`Latitude: ${coordMatch[1]}`);
     console.log(`Longitude: ${coordMatch[2]}`);
     console.log(`Destination URL: https://www.google.com/maps/dir/?api=1&destination=${coordMatch[1]},${coordMatch[2]}`);
   }
   ```

4. Copy destination URL dan test di browser

---

## 🐛 Troubleshooting: Salah Lokasi

### Problem: Get Directions menuju lokasi salah (contoh: ke Afkaruna bukan Rivea)

**Penyebab:**
1. ❌ URL Google Maps tidak mengandung koordinat Rivea
2. ❌ Copy URL dari search result, bukan dari lokasi pin
3. ❌ URL mengarah ke nearby location
4. ❌ Koordinat di database salah

**Solution:**

#### Step 1: Verify Current URL
```sql
-- Check database
SELECT name, mapsUrl FROM Branch WHERE name LIKE '%Rivea%';
```

#### Step 2: Get Correct Coordinates

**Option A: Via Google Maps Share**
1. Buka Google Maps
2. Cari "Rivea Riverside Cafe and Space"
3. Click pada marker Rivea
4. Click tombol "Share"
5. Tab pertama ada link
6. Copy link (contoh: `https://maps.app.goo.gl/xxxxx`)
7. Paste link di browser untuk expand
8. Copy URL lengkap yang muncul

**Option B: Via Right-Click**
1. Buka Google Maps
2. Zoom ke lokasi Rivea
3. Right-click TEPAT di lokasi cafe
4. Click koordinat yang muncul (contoh: `-7.792596, 110.364574`)
5. Koordinat akan ter-copy
6. Format: `-7.792596,110.364574` (tanpa spasi)

**Option C: Via Address Bar**
1. Buka Google Maps
2. Click marker Rivea hingga side panel muncul
3. Copy URL dari address bar
4. Pastikan ada `/@-7.xxx,110.xxx,17z`

#### Step 3: Update Database
```sql
-- Update dengan URL yang benar
UPDATE Branch 
SET mapsUrl = 'https://www.google.com/maps/@-7.7925964,110.3645744,17z'
WHERE name LIKE '%Rivea%';
```

#### Step 4: Test
1. Reload halaman `/lokasi`
2. Click "Get Directions"
3. Verify tujuan adalah Rivea, bukan tempat lain

---

## 📝 Contoh URL untuk Rivea

### ✅ Format yang BENAR:

```
https://www.google.com/maps/@-7.7925964,110.3645744,17z
```
atau
```
https://www.google.com/maps/place/Rivea+Riverside+Cafe/@-7.7925964,110.3645744,17z
```
atau
```
-7.7925964,110.3645744
```

### ❌ Format yang SALAH (akan ke lokasi tidak tepat):

```
https://www.google.com/maps/search/rivea+cafe
```
(Ini akan search, bukan pin specific)

```
https://www.google.com/maps/place/Afkaruna/@-7.xxx,110.xxx
```
(Ini koordinat Afkaruna, bukan Rivea)

```
Jl. Pandanaran, Semarang
```
(Hanya alamat text, tidak presisi)

---

## 🎯 Testing Checklist

### Test Coordinate Extraction
```javascript
// Test di browser console
const testCases = [
  "https://www.google.com/maps/@-7.7925964,110.3645744,17z",
  "https://www.google.com/maps/place/Rivea/@-7.7925964,110.3645744,17z",
  "-7.7925964,110.3645744",
  "https://www.google.com/maps?q=-7.7925964,110.3645744"
];

testCases.forEach(url => {
  console.log("Input:", url);
  
  let coordMatch = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (!coordMatch) {
    coordMatch = url.match(/place\/[^/]+\/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  }
  if (!coordMatch) {
    coordMatch = url.match(/[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/);
  }
  if (!coordMatch) {
    coordMatch = url.match(/^(-?\d+\.\d+),(-?\d+\.\d+)$/);
  }
  
  if (coordMatch) {
    console.log("✅ Extracted:", coordMatch[1], coordMatch[2]);
    console.log("URL:", `https://www.google.com/maps/dir/?api=1&destination=${coordMatch[1]},${coordMatch[2]}`);
  } else {
    console.log("❌ No coordinates found");
  }
  console.log("---");
});
```

### Test in Real Usage
- [ ] Open `/lokasi`
- [ ] Find Rivea branch
- [ ] Click "Get Directions"
- [ ] Verify: Opens Google Maps
- [ ] Verify: Destination = Rivea (NOT nearby location)
- [ ] Verify: Route shows from current location
- [ ] Verify: ETA and distance correct

---

## 📊 Before vs After

### Before (Problem):
```
User clicks "Get Directions"
  ↓
Opens Google Maps
  ↓
❌ Destination: Afkaruna (WRONG!)
  ↓
User confused, goes to wrong place
```

### After (Fixed):
```
User clicks "Get Directions"
  ↓
Opens Google Maps
  ↓
✅ Destination: Rivea (CORRECT!)
  ↓
User follows GPS → Arrives at Rivea! ☕
```

---

## 🔐 Admin Panel Update

Di halaman Admin (`/admin/branches`), pastikan input URL yang benar:

**Field: Google Maps URL**
```
Label: Google Maps URL
Placeholder: https://www.google.com/maps/@-7.xxx,110.xxx,17z
Helper text: 
  📍 Cara: Buka Google Maps → Cari lokasi cafe → 
  Pastikan pin di lokasi TEPAT → Copy URL dari address bar
```

---

## 💡 Pro Tips

### Tip 1: Verify Before Save
Sebelum save cabang baru:
1. Copy mapsUrl yang mau di-input
2. Paste di browser tab baru
3. Verify pin di lokasi yang benar
4. Jika benar, baru save

### Tip 2: Use Zoom Level 17+
URL dengan zoom 17 atau lebih tinggi lebih presisi:
```
✅ .../@-7.7925964,110.3645744,17z  (street level)
✅ .../@-7.7925964,110.3645744,20z  (building level)
❌ .../@-7.7925964,110.3645744,10z  (city level, kurang presisi)
```

### Tip 3: Test Immediately
Setelah add/update cabang:
1. Go to `/lokasi`
2. Test "Get Directions" button
3. Verify destination correct
4. If wrong, update immediately

---

## 🚀 Summary

### Changes Made:
1. ✅ Removed modal & extra buttons
2. ✅ Single "Get Directions" button
3. ✅ Improved coordinate extraction (5 methods)
4. ✅ Better fallback (name + address)
5. ✅ More precise navigation

### Result:
- 🎯 Direct navigation ke lokasi yang TEPAT
- 🚀 Faster UX (1 click saja)
- 📍 Koordinat presisi dari URL
- ✨ Clean & simple interface

### Must Do:
1. ⚠️ **Verify all mapsUrl in database**
2. ⚠️ **Update any wrong coordinates**
3. ⚠️ **Test each branch's Get Directions**

---

**Version**: 2.0.0  
**Last Updated**: October 16, 2025  
**Status**: ✅ Simplified & Fixed
