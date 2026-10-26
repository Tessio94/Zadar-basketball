import type { GameWithTeams } from '@/types/games';
import ResultRow from './resultRow';

export default function TableResults({
    games,
    seasonName,
}: {
    games: GameWithTeams[];
    seasonName?: string;
}) {
    return (
        <div className="mb-20 overflow-hidden rounded-xl border border-likar1 shadow-xl shadow-likar1">
            <div className="bg-slate-900 px-5 py-2 font-heading text-xl font-semibold text-slate-100 uppercase">
                Raspored i rezultati {seasonName ?? ''}
            </div>
            <div className="relative overflow-hidden rounded-b-xl">
                <div className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin max-h-100 overflow-y-auto scrollbar-thumb-likar3 scrollbar-track-slate-900">
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
