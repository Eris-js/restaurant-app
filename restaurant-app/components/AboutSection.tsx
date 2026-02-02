export default function AboutSection() {
    return (
        <section id="info" className="py-20 bg-[#1c1c1c] text-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold uppercase relative inline-block pb-2 border-b-2 border-[#f2b84b]">
                        Giới thiệu
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 text-gray-300 leading-relaxed text-justify">
                        <p>
                            "Hoa Viên Tri Kỷ” tiền thân là nhà hàng “Tri Kỷ” tại số 82 Trần Huy
                            Liệu và nhà hàng “Tri Kỷ 2” tại 742/8 Nguyễn Kiệm, được sáng lập từ
                            năm 1987. Cái tên “nhà hàng Tri Kỷ” đã nổi tiếng trong và ngoài nước
                            từ thập niên 90. Hiện nay “Hoa Viên Tri Kỷ” được xây dựng trên khuôn
                            viên hơn 2.500 m2 tọa lạc tại số 123 Hồng Hà, P9, Q. Phú Nhuận.
                        </p>
                        <p>
                            Nhà hàng Hoa Viên Tri Kỷ trải rộng trong khuôn viên xanh mát với thiết
                            kế mang phong cách bày trí tinh tế kiểu Châu Âu. Khuôn viên sân vườn
                            rợp trong tán cây xanh thích hợp cho những bữa ăn sáng và bữa gặp
                            gỡ. Khu vực trung tâm lại mang đến cảm giác nhẹ nhàng, ấm cúng, tinh
                            tế của không gian nhà xưa.
                        </p>
                        <p>
                            Đặc biệt với các phòng VIP của nhà hàng thể hiện sự chuẩn mực và sang trọng.
                            Ngoài ra còn có sảnh tiệc gần 200 khách để tổ chức Tiệc cưới, hội nghị, liên hoan...
                        </p>
                    </div>

                    <div className="relative h-80 md:h-[500px] w-full bg-gray-700 rounded-lg overflow-hidden">
                        {/* Image Placeholder - User needs to add images to public/ */}
                        {/* <Image src="/bg.jpg" alt="About" fill className="object-cover" /> */}
                        <div className="flex items-center justify-center h-full text-gray-500">
                            [Hình ảnh Giới thiệu]
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
