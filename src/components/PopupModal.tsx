'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

interface PopupData {
    _id: string;
    title: string;
    image?: string;
    link?: string;
}

export default function PopupModal() {
    const [popup, setPopup] = useState<PopupData | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        async function fetchPopup() {
            try {
                const res = await fetch('/api/popups/active');
                if (res.ok) {
                    const data = await res.json();
                    if (data) {
                        // Check session storage to see if already closed in this session
                        const seen = sessionStorage.getItem(`popup_seen_${data._id}`);
                        if (!seen) {
                            setPopup(data);
                            setIsVisible(true);
                        }
                    }
                }
            } catch (error) {
                console.error('Failed to fetch popup', error);
            }
        }

        fetchPopup();
    }, []);

    if (!isVisible || !popup) return null;

    const handleClose = () => {
        setIsVisible(false);
        sessionStorage.setItem(`popup_seen_${popup._id}`, 'true');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
                <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 bg-white rounded-full p-1"
                >
                    <X size={24} />
                </button>

                {popup.image ? (
                    <div className="w-full">
                        {popup.link ? (
                            <Link href={popup.link} onClick={handleClose}>
                                <img src={popup.image} alt={popup.title} className="w-full h-auto object-cover" />
                            </Link>
                        ) : (
                            <img src={popup.image} alt={popup.title} className="w-full h-auto object-cover" />
                        )}
                    </div>
                ) : (
                    <div className="p-8 text-center">
                        <h3 className="text-xl font-bold mb-4">{popup.title}</h3>
                        {popup.link && (
                            <Link href={popup.link} onClick={handleClose} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                More Details
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
