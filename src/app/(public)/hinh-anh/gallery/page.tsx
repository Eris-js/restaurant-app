'use client';

import PinterestGallery from '@/components/PinterestGallery';
import { useState } from 'react';

export default function GalleryPage() {
    const [activeTab, setActiveTab] = useState('Restaurant');

    const tabs = [
        { id: 'Restaurant', label: 'Nhà Hàng' },
        { id: 'Dish', label: 'Món Ăn' },
        { id: 'Event', label: 'Sự Kiện' },
    ];

    return (
        <div className="bg-white min-h-screen pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">Thư Viện Ảnh</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Khám phá không gian sang trọng và những món ăn tinh túy nhất tại Hoa Viên Tri Kỷ.
                    </p>
                </div>

                {/* Category Tabs */}
                <div className="flex justify-center items-center space-x-2 mb-12 overflow-x-auto pb-4 no-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 border-2 ${activeTab === tab.id
                                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200 scale-105'
                                    : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200 hover:text-gray-600'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Pinterest Gallery Component */}
                <PinterestGallery category={activeTab} />
            </div>
        </div>
    );
}
