import BasketballIcon from '@/components/myComponents/ui/icons/basketballIcon';
import type { GameWithTeams } from '@/types/propTypes';
import LastGamesCard from './lastGamesCard';

export default function UpcomingGames({
    games,
    lastRound,
}: {
    games: GameWithTeams[];
    lastRound: number;
}) {
    return (
        <div className="relative z-10 h-full overflow-hidden rounded-xl border border-sidebar-border/70 bg-[url('/images/design/snow4.jpg')] bg-cover dark:border-sidebar-border">
            <div className="flex flex-row items-center gap-5 p-5">
                <BasketballIcon width={60} height={60} fill={'#ff6e00'} />
                <div className="flex flex-col items-start">
                    <p className="font-heading text-lg font-semibold text-slate-100">
                        Nadolazeće kolo
                    </p>
                    <p className="font-heading text-xl font-black text-slate-300 underline">
                        <span>Runda {lastRound}</span>
                    </p>
                </div>
            </div>

            <div className="py-2.5">
                <div className="mx-5 flex flex-col rounded-2xl bg-likar2 p-2.5">
                    <div className="rounded-t-xl rounded-b-xl bg-linear-to-r from-likar2 to-likar1">
                        {games.map((game) => (
                            <LastGamesCard game={game} key={game.game_id} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
