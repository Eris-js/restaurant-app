'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    useEffect(() => {
        AOS.init({
            mobile: false,
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,      // chỉ animate 1 lần
            offset: 80,      // tránh bị header che
        });
    }, []);

    return <>{children}</>;
}
