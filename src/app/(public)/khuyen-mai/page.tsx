import dbConnect from '@/lib/db';
import Promotion from '@/models/Promotion';

export const dynamic = 'force-dynamic';

async function getPromotions() {
  await dbConnect();
  // Fetch active
  const promotions = await Promotion.find({ isActive: true }).sort({ endDate: 1 }).lean();
  return JSON.parse(JSON.stringify(promotions));
}

export default async function PromotionsPage() {
  const promotions = await getPromotions();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Special Offers</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Exclusive deals just for you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {promotions.map((promo: any) => {
           const isExpired = new Date(promo.endDate) < new Date();
           if (isExpired) return null; 

           return (
            <div key={promo._id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row hover:shadow-2xl transition duration-300 border border-gray-100">
               <div className="md:w-1/3 h-48 md:h-auto relative bg-gray-200">
                  <img src={promo.thumbnail} alt={promo.title} className="w-full h-full object-cover" />
               </div>
               <div className="p-6 md:w-2/3 flex flex-col justify-center">
                 <h2 className="text-2xl font-bold mb-2 text-gray-800">{promo.title}</h2>
                 <p className="text-gray-600 mb-4">{promo.description}</p>
                 <div className="flex items-center text-sm font-medium text-gray-500">
                    <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full mr-2">Active</span>
                    <span className="text-orange-600">Until {new Date(promo.endDate).toLocaleDateString()}</span>
                 </div>
               </div>
            </div>
           );
        })}
      </div>
    </div>
  );
}
