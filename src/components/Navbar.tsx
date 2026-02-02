'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, PhoneCall } from 'lucide-react';
import clsx from 'clsx';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Trang Chủ', href: '/' },
    { name: 'Giới Thiệu', href: '/gioi-thieu' },
    { name: 'Hình Ảnh', href: '/hinh-anh' },
    { name: 'Menu', href: '/menu' },
    { name: 'Đánh giá', href: '#evaluate' },
    { name: 'Bản đồ', href: '#map' },
  ];

  // className={clsx(
  //       'fixed flex top-0 w-full h-15 z-50 justify-center items-center transition-all duration-300',
  //       isScrolled ? 'backdrop-blur-sm bg-black/90 shadow-md py-2' : 'bg-black md:bg-transparent py-4'
  //     )}

  return (
    <header className='fixed flex top-0 w-full h-15 z-50 justify-center items-center transition-all duration-300 bg-black py-4'>
      <div className="container max-w-7xl mx-auto px-4 flex justify-between items-center text-white">
        <Link href="/" className="flex items-center">
          <img
            src="/images/logo/logo.png"
            alt="Logo"
            width={40}
            height={40} />
          <span className="sr-only text-xl font-bold uppercase tracking-wider">Tri Kỷ</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  'text-sm uppercase font-semibold transition-colors',
                  isActive
                    ? 'text-[#f2b84b]'
                    : 'text-white hover:text-[#f2b84b]'
                )}
              >
                {link.name}
              </Link>
            );
          })}

          <Link
            href="tel:+84123456789"
            className="text-sm uppercase font-semibold bg-[#f2b84b] text-black px-4 py-2 rounded hover:bg-yellow-400 transition-colors"
          >
            Gọi Ngay
          </Link>
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
