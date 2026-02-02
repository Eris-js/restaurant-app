

export default function OurServices() {
    return (
        <section id="services" className="py-20 bg-black text-white">
            <div className="container max-w-7xl mx-auto w-full px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold uppercase pb-2 border-b-2 border-[#f2b84b] inline-block">
                        Dịch Vụ Của Chúng Tôi
                    </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="bg-black aspect-square md:p-4 p-1 rounded-lg shadow-lg text-center">
                        <div className="w-full h-full mb-4">
                            <img src="/images/services/2.jpg" alt="Alacarte" className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <h3 className="text-xl font-semibold mb-4 uppercase">Alacarte</h3>
                    </div>
                    <div className="bg-black aspect-square md:p-4 p-1 rounded-lg shadow-lg text-center">
                        <div className="w-full h-full mb-4">
                            <img src="/images/services/1.jpg" alt="Alacarte" className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <h3 className="text-xl font-semibold mb-4 uppercase">Điểm tâm</h3>
                    </div>
                    <div className="bg-black aspect-square md:p-4 p-1 rounded-lg shadow-lg text-center">
                        <div className="w-full h-full mb-4">
                            <img src="/images/services/1.jpg" alt="Alacarte" className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <h3 className="text-xl font-semibold mb-4 uppercase">Khách đoàn</h3>
                    </div>
                    <div className="bg-black aspect-square md:p-4 p-1 rounded-lg shadow-lg text-center">
                        <div className="w-full h-full mb-4">
                            <img src="/images/services/3.jpg" alt="Alacarte" className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <h3 className="text-xl font-semibold mb-4 uppercase">Đặt tiệc</h3>
                    </div>
                </div>
            </div>
        </section>
    )
}