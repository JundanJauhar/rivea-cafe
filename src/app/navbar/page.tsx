export default function NavbarPage() {
  return (
    <div>
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-12 h-12 relative">
              {/* Placeholder untuk logo - ganti dengan logo asli Anda */}
              <div className="w-15 h-15 flex items-center justify-center text-amber-700 font-serif text-2xl font-bold">
                <img src="logo-cafe.png" alt="" />
              </div>
            </div>
            <div>
              <span className="ml-2 text-amber-700 font-serif text-2xl font-semibold flex">RIVEA</span>
            </div>
          </div>

          {/* Menu Navigation */}
          <ul className="hidden md:flex items-center space-x-8 text-sm">
            <li>
              <a href="#home" className="text-amber-700 font-semibold hover:text-amber-800 transition">
                HOME
              </a>
            </li>
            <li>
              <a href="#menu" className="text-gray-700 hover:text-amber-700 transition">
                MENU
              </a>
            </li>
            <li>
              <a href="#tentang" className="text-gray-700 hover:text-amber-700 transition">
                TENTANG KAMI
              </a>
            </li>
            <li>
              <a href="#galeri" className="text-gray-700 hover:text-amber-700 transition">
                GALERI
              </a>
            </li>
            <li>
              <a href="#kontak" className="text-gray-700 hover:text-amber-700 transition">
                KONTAK
              </a>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-amber-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </div>
  );
}