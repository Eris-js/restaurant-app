'use client';

import { useState } from 'react';
import { Trash2, Upload, Plus, Image as ImageIcon } from 'lucide-react';

interface GalleryImageManagerProps {
    initialImages: string[];
    onChange: (images: string[]) => void;
}

export default function GalleryImageManager({ initialImages, onChange }: GalleryImageManagerProps) {
    const [images, setImages] = useState<string[]>(initialImages);
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        setUploading(true);
        const newImages = [...images];

        for (let i = 0; i < files.length; i++) {
            const formData = new FormData();
            formData.append('file', files[i]);

            try {
                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });
                const data = await res.json();
                if (data.url) {
                    newImages.push(data.url);
                }
            } catch (error) {
                console.error('Upload failed', error);
            }
        }

        setImages(newImages);
        onChange(newImages);
        setUploading(false);
    };

    const removeImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
        onChange(newImages);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-700 flex items-center">
                    <ImageIcon size={16} className="mr-2 text-gray-400" />
                    Album Images ({images.length})
                </label>

                <label className="cursor-pointer bg-blue-50 text-blue-600 px-4 py-2 rounded-xl border border-blue-100 font-medium text-sm hover:bg-blue-100 transition-all flex items-center">
                    {uploading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Uploading...
                        </>
                    ) : (
                        <>
                            <Upload size={14} className="mr-2" />
                            Upload More
                        </>
                    )}
                    <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleUpload}
                        accept="image/*"
                        disabled={uploading}
                    />
                </label>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {images.map((url, index) => (
                    <div key={index} className="group relative aspect-square bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all">
                        <img
                            src={url}
                            alt={`Gallery ${index}`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}

                {/* Empty slot / placeholder helper */}
                <label className="aspect-square bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:border-blue-300 hover:text-blue-500 hover:bg-blue-50/50 transition-all cursor-pointer">
                    <Plus size={24} />
                    <span className="text-[10px] mt-1 font-semibold">ADD NEW</span>
                    <input
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleUpload}
                        accept="image/*"
                        disabled={uploading}
                    />
                </label>
            </div>
        </div>
    );
}
