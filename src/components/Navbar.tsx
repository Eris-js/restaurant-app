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
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

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
    {
      name: 'Hình Ảnh',
      href: '#', // có thể để hoặc bỏ
      children: [
        { name: 'Hình ảnh nhà hàng', href: '/hinh-anh/nha-hang' },
        { name: 'Hình ảnh món ăn', href: '/hinh-anh/mon-an' },
      ],
    },
    {
      name: 'Thực Đơn',
      href: '#', // có thể để hoặc bỏ
      children: [
        { name: 'Alacarte', href: '/thuc-don/alacarte' },
        { name: 'Điểm tâm', href: '/thuc-don/diem-tam' },
        { name: 'Khách đoàn', href: '/thuc-don/khach-doan' },
        { name: 'Đặt tiệc', href: '/thuc-don/dat-tiec' },
      ],
    },
  ];

  // className={clsx(
  //       'fixed flex top-0 w-full h-15 z-50 justify-center items-center transition-all duration-300',
  //       isScrolled ? 'backdrop-blur-sm bg-black/90 shadow-md py-2' : 'bg-black md:bg-transparent py-4'
  //     )}

  return (
    <header className={`${isScrolled ? 'fixed translate-y-0' : 'relative'} flex top-0 w-full h-20 z-50 justify-center items-center transition-all duration-300 ease-out bg-black/90 backdrop-blur-sm py-2 shadow-md`}>
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
            const isActive = pathname === link.href || pathname.startsWith(link.href + '/');

            // Có submenu
            if (link.children) {
              return (
                <div key={link.name} className="relative group">
                  <Link
                    href={link.href ?? '#'}
                    className={clsx(
                      'text-sm uppercase py-2 font-semibold transition-colors flex items-center gap-1',
                      isActive
                        ? 'text-[#f2b84b]'
                        : 'text-white hover:text-[#f2b84b]'
                    )}
                  >
                    {link.name}
                  </Link>

                  {/* Dropdown */}
                  <div className="absolute left-0 top-full mt-3 w-48 bg-black/90 border border-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <ul className="py-2">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block px-4 py-2 text-sm text-white hover:text-[#f2b84b] transition-colors"
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            }

            // Menu thường
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
          <div className="absolute top-full left-0 w-full bg-black/90 border-t border-gray-800 md:hidden p-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <div key={link.name}>
                {!link.children ? (
                  <Link
                    href={link.href}
                    className="block text-white text-lg uppercase font-medium hover:text-[#f2b84b]"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <>
                    <button
                      className="w-full flex justify-between items-center text-white text-lg uppercase font-medium"
                      onClick={() =>
                        setOpenSubMenu(openSubMenu === link.name ? null : link.name)
                      }
                    >
                      {link.name}
                      <span>{openSubMenu === link.name ? '−' : '+'}</span>
                    </button>

                    {openSubMenu === link.name && (
                      <div className="mt-2 ml-4 flex flex-col space-y-2">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="py-2 text-gray-300 hover:text-[#f2b84b]"
                            onClick={() => {
                              setIsOpen(false);
                              setOpenSubMenu(null);
                            }}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </header>
  );
}
