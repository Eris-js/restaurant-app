'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPopupAction } from '@/actions/popup-actions';

export default function CreatePopupPage() {
    const [uploading, setUploading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setUploading(true);

        const formData = new FormData(e.currentTarget);
        const file = formData.get('imageFile') as File;

        let image = formData.get('image') as string;

        if (file && file.size > 0) {
            const uploadFormData = new FormData();
            uploadFormData.append('file', file);
            try {
                const res = await fetch('/api/upload', {
                    method: 'POST',
                    body: uploadFormData
                });
                if (res.ok) {
                    const data = await res.json();
                    image = data.url;
                }
            } catch (err) {
                console.error('Upload failed', err);
            }
        }

        const res = await createPopupAction({
            title: formData.get('title') as string,
            image: image,
            link: formData.get('link') as string,
            isActive: formData.get('isActive') === 'on'
        });

        if (res.success) {
            router.push('/admin/popups');
            router.refresh();
        } else {
            alert('Failed to create popup');
            setUploading(false);
        }
    }

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
            <h2 className="text-2xl font-bold mb-6">Tạo Cửa sổ Mới</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Tiêu đề</label>
                    <input type="text" name="title" required className="mt-1 block w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Hình ảnh</label>
                    <input type="text" name="image" placeholder="URL or upload below" className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 mb-2" />
                    <input type="file" name="imageFile" accept="image/*" className="block w-full text-sm text-gray-500" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Link (Tùy chọn)</label>
                    <input type="text" name="link" className="mt-1 block w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div className="flex items-center">
                    <input type="checkbox" name="isActive" defaultChecked id="isActive" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                    <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">Hoạt động</label>
                </div>
                <div className="flex justify-end">
                    <button type="submit" disabled={uploading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
                        {uploading ? 'Đợi...' : 'Tạo Cửa sổ'}
                    </button>
                </div>
            </form>
        </div>
    );
}
