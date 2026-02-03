import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Gallery from '@/models/Gallery';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');

        await dbConnect();

        let query = {};
        if (category) {
            query = { category };
        }

        const galleries = await Gallery.find(query).sort({ createdAt: -1 });

        // Flatten all images from all albums in this category
        const allImages = galleries.flatMap(g => g.images.map((img: string) => ({
            url: img,
            title: g.title,
            category: g.category,
            albumId: g._id
        })));

        return NextResponse.json(allImages);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
    }
}
