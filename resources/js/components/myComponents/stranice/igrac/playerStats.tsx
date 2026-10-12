import type {
    GameStatsWithOpponent,
    PlayerAverages,
    PlayerTotals,
} from '@/types/propTypes';
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
    return (
        <section className="relative mx-auto px-[5%] py-10 pt-5">
            <div className="relative overflow-hidden rounded-xl border border-likar3/40 shadow-lg shadow-likar1">
                <div className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar overflow-x-auto scrollbar-thumb-likar3 scrollbar-track-slate-900">
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
                                    <span className="text-slate-100">
                                        Ukupno
                                    </span>
                                </th>
                            </tr>
                            <PlayerTotalsRow totals={totals} />
                            <tr className="bg-likar4">
                                <th></th>
                                <th colSpan={999}>
                                    <span className="text-slate-100">
                                        Prosjek
                                    </span>
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
