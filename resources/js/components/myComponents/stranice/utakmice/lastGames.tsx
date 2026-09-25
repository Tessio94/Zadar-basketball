import LastGamesCard from '@/components/myComponents/stranice/admin/panel/lastGames/lastGamesCard';
import type { GameWithTeams } from '@/types/propTypes';

export default function LastGames({
    games,
    lastRound,
}: {
    games: GameWithTeams[];
    lastRound: number;
}) {
    console.log(games);
    return (
        <div className="relative z-10 h-fit h-full overflow-hidden rounded-xl border border-sidebar-border/70 bg-[url('/images/design/snow4.jpg')] bg-cover pb-2.5 dark:border-sidebar-border">
            <h3 className="px-5 py-2.5 font-heading text-xl font-semibold text-slate-100">
                Rezultati {lastRound} kolo
            </h3>
            <div className="mx-5 flex flex-col rounded-2xl bg-likar2 p-2.5">
                <div className="rounded-t-xl rounded-b-xl bg-linear-to-r from-likar2 to-likar1">
                    {games.map((game) => (
                        <LastGamesCard game={game} key={game.game_id} />
                    ))}
                </div>
            </div>
        </div>
    );
}
