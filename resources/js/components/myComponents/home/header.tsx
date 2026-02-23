import { Search } from 'lucide-react';

export default function Header() {
    return (
        <header className="absolute right-0 left-0 z-200 bg-transparent py-5 backdrop-blur-sm">
            <div className="mx-auto max-w-[90%]">
                <div className="mr-12 ml-auto w-fit rounded-tl-full rounded-tr-full bg-likar3/50 px-15 py-1">
                    <ul className="flex items-center lg:gap-4 xl:gap-14 2xl:gap-22">
                        <li>
                            <a
                                className="relative inline-block cursor-pointer text-base font-semibold text-slate-100 before:absolute before:top-[90%] before:right-0 before:left-full before:h-0.5 before:bg-slate-100 before:transition-all before:duration-300 after:absolute after:top-[90%] after:right-full after:left-0 after:h-0.5 after:bg-slate-100 after:transition-all after:duration-300 after:content-[''] hover:before:left-1/2 hover:after:right-1/2 xl:text-lg"
                                href="/o-nama"
                            >
                                O nama
                            </a>
                        </li>
                        <li>
                            <a
                                className="relative inline-block cursor-pointer text-base font-semibold text-slate-100 before:absolute before:top-[90%] before:right-0 before:left-full before:h-0.5 before:bg-slate-100 before:transition-all before:duration-300 after:absolute after:top-[90%] after:right-full after:left-0 after:h-0.5 after:bg-slate-100 after:transition-all after:duration-300 after:content-[''] hover:before:left-1/2 hover:after:right-1/2 xl:text-lg"
                                href="/kontakt"
                            >
                                Kontakt
                            </a>
                        </li>

                        <li>
                            <a
                                className="relative inline-block cursor-pointer text-base font-semibold text-slate-100 before:absolute before:top-[90%] before:right-0 before:left-full before:h-0.5 before:bg-slate-100 before:transition-all before:duration-300 after:absolute after:top-[90%] after:right-full after:left-0 after:h-0.5 after:bg-slate-100 after:transition-all after:duration-300 after:content-[''] hover:before:left-1/2 hover:after:right-1/2 xl:text-lg"
                                href="/galerija"
                            >
                                Galerija
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="flex items-center justify-between rounded-full bg-likar4/70 px-5 py-1.5 shadow-md shadow-likar2/60 backdrop-blur-2xl">
                    <a href="#">
                        <img src="/logo.png" alt="" className="h-22 w-22" />
                    </a>

                    <nav>
                        <ul className="flex items-center lg:gap-4 xl:gap-14 2xl:gap-22">
                            <li>
                                <a
                                    className="relative inline-block cursor-pointer text-base font-semibold text-slate-100 before:absolute before:top-full before:right-0 before:left-full before:h-0.5 before:bg-slate-100 before:transition-all before:duration-300 after:absolute after:top-full after:right-full after:left-0 after:h-0.5 after:bg-slate-100 after:transition-all after:duration-300 after:content-[''] hover:before:left-1/2 hover:after:right-1/2 xl:text-lg"
                                    href="/"
                                >
                                    Naslovnica
                                </a>
                            </li>
                            <li>
                                <a
                                    className="relative inline-block cursor-pointer text-base font-semibold text-slate-100 before:absolute before:top-full before:right-0 before:left-full before:h-0.5 before:bg-slate-100 before:transition-all before:duration-300 after:absolute after:top-full after:right-full after:left-0 after:h-0.5 after:bg-slate-100 after:transition-all after:duration-300 after:content-[''] hover:before:left-1/2 hover:after:right-1/2 xl:text-lg"
                                    href="/novosti"
                                >
                                    Novosti
                                </a>
                            </li>

                            <li>
                                <a
                                    className="relative inline-block cursor-pointer text-base font-semibold text-slate-100 before:absolute before:top-full before:right-0 before:left-full before:h-0.5 before:bg-slate-100 before:transition-all before:duration-300 after:absolute after:top-full after:right-full after:left-0 after:h-0.5 after:bg-slate-100 after:transition-all after:duration-300 after:content-[''] hover:before:left-1/2 hover:after:right-1/2 xl:text-lg"
                                    href="/statistika"
                                >
                                    Tablica
                                </a>
                            </li>
                            <li>
                                <a
                                    className="relative inline-block cursor-pointer text-base font-semibold text-slate-100 before:absolute before:top-full before:right-0 before:left-full before:h-0.5 before:bg-slate-100 before:transition-all before:duration-300 after:absolute after:top-full after:right-full after:left-0 after:h-0.5 after:bg-slate-100 after:transition-all after:duration-300 after:content-[''] hover:before:left-1/2 hover:after:right-1/2 xl:text-lg"
                                    href="/statistika"
                                >
                                    Statistika
                                </a>
                            </li>
                            <li>
                                <div className="group relative flex cursor-pointer items-center gap-2 text-base font-semibold text-slate-100 xl:text-lg">
                                    <span className="">Sezona</span>
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        stroke-width="0"
                                        viewBox="0 0 24 24"
                                        className="text-3xl transition-all duration-300 group-hover:rotate-x-180"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                                    </svg>
                                    <div className="invisible absolute top-[130%] max-h-0 opacity-0 transition-all duration-300 group-hover:visible group-hover:max-h-250 group-hover:opacity-100">
                                        <ul className="flex flex-col">
                                            <li>
                                                <a
                                                    className="block rounded-t-xl border border-b-0 border-slate-100 bg-likar2/70 px-3 py-2 text-nowrap text-slate-100 transition-all duration-300 hover:text-likar1"
                                                    href="/2025-2026"
                                                >
                                                    2025-2026
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    className="block rounded-b-xl border border-slate-100 bg-likar2/70 px-3 py-2 text-nowrap text-slate-100 transition-all duration-300 hover:text-likar1"
                                                    href="/2024-2025"
                                                >
                                                    2024-2025
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </nav>
                    <div className="flex h-13 w-13 items-center justify-center rounded-full border border-slate-100/60 bg-likar1/80">
                        <Search className="h-7 w-7 text-slate-100" />
                    </div>
                </div>
            </div>
        </header>
    );
}
