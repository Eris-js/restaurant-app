'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Trang Chủ', href: '#home' },
        { name: 'Giới Thiệu', href: '#info' },
        { name: 'Hình Ảnh', href: '#gallery' },
        { name: 'Menu', href: '#menu' },
        { name: 'Đánh giá', href: '#evaluate' },
        { name: 'Bản đồ', href: '#map' },
    ];

    return (
        <header
            className={clsx(
                'fixed top-0 w-full z-50 transition-all duration-300',
                isScrolled ? 'bg-black/90 shadow-md py-2' : 'bg-transparent py-4'
            )}
        >
            <div className="container mx-auto px-4 flex justify-between items-center text-white">
                <Link href="/" className="flex items-center">
                    {/* Using a placeholder for now, replace with actual logo path */}
                    <span className="text-xl font-bold uppercase tracking-wider">Tri Kỷ</span>
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm uppercase font-semibold hover:text-[#f2b84b] transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="absolute top-full left-0 w-full bg-black/95 border-t border-gray-800 md:hidden p-4 flex flex-col space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-white text-lg uppercase font-medium hover:text-[#f2b84b]"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </header>
    );
}
