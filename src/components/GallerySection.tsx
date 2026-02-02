'use client';

// export default function GallerySection() {
//     const images = [
//         "banner/1.jpg", "banner/2.gif", "banner/3ac.jpg", "banner/4.gif",
//         "banner/5ac.jpg", "banner/6ac.jpg", "banner/h7.gif", "banner/h8.gif"
//     ];

//     return (
//         <section id="gallery" className="py-20 bg-black text-white">
//             <div className="container mx-auto px-4">
//                 <div className="text-center mb-12">
//                     <h2 className="text-3xl md:text-4xl font-bold uppercase pb-2 border-b-2 border-[#f2b84b] inline-block">
//                         Thư viện hình ảnh
//                     </h2>
//                     <p className="mt-4 text-gray-400">
//                         Dưới đây là một số hình ảnh thực tế về nhà hàng "Hoa viên Tri Kỷ"
//                     </p>
//                 </div>

//                 {/* 
//             Using a simple Grid for now. 
//             Can be upgraded to Swiper.js later if specific slider behavior is needed.
//         */}
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                     {images.map((img, idx) => (
//                         <div key={idx} className="relative aspect-square group overflow-hidden rounded-lg bg-gray-800 cursor-pointer">
//                             <div className="absolute inset-0 flex items-center justify-center text-gray-500 group-hover:scale-110 transition-transform duration-500">
//                                 {/* Placeholder for actual image */}
//                                 <span>Image {idx + 1}</span>
//                             </div>
//                             {/* Overlay */}
//                             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                                 <span className="text-[#f2b84b] font-medium">Xem chi tiết</span>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// }

import Image from "next/image";

export default function GallerySection() {
    return (
        <section id="gallery" className="py-20">
            <div className="container max-w-7xl mx-auto w-full px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold uppercase relative inline-block pb-2 border-b-2 border-[#f2b84b]">
                        Hình Ảnh
                    </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="relative h-80 md:h-125 lg:block hidden w-full rounded-lg overflow-hidden">
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

                    <div className="space-y-6 leading-relaxed text-justify">
                        <p>Nhà hàng không chỉ là nơi để thưởng thức ẩm thực ngon miệng mà còn là một trải nghiệm nghệ thuật đích thực.</p>
                        <p>
                            Trên hành trình của chúng ta trong thế giới ẩm thực, hình ảnh nhà hàng đóng một vai trò quan trọng, tạo ra không gian thị giác phong phú và hấp dẫn.
                        </p>
                        <p>
                            Hãy cùng nhau khám phá những khoảnh khắc đẹp nhất nhé!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

