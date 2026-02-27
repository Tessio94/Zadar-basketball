import { ChevronLeft, ChevronRight, Dribbble } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import StandingRow from './standingRow';

export default function TableStandings({ standings }) {
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
        <div className="mb-10">
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
                    className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full mb-10 scrollbar-thin overflow-x-auto rounded-xl border border-likar1 shadow-xl shadow-likar1 scrollbar-thumb-likar3 scrollbar-track-likar3"
                    ref={scrollRef}
                >
                    <table className="w-full overflow-hidden rounded-xl">
                        <thead>
                            <tr className="bg-likar1 text-xl text-slate-100">
                                <th className="border-r border-likar4 p-2 uppercase">
                                    No
                                </th>
                                <th className="border-r border-likar4 p-2 uppercase">
                                    Ekipa
                                </th>
                                <th className="border-r border-likar4 p-2 uppercase">
                                    OU
                                </th>
                                <th className="border-r border-likar4 p-2 uppercase">
                                    BOD
                                </th>
                                <th className="border-r border-likar4 p-2 uppercase">
                                    W
                                </th>
                                <th className="border-r border-likar4 p-2 uppercase">
                                    L
                                </th>
                                <th className="border-r border-likar4 p-2 uppercase">
                                    ZAB
                                </th>
                                <th className="border-r border-likar4 p-2 uppercase">
                                    PRI
                                </th>
                                <th className="border-r border-likar4 p-2 uppercase">
                                    RAZ
                                </th>
                                <th className="p-2 uppercase">POS 5</th>
                            </tr>
                        </thead>
                        <tbody>
                            {standings.map((standing, i) => (
                                <StandingRow
                                    standing={standing}
                                    key={standing.id}
                                    index={i}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex flex-row flex-wrap gap-3 text-base text-slate-100 italic">
                <small>No - mjesto na ljestvici</small>
                <small>OU - odigrane utakmice</small>
                <small>BOD - bodovi</small>
                <small>ZAB - Zabijeni poeni</small>
                <small>PRI - primljeni poeni</small>
                <small>RAZ - razlikau poenima</small>
                <small>POS 5 - posljednih 5 utakmica</small>
            </div>
        </div>
    );
}
