import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function GET() {
    await dbConnect();

    const email = 'admin@example.com';
    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
        return NextResponse.json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    await User.create({
        name: 'Admin User',
        email,
        password: hashedPassword,
        role: 'admin',
    });

    return NextResponse.json({ message: 'Admin created' });
}
