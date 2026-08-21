import { Link } from '@inertiajs/react';
import { ChevronRight, Newspaper } from 'lucide-react';

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
                <div className="z-100 mb-40 flex w-full flex-col items-start gap-6 px-10 max-[1400px]:gap-4 max-[1024px]:gap-6 max-[450px]:px-4 sm:-mt-10 sm:px-12 lg:w-auto lg:px-16 xl:px-18 2xl:px-20">
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
                <div className="z-100 mb-40 ml-auto flex w-full flex-col items-start gap-6 px-10 max-[1400px]:gap-4 max-[1024px]:gap-6 max-[450px]:px-4 sm:-mt-10 sm:px-12 lg:w-auto lg:px-16 xl:px-18 2xl:px-20">
                    <ul>
                        <li>
                            <Link
                                className="border-xl flex flex-row items-center justify-between gap-3 rounded-t-lg border border-likar4 bg-likar2 p-2.5"
                                href="/novosti"
                            >
                                <Newspaper className="shrink-0 text-8xl text-likar3" />
                                <div>
                                    <h5 className="font-heading text-2xl font-semibold text-slate-100">
                                        Novosti
                                    </h5>
                                    <p className="text-slate-300">
                                        Sve aktualnosti s terena
                                    </p>
                                </div>
                                <ChevronRight className="shrink-0 text-2xl text-slate-100" />
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="border-xl flex flex-row items-center justify-between gap-3 border border-likar4 bg-likar2 p-2.5"
                                href="/novosti"
                            >
                                <Newspaper className="shrink-0 text-8xl text-likar3" />
                                <div>
                                    <h5 className="font-heading text-2xl font-semibold text-slate-100">
                                        Novosti
                                    </h5>
                                    <p className="text-slate-300">
                                        Sve aktualnosti s terena
                                    </p>
                                </div>
                                <ChevronRight className="shrink-0 text-2xl text-slate-100" />
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="border-xl flex flex-row items-center justify-between gap-3 border border-likar4 bg-likar2 p-2.5"
                                href="/novosti"
                            >
                                <Newspaper className="shrink-0 text-8xl text-likar3" />
                                <div>
                                    <h5 className="font-heading text-2xl font-semibold text-slate-100">
                                        Novosti
                                    </h5>
                                    <p className="text-slate-300">
                                        Sve aktualnosti s terena
                                    </p>
                                </div>
                                <ChevronRight className="shrink-0 text-2xl text-slate-100" />
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="border-xl flex flex-row items-center justify-between gap-3 rounded-b-lg border border-likar4 bg-likar2 p-2.5"
                                href="/novosti"
                            >
                                <Newspaper className="shrink-0 text-8xl text-likar3" />
                                <div>
                                    <h5 className="font-heading text-2xl font-semibold text-slate-100">
                                        Novosti
                                    </h5>
                                    <p className="text-slate-300">
                                        Sve aktualnosti s terena
                                    </p>
                                </div>
                                <ChevronRight className="shrink-0 text-2xl text-slate-100" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
