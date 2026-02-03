import Link from 'next/link';
import dbConnect from '@/lib/db';
import Gallery from '@/models/Gallery';
import AdminGalleryView from '@/components/admin/AdminGalleryView';
import { Plus } from 'lucide-react';

export default async function GalleryPage() {
    await dbConnect();
    // Fetch all galleries plainly
    const galleries = await Gallery.find({}).sort({ createdAt: -1 });

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Quản Lý Hình Ảnh</h2>
                    <p className="text-gray-500 mt-1">Xem và quản lý tất cả hình ảnh theo danh mục Nhà Hàng & Món Ăn.</p>
                </div>
                <Link href="/admin/gallery/create" className="bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 shadow-md transition-all flex items-center font-medium">
                    <Plus size={18} className="mr-2" /> Tạo Album Mới
                </Link>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-8">
                <AdminGalleryView galleries={JSON.parse(JSON.stringify(galleries))} />
            </div>
        </div>
    );
}
