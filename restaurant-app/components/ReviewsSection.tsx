'use client';

function SafetySection() {
    return (
        <section className="py-16 bg-black text-white border-y border-gray-800">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-2xl font-bold uppercase mb-8 text-[#f2b84b]">Vấn Đề Vệ Sinh An Toàn Thực Phẩm</h2>
                <div className="max-w-3xl mx-auto p-8 border border-gray-800 rounded-lg bg-[#1c1c1c]">
                    <p className="text-lg italic text-[#f2b84b]">
                        "Nhà hàng Hoa Viên Tri Kỷ đặc biệt quan tâm đến vấn đề an toàn vệ sinh thực phẩm, chỉ sử dụng những sản phẩm tươi, chất lượng tốt nhất được nhập riêng cho nhà hàng, luôn tuân thủ các quy định của Bộ Y Tế."
                    </p>
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
                <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide">
                    {reviews.map((review, idx) => (
                        <div
                            key={idx}
                            className="min-w-[300px] md:min-w-[400px] bg-black p-8 rounded-lg text-center snap-center border border-gray-800 flex-shrink-0"
                        >
                            <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold text-white">
                                {review.name.charAt(0)}
                            </div>
                            <h4 className="font-bold text-[#f2b84b] mb-2">{review.name}</h4>
                            <div className="flex justify-center space-x-1 text-yellow-500 mb-4 text-sm">
                                {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                            </div>
                            <p className="text-gray-400 text-sm italic leading-relaxed">"{review.content}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export { SafetySection, ReviewsSection };
