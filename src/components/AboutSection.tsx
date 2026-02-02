import Image from "next/image";

export default function AboutSection() {
    return (
        <section id="info" className="py-24">
            <div className="max-w-7xl mx-auto px-4">
                {/* Title */}
                <div
                    className="mb-16"
                    data-aos="fade-down"
                    data-aos-duration="800"
                >
                    <h2 className="text-3xl md:text-4xl font-bold uppercase inline-block relative">
                        Giới thiệu
                        <span className="block w-20 h-[3px] bg-[#f2b84b] mt-3" />
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Text */}
                    <div
                        className="space-y-6 leading-relaxed text-black"
                        data-aos="fade-right"
                        data-aos-duration="1000"
                    >
                        <p>
                            “Hoa Viên Tri Kỷ” tiền thân là nhà hàng “Tri Kỷ” tại số 82 Trần Huy
                            Liệu và nhà hàng “Tri Kỷ 2” tại 742/8 Nguyễn Kiệm, được sáng lập từ
                            năm 1987. Cái tên “nhà hàng Tri Kỷ” đã nổi tiếng trong và ngoài nước
                            từ thập niên 90.
                        </p>

                        <p>
                            Hiện nay “Hoa Viên Tri Kỷ” được xây dựng trên khuôn viên hơn 2.500m²
                            tọa lạc tại số 123 Hồng Hà, P.9, Q.Phú Nhuận, liền kề công viên Gia
                            Định.
                        </p>

                        <p>
                            Không gian xanh mát, thiết kế tinh tế phong cách Châu Âu cùng hệ
                            thống phòng VIP sang trọng và sảnh tiệc gần 200 khách đáp ứng đa
                            dạng nhu cầu.
                        </p>
                    </div>

                    {/* Image Grid */}
                    <div
                        className="relative hidden lg:block"
                        data-aos="fade-left"
                        data-aos-duration="1000"
                    >
                        <div className="grid grid-cols-2 grid-rows-3 gap-4 h-[520px]">
                            {["1.jpg", "5ac.jpg", "3ac.jpg", "7ac.jpg"].map((img, idx) => (
                                <div
                                    key={idx}
                                    className={`relative rounded-xl overflow-hidden ${idx % 2 === 0 ? "row-span-2" : ""
                                        }`}
                                >
                                    <Image
                                        src={`/images/banner/${img}`}
                                        alt={`Hoa Viên Tri Kỷ ${idx + 1}`}
                                        fill
                                        className="object-cover transition-transform duration-700 hover:scale-105"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
