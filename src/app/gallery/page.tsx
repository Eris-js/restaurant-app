import dbConnect from '@/lib/db';
import Gallery from '@/models/Gallery';

export const dynamic = 'force-dynamic';

async function getGallery() {
  await dbConnect();
  const items = await Gallery.find({}).lean();
  return JSON.parse(JSON.stringify(items));
}

export default async function GalleryPage() {
  const galleryItems = await getGallery();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Gallery</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Explore our dishes and restaurant atmosphere.</p>
      </div>

      {galleryItems.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">No images available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryItems.map((item: any) => (
            item.images.map((img: string, index: number) => (
              <div key={`${item._id}-${index}`} className="relative h-64 group overflow-hidden rounded-lg shadow-md cursor-pointer">
                <img
                  src={img}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                  <span className="text-white font-medium px-4 text-center">{item.title}</span>
                </div>
              </div>
            ))
          ))}
        </div>
      )}
    </div>
  );
}
