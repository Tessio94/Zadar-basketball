import { Link } from '@inertiajs/react';
import BasketballIcon from '../../ui/icons/basketballIcon';
import { ArrowRight } from 'lucide-react';

export default function Landing() {
    return (
        <section className="relative z-100 flex aspect-video min-h-[850px] w-full items-center">
            <div className="absolute inset-0 z-20 bg-linear-to-br from-likar4 to-transparent to-45%" />
            <div className="absolute inset-0 z-20 bg-linear-to-bl from-likar4 to-transparent to-45%" />
            <img
                src="/images/design/bg-shadow.png"
                alt=""
                className="absolute inset-0 z-10 h-full object-cover min-[1920px]:w-full"
            />

            <div className="z-100 flex w-full flex-col items-start gap-6 px-10 max-[1400px]:gap-4 max-[1024px]:gap-6 max-[450px]:px-4 sm:mb-20 sm:px-12 lg:w-auto lg:px-16 xl:px-18 2xl:px-20">
                <div className="hero-heading">
                    <div className="hero-eyebrow hidden sm:block">
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

                <Link
                    href="/utakmice"
                    className="group hero-link mt-2 hidden flex-row items-stretch overflow-hidden rounded-full border border-likar3 md:flex"
                >
                    <div className="z-10 flex flex-row items-center rounded-full bg-likar4">
                        <span className="py-3 pr-1.5 pl-3">
                            <BasketballIcon
                                width={35}
                                height={35}
                                fill={'#f1f5f9'}
                                className="rounded-full bg-likar1"
                            />
                        </span>
                        <span className="py-3 pr-3 pl-1.5 font-heading text-3xl font-semibold text-slate-100">
                            Utakmice
                        </span>
                    </div>
                    <div className="relative z-0 -ml-7 hidden shrink-0 items-center justify-center overflow-hidden rounded-r-full bg-likar4 pr-3 pl-7.5 xl:flex">
                        <div className="absolute inset-0 z-0 bg-likar3 transition-all duration-600 content-[''] group-hover:translate-x-20 after:absolute after:top-0 after:bottom-0 after:left-0 after:z-0 after:aspect-square after:-translate-x-1/2 after:rounded-full after:bg-likar4 after:content-['']"></div>
                        <ArrowRight className="z-10 text-3xl text-slate-100 transition-all duration-300 group-hover:translate-x-1.5" />
                    </div>
                </Link>
            </div>
        </section>
    );
}
