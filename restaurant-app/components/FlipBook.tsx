'use client';
import React, { forwardRef, useRef, useState, useEffect } from 'react';
// @ts-ignore
import HTMLFlipBook from 'react-pageflip';

interface PageProps {
    children: React.ReactNode;
    number?: number;
}

// Forward ref needed for PageFlip
const Page = forwardRef<HTMLDivElement, PageProps>(
    ({ children, number }, ref) => {
        return (
            <div className="demoPage bg-white shadow-lg overflow-hidden h-full" ref={ref}>
                <div className="h-full w-full relative">
                    {children}
                    {number && (
                        <div className="absolute bottom-4 right-4 text-gray-400 text-xs">
                            {number}
                        </div>
                    )}
                </div>
            </div>
        );
    }
);
Page.displayName = 'Page';

interface FlipBookProps {
    images: string[];
}

export default function FlipBook({ images }: FlipBookProps) {
    const bookRef = useRef(null);
    const [pageTotal, setPageTotal] = useState(0);

    return (
        <div className="flex justify-center items-center py-10 bg-[#1c1c1c] overflow-hidden">
            {/* Wrapper to control dimensions */}
            <div className="relative w-full max-w-4xl flex justify-center">
                <HTMLFlipBook
                    width={400}
                    height={550}
                    showCover={true}
                    mobileScrollSupport={true}
                    className="shadow-2xl"
                    ref={bookRef}
                    maxShadowOpacity={0.5}
                    flippingTime={1000}
                    onInit={(e: any) => { }}
                    // startPage={0}
                    size="stretch"
                    minWidth={300}
                    maxWidth={500}
                    minHeight={400}
                    maxHeight={700}
                    drawShadow={true}
                >
                    {/* Cover Page */}
                    <Page number={1}>
                        <div className="h-full w-full bg-[#f2b84b] flex flex-col items-center justify-center p-8 text-center border-4 border-black/10">
                            <h2 className="text-4xl font-bold uppercase mb-4 text-black">Thực Đơn</h2>
                            <div className="w-24 h-1 bg-black mb-6"></div>
                            <p className="text-black/80 font-serif italic text-lg">Hoa Viên Tri Kỷ</p>
                            <div className="mt-12 text-sm text-black/60 font-medium tracking-widest">CHẠM ĐỂ MỞ</div>
                        </div>
                    </Page>

                    {/* Content Pages */}
                    {images.map((src, index) => (
                        <Page key={index} number={index + 2}>
                            <div className="h-full w-full relative">
                                {/* Using standard img tag for simplicity in canvas context, next/image can be tricky here */}
                                <img
                                    src={src}
                                    alt={`Menu Page ${index + 1}`}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                        </Page>
                    ))}

                    {/* Back Cover */}
                    <Page number={images.length + 2}>
                        <div className="h-full w-full bg-[#111] flex flex-col items-center justify-center p-8 text-center">
                            <h3 className="text-[#f2b84b] text-2xl font-bold mb-4">Cảm Ơn Quý Khách</h3>
                            <p className="text-gray-400 text-sm">Hẹn gặp lại!</p>
                        </div>
                    </Page>
                </HTMLFlipBook>
            </div>
        </div>
    );
}
