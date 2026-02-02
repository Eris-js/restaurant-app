import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Slider } from '@/lib/models';

export async function GET() {
    try {
        await dbConnect();
        const sliders = await Slider.find({ active: true }).sort({ order: 1 });
        return NextResponse.json(sliders);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch sliders' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        const slider = await Slider.create(body);
        return NextResponse.json(slider, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create slider' }, { status: 500 });
    }
}
