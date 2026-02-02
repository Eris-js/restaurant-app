'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import FlipBook to avoid SSR issues with react-pageflip canvas
const FlipBook = dynamic(() => import('./FlipBook'), { ssr: false });

export default function MenuSection() {
    // In a real app, you might fetch this list from API
    // For now, assuming user puts images named 1.jpg, 2.jpg... in public/menu
    // Or we provide a list of filenames
    const [menuImages, setMenuImages] = useState<string[]>([
        /* 
           TODO: User needs to populate public/menu folder.
           We will list some placeholders here.
        */
        "/menu/1.jpg",
        "/menu/2.jpg",
        "/menu/3.jpg",
        "/menu/4.jpg",
        "/menu/5.jpg"
    ]);

    // Simple check (in production you'd check if file exists or fetch list)

    return (
        <section id="menu" className="py-20 bg-[#1c1c1c] text-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold uppercase pb-2 border-b-2 border-[#f2b84b] inline-block">
                        Thực Đơn
                    </h2>
                    <p className="mt-4 text-gray-400">
                        Xem thực đơn chi tiết (Lật trang để xem)
                    </p>
                </div>

                {/* FlipBook Container */}
                <div className="min-h-[600px] flex items-center justify-center">
                    <FlipBook images={menuImages} />
                </div>

                <div className="text-center mt-8 text-gray-500 text-sm italic">
                    * Hình ảnh mang tính chất minh họa. Vui lòng liên hệ nhân viên để được tư vấn chi tiết.
                </div>
            </div>
        </section>
    );
}
