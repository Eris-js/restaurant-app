export default function RestaurantSchema() {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "@id": "https://hoavientriky.vn/#restaurant",
        "name": "Nhà Hàng Hoa Viên Tri Kỷ",
        "image": [
            "https://hoavientriky.vn/images/bg.jpg",
            "https://hoavientriky.vn/images/logo/logo.png"
        ],
        "logo": "https://hoavientriky.vn/images/logo/logo.png",
        "url": "https://hoavientriky.vn",
        "telephone": "+84964113719",
        "priceRange": "$$",
        "servesCuisine": ["Vietnamese", "Ẩm thực Việt"],
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Hồng Hà, Phường 9, Quận Phú Nhuận",
            "addressLocality": "Hồ Chí Minh",
            "addressCountry": "VN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 10.8099216,
            "longitude": 106.6706527
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday"
                ],
                "opens": "07:00",
                "closes": "24:00"
            }
        ],
        "hasMap":
            "https://www.google.com/maps/place/123+Hồng+Hà,+Phú+Nhuận",
        "sameAs": [
            "https://www.facebook.com/hoavientriky",
            "https://www.youtube.com/@hoavientriky"
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema),
            }}
        />
    );
}
