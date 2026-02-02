import Image from "next/image";

export default function AboutSection() {
    return (
        <>
            {/* <div className="relative flex flex-col items-center justify-center max-w-max mx-auto ">
                <div className="w-px h-[20px] bg-[#D9D9D9] lg:h-20"></div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48" className="relative z-10 w-6 h-6 lg:w-8 lg:h-8">
                    <path fill="#272424" fillRule="evenodd" d="M0 24c13.255 0 24 10.745 24 24 0-13.255 10.745-24 24-24-13.255 0-24-10.745-24-24 0 13.255-10.745 24-24 24Z" clipRule="evenodd"></path>
                </svg>
                <div className="w-px h-[20px] bg-[#D9D9D9] lg:h-20"></div>
            </div> */}
            <section id="info" className="py-20">
                <div className="container max-w-7xl mx-auto w-full px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 leading-relaxed text-justify">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold uppercase relative inline-block pb-2 border-b-2 border-[#f2b84b]">
                                    Giới thiệu
                                </h2>
                            </div>
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

                        <div className="relative h-80 md:h-125 lg:block hidden w-full rounded-lg overflow-hidden">
                            {/* Image Placeholder - User needs to add images to public/ */}
                            {/* <Image src="/bg.jpg" alt="About" fill className="object-cover" /> */}
                            <div className="grid grid-cols-2 grid-rows-3 gap-4 h-full">
                                {["1.jpg", "5ac.jpg", "3ac.jpg", "7ac.jpg"].map((img, idx) => (
                                    <div
                                        key={idx}
                                        className={`relative rounded-lg overflow-hidden ${idx % 2 ? '' : 'row-span-2'}`}>
                                        <Image
                                            src={`/images/banner/${img}`}
                                            alt={`Gallery Image ${idx + 1}`}
                                            fill
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
}
