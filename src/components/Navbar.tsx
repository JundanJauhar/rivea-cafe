"use client";

import Link from "next/link";
import { useState } from "react";
import CategoryDropdown from "./CategoryDropdown";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
            <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/home" className="flex items-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 relative">
                            <div className="w-full h-full flex items-center justify-center text-amber-700 font-serif text-2xl font-bold">
                                <img src="/logo-cafe.png" alt="Rivea logo" className="w-full h-full object-contain" />
                            </div>
                        </div>
                        <span className="ml-2 text-amber-700 font-serif text-xl sm:text-2xl font-semibold">RIVEA</span>
                    </Link>

                    {/* Desktop Menu Navigation */}
                    <ul className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm">
                        <li>
                            <Link href="/home" className="text-amber-700 font-semibold hover:text-amber-800 transition" prefetch={true}>
                                HOME
                            </Link>
                        </li>
                        <li>
                            <Link href="/tentang-kami" className="text-gray-700 hover:text-amber-700 transition" prefetch={true}>
                                TENTANG KAMI
                            </Link>
                        </li>
                        <li>
                            <CategoryDropdown />
                        </li>
                        <li>
                            <Link href="/pengumuman" className="text-gray-700 hover:text-amber-700 transition" prefetch={true}>
                                PENGUMUMAN
                            </Link>
                        </li>
                        <li>
                            <Link href="/lokasi" className="text-gray-700 hover:text-amber-700 transition" prefetch={true}>
                                LOKASI
                            </Link>
                        </li>
                    </ul>

                    {/* Mobile Menu Button */}
                    <button 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden text-amber-700 p-2"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 border-t border-gray-100">
                        <ul className="flex flex-col space-y-3 pt-4">
                            <li>
                                <Link 
                                    href="/home" 
                                    className="block py-2 px-4 text-amber-700 font-semibold hover:bg-amber-50 rounded transition"
                                    onClick={() => setMobileMenuOpen(false)}
                                    prefetch={true}
                                >
                                    HOME
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/tentang-kami" 
                                    className="block py-2 px-4 text-gray-700 hover:bg-amber-50 hover:text-amber-700 rounded transition"
                                    onClick={() => setMobileMenuOpen(false)}
                                    prefetch={true}
                                >
                                    TENTANG KAMI
                                </Link>
                            </li>
                            <li>
                                <CategoryDropdown isMobile={true} onLinkClick={() => setMobileMenuOpen(false)} />
                            </li>
                            <li>
                                <Link 
                                    href="/pengumuman" 
                                    className="block py-2 px-4 text-gray-700 hover:bg-amber-50 hover:text-amber-700 rounded transition"
                                    onClick={() => setMobileMenuOpen(false)}
                                    prefetch={true}
                                >
                                    PENGUMUMAN
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href="/lokasi" 
                                    className="block py-2 px-4 text-gray-700 hover:bg-amber-50 hover:text-amber-700 rounded transition"
                                    onClick={() => setMobileMenuOpen(false)}
                                    prefetch={true}
                                >
                                    LOKASI
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
}
