import HeroSlider from '@/components/HeroSlider';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import GallerySection from '@/components/GallerySection';
import MenuSection from '@/components/MenuSection';
import OurServices from '@/components/OurServices';
import VideoServices from '@/components/VideoSection';

import MapSection from '@/components/MapSection';
import { SafetySection, ReviewsSection } from '@/components/ReviewsSection';
import dbConnect from '@/lib/db';
import Slider from '@/models/Slider';
import Article from '@/models/Article';
import Promotion from '@/models/Promotion';
import Link from 'next/link';

async function getData() {
  await dbConnect();
  // Fetch active sliders
  const sliders = await Slider.find({ active: true }).sort({ order: 1 }).lean();

  // Fetch latest 3 articles
  const articles = await Article.find({}).sort({ createdAt: -1 }).limit(3).lean();

  // Fetch active promotions
  const now = new Date();
  const promotions = await Promotion.find({
    isActive: true,
    startDate: { $lte: now },
    endDate: { $gte: now }
  }).sort({ endDate: 1 }).limit(3).lean();

  return {
    sliders: JSON.parse(JSON.stringify(sliders)),
    articles: JSON.parse(JSON.stringify(articles)),
    promotions: JSON.parse(JSON.stringify(promotions))
  };
}

export default async function Home() {
  const { sliders, articles, promotions } = await getData();

  return (
    <div className="min-h-screen scroll-smooth">
      {/* Slider */}
      {/* <HeroSlider sliders={sliders} /> */}
      <HeroSection />
      <AboutSection />
      <VideoServices />
      <OurServices />
      <GallerySection />
      <SafetySection />
      <MapSection />
      {/* <ReviewsSection /> */}
      {/* Promotions Section */}
      {promotions.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Current Promotions</h2>
            <p className="mt-2 text-gray-600">Don't miss out on our special offers!</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {promotions.map((promo: any) => (
              <div key={promo._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 flex flex-col h-full border border-gray-100">
                <div className="h-56 relative bg-gray-200">
                  <img src={promo.thumbnail} alt={promo.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex flex-col grow">
                  <h3 className="text-xl font-bold mb-3 text-gray-800">{promo.title}</h3>
                  <p className="text-gray-600 mb-4 grow line-clamp-3">{promo.description}</p>
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <p className="text-sm text-orange-600 font-semibold">Ends: {new Date(promo.endDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/promotions" className="inline-flex items-center text-orange-600 font-semibold hover:text-orange-700 transition">
              View All Promotions <span className="ml-2">&rarr;</span>
            </Link>
          </div>
        </section>
      )}

      {/* Articles Section */}
      {articles.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Tin tức & Bài viết
            </h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto">
              Cập nhật những câu chuyện mới nhất từ gian bếp và đội ngũ của chúng tôi
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {articles.map((article: any) => (
              <a
                key={article._id}
                href={`/blog/${article.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500"
              >
                {/* Thumbnail */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-orange-600 transition">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-900 line-clamp-2 group-hover:text-orange-600 transition">
                    {article.content.slice(0, 100)}...
                  </p>
                  <Link
                    href={`/blog/${article.slug}`}
                    className="inline-flex items-center gap-2 mt-5 text-sm font-medium text-orange-600 hover:text-orange-700"
                  >
                    Xem thêm
                    <span className="transition group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
