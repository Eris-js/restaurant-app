import dbConnect from '@/lib/db';
import Article from '@/models/Article';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function getArticle(slug: string) {
    await dbConnect();
    const article = await Article.findOne({ slug }).lean();
    if (!article) return null;
    return JSON.parse(JSON.stringify(article));
}

async function getRelatedArticles(slug: string) {
    await dbConnect();
    return Article.find({
        slug: { $ne: slug },
    })
        .sort({ createdAt: -1 })
        .limit(3)
        .lean();
}

export default async function ArticleDetail({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const article = await getArticle(slug);
    if (!article) notFound();

    const relatedArticles = await getRelatedArticles(slug);

    return (
        <article className="bg-white">
            {/* ===== HERO ===== */}
            <div className="relative h-[420px] md:h-[520px]">
                <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />

                <div className="relative z-10 max-w-4xl mx-auto px-6 h-full flex flex-col justify-end pb-12">
                    <div className="mb-4">
                        <span className="px-3 py-1 bg-orange-600 text-white text-xs font-bold uppercase tracking-widest rounded-full">
                            Tin Tức
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                        {article.title}
                    </h1>

                    <div className="mt-6 flex items-center text-gray-300 text-sm">
                        <span className="mr-4">Bởi Admin</span>
                        <span className="w-1 h-1 bg-gray-500 rounded-full mr-4" />
                        <span>{new Date(article.createdAt).toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                </div>
            </div>

            {/* ===== CONTENT ===== */}
            <div className="max-w-3xl mx-auto px-6 py-16">
                {article.description && (
                    <div className="mb-10 text-xl text-gray-500 font-medium leading-relaxed italic border-l-4 border-orange-500 pl-6 py-2">
                        {article.description}
                    </div>
                )}

                <div className="prose prose-lg prose-neutral max-w-none prose-headings:font-bold prose-a:text-orange-600">
                    <div dangerouslySetInnerHTML={{ __html: article.content }} />
                </div>
            </div>

            {/* ===== RELATED ARTICLES ===== */}
            {relatedArticles.length > 0 && (
                <section className="bg-gray-50 py-20 border-t border-gray-100">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900">
                                Bài viết liên quan
                            </h2>
                            <div className="w-20 h-1 bg-orange-500 mt-4" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {relatedArticles.map((item: any) => (
                                <Link
                                    key={item._id.toString()}
                                    href={`/blog/${item.slug}`}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
                                >
                                    <div className="h-56 overflow-hidden">
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-orange-600 transition">
                                            {item.title}
                                        </h3>

                                        <p className="mt-3 text-sm text-gray-500 line-clamp-2">
                                            {item.description}
                                        </p>

                                        <p className="mt-6 text-sm text-orange-600 font-bold uppercase tracking-widest flex items-center">
                                            Xem chi tiết <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </article>
    );
}
