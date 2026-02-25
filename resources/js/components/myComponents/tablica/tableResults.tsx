import { ChevronLeft, ChevronRight, Dribbble } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function TableResults() {
    const scrollRef = useRef(null);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);

    useEffect(() => {
        const el = scrollRef.current;

        const checkScroll = () => {
            if (!el) return;

            setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
            setCanScrollLeft(el.scrollLeft > 0);
        };

        checkScroll();
        el.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);

        return () => {
            el.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        };
    }, []);

    return (
        <div className="mb-20 rounded-xl border border-likar1 shadow-xl shadow-likar1">
            <div className="rounded-t-xl bg-likar1 p-2 text-xl font-semibold text-slate-100 uppercase">
                Raspored 2025-26
            </div>
            <div className="relative">
                {canScrollLeft && (
                    <button
                        onClick={() =>
                            scrollRef.current.scrollBy({
                                left: -300,
                                behavior: 'smooth',
                            })
                        }
                        className="absolute top-1/2 -left-[6%] z-10 -translate-y-1/2 rounded-r-xl bg-likar3/80 p-2"
                    >
                        <ChevronLeft className="text-white" />
                    </button>
                )}

                {/* RIGHT ARROW */}
                {canScrollRight && (
                    <button
                        onClick={() =>
                            scrollRef.current.scrollBy({
                                left: 300,
                                behavior: 'smooth',
                            })
                        }
                        className="absolute top-1/2 -right-[6%] z-10 -translate-y-1/2 rounded-l-xl bg-likar3/80 p-2"
                    >
                        <ChevronRight className="text-white" />
                    </button>
                )}

                <div
                    className="scrollbar-thumb-rounded-full scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin max-h-100 overflow-y-auto scrollbar-thumb-likar3 scrollbar-track-likar2 hover:scrollbar-thumb-likar3"
                    ref={scrollRef}
                >
                    <table className="w-full overflow-hidden rounded-b-xl">
                        <tbody>
                            <tr className="text-slate-100 odd:bg-likar2 even:bg-likar2/60">
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    16/01/2026
                                </td>
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    10:00 AM
                                </td>
                                <td className="border-r border-likar4 p-2">
                                    <span className="flex flex-row flex-nowrap items-center justify-center gap-4 text-nowrap">
                                        <Dribbble />
                                        KK Vodovod Ballers
                                    </span>
                                </td>

                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    vs
                                </td>
                                <td className="border-r border-likar4 p-2">
                                    <span className="flex flex-row flex-nowrap items-center justify-center gap-4 text-nowrap">
                                        <Dribbble />
                                        KK Sfinga Stafford
                                    </span>
                                </td>
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    95 - 86
                                </td>
                            </tr>
                            <tr className="text-slate-100 odd:bg-likar2 even:bg-likar2/60">
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    16/01/2026
                                </td>
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    10:00 AM
                                </td>
                                <td className="border-r border-likar4 p-2">
                                    <span className="flex flex-row flex-nowrap items-center justify-center gap-4 text-nowrap">
                                        <Dribbble />
                                        KK Vodovod Ballers
                                    </span>
                                </td>

                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    vs
                                </td>
                                <td className="border-r border-likar4 p-2">
                                    <span className="flex flex-row flex-nowrap items-center justify-center gap-4 text-nowrap">
                                        <Dribbble />
                                        KK Sfinga Stafford
                                    </span>
                                </td>
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    95 - 86
                                </td>
                            </tr>
                            <tr className="text-slate-100 odd:bg-likar2 even:bg-likar2/60">
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    16/01/2026
                                </td>
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    10:00 AM
                                </td>
                                <td className="border-r border-likar4 p-2">
                                    <span className="flex flex-row flex-nowrap items-center justify-center gap-4 text-nowrap">
                                        <Dribbble />
                                        KK Vodovod Ballers
                                    </span>
                                </td>

                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    vs
                                </td>
                                <td className="border-r border-likar4 p-2">
                                    <span className="flex flex-row flex-nowrap items-center justify-center gap-4 text-nowrap">
                                        <Dribbble />
                                        KK Sfinga Stafford
                                    </span>
                                </td>
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    95 - 86
                                </td>
                            </tr>
                            <tr className="text-slate-100 odd:bg-likar2 even:bg-likar2/60">
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    16/01/2026
                                </td>
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    10:00 AM
                                </td>
                                <td className="border-r border-likar4 p-2">
                                    <span className="flex flex-row flex-nowrap items-center justify-center gap-4 text-nowrap">
                                        <Dribbble />
                                        KK Vodovod Ballers
                                    </span>
                                </td>

                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    vs
                                </td>
                                <td className="border-r border-likar4 p-2">
                                    <span className="flex flex-row flex-nowrap items-center justify-center gap-4 text-nowrap">
                                        <Dribbble />
                                        KK Sfinga Stafford
                                    </span>
                                </td>
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    95 - 86
                                </td>
                            </tr>
                            <tr className="text-slate-100 odd:bg-likar2 even:bg-likar2/60">
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    16/01/2026
                                </td>
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    10:00 AM
                                </td>
                                <td className="border-r border-likar4 p-2">
                                    <span className="flex flex-row flex-nowrap items-center justify-center gap-4 text-nowrap">
                                        <Dribbble />
                                        KK Vodovod Ballers
                                    </span>
                                </td>

                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    vs
                                </td>
                                <td className="border-r border-likar4 p-2">
                                    <span className="flex flex-row flex-nowrap items-center justify-center gap-4 text-nowrap">
                                        <Dribbble />
                                        KK Sfinga Stafford
                                    </span>
                                </td>
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    95 - 86
                                </td>
                            </tr>
                            <tr className="text-slate-100 odd:bg-likar2 even:bg-likar2/60">
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    16/01/2026
                                </td>
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    10:00 AM
                                </td>
                                <td className="border-r border-likar4 p-2">
                                    <span className="flex flex-row flex-nowrap items-center justify-center gap-4 text-nowrap">
                                        <Dribbble />
                                        KK Vodovod Ballers
                                    </span>
                                </td>

                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    vs
                                </td>
                                <td className="border-r border-likar4 p-2">
                                    <span className="flex flex-row flex-nowrap items-center justify-center gap-4 text-nowrap">
                                        <Dribbble />
                                        KK Sfinga Stafford
                                    </span>
                                </td>
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    95 - 86
                                </td>
                            </tr>
                            <tr className="text-slate-100 odd:bg-likar2 even:bg-likar2/60">
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    16/01/2026
                                </td>
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    10:00 AM
                                </td>
                                <td className="border-r border-likar4 p-2">
                                    <span className="flex flex-row flex-nowrap items-center justify-center gap-4 text-nowrap">
                                        <Dribbble />
                                        KK Vodovod Ballers
                                    </span>
                                </td>

                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    vs
                                </td>
                                <td className="border-r border-likar4 p-2">
                                    <span className="flex flex-row flex-nowrap items-center justify-center gap-4 text-nowrap">
                                        <Dribbble />
                                        KK Sfinga Stafford
                                    </span>
                                </td>
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    95 - 86
                                </td>
                            </tr>
                            <tr className="text-slate-100 odd:bg-likar2 even:bg-likar2/60">
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    16/01/2026
                                </td>
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    10:00 AM
                                </td>
                                <td className="border-r border-likar4 p-2">
                                    <span className="flex flex-row flex-nowrap items-center justify-center gap-4 text-nowrap">
                                        <Dribbble />
                                        KK Vodovod Ballers
                                    </span>
                                </td>

                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    vs
                                </td>
                                <td className="border-r border-likar4 p-2">
                                    <span className="flex flex-row flex-nowrap items-center justify-center gap-4 text-nowrap">
                                        <Dribbble />
                                        KK Sfinga Stafford
                                    </span>
                                </td>
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    95 - 86
                                </td>
                            </tr>
                            <tr className="text-slate-100 odd:bg-likar2 even:bg-likar2/60">
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    16/01/2026
                                </td>
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    10:00 AM
                                </td>
                                <td className="border-r border-likar4 p-2">
                                    <span className="flex flex-row flex-nowrap items-center justify-center gap-4 text-nowrap">
                                        <Dribbble />
                                        KK Vodovod Ballers
                                    </span>
                                </td>

                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    vs
                                </td>
                                <td className="border-r border-likar4 p-2">
                                    <span className="flex flex-row flex-nowrap items-center justify-center gap-4 text-nowrap">
                                        <Dribbble />
                                        KK Sfinga Stafford
                                    </span>
                                </td>
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    95 - 86
                                </td>
                            </tr>
                            <tr className="text-slate-100 odd:bg-likar2 even:bg-likar2/60">
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    16/01/2026
                                </td>
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    10:00 AM
                                </td>
                                <td className="border-r border-likar4 p-2">
                                    <span className="flex flex-row flex-nowrap items-center justify-center gap-4 text-nowrap">
                                        <Dribbble />
                                        KK Vodovod Ballers
                                    </span>
                                </td>

                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    vs
                                </td>
                                <td className="border-r border-likar4 p-2">
                                    <span className="flex flex-row flex-nowrap items-center justify-center gap-4 text-nowrap">
                                        <Dribbble />
                                        KK Sfinga Stafford
                                    </span>
                                </td>
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    95 - 86
                                </td>
                            </tr>
                            <tr className="text-slate-100 odd:bg-likar2 even:bg-likar2/60">
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    16/01/2026
                                </td>
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    10:00 AM
                                </td>
                                <td className="border-r border-likar4 p-2">
                                    <span className="flex flex-row flex-nowrap items-center justify-center gap-4 text-nowrap">
                                        <Dribbble />
                                        KK Vodovod Ballers
                                    </span>
                                </td>

                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    vs
                                </td>
                                <td className="border-r border-likar4 p-2">
                                    <span className="flex flex-row flex-nowrap items-center justify-center gap-4 text-nowrap">
                                        <Dribbble />
                                        KK Sfinga Stafford
                                    </span>
                                </td>
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    95 - 86
                                </td>
                            </tr>
                            <tr className="text-slate-100 odd:bg-likar2 even:bg-likar2/60">
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    16/01/2026
                                </td>
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    10:00 AM
                                </td>
                                <td className="border-r border-likar4 p-2">
                                    <span className="flex flex-row flex-nowrap items-center justify-center gap-4 text-nowrap">
                                        <Dribbble />
                                        KK Vodovod Ballers
                                    </span>
                                </td>

                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    vs
                                </td>
                                <td className="border-r border-likar4 p-2">
                                    <span className="flex flex-row flex-nowrap items-center justify-center gap-4 text-nowrap">
                                        <Dribbble />
                                        KK Sfinga Stafford
                                    </span>
                                </td>
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    95 - 86
                                </td>
                            </tr>
                            <tr className="text-slate-100 odd:bg-likar2 even:bg-likar2/60">
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    16/01/2026
                                </td>
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    10:00 AM
                                </td>
                                <td className="border-r border-likar4 p-2">
                                    <span className="flex flex-row flex-nowrap items-center justify-center gap-4 text-nowrap">
                                        <Dribbble />
                                        KK Vodovod Ballers
                                    </span>
                                </td>

                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    vs
                                </td>
                                <td className="border-r border-likar4 p-2">
                                    <span className="flex flex-row flex-nowrap items-center justify-center gap-4 text-nowrap">
                                        <Dribbble />
                                        KK Sfinga Stafford
                                    </span>
                                </td>
                                <td className="border-r border-likar4 p-2 text-center text-nowrap">
                                    95 - 86
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
