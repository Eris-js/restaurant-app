import dbConnect from '@/lib/db';
import Article from '@/models/Article';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function getArticle(slug: string) {
  await dbConnect();
  const article = await Article.findOne({ slug }).lean();
  if (!article) return null;
  return JSON.parse(JSON.stringify(article));
}

export default async function ArticleDetail({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
         <img src={article.thumbnail} alt={article.title} className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
      <p className="text-gray-500 mb-8 pb-8 border-b border-gray-200">Published on {new Date(article.createdAt).toLocaleDateString()}</p>
      
      <div className="prose prose-lg max-w-none text-gray-700">
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>
    </div>
  );
}
