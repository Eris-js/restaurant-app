'use client';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';

type GalleryImage = {
    src: string;
    category: 'Không gian' | 'Món ăn';
    alt: string;
};

// Placeholder data - replace with DB data later
const GALLERY_IMAGES: GalleryImage[] = [
    { src: "banner/1.jpg", category: 'Không gian', alt: "Sảnh tiệc lung linh" },
    { src: "banner/2.gif", category: 'Không gian', alt: "Không gian ngoài trời" },
    { src: "banner/3ac.jpg", category: 'Món ăn', alt: "Món khai vị đặc biệt" },
    { src: "banner/4.gif", category: 'Không gian', alt: "Phòng VIP sang trọng" },
    { src: "banner/5ac.jpg", category: 'Món ăn', alt: "Hải sản tươi sống" },
    { src: "banner/6ac.jpg", category: 'Món ăn', alt: "Món nướng BBQ" },
    { src: "banner/h7.gif", category: 'Không gian', alt: "Góc check-in đẹp" },
    { src: "banner/h8.gif", category: 'Không gian', alt: "View hồ cá koi" },
];

const CATEGORIES = ['Tất cả', 'Không gian', 'Món ăn'];

export default function GallerySection() {
    const [activeCategory, setActiveCategory] = useState('Tất cả');
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

    const filteredImages = activeCategory === 'Tất cả'
        ? GALLERY_IMAGES
        : GALLERY_IMAGES.filter(img => img.category === activeCategory);

    const openLightbox = (index: number) => {
        setSelectedImageIndex(index);
    };

    const closeLightbox = () => setSelectedImageIndex(null);

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((prev) => (prev! + 1) % filteredImages.length);
        }
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((prev) => (prev! - 1 + filteredImages.length) % filteredImages.length);
        }
    };

    return (
        <section id="gallery" className="py-20 bg-black text-white px-4">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold uppercase pb-2 border-b-2 border-[#f2b84b] inline-block">
                        Thư viện hình ảnh
                    </h2>
                    <p className="mt-4 text-gray-400">
                        Khám phá không gian và ẩm thực tại Hoa Viên Tri Kỷ
                    </p>

                    <div className="flex justify-center space-x-4 mt-8 flex-wrap gap-y-4">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={clsx(
                                    "px-6 py-2 rounded-full border transition-all duration-300",
                                    activeCategory === cat
                                        ? "bg-[#f2b84b] border-[#f2b84b] text-black font-bold"
                                        : "border-gray-600 text-gray-400 hover:border-white hover:text-white"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {filteredImages.map((img, idx) => (
                        <div
                            key={idx}
                            onClick={() => openLightbox(idx)}
                            className="relative aspect-square group overflow-hidden rounded-lg bg-gray-800 cursor-pointer"
                        >
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 group-hover:scale-110 transition-transform duration-500 bg-gray-900">
                                <span className="text-xs uppercase mb-2 text-[#f2b84b]">{img.category}</span>
                                {/* Note: Using text for placeholder until real images are in public/ */}
                                <span className="text-sm px-2 text-center text-gray-500 break-all">{img.src}</span>
                            </div>

                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-[#f2b84b] font-medium border border-[#f2b84b] px-4 py-1 rounded-full hover:bg-[#f2b84b] hover:text-black transition-colors">
                                    Xem ảnh
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedImageIndex !== null && (
                <div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm" onClick={closeLightbox}>
                    <button className="absolute top-4 right-4 text-white hover:text-[#f2b84b] z-50">
                        <X size={32} />
                    </button>

                    <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-[#f2b84b] z-50 p-2" onClick={prevImage}>
                        <ChevronLeft size={48} />
                    </button>

                    <div className="relative max-w-5xl w-full h-[80vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                        <div className="bg-gray-800 w-full h-full rounded flex items-center justify-center text-white relative">
                            {/* Image Placeholder */}
                            <div className="text-center">
                                <p className="text-3xl font-bold mb-4">{filteredImages[selectedImageIndex].src}</p>
                                <p className="text-[#f2b84b] text-xl">{filteredImages[selectedImageIndex].alt}</p>
                            </div>
                        </div>
                    </div>

                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-[#f2b84b] z-50 p-2" onClick={nextImage}>
                        <ChevronRight size={48} />
                    </button>
                </div>
            )}
        </section>
    );
}
