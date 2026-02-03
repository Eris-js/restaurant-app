import dbConnect from '@/lib/db';
import Gallery from '@/models/Gallery';
import EditGalleryForm from './EditGalleryForm';
import { notFound } from 'next/navigation';

export default async function EditGalleryPage({ params }: { params: { id: string } }) {
    await dbConnect();
    const gallery = await Gallery.findById(params.id);

    if (!gallery) {
        notFound();
    }

    return (
        <div className="max-w-6xl mx-auto">
            <EditGalleryForm gallery={JSON.parse(JSON.stringify(gallery))} />
        </div>
    );
}
