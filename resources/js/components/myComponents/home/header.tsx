import { usePage } from '@inertiajs/react';
import { ChevronDown, Search } from 'lucide-react';
import { useEffect, useEffectEvent, useState } from 'react';
import { cn } from '@/lib/utils';

export default function Header() {
    const [hambActive, setHambActive] = useState<boolean>(false);
    const [sezonaDrodown, setSezonaDropdown] = useState<boolean>(false);

    const { url: path } = usePage();

    const removeSidebar = useEffectEvent(() => {
        setHambActive(false);
    });

    useEffect(() => {
        removeSidebar();
    }, [path]);

    return (
        <header
            className={cn(
                'z-200 bg-transparent px-10 py-5 max-[450px]:px-4 sm:px-12 lg:px-16 xl:px-18 2xl:px-20',
                path === '/' ? 'absolute right-0 left-0' : 'relative',
            )}
        >
            <div className="ml-auto hidden w-[calc(100%-96px)] rounded-tl-full rounded-tr-full bg-likar3/50 px-15 py-1 max-lg:mx-12 sm:block lg:mr-12 lg:w-fit">
                <ul className="flex items-center gap-10 max-lg:justify-around lg:gap-14 xl:gap-14 2xl:gap-22">
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
            <div className="flex items-center justify-between rounded-full bg-likar4/70 px-5 py-1.5 shadow-md shadow-likar2/60">
                <a href="/">
                    <img src="/logo.png" alt="" className="h-22 w-22" />
                </a>

                <nav className="hidden lg:block">
                    <ul className="flex items-center lg:gap-14 xl:gap-18 2xl:gap-22">
                        <li>
                            <a
                                className="relative inline-block cursor-pointer font-heading text-base font-semibold text-slate-100 before:absolute before:top-full before:right-0 before:left-full before:h-0.5 before:bg-slate-100 before:transition-all before:duration-300 after:absolute after:top-full after:right-full after:left-0 after:h-0.5 after:bg-slate-100 after:transition-all after:duration-300 after:content-[''] hover:before:left-1/2 hover:after:right-1/2 xl:text-lg 2xl:text-[20px]"
                                href="/"
                            >
                                Naslovnica
                            </a>
                        </li>
                        <li>
                            <a
                                className="relative inline-block cursor-pointer font-heading text-base font-semibold text-slate-100 before:absolute before:top-full before:right-0 before:left-full before:h-0.5 before:bg-slate-100 before:transition-all before:duration-300 after:absolute after:top-full after:right-full after:left-0 after:h-0.5 after:bg-slate-100 after:transition-all after:duration-300 after:content-[''] hover:before:left-1/2 hover:after:right-1/2 xl:text-lg 2xl:text-[20px]"
                                href="/novosti"
                            >
                                Novosti
                            </a>
                        </li>

                        <li>
                            <a
                                className="relative inline-block cursor-pointer font-heading text-base font-semibold text-slate-100 before:absolute before:top-full before:right-0 before:left-full before:h-0.5 before:bg-slate-100 before:transition-all before:duration-300 after:absolute after:top-full after:right-full after:left-0 after:h-0.5 after:bg-slate-100 after:transition-all after:duration-300 after:content-[''] hover:before:left-1/2 hover:after:right-1/2 xl:text-lg 2xl:text-[20px]"
                                href="/tablica"
                            >
                                Tablica
                            </a>
                        </li>
                        <li>
                            <a
                                className="relative inline-block cursor-pointer font-heading text-base font-semibold text-slate-100 before:absolute before:top-full before:right-0 before:left-full before:h-0.5 before:bg-slate-100 before:transition-all before:duration-300 after:absolute after:top-full after:right-full after:left-0 after:h-0.5 after:bg-slate-100 after:transition-all after:duration-300 after:content-[''] hover:before:left-1/2 hover:after:right-1/2 xl:text-lg 2xl:text-[20px]"
                                href="/statistika"
                            >
                                Statistika
                            </a>
                        </li>
                        <li>
                            <div className="group relative flex cursor-pointer items-center gap-2 font-heading text-base font-semibold text-slate-100 xl:text-lg">
                                <span className="2xl:text-[20px]">Sezona</span>

                                <ChevronDown className="text-3xl transition-all duration-300 group-hover:rotate-x-180" />
                                <div className="invisible absolute top-[130%] max-h-0 opacity-0 transition-all duration-300 group-hover:visible group-hover:max-h-250 group-hover:opacity-100">
                                    <ul className="flex flex-col">
                                        <li>
                                            <a
                                                className="block rounded-t-xl border border-b-0 border-slate-100 bg-likar4 px-3 py-2 text-nowrap text-slate-100 transition-all duration-300 hover:text-likar1"
                                                href="/sezona/2025-2026"
                                            >
                                                2025-2026
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="block rounded-b-xl border border-slate-100 bg-likar4 px-3 py-2 text-nowrap text-slate-100 transition-all duration-300 hover:text-likar1"
                                                href="/sezona/2024-2025"
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

                {/* ------------------mobile navigation---------------------------- */}
                <div className="block rounded-2xl bg-likar1/60 p-2 max-lg:order-2 lg:hidden">
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
                        'fixed top-0 bottom-0 left-0 z-9999 w-[300px] border-r-2 border-likar3 bg-[url(/logo.png)] bg-contain bg-repeat shadow-[inset_-50px_0_50px_-50px_var(--likar3)] transition-all duration-300 max-[410px]:w-[260px] sm:w-[330px] lg:hidden',
                        hambActive ? 'translate-x-0' : '-translate-x-full',
                    )}
                >
                    <div className="absolute inset-0 -z-10 bg-linear-to-r from-likar3 to-likar4/90" />
                    <div className="scrollbar-slate flex h-full max-h-screen flex-col justify-between gap-25 overflow-y-auto pt-12">
                        <ul className="flex flex-col gap-6 text-2xl">
                            <li className="w-full">
                                <a
                                    href="/"
                                    className="relative block w-full cursor-pointer px-3 py-1 font-heading text-2xl font-bold tracking-widest text-slate-100 capitalize"
                                >
                                    Naslovnica
                                </a>
                            </li>
                            <li className="w-full">
                                <a
                                    href="/novosti"
                                    className="relative block w-full cursor-pointer px-3 py-1 font-heading text-2xl font-bold tracking-widest text-slate-100 capitalize"
                                >
                                    Novosti
                                </a>
                            </li>
                            <li className="w-full">
                                <a
                                    href="/tablica"
                                    className="relative block w-full cursor-pointer px-3 py-1 font-heading text-2xl font-bold tracking-widest text-slate-100 capitalize"
                                >
                                    Tablica
                                </a>
                            </li>
                            <li className="w-full">
                                <a
                                    href="/statistika"
                                    className="relative block w-full cursor-pointer px-3 py-1 font-heading text-2xl font-bold tracking-widest text-slate-100 capitalize"
                                >
                                    Statistika
                                </a>
                            </li>
                            <li>
                                <div>
                                    <p
                                        className="text-md group relative flex w-full cursor-pointer items-center gap-2 px-3 py-1 font-heading text-2xl font-bold tracking-widest text-slate-100 capitalize"
                                        onClick={() =>
                                            setSezonaDropdown((prev) => !prev)
                                        }
                                    >
                                        Sezona
                                        <ChevronDown className="text-3xl transition-all duration-300 group-hover:rotate-x-180" />
                                    </p>

                                    <div
                                        className={cn(
                                            'transition-all duration-300',
                                            sezonaDrodown
                                                ? 'visible max-h-250 opacity-100'
                                                : 'invisible max-h-0 opacity-0',
                                        )}
                                    >
                                        <ul className="flex flex-col">
                                            <li>
                                                <a
                                                    href="/sezona/2025-2026"
                                                    className="block px-3 py-2 text-slate-100"
                                                >
                                                    2025-2026
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    href="/sezona/2024-2025"
                                                    className="block border-t border-slate-100 px-3 py-2 text-slate-100"
                                                >
                                                    2024-2025
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div>
                            <ul className="flex flex-col gap-6 py-6 text-2xl">
                                <li className="w-full">
                                    <a
                                        href="/0-nama"
                                        className="relative block w-full cursor-pointer px-3 py-1 font-heading text-2xl font-bold tracking-widest text-slate-100 capitalize"
                                    >
                                        O nama
                                    </a>
                                </li>
                                <li className="w-full">
                                    <a
                                        href="/kontakt"
                                        className="relative block w-full cursor-pointer px-3 py-1 font-heading text-2xl font-bold tracking-widest text-slate-100 capitalize"
                                    >
                                        Kontakt
                                    </a>
                                </li>
                                <li className="w-full">
                                    <a
                                        href="/galerija"
                                        className="relative block w-full cursor-pointer px-3 py-1 font-heading text-2xl font-bold tracking-widest text-slate-100 capitalize"
                                    >
                                        Galerija
                                    </a>
                                </li>
                            </ul>

                            <div className="to-likar4-40 flex items-center gap-5 bg-linear-to-bl from-likar4/80 px-5 py-2">
                                <a
                                    href="https://www.instagram.com/ivan_radicev/"
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
                                    href="https://web.facebook.com/RadicevIvan/?locale=hr_HR&amp;_rdc=1&amp;_rdr#"
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
                                    href="https://www.youtube.com/@ivanradicev7934"
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
                <div className="mr-4 flex h-13 w-13 items-center justify-center rounded-full border border-slate-100/60 bg-likar1/80 max-lg:order-1 max-lg:ml-auto sm:mr-6">
                    <Search className="h-7 w-7 text-slate-100" />
                </div>
            </div>
        </header>
    );
}
