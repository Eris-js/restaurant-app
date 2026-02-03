'use server';
import dbConnect from '@/lib/db';
import Gallery from '@/models/Gallery';
import { revalidatePath } from 'next/cache';
import { ensureAdmin } from '@/lib/rbac';

export async function createGalleryAction(data: { title: string, category: string, images: string[] }) {
    await ensureAdmin();
    await dbConnect();
    await Gallery.create(data);
    revalidatePath('/admin/gallery');
    return { success: true };
}

export async function updateGalleryAction(id: string, data: { title: string, category: string, images: string[] }) {
    await ensureAdmin();
    await dbConnect();
    await Gallery.findByIdAndUpdate(id, data);
    revalidatePath('/admin/gallery');
    return { success: true };
}

export async function deleteGalleryAction(id: string) {
    await ensureAdmin();
    await dbConnect();
    await Gallery.findByIdAndDelete(id);
    revalidatePath('/admin/gallery');
    return { success: true };
}

export async function deleteSpecificImageAction(galleryId: string, imageUrl: string) {
    await ensureAdmin();
    await dbConnect();
    await Gallery.findByIdAndUpdate(galleryId, {
        $pull: { images: imageUrl }
    });
    revalidatePath('/admin/gallery');
    return { success: true };
}

export async function quickUploadAction(category: string, images: string[]) {
    await ensureAdmin();
    await dbConnect();

    // Create a "Batch" entry for these images
    const date = new Date().toLocaleDateString('vi-VN');
    await Gallery.create({
        title: `Tải lên ${category} - ${date}`,
        category,
        images
    });

    revalidatePath('/admin/gallery');
    revalidatePath(`/hinh-anh/${category.toLowerCase()}`);
    return { success: true };
}

/**
 * Adds images directly to a category. 
 * If a 'General' collection doesn't exist for the category, it creates one.
 */
export async function addImagesToCategoryAction(category: string, imageUrls: string[]) {
    await ensureAdmin();
    await dbConnect();

    // Find or create the 'General' collection for this category
    let collection = await Gallery.findOne({
        category,
        title: { $regex: new RegExp(`^${category} General$`, 'i') }
    });

    if (!collection) {
        collection = await Gallery.create({
            title: `${category} General`,
            category,
            images: imageUrls
        });
    } else {
        await Gallery.findByIdAndUpdate(collection._id, {
            $push: { images: { $each: imageUrls } }
        });
    }

    revalidatePath('/admin/gallery');
    revalidatePath(`/hinh-anh/${category.toLowerCase().replace(' ', '-')}`);
    return { success: true };
}
