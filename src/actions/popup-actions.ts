'use server';
import dbConnect from '@/lib/db';
import Popup from '@/models/Popup';
import { ensureAdmin } from '@/lib/rbac';
import { revalidatePath } from 'next/cache';

export async function createPopupAction(data: any) {
    await ensureAdmin();
    await dbConnect();
    await Popup.create(data);
    revalidatePath('/admin/popups');
    return { success: true };
}

export async function deletePopupAction(id: string) {
    await ensureAdmin();
    await dbConnect();
    await Popup.findByIdAndDelete(id);
    revalidatePath('/admin/popups');
    return { success: true };
}

export async function togglePopupStatusAction(id: string, active: boolean) {
    await ensureAdmin();
    await dbConnect();
    // Deactivate others if this one is being activated
    if (active) {
        await Popup.updateMany({}, { isActive: false });
    }
    await Popup.findByIdAndUpdate(id, { isActive: active });
    revalidatePath('/admin/popups');
    return { success: true };
}
