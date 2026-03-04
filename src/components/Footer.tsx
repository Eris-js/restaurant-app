'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <>
      <footer className="bg-black text-white pt-16 pb-8 border-t border-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Address */}
            <div>
              <h3 className="text-[#f2b84b] font-bold text-lg mb-4 uppercase">Địa Chỉ</h3>
              <p className="text-gray-400 mb-4">
                Nhà Hàng Tri Kỷ<br />
                123 Hồng Hà, Phường Đức Nhuận, Thành Phố Hồ Chí Minh
              </p>
              {/* Logo Placeholder */}
              <Image src="/images/logo/logo1.png" alt="Logo" width={224} height={80} className="w-56 mb-4 object-contain" />
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-[#f2b84b] font-bold text-lg mb-4 uppercase">Liên Hệ</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <strong className="text-white">Đặt bàn:</strong> <a href="tel:0964113719" target='_blank' className="text-[#f2b84b] hover:text-yellow-600">0964.113.719</a>
                </li>
                <li>
                  <strong className="text-white">Điện thoại:</strong> <a href="tel:0838423487" target='_blank' className="text-[#f2b84b] hover:text-yellow-600">(028) 3842 3487</a>
                </li>
                <li>
                  <strong className="text-white">Email:</strong> <a href="mailto:hoavientriky123hongha@gmail.com" target='_blank' className="text-[#f2b84b] hover:text-yellow-600">sale.hoavientriky@pnco.vn</a>
                </li>
              </ul>
            </div>

            {/* Opening Hours & Social */}
            <div>
              <h3 className="text-[#f2b84b] font-bold text-lg mb-4 uppercase">Giờ Mở Cửa</h3>
              <div className="text-gray-400 mb-6">
                <p>Thứ 2 - Chủ Nhật</p>
                <p className="text-xl text-white font-bold">7:00 - 22:00</p>
              </div>
              <div className="flex space-x-4">
                {/* Social Icons Placeholder */}
                <div className="w-8 h-8 bg-gray-700 rounded-full hover:bg-red-500 flex items-center justify-center transition-colors">
                  <a className="bi bi-youtube" href="#" target="_blank" aria-label='Youtube' title='Youtube'></a>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full hover:bg-blue-500 flex items-center justify-center transition-colors">
                  <a className="bi bi-facebook" href="https://www.facebook.com/profile.php?id=61587653834098" target="_blank" aria-label='Facebook' title='Facebook'></a>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full hover:bg-blue-700 flex items-center justify-center transition-colors">
                  <a className="bi bi-linkedin" href="#" target="_blank" aria-label='LinkedIn' title='LinkedIn'></a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-600">
            © Hoa Viên Tri Kỷ 2026. All Rights Reserved.
            <a href="https://www.facebook.com/erisfake/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 font-semibold border-b border-blue-700 hover:text-blue-500 hover:border-blue-500">
              Designed by Quang Sáng
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
