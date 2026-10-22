import { Link, usePage } from '@inertiajs/react';
import {
    ArchiveIcon,
    CalendarDays,
    ChevronRight,
    HomeIcon,
    Images,
    NewspaperIcon,
    Search,
    SearchX,
    Trophy,
    Users,
} from 'lucide-react';
import { useEffect, useEffectEvent, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import SearchComponent from './searchComponent';

export default function Header() {
    const [hambActive, setHambActive] = useState<boolean>(false);
    const [openSearch, setOpenSearch] = useState<boolean>(false);

    const searchButtonRef = useRef<HTMLButtonElement>(null);

    const { url: path } = usePage();

    const removeSidebar = useEffectEvent(() => {
        setHambActive(false);
    });

    useEffect(() => {
        removeSidebar();
    }, [path]);

    return (
        <>
            <div
                className={cn(
                    'fixed inset-0 z-150 bg-slate-900/60',
                    hambActive ? 'block' : 'hidden',
                )}
            ></div>
            <header
                className={cn(
                    'z-200 bg-transparent px-10 pt-8 pb-5 max-[450px]:px-4 max-md:pt-3 max-md:pb-3 sm:px-12 lg:px-16 xl:px-18 xl:py-5 2xl:px-20',
                    path === '/' ? 'absolute right-0 left-0' : 'relative',
                )}
            >
                <div className="relative flex flex-row items-center justify-between">
                    <Link
                        href="/"
                        className="flex flex-row items-stretch xl:gap-2.5 2xl:gap-5"
                    >
                        <img
                            src="/images/design/logo.png"
                            alt=""
                            className="h-22 w-22"
                        />
                        <div className="hidden flex-col items-start justify-center gap-1 xl:flex">
                            <h1 className="font-heading text-2xl font-semibold text-slate-100">
                                Likar{' '}
                                <span className="text-likar3">Krombacher</span>
                            </h1>
                            <p className="font-heading text-xl font-normal text-slate-300">
                                Liga košarkaških amatera
                            </p>
                        </div>
                    </Link>

                    <nav className="hidden rounded-full border-b border-likar3 bg-likar4/70 p-3 shadow-md shadow-likar3/30 md:-ml-[36px] md:block xl:-ml-[17px] 2xl:-ml-[27px]">
                        <ul className="flex items-center">
                            <li
                                className={cn(
                                    'relative',
                                    path === '/'
                                        ? 'rounded-full bg-likar1/70'
                                        : "before:absolute before:top-[calc(100%-6px)] before:left-full before:h-0.5 before:bg-slate-100 before:transition-all before:duration-300 after:absolute after:top-[calc(100%-6px)] after:right-full after:h-0.5 after:bg-slate-100 after:transition-all after:duration-300 after:content-[''] hover:before:left-1/2 hover:after:right-1/2 md:before:right-2.5 md:after:left-2.5 2xl:before:right-5 2xl:after:left-5",
                                )}
                            >
                                <Link
                                    className="inline-block cursor-pointer py-1.5 font-heading text-base font-semibold text-slate-100 md:px-2.5 xl:text-lg 2xl:px-5 2xl:text-[20px]"
                                    href="/"
                                >
                                    Naslovnica
                                </Link>
                            </li>
                            <li
                                className={cn(
                                    'relative',
                                    path === '/novosti'
                                        ? 'rounded-full bg-likar1/70'
                                        : "before:absolute before:top-[calc(100%-6px)] before:left-full before:h-0.5 before:bg-slate-100 before:transition-all before:duration-300 after:absolute after:top-[calc(100%-6px)] after:right-full after:h-0.5 after:bg-slate-100 after:transition-all after:duration-300 after:content-[''] hover:before:left-1/2 hover:after:right-1/2 md:before:right-2.5 md:after:left-2.5 2xl:before:right-5 2xl:after:left-5",
                                )}
                            >
                                <Link
                                    className="inline-block cursor-pointer py-1.5 font-heading text-base font-semibold text-slate-100 md:px-2.5 xl:text-lg 2xl:px-5 2xl:text-[20px]"
                                    href="/novosti"
                                >
                                    Novosti
                                </Link>
                            </li>

                            <li
                                className={cn(
                                    'relative',
                                    path === '/tablica'
                                        ? 'rounded-full bg-likar1/70'
                                        : "before:absolute before:top-[calc(100%-6px)] before:left-full before:h-0.5 before:bg-slate-100 before:transition-all before:duration-300 after:absolute after:top-[calc(100%-6px)] after:right-full after:h-0.5 after:bg-slate-100 after:transition-all after:duration-300 after:content-[''] hover:before:left-1/2 hover:after:right-1/2 md:before:right-2.5 md:after:left-2.5 2xl:before:right-5 2xl:after:left-5",
                                )}
                            >
                                <Link
                                    className="inline-block cursor-pointer py-1.5 font-heading text-base font-semibold text-slate-100 md:px-2.5 xl:text-lg 2xl:px-5 2xl:text-[20px]"
                                    href="/tablica"
                                >
                                    Tablica
                                </Link>
                            </li>

                            <li
                                className={cn(
                                    'relative',
                                    path === '/statistika'
                                        ? 'rounded-full bg-likar1/70'
                                        : "before:absolute before:top-[calc(100%-6px)] before:left-full before:h-0.5 before:bg-slate-100 before:transition-all before:duration-300 after:absolute after:top-[calc(100%-6px)] after:right-full after:h-0.5 after:bg-slate-100 after:transition-all after:duration-300 after:content-[''] hover:before:left-1/2 hover:after:right-1/2 md:before:right-2.5 md:after:left-2.5 2xl:before:right-5 2xl:after:left-5",
                                )}
                            >
                                <Link
                                    className="inline-block cursor-pointer py-1.5 font-heading text-base font-semibold text-slate-100 md:px-2.5 xl:text-lg 2xl:px-5 2xl:text-[20px]"
                                    href="/statistika"
                                >
                                    Statistika
                                </Link>
                            </li>
                            <li
                                className={cn(
                                    'relative',
                                    path === '/ekipe'
                                        ? 'rounded-full bg-likar1/70'
                                        : "before:absolute before:top-[calc(100%-6px)] before:left-full before:h-0.5 before:bg-slate-100 before:transition-all before:duration-300 after:absolute after:top-[calc(100%-6px)] after:right-full after:h-0.5 after:bg-slate-100 after:transition-all after:duration-300 after:content-[''] hover:before:left-1/2 hover:after:right-1/2 md:before:right-2.5 md:after:left-2.5 2xl:before:right-5 2xl:after:left-5",
                                )}
                            >
                                <Link
                                    className="inline-block cursor-pointer py-1.5 font-heading text-base font-semibold text-slate-100 md:px-2.5 xl:text-lg 2xl:px-5 2xl:text-[20px]"
                                    href="/ekipe"
                                >
                                    Ekipe
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="flex flex-row items-center max-md:mr-8 max-md:ml-auto">
                        <div className="absolute hidden max-xl:-top-4.5 max-xl:left-1/2 max-xl:-translate-x-1/2 max-xl:rounded-t-xl max-xl:bg-likar3/20 md:block lg:w-fit xl:relative xl:mr-2.5">
                            <ul className="flex flex-row items-center py-1 max-lg:justify-around xl:py-1.5">
                                <li
                                    className={cn(
                                        'border-r border-r-slate-100 md:px-2.5 2xl:px-3',
                                        path === '/o-nama'
                                            ? 'text-likar3'
                                            : 'text-slate-100',
                                    )}
                                >
                                    <Link
                                        className="relative inline-block cursor-pointer rounded-lg font-heading text-sm font-semibold before:absolute before:top-full before:right-0 before:left-full before:h-0.5 before:bg-slate-100 before:transition-all before:duration-300 after:absolute after:top-full after:right-full after:left-0 after:h-0.5 after:bg-slate-100 after:transition-all after:duration-300 after:content-[''] hover:before:left-1/2 hover:after:right-1/2 xl:text-lg"
                                        href="/o-nama"
                                    >
                                        O nama
                                    </Link>
                                </li>
                                <li
                                    className={cn(
                                        'border-r border-r-slate-100 md:px-2.5 2xl:px-3',
                                        path === '/arhiva'
                                            ? 'text-likar3'
                                            : 'text-slate-100',
                                    )}
                                >
                                    <Link
                                        className="relative inline-block cursor-pointer rounded-lg font-heading text-sm font-semibold before:absolute before:top-full before:right-0 before:left-full before:h-0.5 before:bg-slate-100 before:transition-all before:duration-300 after:absolute after:top-full after:right-full after:left-0 after:h-0.5 after:bg-slate-100 after:transition-all after:duration-300 after:content-[''] hover:before:left-1/2 hover:after:right-1/2 xl:text-lg"
                                        href="/arhiva"
                                    >
                                        Arhiva
                                    </Link>
                                </li>

                                <li
                                    className={cn(
                                        'md:px-2.5 2xl:px-3',
                                        path === '/galerija'
                                            ? 'text-likar3'
                                            : 'text-slate-100',
                                    )}
                                >
                                    <Link
                                        className="relative inline-block cursor-pointer rounded-lg font-heading text-sm font-semibold before:absolute before:top-full before:right-0 before:left-full before:h-0.5 before:bg-slate-100 before:transition-all before:duration-300 after:absolute after:top-full after:right-full after:left-0 after:h-0.5 after:bg-slate-100 after:transition-all after:duration-300 after:content-[''] hover:before:left-1/2 hover:after:right-1/2 xl:text-lg"
                                        href="/galerija"
                                    >
                                        Galerija
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <button
                            ref={searchButtonRef}
                            className="group flex h-13 w-13 cursor-pointer items-center justify-center rounded-full border border-b border-likar3 bg-likar4/70 shadow-md shadow-likar3/30 transition-all duration-300 hover:border-likar3 hover:bg-slate-100 max-lg:order-1 max-lg:ml-auto"
                            onClick={() => setOpenSearch((prev) => !prev)}
                        >
                            {openSearch ? (
                                <SearchX className="h-7 w-7 text-slate-100 transition-colors duration-300 group-hover:text-likar3" />
                            ) : (
                                <Search className="h-7 w-7 text-slate-100 transition-colors duration-300 group-hover:text-likar3" />
                            )}
                        </button>
                        <SearchComponent
                            open={openSearch}
                            setOpen={setOpenSearch}
                            searchButtonRef={searchButtonRef}
                        />
                    </div>

                    {/* ------------------mobile navigation---------------------------- */}
                    <div className="block rounded-2xl bg-likar1/60 p-2 max-lg:order-2 md:hidden">
                        <div
                            className="relative z-9999 h-[35px] w-12.5 rotate-0 cursor-pointer transition-all duration-300 ease-in-out"
                            onClick={() => setHambActive((prev) => !prev)}
                        >
                            <span
                                className={cn(
                                    'transition-300 absolute left-0 block h-[5px] w-full rounded-[9px] border border-likar1 bg-slate-100 transition-all ease-in-out',
                                    hambActive
                                        ? 'top-[16px] rotate-135'
                                        : 'top-0 rotate-0',
                                )}
                            ></span>
                            <span
                                className={cn(
                                    'transition-300 absolute top-[15px] block h-[5px] w-full rotate-0 rounded-[9px] border border-likar1 bg-slate-100 transition-all ease-in-out',
                                    hambActive
                                        ? '-left-[60px] opacity-0'
                                        : 'left-0 opacity-100',
                                )}
                            ></span>
                            <span
                                className={cn(
                                    'transition-300 absolute left-0 block h-[5px] w-full rounded-[9px] border border-likar1 bg-slate-100 transition-all ease-in-out',
                                    hambActive
                                        ? 'top-[16px] -rotate-135'
                                        : 'top-[30px] rotate-0',
                                )}
                            ></span>
                        </div>
                    </div>
                    <nav
                        className={cn(
                            'fixed top-0 bottom-0 left-0 z-9999 w-[300px] border-r-2 border-likar3 bg-[url(/images/design/logo.png)] bg-repeat shadow-[inset_-50px_0_50px_-50px_var(--likar3)] transition-all duration-300 max-[410px]:w-[290px] sm:w-[330px] md:hidden',
                            hambActive ? 'translate-x-0' : '-translate-x-full',
                        )}
                    >
                        <div className="absolute inset-0 -z-10 bg-linear-to-r from-likar3 to-likar4/90" />
                        <div className="scrollbar-slate flex h-full max-h-screen flex-col justify-between overflow-y-auto px-3 pt-2">
                            <div>
                                <div className="flex flex-row items-center gap-1.5 border-b border-slate-100/80 pb-3">
                                    <img
                                        src="/images/design/logo.png"
                                        alt=""
                                        className="h-18 w-18"
                                    />
                                    <div className="flex-col items-start justify-center gap-1 xl:flex">
                                        <h1 className="font-heading text-xl font-semibold text-slate-100">
                                            Likar{' '}
                                            <span className="text-likar3">
                                                Krombacher
                                            </span>
                                        </h1>
                                        <p className="font-heading text-sm font-normal text-slate-300">
                                            Liga košarkaških amatera
                                        </p>
                                    </div>
                                </div>

                                <ul className="flex flex-col border-b border-b-slate-100/80 py-3 text-2xl">
                                    <li className="w-full">
                                        <Link
                                            href="/"
                                            className={cn(
                                                'relative flex w-full cursor-pointer flex-row items-center justify-between rounded-2xl border border-transparent px-3 py-3 text-2xl text-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-likar4 motion-reduce:transition-none',
                                                path === '/' &&
                                                    'bg-[url(/images/design/snow.png)] text-likar3 [&_svg]:text-likar3 [&>div]:border-likar3',
                                            )}
                                        >
                                            <div className="flex flex-row items-center gap-2">
                                                <HomeIcon className="h-11 w-11 shrink-0 rounded-lg bg-likar2 p-2 text-slate-200/80" />
                                                <div>
                                                    <p className="font-heading tracking-wide capitalize">
                                                        Naslovnica
                                                    </p>
                                                    <p className="text-[11px] text-slate-200/80">
                                                        Sve iz lige na jednom
                                                        mjestu
                                                    </p>
                                                </div>
                                            </div>
                                            <ChevronRight className="text-slate-100" />
                                        </Link>
                                    </li>
                                    <li className="w-full">
                                        <Link
                                            href="/novosti"
                                            className={cn(
                                                'relative flex w-full cursor-pointer flex-row items-center justify-between rounded-2xl border border-transparent px-3 py-3 text-2xl text-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-likar4 motion-reduce:transition-none',
                                                path === '/novosti' &&
                                                    'bg-[url(/images/design/snow.png)] text-likar3 [&_svg]:text-likar3 [&>div]:border-likar3',
                                            )}
                                        >
                                            <div className="flex flex-row items-center gap-2">
                                                <NewspaperIcon className="h-11 w-11 shrink-0 rounded-lg bg-likar2 p-2 text-slate-200/80" />
                                                <div>
                                                    <p className="font-heading tracking-wide capitalize">
                                                        Novosti
                                                    </p>
                                                    <p className="text-[11px] text-slate-200/80">
                                                        Pratite priče s terena
                                                    </p>
                                                </div>
                                            </div>
                                            <ChevronRight className="text-slate-100" />
                                        </Link>
                                    </li>
                                    <li className="w-full">
                                        <Link
                                            href="/utakmice"
                                            className={cn(
                                                'relative flex w-full cursor-pointer flex-row items-center justify-between rounded-2xl border border-transparent px-3 py-3 text-2xl text-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-likar4 motion-reduce:transition-none',
                                                path === '/utakmice' &&
                                                    'bg-[url(/images/design/snow.png)] text-likar3 [&_svg]:text-likar3 [&>div]:border-likar3',
                                            )}
                                        >
                                            <div className="flex flex-row items-center gap-2">
                                                <CalendarDays className="h-11 w-11 shrink-0 rounded-lg bg-likar2 p-2 text-slate-200/80" />
                                                <div>
                                                    <p className="font-heading tracking-wide capitalize">
                                                        Utakmice
                                                    </p>
                                                    <p className="text-[11px] text-slate-200/80">
                                                        Raspored i posljednji
                                                        rezultati
                                                    </p>
                                                </div>
                                            </div>
                                            <ChevronRight className="text-slate-100" />
                                        </Link>
                                    </li>
                                    <li className="w-full">
                                        <Link
                                            href="/tablica"
                                            className={cn(
                                                'relative flex w-full cursor-pointer flex-row items-center justify-between rounded-2xl border border-transparent px-3 py-3 text-2xl text-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-likar4 motion-reduce:transition-none',
                                                path === '/tablica' &&
                                                    'bg-[url(/images/design/snow.png)] text-likar3 [&_svg]:text-likar3 [&>div]:border-likar3',
                                            )}
                                        >
                                            <div className="flex flex-row items-center gap-2">
                                                <Trophy className="h-11 w-11 shrink-0 rounded-lg bg-likar2 p-2 text-slate-200/80" />
                                                <div>
                                                    <p className="font-heading tracking-wide capitalize">
                                                        Tablica
                                                    </p>
                                                    <p className="text-[11px] text-slate-200/80">
                                                        Sezona i doigravanje
                                                    </p>
                                                </div>
                                            </div>
                                            <ChevronRight className="text-slate-100" />
                                        </Link>
                                    </li>
                                    <li className="w-full">
                                        <Link
                                            href="/ekipe"
                                            className={cn(
                                                'relative flex w-full cursor-pointer flex-row items-center justify-between rounded-2xl border border-transparent px-3 py-3 text-2xl text-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-likar4 motion-reduce:transition-none',
                                                path === '/ekipe' &&
                                                    'bg-[url(/images/design/snow.png)] text-likar3 [&_svg]:text-likar3 [&>div]:border-likar3',
                                            )}
                                        >
                                            <div className="flex flex-row items-center gap-2">
                                                <Users className="h-11 w-11 shrink-0 rounded-lg bg-likar2 p-2 text-slate-200/80" />
                                                <div>
                                                    <p className="font-heading tracking-wide capitalize">
                                                        Ekipe
                                                    </p>
                                                    <p className="text-[11px] text-slate-200/80">
                                                        Upoznaj momčadi lige
                                                    </p>
                                                </div>
                                            </div>
                                            <ChevronRight className="text-slate-100" />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <ul className="flex flex-row gap-2.5 border-b border-b-slate-100/80 py-3 text-2xl">
                                    <li className="w-full">
                                        <Link
                                            href="/o-nama"
                                            className={cn(
                                                'relative cursor-pointer rounded-2xl text-slate-100',
                                                path === '/o-nama' &&
                                                    'text-likar3 [&>div]:border-likar3 [&>div]:bg-[url(/images/design/snow.png)]',
                                            )}
                                        >
                                            <div className="flex flex-col items-center gap-1 rounded-2xl border border-slate-100/80 px-2.5 py-1.5">
                                                <Users className="h-6 w-6 shrink-0 text-slate-200/80" />
                                                <div>
                                                    <p className="font-heading text-base tracking-normal">
                                                        O nama
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="w-full">
                                        <Link
                                            href="/arhiva"
                                            className={cn(
                                                'relative cursor-pointer rounded-2xl text-slate-100',
                                                path === '/arhiva' &&
                                                    'text-likar3 [&>div]:border-likar3 [&>div]:bg-[url(/images/design/snow.png)]',
                                            )}
                                        >
                                            <div className="flex flex-col items-center gap-1 rounded-2xl border border-slate-100/80 px-2.5 py-1.5">
                                                <ArchiveIcon className="h-6 w-6 shrink-0 text-slate-200/80" />
                                                <div>
                                                    <p className="font-heading text-base tracking-normal">
                                                        Arhiva
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="w-full">
                                        <Link
                                            href="/galerija"
                                            className={cn(
                                                'relative cursor-pointer rounded-2xl text-slate-100',
                                                path === '/galerija' &&
                                                    'text-likar3 [&>div]:border-likar3 [&>div]:bg-[url(/images/design/snow.png)]',
                                            )}
                                        >
                                            <div className="flex flex-col items-center gap-1 rounded-2xl border border-slate-100/80 px-2.5 py-1.5">
                                                <Images className="h-6 w-6 shrink-0 text-slate-200/80" />
                                                <div>
                                                    <p className="font-heading text-base tracking-normal">
                                                        Galerija
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                </ul>

                                <div className="flex items-center justify-center gap-5 px-5 py-3">
                                    <a
                                        href="https://www.instagram.com/"
                                        target="_blank"
                                        className="group rounded-2xl border border-slate-100/80 bg-slate-100/70 text-pink-600"
                                    >
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth="0"
                                            viewBox="0 0 512 512"
                                            className="h-12 w-12 rounded-xl p-1 transition-all duration-300 group-hover:scale-120"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M336 96c21.2 0 41.3 8.4 56.5 23.5S416 154.8 416 176v160c0 21.2-8.4 41.3-23.5 56.5S357.2 416 336 416H176c-21.2 0-41.3-8.4-56.5-23.5S96 357.2 96 336V176c0-21.2 8.4-41.3 23.5-56.5S154.8 96 176 96h160m0-32H176c-61.6 0-112 50.4-112 112v160c0 61.6 50.4 112 112 112h160c61.6 0 112-50.4 112-112V176c0-61.6-50.4-112-112-112z"></path>
                                            <path d="M360 176c-13.3 0-24-10.7-24-24s10.7-24 24-24c13.2 0 24 10.7 24 24s-10.8 24-24 24zM256 192c35.3 0 64 28.7 64 64s-28.7 64-64 64-64-28.7-64-64 28.7-64 64-64m0-32c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96z"></path>
                                        </svg>
                                    </a>
                                    <a
                                        href="https://web.facebook.com/"
                                        target="_blank"
                                        className="group rounded-2xl border border-slate-100/80 bg-slate-100/70 text-blue-600"
                                    >
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth="0"
                                            viewBox="0 0 512 512"
                                            className="h-12 w-12 rounded-xl p-1 transition-all duration-300 group-hover:scale-120"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M426.8 64H85.2C73.5 64 64 73.5 64 85.2v341.6c0 11.7 9.5 21.2 21.2 21.2H256V296h-45.9v-56H256v-41.4c0-49.6 34.4-76.6 78.7-76.6 21.2 0 44 1.6 49.3 2.3v51.8h-35.3c-24.1 0-28.7 11.4-28.7 28.2V240h57.4l-7.5 56H320v152h106.8c11.7 0 21.2-9.5 21.2-21.2V85.2c0-11.7-9.5-21.2-21.2-21.2z"></path>
                                        </svg>
                                    </a>
                                    <a
                                        href="https://www.youtube.com/"
                                        target="_blank"
                                        className="group rounded-2xl border border-slate-100/80 bg-slate-100/70 text-red-600"
                                    >
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth="0"
                                            viewBox="0 0 512 512"
                                            className="h-12 w-12 rounded-xl p-1 transition-all duration-300 group-hover:scale-120"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="M508.6 148.8c0-45-33.1-81.2-74-81.2C379.2 65 322.7 64 265 64h-18c-57.6 0-114.2 1-169.6 3.6C36.6 67.6 3.5 104 3.5 149 1 184.6-.1 220.2 0 255.8c-.1 35.6 1 71.2 3.4 106.9 0 45 33.1 81.5 73.9 81.5 58.2 2.7 117.9 3.9 178.6 3.8 60.8.2 120.3-1 178.6-3.8 40.9 0 74-36.5 74-81.5 2.4-35.7 3.5-71.3 3.4-107 .2-35.6-.9-71.2-3.3-106.9zM207 353.9V157.4l145 98.2-145 98.3z"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    );
}
