import { Link } from '@inertiajs/react';
import { show } from '@/actions/App/Http/Controllers/TeamController';
import type { Team } from '@/types/propTypes';

export default function GameScore({
    homeTeam,
    homeScore,
    awayTeam,
    awayScore,
}: {
    homeTeam: Team;
    homeScore: number;
    awayTeam: Team;
    awayScore: number;
}) {
    return (
        <section className="px-[5%] py-3">
            <div className="flex flex-row flex-wrap items-stretch justify-between overflow-hidden rounded-xl border border-likar3/40 bg-likar4/60">
                <Link
                    href={show(homeTeam.id)}
                    className="pointer-events-none flex w-1/2 flex-row items-center justify-between gap-5 border-r border-slate-100 px-3 max-xl:order-1 max-xl:border-b max-xl:border-b-slate-100 max-xl:py-3 max-xl:pt-3 max-sm:flex-col max-sm:justify-start xl:w-1/3"
                >
                    <img
                        src={homeTeam.logo}
                        alt=""
                        className="pointer-events-auto aspect-square cursor-pointer rounded-2xl max-lg:w-30 max-sm:w-25"
                    />
                    <p className="pointer-events-auto mx-auto cursor-pointer font-heading text-2xl font-semibold text-slate-100 hover:underline">
                        {homeTeam.name}
                    </p>
                </Link>

                <div className="flex w-full flex-col justify-between py-3 max-xl:order-3 xl:w-1/3">
                    <div className="flex flex-row items-center justify-center gap-10 border-b border-slate-100 px-3 pb-3">
                        <p className="rounded-2xl bg-slate-900 p-2.5 font-heading text-4xl font-semibold text-slate-100">
                            {homeScore}
                        </p>
                        <span className="font-heading text-4xl font-semibold text-slate-100">
                            :
                        </span>
                        <p className="rounded-2xl bg-slate-900 p-2.5 font-heading text-4xl font-semibold text-slate-100">
                            {awayScore}
                        </p>
                    </div>

                    <table className="mx-3 mx-auto mt-3 w-[80%] min-w-fit max-sm:w-[90%]">
                        <tbody>
                            <tr>
                                <td className="font-heading text-2xl text-slate-800"></td>
                                <td className="font-heading text-2xl text-slate-800">
                                    1Q
                                </td>
                                <td className="font-heading text-2xl text-slate-800">
                                    2Q
                                </td>
                                <td className="font-heading text-2xl text-slate-800">
                                    3Q
                                </td>
                                <td className="font-heading text-2xl text-slate-800">
                                    4Q
                                </td>
                                <td className="font-heading text-2xl text-slate-800">
                                    TOT
                                </td>
                            </tr>
                            <tr>
                                <th className="font-heading text-2xl text-slate-100">
                                    {awayTeam.short_name}
                                </th>
                                <td className="font-heading text-2xl text-slate-100">
                                    15
                                </td>
                                <td className="font-heading text-2xl text-slate-100">
                                    20
                                </td>
                                <td className="font-heading text-2xl text-slate-100">
                                    10
                                </td>
                                <td className="font-heading text-2xl text-slate-100">
                                    25
                                </td>
                                <td className="font-heading text-2xl font-bold text-slate-100">
                                    60
                                </td>
                            </tr>
                            <tr>
                                <th className="font-heading text-2xl font-semibold text-slate-100">
                                    {homeTeam.short_name}
                                </th>

                                <td className="font-heading text-2xl text-slate-100">
                                    15
                                </td>
                                <td className="font-heading text-2xl text-slate-100">
                                    20
                                </td>
                                <td className="font-heading text-2xl text-slate-100">
                                    10
                                </td>
                                <td className="font-heading text-2xl text-slate-100">
                                    25
                                </td>
                                <td className="font-heading text-2xl font-bold text-slate-100">
                                    60
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Link
                    href={show(awayTeam.id)}
                    className="pointer-events-none flex w-1/2 flex-row items-center justify-between gap-5 border-l border-slate-100 px-3 max-xl:order-2 max-xl:border-b max-xl:border-b-slate-100 max-xl:py-3 max-sm:flex-col-reverse xl:w-1/3"
                >
                    <p className="pointer-events-auto mx-auto cursor-pointer font-heading text-2xl font-semibold text-slate-100 hover:underline">
                        {awayTeam.name}
                    </p>
                    <img
                        src={awayTeam.logo}
                        alt=""
                        className="pointer-events-auto aspect-square cursor-pointer rounded-2xl max-lg:w-30 max-sm:w-25"
                    />
                </Link>
            </div>
        </section>
    );
}
