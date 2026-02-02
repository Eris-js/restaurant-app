import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import GallerySection from '@/components/GallerySection';
import MenuSection from '@/components/MenuSection';
import { SafetySection, ReviewsSection } from '@/components/ReviewsSection';
import Footer from '@/components/Footer';

export default function Home() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-[#f2b84b] selection:text-black scroll-smooth">
            <Navbar />
            <HeroSection />
            <AboutSection />
            <GallerySection />
            <MenuSection />
            <SafetySection />
            <ReviewsSection />
            <Footer />
        </main>
    );
}
