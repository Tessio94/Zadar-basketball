export default function Landing() {
    return (
        <section className="relative z-100">
            <div className="absolute inset-0 z-20 bg-linear-to-br from-likar4 to-transparent to-45%" />
            <div className="absolute inset-0 z-20 bg-linear-to-bl from-likar4 to-transparent to-45%" />
            <img
                src="/images/design/bg-shadow.png"
                alt=""
                className="absolute inset-0 z-10 min-h-[1080px] object-cover min-[1920px]:w-full"
            />
            <div className="flex h-270 items-center justify-start">
                <div className="z-100 flex w-full flex-col items-start gap-6 px-10 max-[1400px]:gap-4 max-[1024px]:gap-6 max-[450px]:px-4 sm:-mt-10 sm:mb-40 sm:px-12 lg:w-auto lg:px-16 xl:px-18 2xl:px-20">
                    <div className="hero-heading">
                        <div className="hero-eyebrow">
                            KOŠARKA. DRUŽENJE. EKIPA.
                        </div>

                        <h1>
                            <span className="title-white">Likar Zadar</span>
                            <span className="title-orange">
                                Košarkaška liga amatera i rekreativaca
                            </span>
                        </h1>

                        <div className="brush-line"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
