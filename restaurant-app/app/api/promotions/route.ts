import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Promotion } from '@/lib/models';

export async function GET() {
    try {
        await dbConnect();
        const now = new Date();
        // Find active promotions where Today is between Start and End date
        const promotions = await Promotion.find({
            active: true,
            startDate: { $lte: now },
            endDate: { $gte: now }
        }).sort({ endDate: 1 });

        return NextResponse.json(promotions);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch promotions' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        const promotion = await Promotion.create(body);
        return NextResponse.json(promotion, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create promotion' }, { status: 500 });
    }
}
