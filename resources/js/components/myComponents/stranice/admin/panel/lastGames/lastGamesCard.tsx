import type { Game } from '@/types/propTypes';

export default function LastGamesCard({ game }: { game: Game }) {
    return (
        <div className="group relative border-b border-likar3 bg-likar2 px-5 py-5 text-base font-semibold text-slate-100 transition-colors duration-300 first:rounded-t-xl first:border-t last:rounded-b-xl hover:bg-likar2/40 lg:border-likar1 lg:py-1.5">
            <span className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-likar1 p-0.5 text-sm font-normal text-slate-200">
                R{game.round_number}
            </span>
            <div className="max-lg:flex max-lg:flex-row max-lg:items-center max-lg:justify-center">
                <div className="flex w-full flex-row items-center justify-between gap-2">
                    <div className="flex w-[40%] flex-row items-center gap-2 max-sm:gap-1.5">
                        <img
                            src={game.home_team.logo}
                            alt=""
                            className="h-10 w-10 rounded-full max-sm:h-9 max-sm:w-9"
                        />
                        <span className="hidden text-start sm:inline">
                            {game.home_team.name}
                        </span>
                        <span className="inline text-start sm:hidden">
                            {game.home_team.short_name}
                        </span>
                    </div>
                    <div className="max-lg:place-self-center">
                        <span>{game.home_score}</span>
                        <span>:</span>
                        <span>{game.away_score}</span>
                    </div>
                    <div className="flex w-[40%] flex-row justify-end">
                        <div className="flex flex-row items-center gap-2 max-sm:gap-1.5">
                            <span className="hidden text-end sm:inline">
                                {game.away_team.name}
                            </span>
                            <span className="inline text-end sm:hidden">
                                {game.away_team.short_name}
                            </span>
                            <img
                                src={game.away_team.logo}
                                alt=""
                                className="h-10 w-10 rounded-full max-sm:h-9 max-sm:w-9"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
