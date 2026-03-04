import dbConnect from "@/lib/db";
import Article from "@/models/Article";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

async function getArticles() {
  await dbConnect();
  const articles = await Article.find({})
    .sort({ createdAt: -1 })
    .lean();

  return JSON.parse(JSON.stringify(articles));
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "");
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-50 to-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Tin Tức & Bài Viết
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Cập nhật những câu chuyện mới nhất, chia sẻ kinh nghiệm và thông tin
            hữu ích từ chúng tôi.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article: any) => (
            <Link
              key={article._id}
              href={`/articles/${article.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
            >
              {/* Thumbnail */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={article.thumbnail}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition duration-500" />

                {/* Date badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold text-gray-700 rounded-full shadow">
                  {new Date(article.createdAt).toLocaleDateString()}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col grow">
                <h2 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-orange-600 transition">
                  {article.title}
                </h2>

                <p className="text-sm text-gray-600 mt-3 line-clamp-3">
                  {stripHtml(article.content).slice(0, 120)}...
                </p>

                <span className="mt-auto pt-6 text-sm font-medium text-orange-600 group-hover:text-orange-500 transition flex items-center gap-2">
                  Đọc tiếp →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {articles.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            Chưa có bài viết nào.
          </div>
        )}
      </section>
    </div>
  );
}