

export default function MapSection() {
    return (
        <div id="map" className="py-0 relative h-100 w-full bg-gray-800">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.0181491790727!2d106.6706527!3d10.809921600000008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529210906c593%3A0x2d1453db8e57034a!2zMTIzIEjhu5NuZyBIw6AsIHBoxrDhu51uZyA5LCBQaMO6IE5odeG6rW4sIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2svn!4v1409737810779"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
            ></iframe>
        </div>
    );
}