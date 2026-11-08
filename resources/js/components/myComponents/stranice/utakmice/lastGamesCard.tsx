import { Link } from '@inertiajs/react';
import { CalendarDays, Clock3 } from 'lucide-react';
import { show } from '@/actions/App/Http/Controllers/GameController';
import { formatDate, formatTime } from '@/lib/utils';
import type { GameWithTeams } from '@/types/games';

export default function LastGamesCard({ game }: { game: GameWithTeams }) {
    return (
        <div className="group relative border-b border-likar3 bg-likar2 px-5 py-5 text-base font-semibold text-slate-100 transition-colors duration-300 first:rounded-t-xl first:border-t last:rounded-b-xl hover:bg-likar2/40 max-[450px]:px-4.5 lg:border-likar1 lg:py-1.5">
            <span className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-likar1 p-0.5 text-sm font-normal text-slate-200">
                R{game.round_number}
            </span>
            <div className="max-lg:flex max-lg:flex-row max-lg:items-center max-lg:justify-center">
                <div className="flex w-full flex-row items-center justify-between gap-2">
                    <div className="flex min-w-0 flex-1 flex-row items-center gap-2 max-sm:gap-1.5">
                        <img
                            src={`/storage/${game.home_team.logo}`}
                            alt={`${game.home_team.name} name`}
                            className="h-10 w-10 shrink-0 rounded-full max-sm:h-9 max-sm:w-9"
                        />
                        <span className="hidden text-start sm:inline">
                            {game.home_team.name}
                        </span>
                        <span className="inline text-start sm:hidden">
                            {game.home_team.short_name}
                        </span>
                    </div>
                    <div className="max-lg:place-self-center">
                        <span>
                            {game.status === 'finished' ? (
                                <Link
                                    href={show(game.id)}
                                    className="font-semibold hover:underline"
                                >
                                    {game.home_score} - {game.away_score}
                                </Link>
                            ) : (
                                <time
                                    dateTime={game.game_date}
                                    className="flex flex-col items-center gap-1.5 rounded-xl border border-likar3/30 bg-slate-950/40 px-2.5 py-2 shadow-sm transition-colors duration-300 group-hover:border-likar3/60 group-hover:bg-slate-950/60 motion-reduce:transition-none max-[450px]:px-1.5 max-[450px]:py-1.5 sm:px-4"
                                >
                                    <span className="flex items-center gap-1.5">
                                        <Clock3
                                            aria-hidden="true"
                                            className="size-3.5 shrink-0 text-likar3 max-[450px]:hidden"
                                        />
                                        <span className="font-heading text-xl leading-none font-semibold tracking-wide text-slate-100 tabular-nums max-[450px]:text-lg sm:text-2xl">
                                            {formatTime(
                                                new Date(game.game_date),
                                            )}
                                        </span>
                                    </span>

                                    <span className="h-px w-full bg-linear-to-r from-transparent via-slate-100/15 to-transparent" />

                                    <span className="flex items-center gap-1 text-[10px] leading-none font-medium whitespace-nowrap text-slate-300 sm:text-xs">
                                        <CalendarDays
                                            aria-hidden="true"
                                            className="size-3 shrink-0 text-slate-400 max-[450px]:hidden"
                                        />
                                        {formatDate(new Date(game.game_date))}
                                    </span>
                                </time>
                            )}
                        </span>
                    </div>
                    <div className="flex min-w-0 flex-1 flex-row justify-end">
                        <div className="flex flex-row items-center gap-2 max-sm:gap-1.5">
                            <span className="hidden text-end sm:inline">
                                {game.away_team.name}
                            </span>
                            <span className="inline text-end sm:hidden">
                                {game.away_team.short_name}
                            </span>

                            <img
                                src={`/storage/${game.away_team.logo}`}
                                alt={`${game.away_team.name} name`}
                                className="h-10 w-10 shrink-0 rounded-full max-sm:h-9 max-sm:w-9"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
