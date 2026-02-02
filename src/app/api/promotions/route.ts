import dbConnect from '@/lib/db';
import Promotion from '@/models/Promotion';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  await dbConnect();
  const { searchParams } = new URL(req.url);
  const activeOnly = searchParams.get('active') === 'true';

  try {
    const query: any = {};
    if (activeOnly) {
        const now = new Date();
        query.startDate = { $lte: now };
        query.endDate = { $gte: now };
        query.isActive = true;
    }
    const promotions = await Promotion.find(query).sort({ endDate: 1 });
    return NextResponse.json({ success: true, data: promotions });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch promotions' }, { status: 400 });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    const promotion = await Promotion.create(body);
    return NextResponse.json({ success: true, data: promotion }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create promotion' }, { status: 400 });
  }
}
