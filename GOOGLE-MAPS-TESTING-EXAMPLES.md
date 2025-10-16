# 🧪 Testing Examples - Google Maps Feature

## Quick Test Data

Gunakan data ini untuk testing cepat fitur Google Maps:

---

## 📍 Test Case 1: Malioboro, Yogyakarta

### Input di Admin Panel:
```json
{
  "name": "Rivea Malioboro",
  "address": "Jl. Malioboro No. 60, Yogyakarta",
  "city": "Yogyakarta",
  "province": "DI Yogyakarta",
  "phone": "+62 274 580000",
  "mapsUrl": "https://www.google.com/maps/@-7.7925964,110.3645744,15z"
}
```

### Expected Results:
- ✅ Modal embed: Peta centered di Jl. Malioboro
- ✅ Tombol biru: Buka Google Maps di koordinat yang sama
- ✅ Zoom level: 15 (street level detail)

---

## 📍 Test Case 2: Monas, Jakarta

### Input di Admin Panel:
```json
{
  "name": "Rivea Monas Jakarta",
  "address": "Jl. Medan Merdeka Selatan, Jakarta Pusat",
  "city": "Jakarta Pusat",
  "province": "DKI Jakarta",
  "phone": "+62 21 3841000",
  "mapsUrl": "https://www.google.com/maps/place/Monas/@-6.1753924,106.8271528,15z"
}
```

### Expected Results:
- ✅ Modal embed: Menampilkan area Monas
- ✅ Place name: "Monas" visible di peta
- ✅ Link direct: Membuka Google Maps ke Monas

---

## 📍 Test Case 3: Koordinat Langsung

### Input di Admin Panel:
```json
{
  "name": "Rivea Bali Kuta",
  "address": "Jl. Legian No. 88, Kuta, Badung, Bali",
  "city": "Badung",
  "province": "Bali",
  "phone": "+62 361 750000",
  "mapsUrl": "-8.7184368,115.1682666"
}
```

### Expected Results:
- ✅ Modal embed: Parse koordinat dan tampilkan peta Kuta Beach area
- ✅ No error meski format hanya koordinat
- ✅ Link direct: Fallback ke search dengan alamat

---

## 📍 Test Case 4: Short Link (goo.gl)

### Input di Admin Panel:
```json
{
  "name": "Rivea Surabaya",
  "address": "Jl. Basuki Rahmat No. 8-12, Surabaya",
  "city": "Surabaya",
  "province": "Jawa Timur",
  "phone": "+62 31 5470000",
  "mapsUrl": "https://goo.gl/maps/8cGqxKzxYxKzQqVx7"
}
```

### Expected Results:
- ✅ Short link expanded otomatis oleh Google
- ✅ Embed dan direct link keduanya berfungsi
- ✅ Location accurate

---

## 📍 Test Case 5: Place Search

### Input di Admin Panel:
```json
{
  "name": "Rivea Bandung",
  "address": "Jl. Asia Afrika No. 8, Bandung",
  "city": "Bandung",
  "province": "Jawa Barat",
  "phone": "+62 22 4200000",
  "mapsUrl": "https://www.google.com/maps/place/Gedung+Sate+Bandung"
}
```

### Expected Results:
- ✅ Modal: Menampilkan area Gedung Sate
- ✅ Nama place "Gedung Sate Bandung" terlihat
- ✅ Direct link membuka ke tempat yang sama

---

## 🧪 Testing Scenarios

### Scenario A: User Journey - Lihat Peta
```
1. Buka http://localhost:3000/lokasi
2. Scroll ke cabang "Rivea Malioboro"
3. Click tombol hijau "🗺️ Lihat Peta"
4. Verify: Modal terbuka
5. Verify: Peta load dengan benar
6. Verify: Location marker di Malioboro
7. Try: Zoom in (+ button atau scroll)
8. Try: Zoom out (- button atau scroll)
9. Try: Pan/drag peta
10. Click X atau click di luar modal
11. Verify: Modal tertutup
```

### Scenario B: User Journey - Buka Google Maps
```
1. Buka http://localhost:3000/lokasi
2. Scroll ke cabang "Rivea Monas Jakarta"
3. Click tombol biru "📍 Buka di Google Maps"
4. Verify: Tab baru terbuka
5. Verify: Google Maps website/app terbuka
6. Verify: Location = Monas
7. Verify: Bisa gunakan fitur Google Maps (directions, save, dll)
```

### Scenario C: Mobile Testing
```
1. Buka di mobile browser
2. Navigate ke /lokasi
3. Tap cabang card
4. Verify: Buttons full width dan mudah di-tap
5. Tap "Lihat Peta"
6. Verify: Modal full screen di mobile
7. Verify: Touch gestures work (pinch zoom, swipe)
8. Close modal
9. Tap "Buka di Google Maps"
10. Verify: Prompt "Open in Google Maps app?" muncul
11. Choose: Open in app
12. Verify: Google Maps app terbuka dengan location correct
```

### Scenario D: Error Handling
```
Test Case 1: Empty mapsUrl
- Branch tanpa mapsUrl
- Expected: Tombol maps tidak muncul
- Status: ✅ Pass

Test Case 2: Invalid URL
- mapsUrl = "invalid-url-123"
- Expected: Fallback to address search
- Status: ✅ Pass (graceful degradation)

Test Case 3: Network Error
- Disconnect internet
- Open modal
- Expected: Browser native error atau loading indefinitely
- Status: ✅ Expected behavior
```

---

## 📊 Test Results Template

Copy template ini untuk dokumentasi testing:

```markdown
## Test Session: [Date]
**Tester**: [Name]
**Environment**: [Development/Staging/Production]
**Browser**: [Chrome/Firefox/Safari/Edge]
**Device**: [Desktop/Mobile]

### Test Case 1: Malioboro Embed
- [ ] Modal opens correctly
- [ ] Map loads without error
- [ ] Location accurate
- [ ] Zoom/pan functional
- [ ] Modal closes properly

### Test Case 2: Direct Link
- [ ] Button clickable
- [ ] New tab opens
- [ ] Correct location
- [ ] Google Maps loads

### Test Case 3: Mobile App
- [ ] App prompt appears
- [ ] App opens correctly
- [ ] Location correct in app

### Test Case 4: Different URL Formats
- [ ] Full URL works
- [ ] Short URL works
- [ ] Coordinates work
- [ ] Place name works

### Issues Found:
1. [Description of issue]
2. [Description of issue]

### Screenshots:
- [Attach screenshots if any issues]

### Overall Result: ✅ PASS / ❌ FAIL
```

---

## 🎯 Performance Testing

### Load Time Testing
```javascript
// Add to browser console
console.time('modal-open');
// Click "Lihat Peta" button
console.timeEnd('modal-open');
// Expected: < 500ms

console.time('maps-load');
// Wait for iframe to fully load
console.timeEnd('maps-load');
// Expected: < 3s (depends on internet)
```

### Memory Testing
```javascript
// Open browser DevTools → Performance
// Record session while:
// 1. Open modal
// 2. Interact with map
// 3. Close modal
// 4. Repeat 10x
// Check for memory leaks
```

---

## 🔧 Debug Commands

### Check Branch Data
```javascript
// Open browser console on /lokasi page
// Check loaded branches data
console.log(branches);

// Check specific branch
console.log(branches.find(b => b.name.includes('Malioboro')));
```

### Test URL Conversion
```javascript
// Test getEmbedUrl function
const testUrls = [
  'https://www.google.com/maps/@-7.79,110.36,15z',
  'https://goo.gl/maps/abc123',
  '-7.792596,110.364574',
  'https://www.google.com/maps/place/Malioboro'
];

testUrls.forEach(url => {
  console.log('Input:', url);
  console.log('Output:', getEmbedUrl(url));
  console.log('---');
});
```

### Test Direct Link
```javascript
// Test getDirectMapsLink function
const branch = {
  name: 'Test Branch',
  address: 'Jl. Test No. 123',
  mapsUrl: 'https://www.google.com/maps/@-7.79,110.36,15z'
};

console.log('Direct Link:', getDirectMapsLink(branch));
```

---

## 📱 Mobile Specific Tests

### iOS Safari
```
1. Open in iPhone Safari
2. Test modal swipe to close
3. Test pinch zoom in iframe
4. Test "Open in Google Maps app"
5. Verify URL scheme works: comgooglemaps://
```

### Android Chrome
```
1. Open in Android Chrome
2. Test back button behavior
3. Test long-press on location
4. Test share location
5. Verify intent URL works: google.navigation:q=
```

---

## 🐛 Known Issues & Workarounds

### Issue 1: iOS iframe scroll
**Problem**: Double-tap zoom di iOS tidak work di iframe
**Workaround**: User harus gunakan pinch gesture
**Status**: Known iOS limitation

### Issue 2: Some short URLs redirect slowly
**Problem**: goo.gl links kadang redirect lambat
**Workaround**: Prefer full URL atau koordinat
**Status**: Google short URL service deprecated

### Issue 3: Modal di landscape mobile
**Problem**: Modal tinggi terlalu besar di landscape
**Workaround**: Sudah handle dengan max-h-[90vh]
**Status**: Resolved

---

## ✅ Acceptance Criteria

Feature dianggap complete jika:

- [x] Modal terbuka saat click "Lihat Peta"
- [x] Peta load di modal dengan benar
- [x] Minimal 5 format URL didukung
- [x] Direct link membuka Google Maps
- [x] Mobile responsive (portrait & landscape)
- [x] Touch gestures berfungsi di mobile
- [x] App deep linking works (iOS & Android)
- [x] Graceful error handling
- [x] No console errors
- [x] Performance acceptable (< 3s load)

---

## 📞 Support

Jika menemukan bug atau issue saat testing:

1. Check console untuk error messages
2. Test dengan URL format berbeda
3. Clear browser cache dan retry
4. Test di browser/device lain
5. Report dengan detail:
   - URL yang digunakan
   - Browser & version
   - Device & OS
   - Screenshot error
   - Steps to reproduce

---

**Happy Testing! 🚀**
