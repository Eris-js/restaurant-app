import Link from 'next/link';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { revalidatePath } from 'next/cache';
import DeleteButton from '@/components/admin/DeleteButton';
import { Mail, Calendar, Shield, User as UserIcon, Plus } from 'lucide-react';
import { ensureAdmin } from '@/lib/rbac';

async function deleteUser(formData: FormData) {
    'use server';
    await ensureAdmin();
    const id = formData.get('id');
    if (id) {
        await dbConnect();
        await User.findByIdAndDelete(id);
        revalidatePath('/admin/users');
    }
}

export default async function UsersPage() {
    await dbConnect();
    // Fetch users plainly
    const users = await User.find({}).sort({ createdAt: -1 });

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Quản lý người dùng</h2>
                    <p className="text-gray-500 mt-1">Quản lý quyền truy cập hệ thống và người quản trị.</p>
                </div>
                <Link href="/admin/users/create" className="bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 shadow-md transition-all flex items-center font-medium">
                    <Plus size={18} className="mr-2" /> Tạo Người Dùng
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full whitespace-nowrap">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Người dùng</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Liên hệ</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Vai trò</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Tham gia</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {users.map((user: any) => (
                                <tr key={user._id.toString()} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 shrink-0 bg-linear-to-br from-blue-100 to-indigo-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg shadow-sm font-sans">
                                                {user.name?.[0]?.toUpperCase() || <UserIcon size={20} />}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-semibold text-gray-900">{user.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Mail size={16} className="mr-2 text-gray-400" />
                                            {user.email}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full items-center ${user.role === 'admin'
                                                ? 'bg-blue-50 text-blue-700 border border-blue-100'
                                                : 'bg-gray-100 text-gray-600 border border-gray-200'
                                            }`}>
                                            {user.role === 'admin' && <Shield size={12} className="mr-1.5" />}
                                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Calendar size={16} className="mr-2 text-gray-400" />
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm font-medium">
                                        <DeleteButton
                                            id={user._id.toString()}
                                            deleteAction={deleteUser}
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
