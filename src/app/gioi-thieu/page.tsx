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
            <HeroBreadcrumb
                title="Giới thiệu"
                background="/images/1.jpg"
            />
            <section className="max-w-7xl mx-auto px-4 pt-10 pb-24">
                <div className="relative mb-16 rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                        src="/images/bg.jpg"
                        alt="Nhà hàng Hoa Viên Tri Kỷ"
                        width={1600}
                        height={800}
                        className="w-full h-full object-cover"
                        priority
                    />
                </div>

                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
                        <span className="text-[#f2b84b]">Hoa Viên</span> Tri Kỷ
                    </h1>
                    <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
                        Hơn 35 năm gìn giữ tinh hoa ẩm thực và không gian gặp gỡ
                    </p>
                </div>

                {/* Content */}
                <div className="prose prose-lg prose-invert max-w-none text-black leading-relaxed mb-10">
                    <p>
                        <strong className="text-black">Hoa Viên Tri Kỷ</strong> tiền thân là nhà
                        hàng <strong>Tri Kỷ</strong> tại số 82 Trần Huy Liệu và nhà hàng
                        <strong> Tri Kỷ 2</strong> tại 742/8 Nguyễn Kiệm, được sáng lập từ năm
                        1987. Tên gọi <em>“Nhà hàng Tri Kỷ”</em> đã trở nên quen thuộc với thực
                        khách trong và ngoài nước từ thập niên 90.
                    </p>

                    <p>
                        Hiện nay, Hoa Viên Tri Kỷ được xây dựng trên khuôn viên hơn
                        <strong> 2.500 m²</strong> tại số 123 Hồng Hà, Phường 9, Quận Phú Nhuận,
                        liền kề công viên Gia Định và chỉ cách sân bay Tân Sơn Nhất 10 phút đi
                        bộ.
                    </p>
                </div>

                <div className="prose prose-lg prose-invert max-w-none text-black leading-relaxed">
                    <p>
                        Không gian nhà hàng mang phong cách bày trí tinh tế kiểu Châu Âu,
                        hòa quyện giữa thiên nhiên xanh mát và nét ấm cúng của kiến trúc
                        truyền thống. Khuôn viên sân vườn rợp bóng cây phù hợp cho bữa sáng,
                        gặp gỡ thân mật.
                    </p>

                    <p>
                        Các phòng <strong>VIP sang trọng</strong> đáp ứng những buổi gặp gỡ
                        riêng tư, cùng sảnh tiệc gần <strong>200 khách</strong> là lựa chọn
                        lý tưởng cho tiệc cưới, hội nghị, sinh nhật và các sự kiện quan trọng.
                    </p>
                </div>
            </section>
        </>
    );
}
