'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type HeroBreadcrumbProps = {
    title: string;
    background?: string;
};

export default function HeroBreadcrumb({
    title,
    background = '/images/bg-hero.jpg',
}: HeroBreadcrumbProps) {
    const pathname = usePathname();

    const segments = pathname.split('/').filter(Boolean);

    return (
        <section
            className="relative h-75 md:h-90 w-full flex items-center" style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60" />
            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
                <div className="max-w-2xl">
                    <h1 className="relative text-3xl md:text-4xl lg:text-5xl font-bold uppercase text-white mb-4">
                        {title}
                        <span className="absolute left-0 -bottom-2 w-16 h-0.75 bg-[#f2b84b]" />
                    </h1>

                    <nav className="text-sm text-gray-300">
                        <ol className="flex items-center gap-2">
                            <li>
                                <Link href="/" className="hover:text-[#f2b84b]">
                                    Trang chủ
                                </Link>
                            </li>
                            <li className="opacity-50">/</li>
                            <li className="text-[#f2b84b] font-semibold">
                                {title}
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
        </section>
    );
}
