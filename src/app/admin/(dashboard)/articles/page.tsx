import Link from 'next/link';
import dbConnect from '@/lib/db';
import Article from '@/models/Article';
import { revalidatePath } from 'next/cache';
import DeleteButton from '@/components/admin/DeleteButton';
import { ensureAdmin } from '@/lib/rbac';
import { FileText, Calendar, Plus, Edit2, ExternalLink } from 'lucide-react';

async function deleteArticle(formData: FormData) {
    'use server';
    await ensureAdmin();
    const id = formData.get('id');
    if (id) {
        await dbConnect();
        await Article.findByIdAndDelete(id);
        revalidatePath('/admin/articles');
    }
}

export default async function ArticlesPage() {
    await dbConnect();
    const articles = await Article.find({}).sort({ createdAt: -1 });

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Articles & News</h2>
                    <p className="text-gray-500 mt-1">Manage blog posts, news, and announcements.</p>
                </div>
                <Link href="/admin/articles/create" className="bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 shadow-md transition-all flex items-center font-medium">
                    <Plus size={18} className="mr-2" /> Create Article
                </Link>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full whitespace-nowrap">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Article</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Slug</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {articles.map((article: any) => (
                                <tr key={article._id.toString()} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-12 w-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-100">
                                                {article.thumbnail ? (
                                                    <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                        <FileText size={20} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="ml-4 max-w-xs">
                                                <div className="text-sm font-bold text-gray-900 line-clamp-1">{article.title}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center text-xs font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded-md w-fit">
                                            /{article.slug}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Calendar size={14} className="mr-2 text-gray-400" />
                                            {new Date(article.createdAt).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right text-sm font-medium">
                                        <div className="flex items-center justify-end space-x-3">
                                            <Link
                                                href={`/articles/${article.slug}`}
                                                target="_blank"
                                                className="text-gray-400 hover:text-blue-600 transition-colors"
                                                title="View Publicly"
                                            >
                                                <ExternalLink size={16} />
                                            </Link>
                                            <Link
                                                href={`/admin/articles/edit/${article._id}`}
                                                className="text-gray-400 hover:text-blue-600 transition-colors"
                                                title="Edit Article"
                                            >
                                                <Edit2 size={16} />
                                            </Link>
                                            <DeleteButton
                                                id={article._id.toString()}
                                                deleteAction={deleteArticle}
                                                className="text-gray-400 hover:text-red-600 transition-colors"
                                                showText={false}
                                            />
                                        </div>
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
