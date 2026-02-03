'use client';

import { useState, useRef } from 'react';
import { deleteSpecificImageAction, addImagesToCategoryAction } from '@/actions/gallery-actions';
import { Trash2, Plus, Upload, Loader2 } from 'lucide-react';

interface AdminGalleryViewProps {
    galleries: any[];
}

export default function AdminGalleryView({ galleries }: AdminGalleryViewProps) {
    const [activeTab, setActiveTab] = useState('Restaurant');
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const tabs = [
        { id: 'Restaurant', label: 'Nhà Hàng' },
        { id: 'Dish', label: 'Món Ăn' },
        { id: 'Event', label: 'Sự Kiện' },
        { id: 'Other', label: 'Khác' },
    ];

    // Filter images by category
    const filteredImages = galleries
        .filter(g => g.category === activeTab)
        .flatMap(g => g.images.map((img: string) => ({
            url: img,
            albumId: g._id,
            albumTitle: g.title
        })));

    const handleDelete = async (albumId: string, url: string, index: number) => {
        if (!confirm('Bạn có chắc chắn muốn xóa ảnh này?')) return;

        setLoadingId(`${albumId}-${index}`);
        try {
            await deleteSpecificImageAction(albumId, url);
        } catch (error) {
            alert('Lỗi khi xóa ảnh');
        } finally {
            setLoadingId(null);
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        const uploadedUrls: string[] = [];

        try {
            for (let i = 0; i < files.length; i++) {
                const formData = new FormData();
                formData.append('file', files[i]);

                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (res.ok) {
                    const data = await res.json();
                    uploadedUrls.push(data.url);
                }
            }

            if (uploadedUrls.length > 0) {
                await addImagesToCategoryAction(activeTab, uploadedUrls);
            }
        } catch (error) {
            console.error('Upload failed', error);
            alert('Lỗi khi tải ảnh lên');
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-8">
            {/* Category Tabs */}
            <div className="flex space-x-2 border-b border-gray-100 pb-px overflow-x-auto no-scrollbar">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-4 text-sm font-bold transition-all border-b-2 whitespace-nowrap ${activeTab === tab.id
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
            />

            {/* Images Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {/* Simple Upload Button */}
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="aspect-square bg-blue-50/30 rounded-2xl border-2 border-dashed border-blue-100 flex flex-col items-center justify-center text-blue-500 hover:bg-blue-50 hover:border-blue-300 transition-all group disabled:opacity-50"
                >
                    {uploading ? (
                        <Loader2 size={32} className="animate-spin" />
                    ) : (
                        <>
                            <div className="p-3 bg-blue-100 rounded-full mb-3 group-hover:scale-110 transition-transform">
                                <Upload size={20} />
                            </div>
                            <span className="text-[10px] font-black tracking-widest uppercase">Tải Ảnh Lên</span>
                        </>
                    )}
                </button>

                {filteredImages.map((img, index) => (
                    <div key={`${img.albumId}-${index}`} className="group relative aspect-square bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
                        <img
                            src={img.url}
                            alt={img.albumTitle}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                            <button
                                onClick={() => handleDelete(img.albumId, img.url, index)}
                                disabled={loadingId === `${img.albumId}-${index}`}
                                className="p-2.5 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all disabled:opacity-50"
                            >
                                {loadingId === `${img.albumId}-${index}` ? (
                                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                                ) : (
                                    <Trash2 size={16} />
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredImages.length === 0 && !uploading && (
                <div className="text-center py-20 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-100 italic text-gray-400">
                    Chưa có hình ảnh nào trong danh mục {tabs.find(t => t.id === activeTab)?.label}. Hãy tải lên những tấm ảnh đầu tiên!
                </div>
            )}
        </div>
    );
}
