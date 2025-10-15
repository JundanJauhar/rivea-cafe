import { prisma } from '@/lib/prisma';
import Link from 'next/link';

async function getCounts() {
  const categories = await prisma.menuCategory.count();
  const items = await prisma.menuItem.count();
  const gallery = await prisma.galleryItem.count();
  const branches = await prisma.branch.count();
  const announcements = await prisma.announcement.count();
  const reviews = await prisma.review.count({ where: { isApproved: false } });
  return { categories, items, gallery, branches, announcements, reviews };
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

              <div className="p-5 rounded shadow-sm bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-between hover:scale-[1.01] transition-transform">
                <div>
                  <div className="text-sm opacity-90">Cabang</div>
                  <div className="text-2xl font-bold">{stats.branches}</div>
                </div>
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>

              <div className="p-5 rounded shadow-sm bg-gradient-to-r from-purple-500 to-purple-600 text-white flex items-center justify-between hover:scale-[1.01] transition-transform">
                <div>
                  <div className="text-sm opacity-90">Pengumuman</div>
                  <div className="text-2xl font-bold">{stats.announcements}</div>
                </div>
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </div>
              </div>

              <div className="p-5 rounded shadow-sm bg-gradient-to-r from-red-500 to-red-600 text-white flex items-center justify-between hover:scale-[1.01] transition-transform">
                <div>
                  <div className="text-sm opacity-90">Review Pending</div>
                  <div className="text-2xl font-bold">{stats.reviews}</div>
                </div>
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-3 sm:p-4 rounded shadow">
                <h3 className="font-semibold mb-3 text-sm sm:text-base">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/admin/menu" className="text-center px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition text-sm">Manage Menu</Link>
                  <Link href="/admin/gallery" className="text-center px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700 transition text-sm">Manage Gallery</Link>
                  <Link href="/admin/branches" className="text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm">Manage Cabang</Link>
                  <Link href="/admin/announcements" className="text-center px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition text-sm">Manage Pengumuman</Link>
                  <Link href="/admin/reviews" className="text-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm col-span-2">Manage Reviews</Link>
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
