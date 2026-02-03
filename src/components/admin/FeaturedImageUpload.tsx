'use client';

import { useState } from 'react';
import { Image as ImageIcon, X, Upload, Loader2 } from 'lucide-react';

interface FeaturedImageUploadProps {
    value: string;
    onChange: (url: string) => void;
}

export default function FeaturedImageUpload({ value, onChange }: FeaturedImageUploadProps) {
    const [loading, setLoading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                const data = await res.json();
                onChange(data.url);
            }
        } catch (error) {
            console.error('Upload failed', error);
            alert('Lỗi khi tải ảnh lên');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <label className="text-sm font-bold text-gray-700 block">Ảnh Bìa Bài Viết</label>

            {value ? (
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-gray-100 shadow-sm group">
                    <img src={value} alt="Featured" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                            onClick={() => onChange('')}
                            className="p-2 bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md transition-all"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>
            ) : (
                <label className="flex flex-col items-center justify-center w-full aspect-video rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 hover:bg-blue-50/30 hover:border-blue-200 transition-all cursor-pointer group">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {loading ? (
                            <Loader2 size={32} className="text-blue-500 animate-spin" />
                        ) : (
                            <>
                                <div className="p-4 bg-white rounded-2xl shadow-sm mb-4 group-hover:scale-110 transition-transform">
                                    <ImageIcon size={24} className="text-gray-400 group-hover:text-blue-500" />
                                </div>
                                <p className="text-sm text-gray-500 font-medium">Nhấn để tải ảnh bìa</p>
                                <p className="text-xs text-gray-400 mt-1">Khuyên dùng: 1200 x 630px</p>
                            </>
                        )}
                    </div>
                    <input type="file" className="hidden" onChange={handleUpload} disabled={loading} accept="image/*" />
                </label>
            )}
        </div>
    );
}
