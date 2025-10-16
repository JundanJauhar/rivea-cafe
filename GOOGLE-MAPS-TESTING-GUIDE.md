# Contoh Data Cabang dengan Google Maps

## Format URL yang Didukung

### 1. URL Google Maps Lengkap
```
https://www.google.com/maps/place/Malioboro/@-7.7925964,110.3645744,15z
```

### 2. URL dengan Koordinat
```
https://www.google.com/maps/@-7.7925964,110.3645744,15z
```

### 3. URL Place/Tempat
```
https://www.google.com/maps/place/Candi+Borobudur
```

### 4. URL Singkat (short link)
```
https://goo.gl/maps/abc123xyz
```

### 5. Koordinat Langsung
```
-7.7925964,110.3645744
```

## Contoh Data Cabang untuk Testing

Gunakan salah satu URL di bawah saat menambahkan cabang baru:

### Cabang Yogyakarta - Malioboro
```json
{
  "name": "Rivea Yogyakarta Malioboro",
  "address": "Jl. Malioboro No. 123, Yogyakarta",
  "city": "Yogyakarta",
  "province": "DI Yogyakarta",
  "mapsUrl": "https://www.google.com/maps/@-7.7925964,110.3645744,15z"
}
```

### Cabang Jakarta - Sudirman
```json
{
  "name": "Rivea Jakarta Sudirman",
  "address": "Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan",
  "city": "Jakarta Selatan",
  "province": "DKI Jakarta",
  "mapsUrl": "https://www.google.com/maps/place/Bundaran+HI/@-6.1951844,106.8219783,15z"
}
```

### Cabang Bali - Kuta
```json
{
  "name": "Rivea Bali Kuta",
  "address": "Jl. Legian No. 88, Kuta, Badung",
  "city": "Badung",
  "province": "Bali",
  "mapsUrl": "https://www.google.com/maps/@-8.7184368,115.1682666,15z"
}
```

### Cabang Surabaya - Tunjungan Plaza
```json
{
  "name": "Rivea Surabaya Tunjungan",
  "address": "Jl. Basuki Rahmat No. 8-12, Surabaya",
  "city": "Surabaya",
  "province": "Jawa Timur",
  "mapsUrl": "https://www.google.com/maps/place/Tunjungan+Plaza/@-7.2627105,112.7399381,15z"
}
```

## Cara Mendapatkan URL Google Maps

### Metode 1: Via Website Google Maps
1. Buka https://www.google.com/maps
2. Cari lokasi cabang yang ingin ditambahkan
3. Klik tombol **"Share"** atau **"Bagikan"**
4. Pilih tab **"Copy link"** 
5. Paste URL tersebut ke field `mapsUrl`

### Metode 2: Via Aplikasi Google Maps (Mobile)
1. Buka aplikasi Google Maps
2. Tap pada lokasi yang ingin dibagikan
3. Tap tombol **"Share"**
4. Pilih **"Copy link"** atau **"Salin tautan"**
5. Paste URL tersebut ke field `mapsUrl`

### Metode 3: Menggunakan Koordinat
1. Buka Google Maps
2. Klik kanan pada lokasi yang diinginkan
3. Koordinat akan muncul di bagian atas (format: -7.123456, 110.789012)
4. Copy koordinat tersebut dan paste ke field `mapsUrl`

## Testing di Admin Panel

1. Login ke admin panel
2. Pergi ke menu **"Branches"** atau **"Cabang"**
3. Klik **"Add New Branch"** atau **"Tambah Cabang"**
4. Isi semua field yang required:
   - Name (Nama cabang)
   - Address (Alamat lengkap)
   - City (Kota)
   - Province (Provinsi)
   - Maps URL (gunakan salah satu contoh di atas)
5. Upload gambar cabang (opsional)
6. Set status **Active**
7. Save/Simpan

## Testing di Halaman Lokasi

1. Buka halaman `/lokasi`
2. Cari cabang yang baru ditambahkan
3. Test 2 tombol:
   - **"🗺️ Lihat Peta"** → Harus membuka modal dengan Google Maps embed
   - **"📍 Buka di Google Maps"** → Harus membuka Google Maps di tab baru

### Expected Behavior:
- ✅ Modal muncul dengan peta yang benar
- ✅ Peta bisa di-zoom dan di-pan
- ✅ Marker/pin berada di lokasi yang tepat
- ✅ Tombol "Buka di Google Maps" membuka aplikasi/website Google Maps
- ✅ Di mobile, membuka aplikasi Google Maps (jika terinstal)

## Troubleshooting

### Peta Tidak Muncul
**Problem**: Modal terbuka tapi peta kosong/error
**Solution**: 
- Pastikan URL Google Maps valid
- Coba gunakan format koordinat langsung: `-7.123456,110.789012`
- Clear browser cache dan reload

### Tombol Tidak Berfungsi
**Problem**: Klik tombol tidak ada response
**Solution**:
- Check console browser untuk error
- Pastikan `mapsUrl` tidak null di database
- Restart development server

### Link Membuka Halaman Error
**Problem**: "Buka di Google Maps" membuka halaman 404
**Solution**:
- Pastikan URL lengkap dan valid
- Test URL di browser terlebih dahulu
- Gunakan format URL standar Google Maps

## Notes untuk Developer

1. **API Key**: Saat ini menggunakan public embed, tidak perlu API key
2. **Rate Limiting**: Google Maps embed gratis untuk penggunaan standar
3. **HTTPS Required**: Pastikan website menggunakan HTTPS untuk embed maps
4. **Responsiveness**: Modal dan embed sudah responsive untuk semua device
5. **Browser Compatibility**: Tested di Chrome, Firefox, Safari, Edge

## Security Considerations

1. **XSS Protection**: URL di-sanitize sebelum digunakan di iframe
2. **referrerPolicy**: Set ke "no-referrer-when-downgrade" untuk privacy
3. **target="_blank"**: Menggunakan `rel="noopener noreferrer"` untuk security
4. **Input Validation**: URL di-validate sebelum disimpan ke database

## Performance Tips

1. **Lazy Loading**: Iframe menggunakan `loading="lazy"`
2. **Modal on Demand**: Peta hanya load saat modal dibuka
3. **Optimized Images**: Gambar cabang sudah dioptimasi
4. **Caching**: Browser cache digunakan untuk embed URL

## Future Enhancements

Fitur yang bisa ditambahkan di masa depan:
- [ ] Directions API untuk petunjuk arah
- [ ] Nearby search untuk tempat terdekat
- [ ] Street View integration
- [ ] Distance matrix untuk jarak antar cabang
- [ ] Custom markers dengan logo Rivea
- [ ] Cluster markers untuk multiple locations
- [ ] Geolocation untuk "Cabang Terdekat"
