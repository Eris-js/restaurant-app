import dbConnect from '@/lib/db';
import Slider from '@/models/Slider';
import Gallery from '@/models/Gallery';
import Article from '@/models/Article';
import Promotion from '@/models/Promotion';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  await dbConnect();

  await Slider.deleteMany({});
  await Gallery.deleteMany({});
  await Article.deleteMany({});
  await Promotion.deleteMany({});

  await Slider.create([
    { title: 'Welcome to Our Restaurant', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80', active: true, order: 1 },
    { title: 'Exquisite Fine Dining', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80', active: true, order: 2, link: '/gallery' },
    { title: 'Fresh Ingredients', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80', active: true, order: 3 },
  ]);

  await Gallery.create([
    { title: 'Main Hall', category: 'Interior', images: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'] },
    { title: 'Signature Dishes', category: 'Food', images: [
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80'
    ] },
    { title: 'Bar Area', category: 'Interior', images: ['https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80'] },
  ]);

  await Article.create([
    { title: 'Grand Opening', slug: 'grand-opening', content: '<p>We are delighted to announce our grand opening...</p>', thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80' },
    { title: 'New Summer Menu', slug: 'summer-menu', content: '<p>Check out our refreshing summer dishes...</p>', thumbnail: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80' },
    { title: 'Meet Chef Gordon', slug: 'meet-chef', content: '<p>Our head chef brings 20 years of experience...</p>', thumbnail: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80' },
  ]);

  const now = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(now.getMonth() + 1);
  
  await Promotion.create([
    { title: 'Lunch Special', description: 'Get 20% off on all lunch items.', thumbnail: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80', startDate: now, endDate: nextMonth, isActive: true },
    { title: 'Happy Hour', description: 'Buy 1 Get 1 Free on cocktails.', thumbnail: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80', startDate: now, endDate: nextMonth, isActive: true },
  ]);

  return NextResponse.json({ success: true, message: 'Database seeded successfully' });
}
