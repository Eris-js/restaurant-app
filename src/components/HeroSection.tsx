'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
    return (
        <section
            id="home"
            className="relative min-h-[calc(100svh-64px)] flex items-center justify-center overflow-hidden bg-black"
        >
            {/* Background */}
            <div className="absolute inset-0">
                <Image
                    src="/images/banner/hero.jpg" // 👉 đổi ảnh thật
                    alt="Hoa Viên Tri Kỷ"
                    fill
                    priority
                    className="object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
            </div>

            {/* Content */}
            <div className="relative z-20 text-center text-white px-4 max-w-md md:max-w-4xl mx-auto">
                {/* Logo */}
                {/* <div className="mx-auto mb-4 w-[180px] h-[50px] md:w-[380px] md:h-[110px]">
                    <Image
                        src="/images/Tuu Phung.png"
                        alt="Hoa Viên Tri Kỷ"
                        fill
                        className="object-contain"
                        priority
                    />
                </div> */}

                {/* Main heading */}
                <h1
                    className="
    text-2xl
    leading-snug
    md:text-5xl
    md:leading-tight
    font-bold
    uppercase
    mb-4
  "
                    data-aos="fade-up"
                >
                    Tổ chức tiệc cưới <br className="hidden md:block" />
                    liên hoan – họp mặt
                </h1>

                {/* Sub heading */}
                <h2
                    className="text-sm md:text-2xl text-[#f2b84b] mb-4"
                    data-aos="fade-up"
                    data-aos-delay="150"
                >
                    PHỤC VỤ CHUYÊN NGHIỆP · MÓN ĂN PHONG PHÚ · KHÔNG GIAN SÂN VƯỜN
                </h2>

                {/* Contact */}
                <p
                    className="text-lg md:text-xl mb-10"
                    data-aos="fade-up"
                    data-aos-delay="300"
                >
                    Liên hệ đặt bàn:{' '}
                    <span className="font-semibold text-[#f2b84b]">
                        0964 113 179
                    </span>
                </p>

                {/* CTA */}
                <div className="flex flex-col gap-3 mt-6 md:flex-row md:justify-center">
                    <Link
                        href="#info"
                        className="border border-white px-6 py-3 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition"
                    >
                        Khám phá ngay
                    </Link>

                    <Link
                        href="/thuc-don/alacarte"
                        className="bg-white text-black px-6 py-3 text-sm uppercase tracking-widest hover:bg-[#f2b84b] transition"
                    >
                        Xem thực đơn
                    </Link>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 animate-bounce">
                <span className="text-xs tracking-widest">SCROLL</span>
            </div>
        </section>
    );
}
