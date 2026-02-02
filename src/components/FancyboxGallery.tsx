'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

type Props = {
    images: string[];
};

export default function FancyboxGallery({ images }: Props) {
    useEffect(() => {
        Fancybox.bind('[data-fancybox="menu"]', {
            theme: "dark",
            mainStyle: {
                "--f-toolbar-padding": "0",
                "--f-button-svg-stroke-width": "1.5",
                "--f-arrow-svg-stroke-width": "1.75",
                "--f-thumb-width": "82px",
                "--f-thumb-height": "82px",
                "--f-thumb-border-radius": "8px",
                "--f-thumb-selected-shadow": "inset 0 0 0 2px #fff, 0 0 0 1.5px #ff2e00",
            },
            zoomEffect: false,
            fadeEffect: false,
            showClass: "f-fadeIn",
            hideClass: false,
            dragToClose: false,
            Carousel: {
                Toolbar: {
                    absolute: false,
                    display: {
                        left: [""],
                        middle: ["counter"],
                        right: ["toggleFull", "close"],
                    },
                },
                Thumbs: false,
            },
        });

        return () => {
            Fancybox.destroy();
        };
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {images.map((img) => (
                <a
                    key={img}
                    href={`/images/menu/${img}`}
                    data-fancybox="menu"
                    className="relative aspect-3/4 overflow-hidden cursor-zoom-in"
                >
                    <Image
                        src={`/images/menu/${img}`}
                        alt={img}
                        fill
                        className="object-cover"
                    />
                </a>
            ))}
        </div>
    );
}
