'use client';

import dynamic from 'next/dynamic';
import "plyr-react/plyr.css"

const Plyr = dynamic(
    () =>
        import('plyr-react').then((mod) => mod.Plyr),
    { ssr: false }
);

export default function VideoServices() {
    return (
        <section
            id="video"
            className="relative py-24 overflow-hidden"
            style={{
                backgroundImage: "url('/images/hoa-van.png')",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
            }}
        >
            {/* Overlay tối */}
            <div className="absolute inset-0 bg-yellow-50/40 z-0" />
            <div className="relative z-10 max-w-7xl mx-auto px-4" >
                {/* Title */}
                <div className="text-center mb-12" >
                    <h2 className="text-3xl md:text-4xl font-bold uppercase inline-block pb-3 border-b-2 border-[#f2b84b]">
                        Không Gian & Dịch Vụ
                    </h2>
                    <p className="mt-4 text-zinc-700 max-w-2xl mx-auto">
                        Trải nghiệm không gian sang trọng và phong cách phục vụ đẳng cấp
                        tại Hoa Viên Tri Kỷ
                    </p>
                </div>

                {/* Video */}
                <div className="relative mx-auto w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-[#f2b84b]/30" data-aos="fade-up" data-aos-duration="1200">
                    <Plyr
                        source={{
                            type: 'video',
                            sources: [
                                {
                                    src: 'fo9ahAYZw_4',
                                    provider: 'youtube',
                                },
                            ],
                        }}
                        options={{
                            autoplay: false,
                            muted: false,
                            controls: [
                                'play',
                                'progress',
                                'current-time',
                                'mute',
                                'volume',
                                'fullscreen',
                            ],
                            youtube: {
                                noCookie: true,
                                rel: 0,
                                showinfo: 0,
                            },
                        }}
                    />
                </div>
            </div>
        </section >
    );
}
