import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from '@/components/BackToTop';
import PopupModal from '@/components/PopupModal';
import RestaurantSchema from "@/components/seo/RestaurantSchema";

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="grow">
                {children}
            </main>
        </div>
    );
}
