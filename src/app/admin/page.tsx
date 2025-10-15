import { prisma } from '@/lib/prisma';
import Link from 'next/link';

async function getCounts() {
  const categories = await prisma.menuCategory.count();
  const items = await prisma.menuItem.count();
  const gallery = await prisma.galleryItem.count();
  return { categories, items, gallery };
}

export default async function AdminPage() {
  const stats = await getCounts();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 sm:py-6 px-3 sm:px-4 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="text-xs sm:text-sm text-gray-500">Welcome, Admin</div>
        </div>
      </header>

      <main className="py-4 sm:py-6">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="py-4 sm:py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="p-5 rounded shadow-sm bg-gradient-to-r from-teal-500 to-teal-600 text-white flex items-center justify-between hover:scale-[1.01] transition-transform">
                <div>
                  <div className="text-sm opacity-90">Categories</div>
                  <div className="text-2xl font-bold">{stats.categories}</div>
                </div>
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
                  </svg>
                </div>
              </div>

              <div className="p-5 rounded shadow-sm bg-gradient-to-r from-emerald-500 to-emerald-600 text-white flex items-center justify-between hover:scale-[1.01] transition-transform">
                <div>
                  <div className="text-sm opacity-90">Menu Items</div>
                  <div className="text-2xl font-bold">{stats.items}</div>
                </div>
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </div>
              </div>

              <div className="p-5 rounded shadow-sm bg-gradient-to-r from-yellow-400 to-yellow-500 text-white flex items-center justify-between hover:scale-[1.01] transition-transform">
                <div>
                  <div className="text-sm opacity-90">Gallery</div>
                  <div className="text-2xl font-bold">{stats.gallery}</div>
                </div>
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18v18H3z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13l4-4a3 3 0 0 1 4 0l5 5" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-3 sm:p-4 rounded shadow">
                <h3 className="font-semibold mb-3 text-sm sm:text-base">Quick Actions</h3>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Link href="/admin/menu" className="text-center px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition text-sm">Manage Menu</Link>
                  <Link href="/admin/gallery" className="text-center px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700 transition text-sm">Manage Gallery</Link>
                </div>
              </div>

              <div className="bg-white p-3 sm:p-4 rounded shadow">
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Recent Activity</h3>
                <p className="text-xs sm:text-sm text-gray-500">No recent activity available.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
