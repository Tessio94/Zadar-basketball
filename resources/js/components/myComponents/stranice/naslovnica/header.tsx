import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, Search, SearchX } from 'lucide-react';
import { useEffect, useEffectEvent, useState } from 'react';
import { show } from '@/actions/App/Http/Controllers/TeamController';
import { cn } from '@/lib/utils';
import SearchComponent from './searchComponent';

export default function Header() {
    const [hambActive, setHambActive] = useState<boolean>(false);
    const [openSearch, setOpenSearch] = useState<boolean>(false);

    const { url: path } = usePage();

    const removeSidebar = useEffectEvent(() => {
        setHambActive(false);
    });

    useEffect(() => {
        removeSidebar();
    }, [path]);

    return (
        <>
            <header
                className={cn(
                    'z-200 bg-transparent px-10 pt-8 pb-5 max-[450px]:px-4 sm:px-12 lg:px-16 xl:px-18 xl:py-5 2xl:px-20',
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
                            <p className="font-text text-xl font-normal text-slate-300">
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
                                        : "before:absolute before:top-[calc(100%-6px)] before:right-5 before:left-full before:h-0.5 before:bg-slate-100 before:transition-all before:duration-300 after:absolute after:top-[calc(100%-6px)] after:right-full after:left-5 after:h-0.5 after:bg-slate-100 after:transition-all after:duration-300 after:content-[''] hover:before:left-1/2 hover:after:right-1/2",
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
                                        : "before:absolute before:top-[calc(100%-6px)] before:right-5 before:left-full before:h-0.5 before:bg-slate-100 before:transition-all before:duration-300 after:absolute after:top-[calc(100%-6px)] after:right-full after:left-5 after:h-0.5 after:bg-slate-100 after:transition-all after:duration-300 after:content-[''] hover:before:left-1/2 hover:after:right-1/2",
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
                                        : "before:absolute before:top-[calc(100%-6px)] before:right-5 before:left-full before:h-0.5 before:bg-slate-100 before:transition-all before:duration-300 after:absolute after:top-[calc(100%-6px)] after:right-full after:left-5 after:h-0.5 after:bg-slate-100 after:transition-all after:duration-300 after:content-[''] hover:before:left-1/2 hover:after:right-1/2",
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
                                        : "before:absolute before:top-[calc(100%-6px)] before:right-5 before:left-full before:h-0.5 before:bg-slate-100 before:transition-all before:duration-300 after:absolute after:top-[calc(100%-6px)] after:right-full after:left-5 after:h-0.5 after:bg-slate-100 after:transition-all after:duration-300 after:content-[''] hover:before:left-1/2 hover:after:right-1/2",
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
                                        : "before:absolute before:top-[calc(100%-6px)] before:right-5 before:left-full before:h-0.5 before:bg-slate-100 before:transition-all before:duration-300 after:absolute after:top-[calc(100%-6px)] after:right-full after:left-5 after:h-0.5 after:bg-slate-100 after:transition-all after:duration-300 after:content-[''] hover:before:left-1/2 hover:after:right-1/2",
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

                    <div className="flex flex-row items-center">
                        <div className="absolute hidden max-xl:-top-4.5 max-xl:left-1/2 max-xl:-translate-x-1/2 max-xl:rounded-t-xl max-xl:bg-likar3/20 md:block lg:w-fit xl:relative xl:mr-2.5">
                            <ul className="flex flex-row items-center py-1 max-lg:justify-around xl:py-1.5">
                                <li
                                    className={cn(
                                        'relative',
                                        path === '/o-nama'
                                            ? 'rounded-lg text-slate-900'
                                            : "before:absolute before:top-full before:right-0 before:left-full before:h-0.5 before:bg-slate-100 before:transition-all before:duration-300 after:absolute after:top-full after:right-full after:left-0 after:h-0.5 after:bg-slate-100 after:transition-all after:duration-300 after:content-[''] hover:before:left-1/2 hover:after:right-1/2",
                                    )}
                                >
                                    <Link
                                        className="inline-block cursor-pointer border-r border-r-slate-100 text-sm font-semibold text-slate-100 md:px-2.5 xl:text-lg 2xl:px-3"
                                        href="/o-nama"
                                    >
                                        O nama
                                    </Link>
                                </li>
                                <li
                                    className={cn(
                                        'relative',
                                        path === '/arhiva'
                                            ? 'rounded-lg text-slate-900'
                                            : "before:absolute before:top-full before:right-0 before:left-full before:h-0.5 before:bg-slate-100 before:transition-all before:duration-300 after:absolute after:top-full after:right-full after:left-0 after:h-0.5 after:bg-slate-100 after:transition-all after:duration-300 after:content-[''] hover:before:left-1/2 hover:after:right-1/2",
                                    )}
                                >
                                    <Link
                                        className="inline-block cursor-pointer border-r border-r-slate-100 text-sm font-semibold text-slate-100 md:px-2.5 xl:text-lg 2xl:px-3"
                                        href="/arhiva"
                                    >
                                        Arhiva
                                    </Link>
                                </li>

                                <li
                                    className={cn(
                                        'relative',
                                        path === '/galerija'
                                            ? 'rounded-lg text-slate-900'
                                            : "before:absolute before:top-full before:right-0 before:left-full before:h-0.5 before:bg-slate-100 before:transition-all before:duration-300 after:absolute after:top-full after:right-full after:left-0 after:h-0.5 after:bg-slate-100 after:transition-all after:duration-300 after:content-[''] hover:before:left-1/2 hover:after:right-1/2",
                                    )}
                                >
                                    <Link
                                        className="inline-block cursor-pointer text-sm font-semibold text-slate-100 md:px-2.5 xl:text-lg 2xl:px-3"
                                        href="/galerija"
                                    >
                                        Galerija
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <button
                            className="group flex h-13 w-13 cursor-pointer items-center justify-center rounded-full border border-b border-likar3 bg-likar4/70 shadow-md shadow-likar3/30 transition-all duration-300 hover:border-likar3 hover:bg-slate-100 max-lg:order-1 max-lg:ml-auto"
                            onClick={() => setOpenSearch((prev) => !prev)}
                        >
                            {openSearch ? (
                                <SearchX className="h-7 w-7 text-slate-100 transition-colors duration-300 group-hover:text-likar3" />
                            ) : (
                                <Search className="h-7 w-7 text-slate-100 transition-colors duration-300 group-hover:text-likar3" />
                            )}
                        </button>
                        <SearchComponent open={openSearch} />
                    </div>

                    {/* ------------------mobile navigation---------------------------- */}
                    <div className="block rounded-2xl bg-likar1/60 p-2 max-lg:order-2 md:hidden">
                        <div
                            className="relative z-50 h-[35px] w-12.5 rotate-0 cursor-pointer transition-all duration-300 ease-in-out"
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
                            'fixed top-0 bottom-0 left-0 z-9999 w-[300px] border-r-2 border-likar3 bg-[url(/images/design/logo.png)] bg-contain bg-repeat shadow-[inset_-50px_0_50px_-50px_var(--likar3)] transition-all duration-300 max-[410px]:w-[260px] sm:w-[330px] md:hidden',
                            hambActive ? 'translate-x-0' : '-translate-x-full',
                        )}
                    >
                        <div className="absolute inset-0 -z-10 bg-linear-to-r from-likar3 to-likar4/90" />
                        <div className="scrollbar-slate flex h-full max-h-screen flex-col justify-between gap-25 overflow-y-auto pt-12">
                            <ul className="flex flex-col gap-6 text-2xl">
                                <li className="w-full">
                                    <Link
                                        href="/"
                                        className={cn(
                                            'relative block w-full cursor-pointer px-3 py-1 font-heading text-2xl font-bold tracking-widest text-slate-100 capitalize',
                                            path === '/' && 'text-slate-900',
                                        )}
                                    >
                                        Naslovnica
                                    </Link>
                                </li>
                                <li className="w-full">
                                    <Link
                                        href="/novosti"
                                        className={cn(
                                            'relative block w-full cursor-pointer px-3 py-1 font-heading text-2xl font-bold tracking-widest text-slate-100 capitalize',
                                            path === '/novosti' &&
                                                'text-slate-900',
                                        )}
                                    >
                                        Novosti
                                    </Link>
                                </li>
                                <li className="w-full">
                                    <Link
                                        href="/tablica"
                                        className={cn(
                                            'relative block w-full cursor-pointer px-3 py-1 font-heading text-2xl font-bold tracking-widest text-slate-100 capitalize',
                                            path === '/tablica' &&
                                                'text-slate-900',
                                        )}
                                    >
                                        Tablica
                                    </Link>
                                </li>
                                <li className="w-full">
                                    <Link
                                        href="/statistika"
                                        className={cn(
                                            'relative block w-full cursor-pointer px-3 py-1 font-heading text-2xl font-bold tracking-widest text-slate-100 capitalize',
                                            path === '/statistika' &&
                                                'text-slate-900',
                                        )}
                                    >
                                        Statistika
                                    </Link>
                                </li>
                                <li className="w-full">
                                    <Link
                                        href="/ekipe"
                                        className={cn(
                                            'relative block w-full cursor-pointer px-3 py-1 font-heading text-2xl font-bold tracking-widest text-slate-100 capitalize',
                                            path === '/ekipe' &&
                                                'text-slate-900',
                                        )}
                                    >
                                        Ekipe
                                    </Link>
                                </li>
                            </ul>
                            <div>
                                <ul className="flex flex-col gap-6 py-6 text-2xl">
                                    <li className="w-full">
                                        <Link
                                            href="/o-nama"
                                            className={cn(
                                                'relative block w-full cursor-pointer px-3 py-1 font-heading text-2xl font-bold tracking-widest text-slate-100 capitalize',
                                                path === '/o-nama' &&
                                                    'text-slate-900',
                                            )}
                                        >
                                            O nama
                                        </Link>
                                    </li>
                                    <li className="w-full">
                                        <Link
                                            href="/arhiva"
                                            className={cn(
                                                'relative block w-full cursor-pointer px-3 py-1 font-heading text-2xl font-bold tracking-widest text-slate-100 capitalize',
                                                path === '/arhiva' &&
                                                    'text-slate-900',
                                            )}
                                        >
                                            Arhiva
                                        </Link>
                                    </li>
                                    <li className="w-full">
                                        <Link
                                            href="/galerija"
                                            className={cn(
                                                'relative block w-full cursor-pointer px-3 py-1 font-heading text-2xl font-bold tracking-widest text-slate-100 capitalize',
                                                path === '/galerija' &&
                                                    'text-slate-900',
                                            )}
                                        >
                                            Galerija
                                        </Link>
                                    </li>
                                </ul>

                                <div className="to-likar4-40 flex items-center gap-5 bg-linear-to-bl from-likar4/80 px-5 py-2">
                                    <a
                                        href="https://www.instagram.com/"
                                        target="_blank"
                                        className="group text-pink-600"
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
                                        className="group text-blue-600"
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
                                        className="group text-red-600"
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
