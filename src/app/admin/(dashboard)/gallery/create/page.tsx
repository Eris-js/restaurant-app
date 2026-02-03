'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createGalleryAction } from '@/actions/gallery-actions';
import GalleryImageManager from '@/components/admin/GalleryImageManager';
import { ChevronLeft, Plus, Save, Type, Layout } from 'lucide-react';
import Link from 'next/link';

export default function CreateGalleryPage() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Restaurant');
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (images.length === 0) {
            alert('Vui lòng thêm ít nhất một hình ảnh.');
            return;
        }

        setLoading(true);
        try {
            const res = await createGalleryAction({ title, category, images });
            if (res.success) {
                router.push('/admin/gallery');
                router.refresh();
            }
        } catch (error) {
            console.error('Tạo không thành công', error);
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-6xl mx-auto space-y-8">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <Link href="/admin/gallery" className="flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors mb-2">
                        <ChevronLeft size={16} className="mr-1" />
                        Quay lại thư viện ảnh
                    </Link>
                    <h2 className="text-3xl font-bold text-gray-900">Tạo Album Mới</h2>
                    <p className="text-gray-500 mt-1">Bắt đầu một bộ sưu tập mới.</p>
                </div>

                <div className="flex items-center space-x-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 shadow-md transition-all font-semibold flex items-center disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : (
                            <>
                                <Plus size={18} className="mr-2" />
                                Tạo Album
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Album Title */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 flex items-center">
                            <Type size={16} className="mr-2 text-gray-400" />
                            Tiêu đề Album
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                            placeholder="e.g. Delicious Seafood"
                        />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 flex items-center">
                            <Layout size={16} className="mr-2 text-gray-400" />
                            Danh mục
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all appearance-none cursor-pointer"
                        >
                            <option value="Restaurant">Nhà hàng</option>
                            <option value="Dish">Món ăn</option>
                            <option value="Event">Sự kiện</option>
                            <option value="Other">Khác</option>
                        </select>
                    </div>
                </div>

                <div className="pt-8 border-t border-gray-50">
                    <GalleryImageManager initialImages={images} onChange={setImages} />
                </div>
            </div>
        </form>
    );
}
