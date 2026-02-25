import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Providers from '@/app/providers';
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL('https://hoavientriky.vn'),
    title: {
        default: "Nhà Hàng Hoa Viên Tri Kỷ",
        template: "%s | Hoa Viên Tri Kỷ",
    },
    description: "Nhà hàng Hoa Viên Tri Kỷ - Không gian ẩm thực, tiệc cưới, hội nghị cao cấp tại TP.HCM. Đặt tiệc ngay để nhận ưu đãi hấp dẫn.",
    keywords: ["nhà hàng", "hoa viên tri kỷ", "tiệc cưới", "hội nghị", "ẩm thực", "nhà hàng tiệc cưới", "tphcm", "đặt tiệc"],
    authors: [{ name: "Hoa Viên Tri Kỷ" }],
    creator: "Hoa Viên Tri Kỷ",
    publisher: "Hoa Viên Tri Kỷ",
    openGraph: {
        title: "Nhà Hàng Hoa Viên Tri Kỷ",
        description: "Không gian ẩm thực – tiệc cưới – hội nghị cao cấp",
        url: 'https://hoavientriky.vn',
        siteName: 'Hoa Viên Tri Kỷ',
        images: [
            {
                url: '/images/bg.jpg',
                width: 1200,
                height: 630,
                alt: 'Hoa Viên Tri Kỷ',
            },
        ],
        locale: 'vi_VN',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Nhà Hàng Hoa Viên Tri Kỷ",
        description: "Không gian ẩm thực – tiệc cưới – hội nghị cao cấp",
        images: ['/images/bg.jpg'],
    },
    icons: {
        icon: "/images/logo/logo.png",
        apple: "/images/logo/logo.png",
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
            <body className={`${inter.className} min-h-screen bg-gray-50 text-gray-900`}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
