import { useRef } from 'react';
import type {
    GameStatsWithOpponent,
    PlayerAverages,
    PlayerTotals,
} from '@/types/propTypes';
import ButtonScroll from '../../common/ButtonScroll';
import PlayerAveragesRow from './playerAveragesRow';
import PlayerBoxScoreHeader from './playerBoxScoreHeader';
import PlayerBoxScoreRow from './playerBoxScoreRow';
import PlayerTotalsRow from './playerTotalsRow';

interface PlayerStatsProps {
    game_stats: GameStatsWithOpponent[];
    totals: PlayerTotals;
    averages: PlayerAverages;
}

export default function PlayerStats({
    game_stats,
    averages,
    totals,
}: PlayerStatsProps) {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    return (
        <section className="relative mx-auto px-[5%] py-10">
            <ButtonScroll scrollRef={scrollRef} />

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
                            <tr className="bg-likar4">
                                <th></th>
                                <th colSpan={999}>
                                    <span>Ukupno</span>
                                </th>
                            </tr>
                            <PlayerTotalsRow totals={totals} />
                            <tr className="bg-likar4">
                                <th></th>
                                <th colSpan={999}>
                                    <span>Prosjek</span>
                                </th>
                            </tr>
                            <PlayerAveragesRow averages={averages} />
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
