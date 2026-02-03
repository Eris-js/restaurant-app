import dbConnect from '@/lib/db';
import Article from '@/models/Article';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

async function getArticles() {
  await dbConnect();
  const articles = await Article.find({}).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(articles));
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Latest News</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Stay updated with our latest stories and announcements.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article: any) => (
          <div key={article._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 flex flex-col h-full">
             <div className="h-48 relative bg-gray-200">
                <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover" />
             </div>
             <div className="p-6 flex flex-col flex-grow">
               <h2 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2">{article.title}</h2>
               <p className="text-gray-500 text-sm mb-4">{new Date(article.createdAt).toLocaleDateString()}</p>
               <div className="mt-auto">
                 <Link href={`/articles/${article.slug}`} className="text-orange-600 font-semibold hover:text-orange-800 transition">Read Article &rarr;</Link>
               </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
