import type { GameWithTeams } from '@/types/propTypes';
import TeamResultsRow from './teamResultsRow';

export default function TeamResults({ games }: { games: GameWithTeams[] }) {
    return (
        <div className="p-5">
            <div className="mb-20 overflow-hidden rounded-xl border border-likar1 shadow-xl shadow-likar1">
                <div className="rounded-t-xl bg-slate-900 p-2 font-heading text-xl font-semibold text-slate-100 uppercase">
                    Utakmice 2025-26
                </div>
                <div className="relative">
                    <div className="scrollbar-thumb-rounded-full scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-gutter-stable scrollbar max-h-100 overflow-y-auto scrollbar-thumb-likar3 scrollbar-track-slate-900">
                        <table className="w-full overflow-hidden">
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
