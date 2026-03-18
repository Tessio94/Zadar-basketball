import { useRef } from 'react';
import ButtonScroll from '@/components/myComponents/common/ButtonScroll';
import type { GameWithTeams } from '@/types/propTypes';
import ResultRow from './resultRow';

export default function TableResults({ games }: { games: GameWithTeams[] }) {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    return (
        <div className="mb-20 rounded-xl border border-likar1 shadow-xl shadow-likar1">
            <div className="rounded-t-xl bg-likar1 p-2 text-xl font-semibold text-slate-100 uppercase">
                Raspored 2025-26
            </div>
            <div className="relative">
                <ButtonScroll scrollRef={scrollRef} />

                <div
                    className="scrollbar-thumb-rounded-full scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin max-h-100 overflow-y-auto scrollbar-thumb-likar3 scrollbar-track-likar2"
                    ref={scrollRef}
                >
                    <table className="w-full overflow-hidden rounded-b-xl">
                        <tbody>
                            {games.map((game) => (
                                <ResultRow game={game} key={game.id} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
