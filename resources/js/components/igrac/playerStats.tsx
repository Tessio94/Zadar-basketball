import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { GamesStats } from '@/types/propTypes';
import PlayerBoxScoreHeader from './playerBoxScoreHeader';
import PlayerBoxScoreRow from './playerBoxScoreRow';

export default function PlayerStats({
    game_stats,
}: {
    game_stats: GamesStats;
}) {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        const checkScroll = () => {
            // if (!el) return;

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
        <section className="relative mx-auto px-[5%] py-10">
            {canScrollLeft && (
                <button
                    onClick={() =>
                        scrollRef.current?.scrollBy({
                            left: -300,
                            behavior: 'smooth',
                        })
                    }
                    className="absolute top-1/2 left-0 z-10 -translate-y-1/2 rounded-r-xl bg-likar3/80 p-2"
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
                    className="absolute top-1/2 right-0 z-10 -translate-y-1/2 rounded-l-xl bg-likar3/80 p-2"
                >
                    <ChevronRight className="text-white" />
                </button>
            )}

            <div className="relative overflow-hidden rounded-xl border border-likar3/40">
                <div ref={scrollRef} className="overflow-x-auto">
                    <table className="w-full bg-likar2">
                        <PlayerBoxScoreHeader />
                        <tbody>
                            {game_stats.map((stats) => (
                                <PlayerBoxScoreRow
                                    stats={stats}
                                    key={stats.id}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
