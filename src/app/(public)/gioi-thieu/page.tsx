import type { Metadata } from "next";
import Breadcrumb from '@/components/Breadcrumb';
import HeroBreadcrumb from '@/components/HeroBreadcrumb';

import Image from "next/image";

export const metadata: Metadata = {
    title: "Giới thiệu",
    description: "Giới thiệu về nhà hàng Hoa Viên Tri Kỷ",
};

export default function AboutPage() {
    return (
        <>
            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: 'Trang chủ', href: '/' },
                    { label: 'Giới thiệu', href: '/gioi-thieu' }
                ]}
            />
            <main className="max-w-7xl mx-auto px-4 pt-12 pb-24 text-gray-800">
                {/* Title */}
                <header className="mb-12 max-w-3xl">
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">
                        Giới thiệu
                    </h1>
                    <p className="text-gray-500 text-lg">
                        Hành trình hơn 30 năm xây dựng và phát triển của Hoa Viên Tri Kỷ
                    </p>
                </header>

                {/* Hero image */}
                <div className="relative w-full h-105 rounded-2xl overflow-hidden mb-10 shadow-md">
                    <Image
                        src="/images/bg.jpg"
                        alt="Hoa Viên Tri Kỷ"
                        fill
                        priority
                        className="object-cover"
                    />
                </div>

                {/* Content */}
                <article className="leading-relaxed text-gray-700 text-[17px] max-w-4xl mx-auto space-y-6">
                    <div className="space-y-4">
                        <p>
                            <strong className="text-[#f2b84b] font-semibold">
                                Hoa Viên Tri Kỷ
                            </strong>{" "}
                            tiền thân là nhà hàng Tri Kỷ, tại số 82 Trần Huy liệu và nhà hàng “Tri Kỷ 2” tại 742/8 Nguyễn Kiệm, được thành lập từ năm 1987...cái tên “nhà hàng Tri Kỷ” đã nổi tiếng trong và ngoài nước từ thập niên 90. Hiện nay “Hoa Viên Tri Kỷ” được xây dựng trên khuôn viên hơn 2.500 m2 tọa lạc tại số 123 Hồng Hà, P9, Q. Phú Nhuận, liền kề công viên Gia Định, giáp ranh 3 quận: Phú Nhuận, Gò Vấp, Tân Bình cách sân bay Tân Sơn Nhất 10 phút đi bộ.
                        </p>

                        <p>
                            Nhà hàng Hoa Viên Tri Kỷ trải rộng trong khuôn viên xanh mát với thiết kế mang phong cách bày trí tinh tế kiểu Châu Âu. Khuôn viên sân vườn rợp trong tán cây xanh thích hợp cho những bữa ăn sáng và bữa gặp gỡ, khu vực trung tâm lại mang đến cảm giác  nhẹ nhàng, ấm cúng, tinh tế của không gian nhà xưa. Đặc biệt với các phòng VIP của nhà hàng thể hiện sự chuẩn mực và sang trọng dành cho những bữa ăn mang tính riêng tư, những buổi gặp gỡ khách hàng quan trọng. Bên cạnh đó, nhà hàng Hoa Viên Tri Kỷ còn có một sảnh tiệc gần 200 khách để tổ chức Tiệc cưới, hội nghị, liên hoan sinh nhật và họp mặt công ty bạn bè … đem đến cho quý vị sự lựa chọn một không gian riêng cho buổi tiệc của mình.
                        </p>
                    </div>
                </article>

                {/* Divider */}
                <div className="my-20 border-t border-gray-200" />
                {/* Highlight */}
                <section className="grid md:grid-cols-3 gap-8 text-center">
                    {[
                        ['30+ năm', 'Kinh nghiệm'],
                        ['2500m²', 'Không gian'],
                        ['200+', 'Khách/sảnh'],
                    ].map(([title, desc]) => (
                        <div
                            key={title}
                            className="p-8 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="text-3xl font-bold text-[#f2b84b] mb-2">
                                {title}
                            </div>
                            <div className="text-gray-500 uppercase tracking-wide text-sm">
                                {desc}
                            </div>
                        </div>
                    ))}
                </section>
            </main>
        </>
    );
}
