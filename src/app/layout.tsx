import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MaybeNav from "../components/MaybeNav";
import MaybeKontak from "../components/MaybeKontak";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RIVEA COFFE",
  description: "RASA YANG MENGALIR",
  icons: {
    icon: [
      { url: '/logo-cafe-rivea.png', sizes: 'any' },
      { url: '/logo-cafe-rivea.png', type: 'image/png' }
    ],
    apple: '/logo-cafe-rivea.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <MaybeNav />
          <div className="pt-10">
            {children}
          </div>
          <MaybeKontak />
      </body>
    </html>
  );
}
