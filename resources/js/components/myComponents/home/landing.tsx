import { Link } from '@inertiajs/react';

export default function Landing() {
    return (
        <section className="relative z-100">
            <img
                src="/bg-shadow.png"
                alt=""
                className="absolute inset-0 z-10 min-h-[1080px] object-cover min-[1920px]:w-full"
            />
            <div className="flex h-270 items-center justify-start">
                <div className="z-100 flex w-full flex-col items-start gap-6 px-10 max-[1400px]:gap-4 max-[1024px]:gap-6 max-[450px]:px-4 sm:-mt-10 sm:px-12 lg:w-auto lg:px-16 xl:px-18 2xl:px-20">
                    <h1 className="relative text-start font-heading text-8xl font-bold text-slate-100 my-text-stroke after:absolute after:top-[105%] after:right-0 after:left-0 after:h-1 after:bg-linear-to-r after:from-transparent after:via-likar3 after:to-transparent after:content-[''] max-[1700px]:text-8xl max-[1500px]:text-7xl max-[640px]:text-6xl max-sm:mb-7 max-sm:w-full max-sm:text-center">
                        Likar{' '}
                        <span className="text-likar3 my-text-stroke2">
                            Krombacher
                        </span>
                    </h1>
                    <h3 className="text-start font-text text-3xl text-slate-100 max-[400px]:text-2xl">
                        Lika košarkaških amatera i rekreativaca
                    </h3>
                    <p className="text-start font-text text-3xl text-slate-100 max-[400px]:text-2xl">
                        Kontakt: likarzadar@gmail.com
                    </p>

                    <div className="mt-5 flex flex-row items-center gap-5 max-sm:mx-auto max-sm:mt-8">
                        <div>
                            <Link
                                className="hover:bg-theme4 rounded-4xl border-2 border-transparent bg-likar1 px-5 py-2.5 font-text text-2xl font-semibold text-slate-100 transition-all duration-300 hover:border-slate-100 max-[1400px]:px-7 max-[1400px]:py-3 max-[640px]:text-2xl"
                                href="/novosti"
                            >
                                Novosti
                            </Link>
                        </div>
                        <div>
                            <Link
                                className="hover:bg-theme4 rounded-4xl border-2 border-transparent bg-likar2 px-5 py-2.5 font-text text-2xl font-semibold text-slate-100 transition-all duration-300 hover:border-likar1 hover:shadow-likar1 max-[1400px]:px-7 max-[1400px]:py-3 max-[640px]:text-2xl"
                                href="/ekipe"
                            >
                                Ekipe
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
