'use client';

function SafetySection() {
    return (
        <section className="py-24 bg-black text-white border-y border-gray-800">
            <div className="max-w-7xl mx-auto px-4">

                {/* Title */}
                <div
                    className="text-center mb-16"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                >
                    <h2 className="text-3xl md:text-4xl font-bold uppercase inline-block">
                        Vệ Sinh An Toàn Thực Phẩm
                        <span className="block w-24 h-[3px] bg-[#f2b84b] mt-3 mx-auto" />
                    </h2>
                </div>

                {/* Content */}
                <div className="grid md:grid-cols-2 gap-12 items-center">

                    {/* Image */}
                    <div
                        className="relative"
                        data-aos="fade-right"
                        data-aos-duration="1200"
                    >
                        <img
                            src="/images/hinh-2-tri-ky.jpg"
                            alt="An toàn vệ sinh thực phẩm"
                            className="w-full h-full duration-700 hover:scale-105"
                        />
                    </div>

                    {/* Quote */}
                    <div
                        className="relative bg-[#1c1c1c] border border-gray-800 rounded-xl p-10"
                        data-aos="fade-left"
                        data-aos-duration="1200"
                    >
                        <span className="absolute -top-6 left-6 text-6xl text-[#f2b84b] opacity-20">
                            “
                        </span>

                        <p className="text-lg leading-relaxed italic text-gray-200">
                            Nhà hàng Hoa Viên Tri Kỷ đặc biệt quan tâm đến vấn đề an toàn vệ sinh
                            thực phẩm, chỉ sử dụng những sản phẩm tươi, chất lượng cao được nhập
                            riêng cho nhà hàng, luôn tuân thủ nghiêm ngặt các quy định của Bộ Y Tế.
                        </p>

                        <div className="mt-6 text-sm text-[#f2b84b] font-semibold uppercase tracking-wider">
                            Cam kết chất lượng & sức khỏe
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}


function ReviewsSection() {
    const reviews = [
        { name: "Hung Ha The", content: "Không gian thoáng, không ồn ào, các món nấu ăn ngon, nhiều nhân viên" },
        { name: "Nhi Ha", content: "Không gian rộng rãi thoáng mát, đồ ăn ngon , trình bày đẹp mắt. Phục vụ vui vẻ nhiệt tình chu đáo." },
        { name: "black Nhi", content: "Không gian rộng rãi , mát và đẹp. Có nhìu phòng vip sang trọng." },
        { name: "Tuan Anh", content: "Món ăn rất hợp khẩu vị, giá cả hợp lý. Sẽ quay lại!" },
        { name: "Minh Thu", content: "Nhà hàng đẹp, nhân viên thân thiện. Thích nhất là không gian sân vườn." },
        { name: "Quoc Bao", content: "Tổ chức tiệc sinh nhật ở đây rất tuyệt, hỗ trợ trang trí nhiệt tình." },
        { name: "Lan Huong", content: "Đồ ăn tươi ngon, đặc biệt là các món hải sản." },
    ];

    return (
        <section id="evaluate" className="py-20 bg-[#1c1c1c] text-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold uppercase pb-2 border-b-2 border-[#f2b84b] inline-block">
                        Ý Kiến Khách Hàng
                    </h2>
                </div>

                {/* Scrollable Container */}
                <div className="flex overflow-x-auto gap-6 pb-8 grid-cols-3 md:grid-cols-1 snap-x snap-mandatory scrollbar-hide">
                    {reviews.map((review, idx) => (
                        <div
                            key={idx}
                            className="
        w-[300px] h-[260px] 
        md:w-[380px] md:h-[280px]
        bg-black p-8 rounded-lg text-center
        snap-center border border-gray-800 shrink-0
        flex flex-col
      "
                        >
                            <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold text-white">
                                {review.name.charAt(0)}
                            </div>
                            <h4 className="font-bold text-[#f2b84b] mb-2">
                                {review.name}
                            </h4>
                            <div className="flex justify-center space-x-1 text-yellow-500 mb-4 text-sm">
                                {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                            </div>
                            <p className="text-gray-400 text-sm italic leading-relaxed line-clamp-3 mt-auto">
                                "{review.content}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export { SafetySection, ReviewsSection };
