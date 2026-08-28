import ChampionHistory from './championsHistory';

export default function Info() {
    return (
        <section className="relative w-full bg-[url(/images/design/main-bg2-mb.png)] bg-no-repeat pb-10 max-[400px]:bg-position-[50%_0%] max-[400px]:pt-[600px]! max-sm:pt-[700px] min-[640px]:h-[1559px] min-[890px]:h-[1368px] min-[890px]:bg-[url(/images/design/main-bg2.png)] sm:bg-cover">
            <div className="absolute inset-0 bg-linear-to-b from-transparent from-40% to-[#000105] to-100%" />
            <div className="relative z-20 flex w-[95%] flex-col items-center overflow-hidden rounded-4xl px-3 py-3 shadow-2xl shadow-likar1 max-sm:mx-auto min-[640px]:absolute min-[640px]:top-[700px] min-[640px]:left-1/2 min-[640px]:-translate-x-1/2 min-[890px]:top-[660px] sm:w-[90%] sm:px-6 lg:w-[80%] xl:top-[610px] xl:w-[60%] xl:py-5">
                <div className="absolute inset-0 z-0 bg-[url(/images/design/snow.png)] opacity-45" />
                <h5 className="relative mb-6 text-center font-heading text-3xl font-semibold text-likar3 my-text-stroke2 after:absolute after:top-[109%] after:right-0 after:left-0 after:h-0.5 after:bg-linear-to-r after:from-transparent after:via-likar3 after:to-transparent after:content-[''] xl:text-4xl 2xl:text-5xl">
                    Osvajači Likar lige
                </h5>
                <div className="z-100">
                    <ChampionHistory />
                    <div className="mt-3 flex w-full flex-col items-start gap-2">
                        <small className="text-start text-slate-100 italic">
                            *MVP finala
                        </small>
                        <small className="text-start text-slate-100 italic">
                            **MVP ligaškog dijela
                        </small>
                    </div>
                </div>
            </div>
        </section>
    );
}
