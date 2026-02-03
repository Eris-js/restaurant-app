import dbConnect from '@/lib/db';
import Article from '@/models/Article';
import ArticleForm from '@/components/admin/ArticleForm';
import { notFound } from 'next/navigation';

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await dbConnect();

    const article = await Article.findById(id);
    if (!article) {
        notFound();
    }

    return <ArticleForm initialData={JSON.parse(JSON.stringify(article))} />;
}
