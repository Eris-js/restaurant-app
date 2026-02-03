'use client';

import { useParams } from 'next/navigation';
import PinterestGallery from '@/components/PinterestGallery';
import { use } from 'react';

const categoryMap: Record<string, { id: string, label: string }> = {
    'nha-hang': { id: 'Restaurant', label: 'Không Gian Nhà Hàng' },
    'mon-an': { id: 'Dish', label: 'Thực Đơn Món Ăn' },
    'su-kien': { id: 'Event', label: 'Sự Kiện & Tiệc' },
};

export default function CategoryGalleryPage({ params }: { params: Promise<{ category: string }> }) {
    const resolvedParams = use(params);
    const categorySlug = resolvedParams.category;
    const categoryInfo = categoryMap[categorySlug];

    if (!categoryInfo) {
        return (
            <div className="pt-32 pb-20 text-center">
                <h1 className="text-2xl font-bold text-gray-900">Danh mục không tồn tại</h1>
                <p className="text-gray-500 mt-2">Vui lòng kiểm tra lại đường dẫn.</p>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">
                        {categoryInfo.label}
                    </h1>
                    <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full mb-6" />
                </div>

                {/* Pinterest Gallery Component filtered by category */}
                <PinterestGallery category={categoryInfo.id} />
            </div>
        </div>
    );
}
