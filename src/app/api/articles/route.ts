import dbConnect from '@/lib/db';
import Article from '@/models/Article';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  try {
    const articles = await Article.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: articles });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch articles' }, { status: 400 });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    const article = await Article.create(body);
    return NextResponse.json({ success: true, data: article }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create article' }, { status: 400 });
  }
}
