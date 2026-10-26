import { Link } from '@inertiajs/react';
import { show } from '@/actions/App/Http/Controllers/PlayerController';
import { show as showTeam } from '@/actions/App/Http/Controllers/TeamController';
import BasketballPlayerIcon from '@/components/myComponents/ui/icons/basketballPlayer';
import type { TopFiveAvg, TopFiveDaily, TopFivePcg } from '@/types/statistics';

type StatisticsAverageRowProps = {
    index: number;
    seasonId?: number;
    jerseyColor?: string;
} & (
    | { type: 'avg'; leader: TopFiveAvg }
    | { type: 'pcg'; leader: TopFivePcg }
    | { type: 'daily'; leader: TopFiveDaily }
);

export default function StatisticsAverageRow(props: StatisticsAverageRowProps) {
    const { index, seasonId, jerseyColor } = props;
    const { player } = props.leader;

    const team = player.team_seasons.find(
        (entry) => entry.season_id === seasonId,
    )?.team;

    return (
        <tr className="text-slate-100 odd:bg-likar2 even:bg-likar2/60 [&_td]:p-2 [&_td]:text-center">
            <td>{index + 1}.</td>

            <td>
                {!jerseyColor && team && team.logo ? (
                    <Link
                        href={showTeam(team.id, {
                            query: { season: seasonId },
                        })}
                    >
                        <img
                            src={`/storage/${team.logo}`}
                            alt={`${team.name} logo`}
                            height={40}
                            width={40}
                            className="inline-block rounded-full border border-slate-100/80"
                        />
                    </Link>
                ) : (
                    <div className="flex items-center justify-center">
                        <BasketballPlayerIcon
                            className="h-10 w-10 shrink-0 rounded-full border border-slate-100/80 bg-gray-400 p-0.5 text-slate-900 max-[500px]:h-6 max-[500px]:w-6"
                            jerseyColor={
                                jerseyColor ?? team?.logo_color ?? '#3f3633'
                            }
                        />
                    </div>
                )}
            </td>

            <td>
                <Link
                    href={show(player.id)}
                    className="text-nowrap hover:underline"
                >
                    {`${player.first_name} ${player.last_name}`}
                </Link>
            </td>

            {props.type === 'avg' && (
                <>
                    <td>{props.leader.games}</td>
                    <td>{props.leader.total}</td>
                    <td>{props.leader.avg}</td>
                </>
            )}

            {props.type === 'pcg' && (
                <>
                    <td>{props.leader.total_made}</td>
                    <td>{props.leader.total_attempted}</td>
                    <td>
                        {props.leader.pcg == null
                            ? '—'
                            : `${props.leader.pcg}%`}
                    </td>
                </>
            )}

            {props.type === 'daily' && <td>{props.leader.total}</td>}
        </tr>
    );
}
