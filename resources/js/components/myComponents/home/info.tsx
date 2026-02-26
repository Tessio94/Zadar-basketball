import { Link } from '@inertiajs/react';

export default function Info() {
    return (
        <section className="relative h-[1559px] w-full bg-[url(/main-bg2-mb.png)] bg-cover bg-no-repeat min-[890px]:h-[1368px] min-[890px]:bg-[url(/main-bg2.png)]">
            {/* <img src="/bg-about.png" alt="" /> */}
            {/* <img src="/main-bg.png" alt="" className=""/> */}
            {/* <div className="absolute inset-0 bg-linear-to-b from-transparent via-likar1/20 via-70% to-likar3" /> */}

            <div className="absolute top-[700px] left-1/2 z-20 flex w-[95%] -translate-x-1/2 flex-col items-center gap-6 overflow-hidden rounded-4xl px-3 py-5 shadow-2xl shadow-likar1 min-[890px]:top-[660px] sm:w-[90%] sm:gap-10 sm:px-6 sm:py-10 lg:w-[80%] xl:top-[630px] xl:w-[60%]">
                <div className="absolute inset-0 z-0 bg-[url(/snow.png)] opacity-45" />
                <div className="relative mb-2.5 flex flex-col items-center gap-2 after:absolute after:top-[105%] after:right-0 after:left-0 after:h-0.5 after:bg-linear-to-r after:from-transparent after:via-likar3 after:to-transparent after:content-[''] sm:mb-5">
                    <h5 className="text-center font-heading text-[28px] font-semibold text-likar3 sm:text-3xl">
                        Likar Krombacher - Liga košarkaških amatera i
                        rekreativaca
                    </h5>
                </div>
                <div className="flex flex-col items-start gap-6 sm:gap-10">
                    <p className="z-20 text-start font-text text-lg text-slate-100 sm:text-xl">
                        <strong className="font-heading text-likar3">
                            Likar Krobmacher
                        </strong>{' '}
                        je liga za košarkaške amatere koja okuplja zaljubljenike
                        u košarku svih generacija, s ciljem promicanja sportskog
                        duha, fair-playa i zajedništva.
                    </p>
                    <p className="z-20 text-start font-text text-lg text-slate-100 sm:text-xl">
                        Liga je pokrenuta s idejom stvaranja organiziranog
                        natjecanja za rekreativce i amatere koji žele osjetiti
                        čar natjecateljske košarke bez profesionalnog pritiska.
                    </p>
                    <p className="z-20 text-start font-text text-lg text-slate-100 sm:text-xl">
                        Liga se održava u sportskom centru{' '}
                        <strong className="font-heading text-likar3">
                            Višnjik u Zadru
                        </strong>
                        , pružajući igračima vrhunske uvjete za natjecanje i
                        druženje.
                    </p>
                </div>
                <div className="z-20 mt-2.5 sm:mt-5">
                    <Link
                        className="hover:bg-theme4 rounded-4xl border-2 border-transparent bg-likar1 px-5 py-2.5 font-text text-2xl font-semibold text-slate-100 transition-all duration-300 hover:border-slate-100 hover:shadow-likar1 max-[1400px]:px-7 max-[1400px]:py-3 max-[640px]:text-2xl"
                        href="/o-nama"
                    >
                        O nama
                    </Link>
                </div>
            </div>
        </section>
    );
}
