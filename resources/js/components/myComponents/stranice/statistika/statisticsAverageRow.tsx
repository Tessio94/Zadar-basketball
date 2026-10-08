import { Link } from '@inertiajs/react';
import { show } from '@/actions/App/Http/Controllers/PlayerController';
import { show as showTeam } from '@/actions/App/Http/Controllers/TeamController';
import type { TopFiveAvg, TopFiveDaily, TopFivePcg } from '@/types/propTypes';

export default function StatisticsAverageRow({
    type,
    leader,
    index,
    seasonId,
}: {
    type: 'avg' | 'pcg' | 'daily';
    index: number;
    leader: TopFiveAvg | TopFivePcg | TopFiveDaily;
    seasonId?: number;
}) {
    const teamSeason = leader.player.team_seasons?.find(
        (teamSeason) => teamSeason.season_id === seasonId,
    );

    const team = teamSeason?.team;
    console.log('seasonId', seasonId);
    console.log('teamSeason', team);
    if (type === 'avg') {
        const { games, player, avg, total } = leader as TopFiveAvg;

        return (
            <tr className="text-slate-100 odd:bg-likar2 even:bg-likar2/60 [&_td]:p-2 [&_td]:text-center">
                <td>{index + 1}.</td>
                <td>
                    <Link
                        href={showTeam(team.id, {
                            query: { season: seasonId },
                        })}
                    >
                        <img
                            src={team.logo}
                            alt={`${team.name} logo`}
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
                    <Link
                        href={showTeam(team.id, {
                            query: { season: seasonId },
                        })}
                    >
                        <img
                            src={team.logo}
                            alt={`${team.name} logo`}
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
    } else if (type === 'daily') {
        const { player, total } = leader as TopFiveAvg;

        return (
            <tr className="text-slate-100 odd:bg-likar2 even:bg-likar2/60 [&_td]:p-2 [&_td]:text-center">
                <td>{index + 1}.</td>
                <td>
                    <Link
                        href={showTeam(team.id, {
                            query: { season: seasonId },
                        })}
                    >
                        <img
                            src={team.logo}
                            alt={`${team.name} logo`}
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
                <td>{total}</td>
            </tr>
        );
    }
}
