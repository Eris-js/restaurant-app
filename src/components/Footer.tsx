'use client';
import Link from 'next/link';

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
                123 Hồng Hà, P.9, Q.Phú Nhuận. TP.HCM
              </p>
              {/* Logo Placeholder */}
              <img src="/images/logo/logo1.png" alt="Logo" className="w-56 mb-4" />
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-[#f2b84b] font-bold text-lg mb-4 uppercase">Liên Hệ</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <strong className="text-white">Đặt bàn:</strong> <a href="tel:0964113719" target='_blank' className="text-[#f2b84b] hover:text-yellow-600">0964.113.719</a>
                </li>
                <li>
                  <strong className="text-white">Điện thoại:</strong> <a href="tel:0838423487" target='_blank' className="text-[#f2b84b] hover:text-yellow-600">(08) 3842 3487</a>
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
                <p className="text-xl text-white font-bold">7:00 - 23:00</p>
              </div>
              <div className="flex space-x-4">
                {/* Social Icons Placeholder */}

                <div className="w-8 h-8 bg-gray-700 rounded-full hover:bg-black/50 flex items-center justify-center transition-colors">
                  <a className="bi bi-twitter-x" href="#" aria-label='X' title='X'></a>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full hover:bg-red-500 flex items-center justify-center transition-colors">
                  <a className="bi bi-youtube" href="#" aria-label='Youtube' title='Youtube'></a>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full hover:bg-blue-500 flex items-center justify-center transition-colors">
                  <a className="bi bi-facebook" href="#" aria-label='Facebook' title='Facebook'></a>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full hover:bg-blue-700 flex items-center justify-center transition-colors">
                  <a className="bi bi-linkedin" href="#" aria-label='LinkedIn' title='LinkedIn'></a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-600">
            © Hoa Viên Tri Kỷ 2026. All Rights Reserved.
            <p>Designed by <a href='https://www.facebook.com/erisfake/' target='_blank' className='text-blue-700 hover:text-blue-500'>Quang Sáng</a></p>
          </div>
        </div>
      </footer>
    </>
  );
}
