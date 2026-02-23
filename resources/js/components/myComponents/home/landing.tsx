export default function Landing() {
    return (
        <section className="relative z-100">
            <img
                src="/bg-shadow.png"
                alt=""
                className="absolute inset-0 z-10 max-xl:min-h-[1080px] max-xl:object-cover min-[1920px]:w-full"
            />
            <div className="flex h-screen items-center justify-start">
                <div className="z-100 ml-[5%] flex w-full flex-col items-start gap-6 px-6 max-[1400px]:gap-4 max-[1024px]:gap-6 sm:px-10 lg:w-auto lg:px-0">
                    <h1 className="text-center text-8xl font-bold text-slate-100 max-[1700px]:text-8xl max-[1500px]:text-7xl max-[640px]:text-5xl max-[400px]:text-4xl">
                        Likar <span className="text-theme1">Krombacher</span>
                    </h1>
                    <h3 className="text-start text-3xl text-slate-100 max-[400px]:text-2xl">
                        Lika košarkaških amatera i rekreativaca
                    </h3>

                    <div className="mt-5 flex flex-row items-center gap-5">
                        <div>
                            <a
                                className="hover:bg-theme4 rounded-4xl border-2 border-transparent bg-likar1 px-5 py-2.5 text-2xl font-semibold text-slate-100 transition-all duration-300 hover:border-likar2 hover:text-likar2 max-[1400px]:px-7 max-[1400px]:py-3 max-[640px]:text-2xl"
                                href="/novosti"
                            >
                                Novosti
                            </a>
                        </div>
                        <div>
                            <a
                                className="hover:bg-theme4 rounded-4xl border-2 border-transparent bg-likar2 px-5 py-2.5 text-2xl font-semibold text-slate-100 transition-all duration-300 hover:border-likar1 hover:text-likar1 hover:shadow-likar1 max-[1400px]:px-7 max-[1400px]:py-3 max-[640px]:text-2xl"
                                href="/rezultati"
                            >
                                Rezultati
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
