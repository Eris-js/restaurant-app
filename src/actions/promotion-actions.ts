'use server';
import dbConnect from '@/lib/db';
import Promotion from '@/models/Promotion';
import { ensureAdmin } from '@/lib/rbac';
import { revalidatePath } from 'next/cache';

export async function createPromotionAction(data: any) {
    await ensureAdmin();
    await dbConnect();
    await Promotion.create(data);
    revalidatePath('/admin/promotions');
    return { success: true };
}

export async function deletePromotionAction(id: string) {
    await ensureAdmin();
    await dbConnect();
    await Promotion.findByIdAndDelete(id);
    revalidatePath('/admin/promotions');
    return { success: true };
}
