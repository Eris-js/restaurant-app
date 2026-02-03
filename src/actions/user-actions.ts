'use server';

import dbConnect from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ensureAdmin } from '@/lib/rbac';

export async function createUserAction(formData: FormData) {
    await ensureAdmin();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const role = formData.get('role') as string;

    if (!name || !email || !password || !role) {
        throw new Error('All fields are required');
    }

    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        name,
        email,
        password: hashedPassword,
        role,
    });

    revalidatePath('/admin/users');
    redirect('/admin/users');
}

export async function deleteUserAction(formData: FormData) {
    await ensureAdmin();
    const id = formData.get('id');
    if (id) {
        await dbConnect();
        await User.findByIdAndDelete(id);
        revalidatePath('/admin/users');
    }
}
