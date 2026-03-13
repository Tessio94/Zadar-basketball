import { Link } from '@inertiajs/react';
import { show } from '@/actions/App/Http/Controllers/PlayerController';
import { show as showTeam } from '@/actions/App/Http/Controllers/TeamController';
import type { TopFiveAvg, TopFivePcg } from '@/types/propTypes';

export default function StatisticsAverageRow({
    type,
    leader,
    index,
}: {
    type: 'avg' | 'pcg';
    index: number;
    leader: TopFiveAvg | TopFivePcg;
}) {
    if (type === 'avg') {
        const { games, player, avg, total } = leader as TopFiveAvg;

        return (
            <tr className="text-slate-100 odd:bg-likar2 even:bg-likar2/60 [&_td]:p-2 [&_td]:text-center">
                <td>{index + 1}.</td>
                <td>
                    <Link href={showTeam(player.teams[0].id)}>
                        <img
                            src={player.teams[0].logo}
                            alt={`${player.teams[0].name} logo`}
                            height={40}
                            width={40}
                            className="inline-block rounded-full border border-slate-100/80"
                        />
                    </Link>
                </td>
                <td>
                    <Link href={show(player.id)} className="hover:underline">
                        {`${player.first_name} ${player.last_name}`}
                    </Link>
                </td>
                <td>{games}</td>
                <td>{total}</td>
                <td>{avg}</td>
            </tr>
        );
    } else if (type === 'pcg') {
        const { player, pcg, total_made, total_attempted } =
            leader as TopFivePcg;

        return (
            <tr className="text-slate-100 odd:bg-likar2 even:bg-likar2/60 [&_td]:p-2 [&_td]:text-center">
                <td>{index + 1}.</td>
                <td>
                    <Link href={showTeam(player.teams[0].id)}>
                        <img
                            src={player.teams[0].logo}
                            alt={`${player.teams[0].name} logo`}
                            height={40}
                            width={40}
                            className="inline-block rounded-full border border-slate-100/80"
                        />
                    </Link>
                </td>
                <td>
                    <Link href={show(player.id)} className="hover:underline">
                        {`${player.first_name} ${player.last_name}`}
                    </Link>
                </td>
                <td>{total_attempted}</td>
                <td>{total_made}</td>
                <td>{pcg}%</td>
            </tr>
        );
    }
}
