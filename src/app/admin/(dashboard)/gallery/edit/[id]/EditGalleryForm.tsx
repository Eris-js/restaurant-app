'use client';

import { useState } from 'react';
import { updateGalleryAction } from '@/actions/gallery-actions';
import GalleryImageManager from '@/components/admin/GalleryImageManager';
import { ChevronLeft, Save, Type, Layout } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function EditGalleryForm({ gallery }: { gallery: any }) {
    const [title, setTitle] = useState(gallery.title);
    const [category, setCategory] = useState(gallery.category);
    const [images, setImages] = useState<string[]>(gallery.images);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        try {
            await updateGalleryAction(gallery._id, { title, category, images });
            router.push('/admin/gallery');
        } catch (error) {
            console.error('Update failed', error);
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <Link href="/admin/gallery" className="flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors mb-2">
                        <ChevronLeft size={16} className="mr-1" />
                        Back to Gallery
                    </Link>
                    <h2 className="text-3xl font-bold text-gray-900">Edit Album</h2>
                    <p className="text-gray-500 mt-1 text-sm font-medium">#{gallery._id}</p>
                </div>

                <div className="flex items-center space-x-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 shadow-md transition-all font-semibold flex items-center disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : (
                            <>
                                <Save size={18} className="mr-2" />
                                Save Changes
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
                            Album Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                            placeholder="e.g. Wedding Event April 2024"
                        />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 flex items-center">
                            <Layout size={16} className="mr-2 text-gray-400" />
                            Category
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all appearance-none cursor-pointer"
                        >
                            <option value="Restaurant">Restaurant</option>
                            <option value="Dish">Dish</option>
                            <option value="Event">Event</option>
                            <option value="Other">Other</option>
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
