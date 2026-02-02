'use client';
import Link from 'next/link';

function MapSection() {
    return (
        <section id="map" className="relative h-[400px] w-full bg-gray-800">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.0181491790727!2d106.6706527!3d10.809921600000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529210906c593%3A0x2d1453db8e57034a!2zMTIzIEjhu5NuZyBIw6AsIHBoxrDhu51uZyA5LCBQaMO6IE5odeG6rW4sIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2svn!4v1409737810779"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
            ></iframe>
        </section>
    );
}

export default function Footer() {
    return (
        <>
            <MapSection />
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
                            <div className="text-2xl font-bold tracking-widest text-white/20">TRI KY</div>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="text-[#f2b84b] font-bold text-lg mb-4 uppercase">Liên Hệ</h3>
                            <ul className="space-y-3 text-gray-400">
                                <li><strong className="text-white">Đặt bàn:</strong> 0964.113.719</li>
                                <li><strong className="text-white">Điện thoại:</strong> (08) 3842 3487</li>
                                <li><strong className="text-white">Email:</strong> hoavientriky123hongha@gmail.com</li>
                                <li><strong className="text-white">Website:</strong> triky.com.vn</li>
                            </ul>
                        </div>

                        {/* Opening Hours & Social */}
                        <div>
                            <h3 className="text-[#f2b84b] font-bold text-lg mb-4 uppercase">Giờ Mở Cửa</h3>
                            <div className="text-gray-400 mb-6">
                                <p>Thứ 2 - Chủ Nhật</p>
                                <p className="text-xl text-white font-bold">7:00 - 24:00</p>
                            </div>
                            <div className="flex space-x-4">
                                {/* Social Icons Placeholder */}
                                <div className="w-8 h-8 bg-gray-700 rounded-full hover:bg-[#f2b84b] transition-colors"></div>
                                <div className="w-8 h-8 bg-gray-700 rounded-full hover:bg-[#f2b84b] transition-colors"></div>
                                <div className="w-8 h-8 bg-gray-700 rounded-full hover:bg-[#f2b84b] transition-colors"></div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-600">
                        © Hoa Viên Tri Kỷ 2024. All Rights Reserved.
                    </div>
                </div>
            </footer>
        </>
    );
}
