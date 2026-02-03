import Link from 'next/link';
import { redirect } from "next/navigation";
import { auth, signOut } from '@/lib/auth';
import {
    Users,
    FileText,
    Image as ImageIcon,
    Tag,
    MessageSquare,
    LayoutDashboard,
    LogOut
} from 'lucide-react';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    const navItems = [
        { name: 'Bảng điều khiển', href: '/admin', icon: LayoutDashboard },
        { name: 'Người dùng', href: '/admin/users', icon: Users },
        { name: 'Bài viết', href: '/admin/articles', icon: FileText },
        { name: 'Hình ảnh', href: '/admin/gallery', icon: ImageIcon },
        { name: 'Khuyến mãi', href: '/admin/promotions', icon: Tag },
        { name: 'Popups', href: '/admin/popups', icon: MessageSquare },
    ];

    // Chưa login
    if (!session) {
        redirect("/login?callbackUrl=/admin");
    }

    // Không phải admin
    if (session.user && (session.user as any).role !== "admin") {
        redirect("/403");
    }
    
    return (
        <div className="flex h-screen bg-gray-50 text-gray-900 font-sans">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-gray-200 flex flex-col shadow-sm z-10">
                <div className="p-8 border-b border-gray-100 flex items-center justify-center">
                    {/* Placeholder for Logo */}
                    <div className="text-2xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        CMS Admin
                    </div>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center px-4 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all duration-200 group"
                        >
                            <item.icon className="w-5 h-5 mr-3 text-gray-400 group-hover:text-blue-600 transition-colors" />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 m-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                            {session?.user?.name?.[0] || 'A'}
                        </div>
                        <div className="ml-3 overflow-hidden">
                            <p className="text-sm font-semibold text-gray-800 truncate">{session?.user?.name}</p>
                            <p className="text-xs text-gray-500 truncate">{session?.user?.email}</p>
                        </div>
                    </div>
                    <form
                        action={async () => {
                            'use server';
                            await signOut();
                        }}
                    >
                        <button className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-100 rounded-lg hover:bg-red-50 transition-colors">
                            <LogOut className="w-4 h-4 mr-2" />
                            Đăng xuất
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-gray-50/50">
                <div className="max-w-7xl mx-auto p-8 lg:p-12">
                    {children}
                </div>
            </main>
        </div>
    );
}
