'use client';

import { createUserAction } from '@/actions/user-actions';
import { useState } from 'react';
import { User, Mail, Lock, Shield, ChevronLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function CreateUserPage() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setError(null);
        try {
            await createUserAction(formData);
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <Link href="/admin/users" className="flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors mb-2">
                        <ChevronLeft size={16} className="mr-1" />
                        Trở lại danh sách người dùng
                    </Link>
                    <h2 className="text-3xl font-bold text-gray-900">Tạo Người Dùng Mới</h2>
                    <p className="text-gray-500 mt-1">Thêm một người quản trị hoặc biên tập viên mới vào hệ thống.</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <form action={handleSubmit} className="p-8 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Full Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center">
                                <User size={16} className="mr-2 text-gray-400" />
                                Họ và tên
                            </label>
                            <input
                                type="text"
                                name="name"
                                required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                placeholder="John Doe"
                            />
                        </div>

                        {/* Email Address */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center">
                                <Mail size={16} className="mr-2 text-gray-400" />
                                Địa chỉ Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                placeholder="john@example.com"
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center">
                                <Lock size={16} className="mr-2 text-gray-400" />
                                Mật khẩu
                            </label>
                            <input
                                type="password"
                                name="password"
                                required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        {/* Role Selection */}
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center">
                                <Shield size={16} className="mr-2 text-gray-400" />
                                Vai trò người dùng
                            </label>
                            <select
                                name="role"
                                required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all appearance-none cursor-pointer"
                            >
                                <option value="user">Người dùng / Biên tập viên</option>
                                <option value="admin">Quản trị viên</option>
                            </select>
                        </div>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium flex items-center">
                            <span className="mr-2">⚠️</span>
                            {error}
                        </div>
                    )}

                    <div className="pt-4 flex items-center justify-end space-x-4 border-t border-gray-50">
                        <Link
                            href="/admin/users"
                            className="px-6 py-3 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
                        >
                            Hủy bỏ
                        </Link>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 shadow-md transition-all font-semibold flex items-center disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Đang tạo...
                                </>
                            ) : (
                                <>
                                    <Save size={18} className="mr-2" />
                                    Tạo Người Dùng
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
