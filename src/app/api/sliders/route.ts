import dbConnect from '@/lib/db';
import Slider from '@/models/Slider';
import { NextResponse } from 'next/server';

export async function GET() {
  await dbConnect();
  try {
    const sliders = await Slider.find({}).sort({ order: 1 });
    return NextResponse.json({ success: true, data: sliders });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch sliders' }, { status: 400 });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    const slider = await Slider.create(body);
    return NextResponse.json({ success: true, data: slider }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create slider' }, { status: 400 });
  }
}
