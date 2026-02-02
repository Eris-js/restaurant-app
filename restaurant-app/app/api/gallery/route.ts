import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Gallery } from '@/lib/models';

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');

        const query = category && category !== 'Tất cả' ? { category } : {};
        const images = await Gallery.find(query).sort({ createdAt: -1 });

        return NextResponse.json(images);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        const image = await Gallery.create(body);
        return NextResponse.json(image, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create gallery item' }, { status: 500 });
    }
}
