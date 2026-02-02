import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from '@/components/BackToTop';
import Providers from '@/app/providers';

import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

import RestaurantSchema from "@/components/seo/RestaurantSchema";


export const metadata: Metadata = {
  title: {
    default: "Nhà Hàng Hoa Viên Tri Kỷ",
    template: "%s | Hoa Viên Tri Kỷ",
  },
  description: "Không gian ẩm thực – tiệc cưới – hội nghị cao cấp",
  icons: {
    icon: "/images/logo/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        strategy="afterInteractive"
      />
      <RestaurantSchema />
      <body className={`${inter.className} flex flex-col min-h-screen bg-gray-50 text-gray-900`}>
        <Providers>
          <Navbar />
          <main className="grow">
            {children}
          </main>
          <Footer />
        </Providers>
        <BackToTop />
      </body>
    </html>
  );
}
