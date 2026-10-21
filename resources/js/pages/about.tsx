import { Head, Link } from '@inertiajs/react';
import { Clock1, Mail, MapPinCheckInside } from 'lucide-react';

export default function About() {
    return (
        <>
            <Head>
                <title>O nama | Likar Krombacher</title>
                <meta
                    name="description"
                    content="Upoznaj LIKAR Krombacher Zadar — ligu košarkaških amatera i rekreativaca. Od prvih utakmica u Jazinama do susreta na Višnjiku."
                />
            </Head>
            <div className="px-[5%] pt-10 pb-16 font-text text-slate-100 **:box-border max-md:pt-6 max-md:pb-10 motion-reduce:[&_a]:transition-none [&_a:focus-visible]:outline-[3px] [&_a:focus-visible]:outline-offset-[6px] [&_a:focus-visible]:outline-likar3 [&_a:focus-visible]:outline-solid">
                <div className="mx-auto overflow-hidden rounded-3xl border border-likar1 bg-likar4/60 shadow-xl shadow-likar3/60 max-md:rounded-2xl">
                    <section
                        className="relative isolate overflow-hidden before:absolute before:inset-0 before:-z-2 before:bg-[linear-gradient(90deg,#3f3633_0%,#3f363399_50%,#3f363333_100%),url('/images/design/hardwood.jpg')] before:bg-cover before:bg-center before:content-['']"
                        aria-labelledby="about-title"
                    >
                        <div className="flex justify-between gap-4 border-b border-likar2 px-[5%] py-6 text-[10px] font-bold tracking-[0.2em] text-slate-200/70 uppercase max-md:px-[6%] max-md:py-5 max-md:text-[9px] max-md:tracking-[0.12em] md:bg-[linear-gradient(90deg,transparent_0%,transparent_60%,#3f3633_100%)] [&>span:first-child]:text-likar3 max-md:[&>span:last-child]:hidden">
                            <span>LIKAR Krombacher Zadar</span>
                            <span>Liga košarkaških amatera i rekreativaca</span>
                        </div>

                        <div className="grid grid-cols-[1.12fr_1fr] items-center px-[5%] pt-18 pb-19 max-lg:grid-cols-[1.1fr_0.9fr] max-lg:pt-12.5 max-lg:pb-15 max-md:grid-cols-1 max-md:gap-7 max-md:px-[6%] max-md:pt-9.5 max-md:pb-12">
                            <div className="relative z-2">
                                <h1
                                    id="about-title"
                                    className="mt-6 mb-6.5 font-heading text-[clamp(32px,3.4vw,48px)] leading-[1.04] font-bold tracking-[-0.025em] uppercase [&>span]:block [&>span]:text-likar3"
                                >
                                    Od entuzijazma do
                                    <span>gradkse lige.</span>
                                </h1>
                                <p className="m-0 max-w-110 text-base leading-[1.85] font-normal text-[#c4c6ca] max-md:text-[15px]">
                                    Od prvih utakmica u Jazinama do susreta na
                                    Višnjiku. LIKAR je mjesto za zadarske
                                    amatere, rekreativce i sve koji žive za igru
                                    pod obručima.
                                </p>
                                <div className="mt-8 flex flex-wrap items-center gap-6">
                                    <Link
                                        href="/utakmice"
                                        className="rounded-full border border-likar3 bg-likar3 px-4 py-2.5 font-heading text-lg font-semibold text-slate-100 transition-[background,border-color] duration-300 ease-[ease] hover:bg-likar1"
                                    >
                                        Prati utakmice
                                    </Link>
                                    <Link
                                        href="/novosti"
                                        className="inline-flex items-center gap-3 rounded-full border border-likar2 px-4 py-2.5 font-heading text-lg font-semibold text-slate-100 transition-all duration-300 ease-[ease] hover:border-likar1 hover:bg-likar2"
                                    >
                                        Novosti
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section
                        className="grid grid-cols-3 border-y border-likar2 bg-slate-900 max-md:grid-cols-1"
                        aria-label="Naša priča u brojkama"
                    >
                        <div className="flex items-center gap-4.5 px-[max(20px,3vw)] py-7.5 max-lg:gap-3 max-lg:px-5 max-lg:py-6 max-md:gap-5.5 max-md:px-[6%] max-md:py-5 [&+div]:border-l [&+div]:border-likar2 max-md:[&+div]:border-t max-md:[&+div]:border-l-0 max-md:[&+div]:border-t-likar2 [&>span]:max-w-40 [&>span]:text-xs [&>span]:leading-[1.7] [&>span]:text-slate-200/80 max-md:[&>span]:max-w-none max-md:[&>span]:text-[13px] [&>strong]:shrink-0 [&>strong]:font-heading [&>strong]:text-5xl [&>strong]:leading-none [&>strong]:font-semibold [&>strong]:text-likar3 max-lg:[&>strong]:text-[38px] max-md:[&>strong]:min-w-13">
                            <strong>09</strong>
                            <span>momčadi s kojima je započela naša priča</span>
                        </div>
                        <div className="flex items-center gap-4.5 px-[max(20px,3vw)] py-7.5 max-lg:gap-3 max-lg:px-5 max-lg:py-6 max-md:gap-5.5 max-md:px-[6%] max-md:py-5 [&+div]:border-l [&+div]:border-likar2 max-md:[&+div]:border-t max-md:[&+div]:border-l-0 max-md:[&+div]:border-t-likar2 [&>span]:max-w-40 [&>span]:text-xs [&>span]:leading-[1.7] [&>span]:text-slate-200/80 max-md:[&>span]:max-w-none max-md:[&>span]:text-[13px] [&>strong]:shrink-0 [&>strong]:font-heading [&>strong]:text-5xl [&>strong]:leading-none [&>strong]:font-semibold [&>strong]:text-likar3 max-lg:[&>strong]:text-[38px] max-md:[&>strong]:min-w-13">
                            <strong>06</strong>
                            <span>sezona koje su oblikovale ligu</span>
                        </div>
                        <div className="flex items-center gap-4.5 px-[max(20px,3vw)] py-7.5 max-lg:gap-3 max-lg:px-5 max-lg:py-6 max-md:gap-5.5 max-md:px-[6%] max-md:py-5 [&+div]:border-l [&+div]:border-likar2 max-md:[&+div]:border-t max-md:[&+div]:border-l-0 max-md:[&+div]:border-t-likar2 [&>span]:max-w-40 [&>span]:text-xs [&>span]:leading-[1.7] [&>span]:text-slate-200/80 max-md:[&>span]:max-w-none max-md:[&>span]:text-[13px] [&>strong]:shrink-0 [&>strong]:font-heading [&>strong]:text-5xl [&>strong]:leading-none [&>strong]:font-semibold [&>strong]:text-likar3 max-lg:[&>strong]:text-[38px] max-md:[&>strong]:min-w-13">
                            <strong>01</strong>
                            <span>zajednička strast — košarka</span>
                        </div>
                    </section>

                    <section
                        className="grid grid-cols-[0.9fr_1.1fr] gap-15 px-[5%] py-19 max-lg:gap-9 max-lg:py-14 max-md:grid-cols-1 max-md:gap-7 max-md:px-[6%] max-md:py-11"
                        aria-labelledby="about-story-title"
                    >
                        <div>
                            <p className="m-0 flex items-center gap-3 text-[11px] leading-[1.6] font-bold tracking-[0.18em] text-likar3 uppercase before:h-0.5 before:w-7 before:shrink-0 before:bg-current before:content-['']">
                                Info
                            </p>
                            <p className="mt-5 flex flex-row items-center gap-8 font-heading text-[clamp(24px,2.8vw,30px)] leading-[1.16] font-semibold uppercase [&>em]:text-likar3 [&>em]:not-italic">
                                <MapPinCheckInside className="h-8 w-8 shrink-0 rounded-full bg-likar4/60 p-1 text-likar3" />
                                Višnjik, Dvorana 3
                            </p>
                            <p className="mt-5 flex flex-row items-center gap-8 font-heading text-[clamp(24px,2.8vw,30px)] leading-[1.16] font-semibold uppercase [&>em]:text-likar3 [&>em]:not-italic">
                                <Clock1 className="h-8 w-8 shrink-0 rounded-full bg-likar4/60 p-1 text-likar3" />
                                Nedjelja, jutarnji termini
                            </p>
                            <a
                                href="mailto:likarzadar@gmail.com"
                                className="group mt-5 flex flex-row items-center gap-8 font-heading text-[clamp(24px,2.8vw,30px)] leading-[1.16] font-semibold uppercase [&>em]:text-likar3 [&>em]:not-italic"
                            >
                                <Mail className="h-8 w-8 shrink-0 rounded-full bg-likar4/60 p-1 text-likar3" />
                                <span className="group-hover:underline">
                                    likarzadar@gmail.com
                                </span>
                            </a>
                        </div>
                        <div className="[&_strong]:font-semibold [&_strong]:text-slate-100 [&>p]:m-0 [&>p]:text-base [&>p]:leading-[1.95] [&>p]:text-slate-200/80 [&>p+p]:mt-5">
                            <p>
                                Pokrenuta entuzijazmom zaljubljenika u košarku,
                                <strong>
                                    {' '}
                                    LIKAR — Liga košarkaških amatera i
                                    rekreativaca
                                </strong>{' '}
                                izrasla je iz devet početnih momčadi u
                                prepoznatljivo gradsko natjecanje i dio zadarske
                                sportske scene.
                            </p>
                            <p>
                                Šest sezona donijelo je brojne utakmice,
                                različite momčadi i igrače. Od prvih utakmica u
                                Jazinama do današnjih susreta na Višnjiku, u
                                središtu je ostalo ono najvažnije:{' '}
                                <strong>
                                    igranje košarke i međusobno natjecanje.
                                </strong>
                            </p>
                            <p>
                                Svaka nova sezona otvara prostor za nove
                                susrete, nove momčadi i nove prilike da se
                                pokaže što se može na terenu.
                            </p>
                        </div>
                    </section>

                    <section
                        className="mx-[5%] mb-[5%] flex items-center justify-between gap-8 rounded-xl border border-likar1 bg-[url(/images/design/snow.png)] px-9 py-8.5 max-md:mx-[6%] max-md:mb-[6%] max-md:flex-col max-md:items-start max-md:gap-5.5 max-md:px-5.5 max-md:py-6.5 [&_p]:mt-2.5 [&_p]:max-w-150 [&_p]:text-sm [&_p]:leading-[1.8] [&_p]:text-slate-200/80 [&>a]:shrink-0"
                        aria-labelledby="about-join-title"
                    >
                        <div>
                            <h2
                                id="about-join-title"
                                className="m-0 font-heading text-[clamp(26px,3vw,36px)] leading-[1.16] font-semibold uppercase"
                            >
                                Tvoja ekipa. Tvoja liga.
                            </h2>
                            <p>
                                Upoznaj LIKAR, prati momčadi i budi dio zadarske
                                košarkaške priče.
                            </p>
                        </div>
                        <Link
                            href="/ekipe"
                            className="rounded-full border border-likar3 bg-likar3 px-4 py-2.5 text-lg font-semibold text-slate-100 transition-[background] duration-300 ease-[ease] hover:bg-likar1"
                        >
                            Istraži ekipe
                        </Link>
                    </section>
                </div>
            </div>
        </>
    );
}
