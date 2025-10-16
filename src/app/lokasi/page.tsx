'use client';

import { useState, useEffect } from 'react';

interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  province: string;
  phone: string | null;
  mapsUrl: string | null;
  img: string | null;
  openingHours: string | null;
  isActive: boolean;
}

interface OpeningHours {
  [key: string]: { open: string; close: string; closed: boolean };
}

export default function LokasiPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProvince, setSelectedProvince] = useState<string>('all');

  // Function to get directions link (for navigation) - ULTRA PRECISE
  const getDirectionsLink = (branch: Branch) => {
    console.log('🔍 [DEBUG] Processing branch:', branch.name);
    console.log('📍 [DEBUG] Input mapsUrl:', branch.mapsUrl);

    if (!branch.mapsUrl) {
      console.warn('⚠️ [WARNING] No mapsUrl provided, using name + address');
      const query = `${branch.name}, ${branch.address}`;
      return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
    }

    // Method 1: Extract coordinates from @ symbol format (most common and precise)
    // Example: https://www.google.com/maps/@-7.7925964,110.3645744,15z
    let coordMatch = branch.mapsUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (coordMatch) {
      const lat = coordMatch[1];
      const lng = coordMatch[2];
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
      console.log('✅ [SUCCESS] Method 1 - @ symbol format');
      console.log('📌 [COORDS] Lat:', lat, 'Lng:', lng);
      console.log('🔗 [URL]', url);
      return url;
    }

    // Method 2: Extract from place URL format with coordinates
    // Example: https://www.google.com/maps/place/Name/@-7.7925964,110.3645744,15z
    coordMatch = branch.mapsUrl.match(/place\/[^/]+\/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (coordMatch) {
      const lat = coordMatch[1];
      const lng = coordMatch[2];
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
      console.log('✅ [SUCCESS] Method 2 - place format');
      console.log('📌 [COORDS] Lat:', lat, 'Lng:', lng);
      console.log('🔗 [URL]', url);
      return url;
    }

    // Method 3: Extract from query parameter
    // Example: ?q=-7.7925964,110.3645744
    coordMatch = branch.mapsUrl.match(/[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (coordMatch) {
      const lat = coordMatch[1];
      const lng = coordMatch[2];
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
      console.log('✅ [SUCCESS] Method 3 - query parameter');
      console.log('📌 [COORDS] Lat:', lat, 'Lng:', lng);
      console.log('🔗 [URL]', url);
      return url;
    }

    // Method 4: Direct coordinates format (if user inputs just coordinates)
    // Example: -7.7925964,110.3645744
    coordMatch = branch.mapsUrl.match(/^(-?\d+\.\d+),\s*(-?\d+\.\d+)$/);
    if (coordMatch) {
      const lat = coordMatch[1];
      const lng = coordMatch[2];
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
      console.log('✅ [SUCCESS] Method 4 - direct coordinates');
      console.log('📌 [COORDS] Lat:', lat, 'Lng:', lng);
      console.log('🔗 [URL]', url);
      return url;
    }

    // Method 5: Extract from /data= parameter (some Google Maps URLs)
    // Example: /data=!4m2!3m1!1s0x...!8m2!3d-7.7925964!4d110.3645744
    coordMatch = branch.mapsUrl.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
    if (coordMatch) {
      const lat = coordMatch[1];
      const lng = coordMatch[2];
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
      console.log('✅ [SUCCESS] Method 5 - data parameter');
      console.log('📌 [COORDS] Lat:', lat, 'Lng:', lng);
      console.log('🔗 [URL]', url);
      return url;
    }

    // Method 6: If it's already a Google Maps URL but no coords found, 
    // try to use it as a place_id or search query
    if (branch.mapsUrl.includes('google.com/maps')) {
      console.warn('⚠️ [WARNING] Google Maps URL but no coordinates found');
      console.log('🔄 [FALLBACK] Using original URL as-is for search');
      
      // Try to extract place name from URL
      const placeMatch = branch.mapsUrl.match(/place\/([^/@?]+)/);
      if (placeMatch) {
        const placeName = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '));
        const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(placeName)}`;
        console.log('📍 [PLACE] Extracted place name:', placeName);
        console.log('🔗 [URL]', url);
        return url;
      }
    }
    
    // Final fallback: use name + address for better precision
    console.warn('❌ [FAILED] No coordinates extracted from any method');
    console.log('🔄 [FALLBACK] Using name + address');
    const query = `${branch.name}, ${branch.address}`;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query)}`;
    console.log('🔗 [URL]', url);
    return url;
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await fetch('/api/branches?active=true');
      const data = await response.json();
      setBranches(data);
    } catch (error) {
      console.error('Error fetching branches:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get unique provinces
  const provinces = ['all', ...new Set(branches.map(b => b.province))];

  // Filter branches by province
  const filteredBranches = selectedProvince === 'all' 
    ? branches 
    : branches.filter(b => b.province === selectedProvince);

  // Group by province and city
  const groupedBranches = filteredBranches.reduce((acc, branch) => {
    const key = `${branch.province} - ${branch.city}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(branch);
    return acc;
  }, {} as Record<string, Branch[]>);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Lokasi Cabang Kami
          </h1>
          <p className="text-lg text-gray-600">
            Temukan Rivea terdekat dari Anda
          </p>
        </div>

        {/* Province Filter */}
        {provinces.length > 2 && (
          <div className="mb-8 flex justify-center">
            <div className="bg-white rounded-lg shadow-md p-4 inline-flex gap-2 flex-wrap">
              {provinces.map((province) => (
                <button
                  key={province}
                  onClick={() => setSelectedProvince(province)}
                  className={`px-4 py-2 rounded-lg transition ${
                    selectedProvince === province
                      ? 'bg-amber-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {province === 'all' ? 'Semua Provinsi' : province}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Branches List */}
        {branches.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-md p-12">
              <p className="text-xl text-gray-500">
                Belum ada cabang yang tersedia saat ini
              </p>
            </div>
          </div>
        ) : filteredBranches.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-md p-12">
              <p className="text-xl text-gray-500">
                Tidak ada cabang di provinsi ini
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedBranches).map(([location, locationBranches]) => (
              <div key={location}>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="text-amber-600">📍</span>
                  {location}
                </h2>
                
                <div className="grid gap-6 md:grid-cols-2">
                  {locationBranches.map((branch) => (
                    <div 
                      key={branch.id} 
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                    >
                      {/* Image Section */}
                      {branch.img ? (
                        <div className="relative w-full h-56 bg-gray-100">
                          <img 
                            src={branch.img} 
                            alt={branch.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                            <h3 className="text-xl font-bold text-white">{branch.name}</h3>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-4">
                          <h3 className="text-xl font-bold">{branch.name}</h3>
                        </div>
                      )}
                      
                      <div className="p-6 space-y-3">
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">📍</span>
                          <div>
                            <p className="font-medium text-gray-800">Alamat</p>
                            <p className="text-gray-600">{branch.address}</p>
                          </div>
                        </div>

                        {branch.phone && (
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">📞</span>
                            <div>
                              <p className="font-medium text-gray-800">Telepon</p>
                              <a 
                                href={`tel:${branch.phone}`}
                                className="text-blue-600 hover:underline"
                              >
                                {branch.phone}
                              </a>
                            </div>
                          </div>
                        )}

                        {branch.openingHours && (
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">🕐</span>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800 mb-2">Jam Operasional</p>
                              <div className="bg-gray-50 rounded-lg p-3 space-y-1">
                                {(() => {
                                  try {
                                    const hours: OpeningHours = JSON.parse(branch.openingHours!);
                                    return Object.entries(hours).map(([day, time]) => (
                                      <div key={day} className="flex justify-between text-sm">
                                        <span className="font-medium text-gray-700">{day}</span>
                                        <span className="text-gray-600">
                                          {time.closed ? 'Tutup' : `${time.open} - ${time.close}`}
                                        </span>
                                      </div>
                                    ));
                                  } catch {
                                    return <p className="text-sm text-gray-500">-</p>;
                                  }
                                })()}
                              </div>
                            </div>
                          </div>
                        )}

                        <a
                          href={getDirectionsLink(branch)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                        >
                          <span className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                            Get Directions
                          </span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
