import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import TeamResultsRow from './teamResultsRow';

export default function TeamResults({ games }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);

    useEffect(() => {
        const el = scrollRef.current;

        if (!el) return;

        const checkScroll = () => {
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
        <div className="p-5">
            <div className="mb-20 rounded-xl border border-likar1 shadow-xl shadow-likar1">
                <div className="rounded-t-xl bg-likar1 p-2 text-xl font-semibold text-slate-100 uppercase">
                    Utakmice 2025-26
                </div>
                <div className="relative">
                    {canScrollLeft && (
                        <button
                            onClick={() =>
                                scrollRef.current?.scrollBy({
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
                                scrollRef.current?.scrollBy({
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
                        className="scrollbar-thumb-rounded-full scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin max-h-100 overflow-y-auto scrollbar-thumb-likar3 scrollbar-track-likar2"
                        ref={scrollRef}
                    >
                        <table className="w-full overflow-hidden rounded-b-xl">
                            <tbody>
                                {games.map((game) => (
                                    <TeamResultsRow game={game} key={game.id} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
