'use client';
import Link from 'next/link';

export default function HeroSection() {
    return (
        <section id="home" className="relative h-screen flex items-center justify-center bg-black">
            {/* Background Overlay - Simplified for now */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/50 z-10"></div>
                {/* You can add a background image here */}
            </div>

            <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto">
                {/* Logo Placeholder */}
                {/* <img src="/static/images/Tuu Phung.png" height="75" className="mx-auto mb-6" alt="Logo" /> */}

                <h1 className="text-3xl md:text-5xl font-bold uppercase mb-4 tracking-wide" data-aos="flip-up">
                    Tổ chức tiệc cưới, liên hoan sinh nhật, họp mặt
                </h1>

                <h2 className="text-xl md:text-3xl font-light text-[#f2b84b] mb-6">
                    PHỤC VỤ CHUYÊN NGHIỆP - MÓN ĂN PHONG PHÚ - KHUÔN VIÊN MÁT MẺ
                </h2>

                <p className="text-lg md:text-xl mb-8">
                    Liên hệ đặt bàn: <span className="font-bold">0964.113.179</span>
                </p>

                <Link
                    href="#info"
                    className="inline-block border-2 border-white px-8 py-3 uppercase text-sm tracking-widest hover:bg-white hover:text-black transition-all duration-300"
                >
                    Khám phá ngay
                </Link>
            </div>
        </section>
    );
}
