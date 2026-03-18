import { Link } from '@inertiajs/react';
import { useRef } from 'react';
import { show } from '@/actions/App/Http/Controllers/TeamController';
import ButtonScroll from '@/components/myComponents/common/ButtonScroll';
import type { GameStatsWithPlayerAndTeam, Team } from '@/types/propTypes';
import BoxScoreHeader from './boxScoreHeader';
import BoxScoreRow from './boxScoreRow';

export default function GameBoxScore({
    team,
    players,
}: {
    team: Team;
    players: GameStatsWithPlayerAndTeam[];
}) {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    return (
        <section className="relative mx-auto mb-10 px-[5%]">
            <ButtonScroll scrollRef={scrollRef} />

            <div className="relative overflow-hidden rounded-xl border border-likar3/40">
                <div
                    className="flex flex-row justify-between border-b border-likar3/40 bg-likar4/60"
                    ref={scrollRef}
                >
                    <Link
                        href={show(team.id)}
                        className="pointer-events-none flex w-fit flex-row items-center gap-5 p-3"
                    >
                        <img
                            src={team.logo}
                            alt={`${team.name}`}
                            className="pointer-events-auto aspect-square w-15 shrink-0 cursor-pointer rounded-2xl max-sm:w-5"
                        />
                        <p className="pointer-events-auto cursor-pointer font-heading font-semibold text-slate-100 hover:underline">
                            {team.name}
                        </p>
                    </Link>
                    <div className="flex flex-row items-center gap-5 p-3">
                        <p className="font-heading font-semibold text-slate-100">
                            Trener:
                        </p>
                        <p className="font-heading font-semibold text-slate-100">
                            Ivan Ivanović
                        </p>
                    </div>
                </div>
                <div ref={scrollRef} className="overflow-x-auto">
                    <table className="w-full bg-likar2">
                        <BoxScoreHeader />
                        <tbody>
                            <tr className="bg-likar4">
                                <th></th>
                                <th colSpan={999}>
                                    <span>Prva petorka</span>
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
                                    <span>Klupa</span>
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
                                    <span>Ukupno Ekipa</span>
                                </th>
                            </tr>
                            <tr className="bg-likar1/60 text-slate-100">
                                <td
                                    className="p-1 text-center font-semibold text-nowrap"
                                    colSpan={4}
                                ></td>

                                <td className="p-1 text-center font-semibold text-nowrap">
                                    16
                                </td>
                                <td className="p-1 text-center font-semibold text-nowrap">
                                    7-15
                                </td>
                                <td className="p-1 text-center font-semibold text-nowrap">
                                    46
                                </td>
                                <td className="p-1 text-center font-semibold text-nowrap">
                                    7-11
                                </td>
                                <td className="p-1 text-center font-semibold text-nowrap">
                                    63
                                </td>
                                <td className="p-1 text-center font-semibold text-nowrap">
                                    0-4
                                </td>
                                <td className="p-1 text-center font-semibold text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center font-semibold text-nowrap">
                                    2-2
                                </td>
                                <td className="p-1 text-center font-semibold text-nowrap">
                                    100
                                </td>
                                <td className="p-1 text-center font-semibold text-nowrap">
                                    1
                                </td>
                                <td className="p-1 text-center font-semibold text-nowrap">
                                    4
                                </td>
                                <td className="p-1 text-center font-semibold text-nowrap">
                                    5
                                </td>
                                <td className="p-1 text-center font-semibold text-nowrap">
                                    8
                                </td>
                                <td className="p-1 text-center font-semibold text-nowrap">
                                    2
                                </td>
                                <td className="p-1 text-center font-semibold text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center font-semibold text-nowrap">
                                    0
                                </td>
                                <td className="p-1 text-center font-semibold text-nowrap">
                                    6
                                </td>
                                <td className="p-1 text-center font-semibold text-nowrap">
                                    2
                                </td>
                                <td className="p-1 text-center font-semibold text-nowrap">
                                    19
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
