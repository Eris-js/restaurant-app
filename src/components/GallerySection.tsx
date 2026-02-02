'use client';

import Image from "next/image";
import { Eye } from "lucide-react";

const images = ["1.jpg", "5ac.jpg", "3ac.jpg", "7ac.jpg"];

export default function GallerySection() {
    return (
        <section id="gallery" className="py-24">
            <div className="max-w-7xl mx-auto px-4">

                {/* Title */}
                <div
                    className="text-center mb-14"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                >
                    <h2 className="text-3xl md:text-4xl font-bold uppercase inline-block">
                        Hình ảnh
                        <span className="block w-20 h-[3px] bg-[#f2b84b] mt-3 mx-auto" />
                    </h2>
                    <p className="mt-4 text-zinc-700 max-w-xl mx-auto">
                        Những khoảnh khắc chân thực tại không gian Hoa Viên Tri Kỷ
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Gallery */}
                    <div
                        className="grid grid-cols-2 grid-rows-3 gap-4 h-[520px]"
                        data-aos="zoom-in"
                        data-aos-duration="1200"
                    >
                        {images.map((img, idx) => (
                            <div
                                key={idx}
                                data-aos="fade-up"
                                data-aos-delay={idx * 150}
                                className={`group relative overflow-hidden rounded-xl ${idx % 2 === 0 ? "row-span-2" : ""
                                    }`}
                            >
                                <Image
                                    src={`/images/banner/${img}`}
                                    alt={`Gallery ${idx + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Text */}
                    <div
                        className="space-y-5 text-zinc-700 leading-relaxed"
                        data-aos="fade-left"
                        data-aos-duration="1000"
                    >
                        <p>
                            Hoa Viên Tri Kỷ không chỉ mang đến trải nghiệm ẩm thực tinh tế mà còn
                            là không gian thưởng lãm nghệ thuật và thiên nhiên hài hòa.
                        </p>
                        <p>
                            Mỗi góc nhỏ đều được chăm chút tỉ mỉ, từ khuôn viên xanh mát đến
                            không gian tiệc sang trọng.
                        </p>
                        <p className="text-[#f2b84b] font-medium">
                            Hãy cùng khám phá những khoảnh khắc đẹp nhất tại đây.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
