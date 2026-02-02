import type { Metadata } from "next";

import Breadcrumb from '@/components/Breadcrumb';
import HeroBreadcrumb from '@/components/HeroBreadcrumb';

import fs from 'fs';
import path from 'path';
import FancyboxGallery from '@/components/FancyboxGallery';

export const metadata: Metadata = {
    title: "Thực đơn Alacarte",
    description: "Thực đơn món ăn tại nhà hàng Hoa Viên Tri Kỷ",
};

export default function MenuPage() {
    const menuDir = path.join(
        path.resolve('./'),
        'public',
        'images',
        'menu'
    );

    const images = fs
        .readdirSync(menuDir)
        .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file));

    return (
        <>
            <Breadcrumb
                items={[
                    { label: 'Trang chủ', href: '/' },
                    { label: 'Thực đơn' },
                    { label: 'Menu Alacarte'}
                ]}
            />
            <main className="max-w-7xl mx-auto px-4 pt-12 pb-24 text-gray-800">
                <header className="mb-12 max-w-3xl">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">
                        Menu Alacarte
                    </h1>
                </header>
                <FancyboxGallery images={images} />
            </main>
        </>

    );
}