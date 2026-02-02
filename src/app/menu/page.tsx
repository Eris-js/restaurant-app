import Breadcrumb from '@/components/Breadcrumb';
import HeroBreadcrumb from '@/components/HeroBreadcrumb';

import fs from 'fs';
import path from 'path';
import FancyboxGallery from '@/components/FancyboxGallery';

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
            <HeroBreadcrumb
                title="Menu"
                background="/images/1.jpg"
            />
            <section className="max-w-7xl mx-auto px-4 pt-10 pb-20">
                <h1 className="relative text-3xl md:text-4xl lg:text-5xl text-center font-bold mb-8">
                    Menu Alacarte
                    <span className="absolute left-1/2 -bottom-2 w-16 h-0.75 bg-[#f2b84b]" />
                </h1>
                <FancyboxGallery images={images} />
            </section>
        </>

    );
}