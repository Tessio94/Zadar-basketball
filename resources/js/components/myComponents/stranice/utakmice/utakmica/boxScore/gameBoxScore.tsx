import { Link } from '@inertiajs/react';
import { show } from '@/actions/App/Http/Controllers/TeamController';
import type {
    GameBoxscorePlayerStat,
    GameTeamTotal,
} from '@/types/game-boxscore';
import type { Team } from '@/types/teams';
import BoxScoreHeader from './boxScoreHeader';
import BoxScoreRow from './boxScoreRow';
import BoxScoreTotalsRow from './boxScoreTotalsRow';

export default function GameBoxScore({
    team,
    players,
    totals,
}: {
    team: Team;
    players: GameBoxscorePlayerStat[];
    totals: GameTeamTotal;
}) {
    return (
        <section className="relative mx-auto mb-10 px-[5%]">
            <div className="relative overflow-hidden rounded-xl border border-likar3/40">
                <div className="flex flex-row justify-between border-b border-likar3/40 bg-likar4/60 max-sm:flex-col">
                    <Link
                        href={show(team.id)}
                        className="pointer-events-none flex w-fit flex-row items-center gap-5 p-3"
                    >
                        <img
                            src={`/storage/${team.logo}`}
                            alt={`${team.name} logo`}
                            className="pointer-events-auto aspect-square w-15 shrink-0 cursor-pointer rounded-2xl max-sm:w-8"
                        />
                        <p className="pointer-events-auto cursor-pointer font-heading text-xl font-semibold text-slate-100 hover:underline">
                            {team.name}
                        </p>
                    </Link>
                    <div className="flex flex-row items-center gap-5 p-3 text-xl">
                        <p className="font-heading font-semibold text-slate-100">
                            Trener:
                        </p>
                        <p className="font-heading font-semibold text-slate-100">
                            Ivan Ivanović
                        </p>
                    </div>
                </div>
                <div className="scrollbar overflow-x-auto scrollbar-thumb-likar3 scrollbar-track-slate-900">
                    <table className="w-full bg-likar2">
                        <BoxScoreHeader />
                        <tbody>
                            <tr className="bg-likar4">
                                <th></th>
                                <th colSpan={999}>
                                    <span className="text-slate-100">
                                        Prva petorka
                                    </span>
                                </th>
                            </tr>
                            {players.map((player) => {
                                return (
                                    player.is_starter && (
                                        <BoxScoreRow
                                            player={player}
                                            key={player.id}
                                        />
                                    )
                                );
                            })}
                            <tr className="bg-likar4">
                                <th></th>
                                <th colSpan={999}>
                                    <span className="text-slate-100">
                                        Klupa
                                    </span>
                                </th>
                            </tr>
                            {players.map((player) => {
                                return (
                                    !player.is_starter && (
                                        <BoxScoreRow
                                            player={player}
                                            key={player.id}
                                        />
                                    )
                                );
                            })}
                            <tr className="bg-likar4">
                                <th></th>
                                <th colSpan={999}>
                                    <span className="text-slate-100">
                                        Ukupno Ekipa
                                    </span>
                                </th>
                            </tr>
                            <BoxScoreTotalsRow totals={totals} />
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
