import Link from 'next/link';
import dbConnect from '@/lib/db';
import Promotion from '@/models/Promotion';
import { revalidatePath } from 'next/cache';
import DeleteButton from '@/components/admin/DeleteButton';
import { ensureAdmin } from '@/lib/rbac';
import { Tag, Calendar, Plus, CheckCircle2, XCircle } from 'lucide-react';

async function deletePromotion(formData: FormData) {
    'use server';
    await ensureAdmin();
    const id = formData.get('id');
    if (id) {
        await dbConnect();
        await Promotion.findByIdAndDelete(id);
        revalidatePath('/admin/promotions');
    }
}

export default async function PromotionsPage() {
    await dbConnect();
    const promotions = await Promotion.find({}).sort({ createdAt: -1 });

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Khuyến mãi & Ưu đãi</h2>
                    <p className="text-gray-500 mt-1">Quản lý các chiến dịch marketing và giảm giá theo mùa.</p>
                </div>
                <Link href="/admin/promotions/create" className="bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 shadow-md transition-all flex items-center font-medium">
                    <Plus size={18} className="mr-2" /> Tạo Khuyến mãi Mới
                </Link>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full whitespace-nowrap">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Chiến dịch</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Thời gian</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Trạng thái</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {promotions.map((promo: any) => (
                                <tr key={promo._id.toString()} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-12 w-16 shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-100">
                                                {promo.thumbnail ? (
                                                    <img src={promo.thumbnail} alt={promo.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                        <Tag size={20} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="ml-4 max-w-xs">
                                                <div className="text-sm font-bold text-gray-900 line-clamp-1">{promo.title}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        <div className="flex items-center">
                                            <Calendar size={14} className="mr-2 text-gray-400" />
                                            {new Date(promo.startDate).toLocaleDateString()} - {new Date(promo.endDate).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${promo.isActive
                                                ? 'bg-green-50 text-green-700 border border-green-100'
                                                : 'bg-red-50 text-red-700 border border-red-100'
                                            }`}>
                                            {promo.isActive ? (
                                                <><CheckCircle2 size={12} className="mr-1.5" /> Hoạt động</>
                                            ) : (
                                                <><XCircle size={12} className="mr-1.5" /> Không hoạt động</>
                                            )}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm font-medium">
                                        <DeleteButton
                                            id={promo._id.toString()}
                                            deleteAction={deletePromotion}
                                            className="text-gray-400 hover:text-red-600 transition-colors"
                                            showText={false}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
