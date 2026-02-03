import Link from 'next/link';
import dbConnect from '@/lib/db';
import Popup from '@/models/Popup';
import { revalidatePath } from 'next/cache';
import DeleteButton from '@/components/admin/DeleteButton';
import { ensureAdmin } from '@/lib/rbac';
import { Layout, Plus, CheckCircle2, XCircle, Power } from 'lucide-react';

async function deletePopup(formData: FormData) {
    'use server';
    await ensureAdmin();
    const id = formData.get('id');
    if (id) {
        await dbConnect();
        await Popup.findByIdAndDelete(id);
        revalidatePath('/admin/popups');
    }
}

async function togglePopup(formData: FormData) {
    'use server';
    await ensureAdmin();
    const id = formData.get('id');
    const isActive = formData.get('isActive') === 'true';
    if (id) {
        await dbConnect();
        // If activating, deactivate all others
        if (!isActive) {
            await Popup.updateMany({}, { isActive: false });
        }
        await Popup.findByIdAndUpdate(id, { isActive: !isActive });
        revalidatePath('/admin/popups');
    }
}

export default async function PopupsPage() {
    await dbConnect();
    const popups = await Popup.find({}).sort({ createdAt: -1 });

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Cửa sổ bật lên lối vào</h2>
                    <p className="text-gray-500 mt-1">Quản lý các thông báo hiển thị cho khách truy cập khi vào cửa hàng.</p>
                </div>
                <Link href="/admin/popups/create" className="bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 shadow-md transition-all flex items-center font-medium">
                    <Plus size={18} className="mr-2" /> Tạo Cửa sổ Mới
                </Link>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full whitespace-nowrap">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Hình</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Tiêu đề</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Trạng thái</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {popups.map((popup: any) => (
                                <tr key={popup._id.toString()} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="h-12 w-12 bg-gray-100 rounded-lg overflow-hidden border border-gray-100">
                                            {popup.image ? (
                                                <img src={popup.image} alt={popup.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                    <Layout size={20} />
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-900">
                                        {popup.title}
                                    </td>
                                    <td className="px-6 py-4">
                                        <form action={togglePopup}>
                                            <input type="hidden" name="id" value={popup._id.toString()} />
                                            <input type="hidden" name="isActive" value={popup.isActive.toString()} />
                                            <button
                                                type="submit"
                                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold transition-all ${popup.isActive
                                                        ? 'bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-100'
                                                        : 'bg-gray-50 text-gray-500 border border-gray-100 hover:bg-gray-100'
                                                    }`}
                                            >
                                                <Power size={12} className="mr-1.5" />
                                                {popup.isActive ? 'Hoạt động' : 'Không hoạt động'}
                                            </button>
                                        </form>
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm font-medium">
                                        <DeleteButton
                                            id={popup._id.toString()}
                                            deleteAction={deletePopup}
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
