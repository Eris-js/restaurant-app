import { MetadataRoute } from 'next';
import dbConnect from '@/lib/db';
import Article from '@/models/Article';
import Promotion from '@/models/Promotion';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://hoavientriky.vn';

    // Connect to DB
    await dbConnect();

    // Fetch dynamic content
    const articles = await Article.find({}).select('slug updatedAt').lean();
    const promotions = await Promotion.find({ isActive: true }).select('_id updatedAt').lean();

    // Static routes
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/thuc-don`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/gioi-thieu`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/hinh-anh`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/khuyen-mai`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ];

    // Dynamic routes for articles
    const articleRoutes: MetadataRoute.Sitemap = articles.map((article: any) => ({
        url: `${baseUrl}/blog/${article.slug}`,
        lastModified: article.updatedAt || new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
    }));

    // Optionally handle promotions if they have detail pages.
    // Currently promotions seem to be displayed on the home page or a shared promotion page.

    return [...staticRoutes, ...articleRoutes];
}
