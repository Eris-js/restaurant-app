import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Providers from '@/app/providers';
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

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
            <body className={`${inter.className} min-h-screen bg-gray-50 text-gray-900`}>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
