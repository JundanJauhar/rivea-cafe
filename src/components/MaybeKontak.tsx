// components/MaybeKontak.js

"use client";

import { usePathname } from 'next/navigation';
import Kontak from './Kontak';

export default function MaybeKontak() {
  const pathname = usePathname() || '';
  // Sembunyikan Kontak pada rute admin
  if (pathname.startsWith('/admin')) {
    return null;
  }
  return <Kontak />;
}