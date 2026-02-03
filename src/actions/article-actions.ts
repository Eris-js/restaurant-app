'use server';

import dbConnect from '@/lib/db';
import Article from '@/models/Article';
import { revalidatePath } from 'next/cache';
import { ensureAdmin } from '@/lib/rbac';

function cleanQuillHtml(html: string) {
    return html
        .replace(/&nbsp;/g, ' ')
        .replace(/<p>\s*<\/p>/g, '')
        .replace(/<p>\s*<br\s*\/?>\s*<\/p>/g, '')
        .trim();
}

export async function createArticleAction(data: {
    title: string;
    slug: string;
    thumbnail: string;
    description: string;
    content: string;
}) {
    await ensureAdmin();
    await dbConnect();

    const article = await Article.create({
        ...data,
        content: cleanQuillHtml(data.content)
    });
    revalidatePath('/admin/articles');
    revalidatePath('/articles');
    return { success: true, id: article._id.toString() };
}

export async function updateArticleAction(id: string, data: {
    title: string;
    slug: string;
    thumbnail: string;
    description: string;
    content: string;
}) {
    await ensureAdmin();
    await dbConnect();

    await Article.findByIdAndUpdate(id, { ...data, content: cleanQuillHtml(data.content) });
    revalidatePath('/admin/articles');
    revalidatePath('/articles');
    revalidatePath(`/articles/${data.slug}`);
    return { success: true };
}

export async function deleteArticleAction(id: string) {
    await ensureAdmin();
    await dbConnect();

    await Article.findByIdAndDelete(id);
    revalidatePath('/admin/articles');
    revalidatePath('/articles');
    return { success: true };
}
