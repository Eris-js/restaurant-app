'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

type BreadcrumbProps = {
    pageTitle?: string;
};

export default function Breadcrumb({ pageTitle }: BreadcrumbProps) {
    const pathname = usePathname();

    const segments = pathname
        .split('/')
        .filter(Boolean);

    if (segments.length === 0) return null;

    return (
        <section aria-label="Breadcrumb" className="mb-6 bg-black/50 p-4 rounded-md">
            <nav aria-label="Breadcrumb" className="mb-6 bg-black/50 p-4 rounded-md">
                <ol className="flex items-center flex-wrap text-sm text-gray-400">
                    {/* Home */}
                    <li className="flex items-center">
                        <Link
                            href="/"
                            className="hover:text-[#f2b84b] transition-colors"
                        >
                            Trang chủ
                        </Link>
                    </li>
                    {segments.map((segment, index) => {
                        const href = '/' + segments.slice(0, index + 1).join('/');
                        const isLast = index === segments.length - 1;

                        return (
                            <li key={href} className="flex items-center">
                                <ChevronRight className="mx-2 w-4 h-4" />

                                {isLast ? (
                                    <span className="text-yellow-400 font-semibold capitalize">
                                        {pageTitle ?? segment.replace(/-/g, ' ')}
                                    </span>
                                ) : (
                                    <Link
                                        href={href}
                                        className="hover:text-[#f2b84b] capitalize transition-colors"
                                    >
                                        {decodeURIComponent(segment).replace(/-/g, ' ')}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </section>
    );
}
