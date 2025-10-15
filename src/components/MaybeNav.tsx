// components/MaybeNav.js

"use client";

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function MaybeNav() {
  const pathname = usePathname() || '';
  // Sembunyikan Navbar pada rute admin
  if (pathname.startsWith('/admin')) {
    return null;
  }
  return <Navbar />;
}