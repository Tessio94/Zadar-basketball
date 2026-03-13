import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { GamesStatsWithPlayerAndTeam, Team } from '@/types/propTypes';
import BoxScoreHeader from './boxScoreHeader';
import BoxScoreRow from './boxScoreRow';
import { Link } from '@inertiajs/react';
import { show } from '@/actions/App/Http/Controllers/TeamController';

export default function GameBoxScore({
    team,
    players,
}: {
    team: Team;
    players: GamesStatsWithPlayerAndTeam;
}) {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);

    useEffect(() => {
        const el = scrollRef.current;

        if (!el) return;

        const checkScroll = () => {
            setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
            setCanScrollLeft(el.scrollLeft > 0);
        };

        checkScroll();
        el.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);

        return () => {
            el.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        };
    }, []);

    return (
        <section className="relative mx-auto mb-10 px-[5%]">
            {canScrollLeft && (
                <button
                    onClick={() =>
                        scrollRef.current?.scrollBy({
                            left: -300,
                            behavior: 'smooth',
                        })
                    }
                    className="absolute top-1/2 left-0 z-10 -translate-y-1/2 rounded-r-xl bg-likar3/80 p-2"
                >
                    <ChevronLeft className="text-white" />
                </button>
            )}

            {/* RIGHT ARROW */}
            {canScrollRight && (
                <button
                    onClick={() =>
                        scrollRef.current?.scrollBy({
                            left: 300,
                            behavior: 'smooth',
                        })
                    }
                    className="absolute top-1/2 right-0 z-10 -translate-y-1/2 rounded-l-xl bg-likar3/80 p-2"
                >
                    <ChevronRight className="text-white" />
                </button>
            )}

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
                            className="pointer-events-auto aspect-square w-15 cursor-pointer rounded-2xl max-sm:w-5"
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
