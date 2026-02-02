import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Post } from '@/lib/models';

export async function GET() {
    try {
        await dbConnect();
        const posts = await Post.find({ active: true }).sort({ createdAt: -1 });
        return NextResponse.json(posts);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        // TODO: Generate Slug from Title if not present
        const post = await Post.create(body);
        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }
}
