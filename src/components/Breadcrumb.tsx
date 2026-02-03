'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

type BreadcrumbItem = {
    label: string;
    href?: string;
};

type BreadcrumbProps = {
    items: BreadcrumbItem[];
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <div className="bg-gray-100 border-b border-gray-100">
            <nav
                aria-label="Breadcrumb"
                className="max-w-7xl mx-auto px-4 py-6"
            >
                <ol className="flex items-center flex-wrap text-sm text-gray-600">
                    {items.map((item, index) => {
                        const isLast = index === items.length - 1;

                        return (
                            <li key={index} className="flex items-center">
                                {index !== 0 && (
                                    <ChevronRight className="mx-2 w-4 h-4 text-gray-400" />
                                )}

                                {isLast || !item.href ? (
                                    <span className="font-semibold text-[#f2b84b]">
                                        {item.label}
                                    </span>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="hover:text-[#f2b84b] transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </div>
    );
}
