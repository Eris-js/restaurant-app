"use client";

import { useEffect } from "react";

declare global {
    interface Window {
        $: any;
    }
}

type Mode = "pdf" | "image" | "html";

export default function FlipBook({ mode }: { mode: Mode }) {
    useEffect(() => {
        const init = () => {
            const $ = window.$;
            if (!$ || !$.fn?.FlipBook) return;

            const container = $(".solid-container");
            container.empty();

            if (mode === "pdf") {
                container.FlipBook({
                    pdf: "/flipbook/pdf/FoxitPdfSdk.pdf",
                });
            }

            if (mode === "image") {
                container.FlipBook({
                    pageCallback: function (n: number) {
                        return {
                            type: "image",
                            src: `/flipbook/images/menu/${n + 1}V.jpg`,
                            interactive: false,
                        };
                    },
                    pages: 40,
                });
            }

            if (mode === "html") {
                container.FlipBook({
                    pageCallback: function (n: number) {
                        return {
                            type: "html",
                            src: `/flipbook/html/preview/${(n % 3) + 1}.html`,
                            interactive: true,
                        };
                    },
                    pages: 10,
                });
            }
        };

        // đảm bảo script load xong
        const timer = setTimeout(init, 300);
        return () => clearTimeout(timer);
    }, [mode]);

    return (
        <div className="solid-container w-full" />
    );
}
