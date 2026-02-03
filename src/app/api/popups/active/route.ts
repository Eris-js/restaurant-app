import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Popup from '@/models/Popup';

export async function GET() {
    await dbConnect();

    // Find the most recent active popup
    const popup = await Popup.findOne({ isActive: true }).sort({ createdAt: -1 });

    if (!popup) {
        return NextResponse.json(null);
    }

    return NextResponse.json(popup);
}
