
const services = [
    { title: 'Alacarte', img: '/images/services/2.jpg' },
    { title: 'Điểm tâm', img: '/images/services/1.jpg' },
    { title: 'Khách đoàn', img: '/images/services/1.jpg' },
    { title: 'Đặt tiệc', img: '/images/services/3.jpg' },
];

export default function OurServices() {
    return (
        <section id="services" className="py-20 bg-black text-white">
            <div className="container max-w-7xl mx-auto w-full">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold uppercase pb-2 border-b-2 border-[#f2b84b] inline-block">
                        Dịch Vụ Của Chúng Tôi
                    </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {services.map((item, index) => (
                        <div
                            key={item.title}
                            data-aos="fade-up"
                            data-aos-delay={index * 150}
                            data-aos-duration="800"
                            className="
        bg-black text-center
        p-2 md:p-4
        hover:shadow-xl
        transition-all
      "
                        >
                            <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                                <img
                                    src={item.img}
                                    alt={item.title}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                                />
                            </div>

                            <h3 className="text-lg md:text-xl font-semibold uppercase tracking-wide">
                                {item.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}