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

                        {branch.mapsUrl && (
                          <a
                            href={branch.mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition font-medium"
                          >
                            🗺️ Buka di Google Maps
                          </a>
                        )}
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
