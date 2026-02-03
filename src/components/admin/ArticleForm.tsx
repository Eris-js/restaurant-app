'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createArticleAction, updateArticleAction } from '@/actions/article-actions';
import RichTextEditor from '@/components/admin/RichTextEditor';
import FeaturedImageUpload from '@/components/admin/FeaturedImageUpload';
import { ChevronLeft, Save, Type, Link as LinkIcon, FileText, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface ArticleFormProps {
    initialData?: any;
}

export default function ArticleForm({ initialData }: ArticleFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState(initialData?.title || '');
    const [slug, setSlug] = useState(initialData?.slug || '');
    const [thumbnail, setThumbnail] = useState(initialData?.thumbnail || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [content, setContent] = useState(initialData?.content || '');

    // Auto-generate slug from title
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setTitle(val);
        if (!initialData) {
            const generatedSlug = val
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[đĐ]/g, 'd')
                .replace(/([^0-9a-z-\s])/g, '')
                .replace(/(\s+)/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-+|-+$/g, '');
            setSlug(generatedSlug);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content) {
            alert('Vui lòng nhập tiêu đề và nội dung');
            return;
        }

        setLoading(true);
        try {
            const data = { title, slug, thumbnail, description, content };
            let res;
            if (initialData) {
                res = await updateArticleAction(initialData._id, data);
            } else {
                res = await createArticleAction(data);
            }

            if (res.success) {
                router.push('/admin/articles');
                router.refresh();
            }
        } catch (error: any) {
            alert(error.message || 'Lỗi khi lưu bài viết');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-7xl mx-auto space-y-8">
            <div className="flex items-center justify-between sticky top-0 bg-gray-50/80 backdrop-blur-md py-4 z-10 border-b border-gray-100 -mx-4 px-4 sm:-mx-8 sm:px-8">
                <div>
                    <Link href="/admin/articles" className="flex items-center text-xs font-bold text-gray-400 hover:text-blue-600 transition-colors uppercase tracking-widest mb-1">
                        <ChevronLeft size={16} className="mr-1" /> Quay lại
                    </Link>
                    <h2 className="text-2xl font-black text-gray-900">
                        {initialData ? 'Chỉnh Sửa Bài Viết' : 'Viết Bài Mới'}
                    </h2>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-8 py-3 rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all font-bold flex items-center disabled:opacity-50"
                >
                    {loading ? (
                        <Loader2 size={20} className="animate-spin" />
                    ) : (
                        <>
                            <Save size={20} className="mr-2" />
                            {initialData ? 'Cập Nhật' : 'Đăng Bài'}
                        </>
                    )}
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content Area */}
                <div className="flex-1 space-y-8">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                        <div className="space-y-4">
                            <label className="text-sm font-bold text-gray-700 flex items-center">
                                <Type size={16} className="mr-2 text-gray-400" /> Tiêu Đề Bài Viết
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={handleTitleChange}
                                required
                                className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-200 transition-all text-xl font-bold text-gray-900 placeholder:text-gray-300"
                                placeholder="Nhập tiêu đề hấp dẫn..."
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-bold text-gray-700 flex items-center">
                                <LinkIcon size={16} className="mr-2 text-gray-400" /> Đường Dẫn (Slug)
                            </label>
                            <div className="flex items-center space-x-2 bg-gray-50 px-6 py-4 rounded-2xl border border-transparent focus-within:ring-4 focus-within:ring-blue-50 focus-within:border-blue-200 focus-within:bg-white transition-all">
                                <span className="text-gray-400 font-medium">/articles/</span>
                                <input
                                    type="text"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    required
                                    className="bg-transparent border-none outline-none flex-1 text-gray-600 font-medium p-0"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-bold text-gray-700 flex items-center">
                                <FileText size={16} className="mr-2 text-gray-400" /> Nội Dung Chi Tiết
                            </label>
                            <RichTextEditor value={content} onChange={setContent} />
                        </div>
                    </div>
                </div>

                {/* Sidebar Settings */}
                <div className="w-full lg:w-80 space-y-8">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                        <FeaturedImageUpload value={thumbnail} onChange={setThumbnail} />

                        <div className="space-y-3 pt-6 border-t border-gray-50">
                            <label className="text-sm font-bold text-gray-700 block">Mô Tả Ngắn (SEO)</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={4}
                                className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-100 transition-all text-sm text-gray-600 leading-relaxed placeholder:text-gray-300"
                                placeholder="Tóm tắt ngắn gọn nội dung bài viết để hiện thị trên Google..."
                            />
                        </div>
                    </div>

                    <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100/50">
                        <h4 className="text-xs font-black text-blue-900 uppercase tracking-widest mb-4">Gợi ý WordPress</h4>
                        <ul className="space-y-3">
                            {[
                                'Sử dụng các thẻ H1, H2 để phân cấp',
                                'Chèn ít nhất 2 hình ảnh minh họa',
                                'Mô tả ngắn chứa từ khóa chính',
                                'Tiêu đề nên dưới 70 ký tự'
                            ].map((tip, i) => (
                                <li key={i} className="flex items-start text-[11px] text-blue-700 leading-relaxed">
                                    <span className="mr-2 mt-1 w-1 h-1 bg-blue-400 rounded-full shrink-0" />
                                    {tip}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </form>
    );
}
