import {
    Users,
    FileText,
    Tag,
    Image as ImageIcon
} from 'lucide-react';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Article from '@/models/Article';
import Promotion from '@/models/Promotion';
import Gallery from '@/models/Gallery';

async function getStats() {
    await dbConnect();
    const [userCount, articleCount, promotionCount, galleryCount] = await Promise.all([
        User.countDocuments(),
        Article.countDocuments(),
        Promotion.countDocuments(),
        Gallery.countDocuments(),
    ]);
    return { userCount, articleCount, promotionCount, galleryCount };
}

export default async function AdminDashboard() {
    const stats = await getStats();

    const statCards = [
        { name: 'Người dùng', value: stats.userCount, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
        { name: 'Bài viết', value: stats.articleCount, icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { name: 'Khuyến mãi', value: stats.promotionCount, icon: Tag, color: 'text-purple-600', bg: 'bg-purple-50' },
        { name: 'Hình ảnh', value: stats.galleryCount, icon: ImageIcon, color: 'text-orange-600', bg: 'bg-orange-50' },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Tổng Quan</h1>
                <p className="text-gray-500 mt-2">Chào mừng bạn quay lại bảng điều khiển CMS.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat) => (
                    <div key={stat.name} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${stat.bg}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                        </div>
                        <h3 className="text-gray-500 font-medium text-sm">{stat.name}</h3>
                        <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
