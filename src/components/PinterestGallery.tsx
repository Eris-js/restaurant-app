'use client';

import { useEffect, useState, useRef } from 'react';
import Masonry from 'react-masonry-css';

import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

interface GalleryImage {
    url: string;
    title: string;
    category: string;
}

interface PinterestGalleryProps {
    category?: string;
}

export default function PinterestGallery({ category }: PinterestGalleryProps) {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchImages() {
            try {
                const url = category
                    ? `/api/gallery/images?category=${category}`
                    : '/api/gallery/images';
                const res = await fetch(url);
                const data = await res.json();
                setImages(data);
            } catch (error) {
                console.error('Failed to fetch gallery images', error);
            } finally {
                setLoading(false);
            }
        }

        fetchImages();
    }, [category]);

    useEffect(() => {
        if (!images.length) return;

        Fancybox.bind('[data-fancybox="image"]', {
            theme: "dark",
            dragToClose: false,
            Carousel: {
                Thumbs: false,
            },
        });

        return () => {
            Fancybox.unbind('[data-fancybox="image"]');
        };
    }, [images]);

    const cols = { default: 4, 1100: 3, 700: 2, 500: 1 };


    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <Masonry
                breakpointCols={cols}
                className="masonry-grid"
                columnClassName="masonry-grid_column"
            >
                {images.map((image, index) => (
                    <a
                        key={index}
                        data-fancybox="image"
                        href={image.url}
                        className="group block overflow-hidden rounded-2xl bg-gray-100"
                    >
                        <img
                            src={image.url}
                            alt={image.title}
                            loading="lazy"
                            className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                        />
                    </a>
                ))}
            </Masonry>

            {images.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-400 font-medium">Không tìm thấy hình ảnh nào trong danh mục này.</p>
                </div>
            )}
        </div>
    );
}
