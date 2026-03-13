import { Link } from '@inertiajs/react';
import { User2Icon } from 'lucide-react';
import { show } from '@/actions/App/Http/Controllers/PlayerController';
import { show as showTeam } from '@/actions/App/Http/Controllers/TeamController';
import type { GameStatsWithPlayerAndTeam } from '@/types/propTypes';

export default function LeadersRow({
    type,
    player,
    place,
}: {
    type: string;
    player: GameStatsWithPlayerAndTeam;
    place: number;
}) {
    const getValue = () => {
        switch (type) {
            case 'points':
                return player.points;

            case 'rebounds':
                return player.offensive_rebounds + player.defensive_rebounds;

            case 'assists':
                return player.assists;

            case 'blocks':
                return player.blocks;

            case 'steals':
                return player.steals;

            case 'shootingPercentage':
                return player.fg_percentage;

            case 'madeThrees':
                return player.fg3_made;

            case 'threesPercentage':
                return player.fg3_percentage;

            case 'efficiency':
                return player.efficiency;

            default:
                return 0;
        }
    };

    return (
        <tr className="text-center text-slate-100 first:border-b-2! first:border-b-likar1! odd:bg-likar2 even:bg-likar2/60 first:[&_img]:h-10 first:[&_img]:w-10 max-[500px]:first:[&_img]:h-6 max-[500px]:first:[&_img]:w-6 first:[&_svg]:h-10 first:[&_svg]:w-10 max-[500px]:first:[&_svg]:h-6 max-[500px]:first:[&_svg]:w-6 first:[&_td]:text-lg first:[&_td]:font-semibold max-[500px]:first:[&_td]:text-base">
            <td className="p-2 max-[500px]:p-1">{place}.</td>
            <td className="p-2 max-[500px]:p-1">
                <div className="flex flex-row items-center justify-center">
                    <User2Icon className="h-5 w-5 shrink-0 rounded-full border border-slate-100/80 bg-likar4 p-0.5 text-slate-900 max-[500px]:h-3.5 max-[500px]:w-3.5" />
                </div>
            </td>

            <td className="p-2 max-[500px]:p-1">
                <div className="flex flex-row items-center justify-center">
                    <Link href={showTeam(player.team.id)}>
                        <img
                            src={player.team.logo}
                            alt=""
                            className="h-5 w-5 shrink-0 rounded-full border border-slate-100/80 max-[500px]:h-3.5 max-[500px]:w-3.5"
                        />
                    </Link>
                </div>
            </td>
            <td className="p-2 max-[500px]:p-1">
                <Link href={show(player.id)} className="hover:underline">
                    {`${player.player.first_name} ${player.player.last_name}`}
                </Link>
            </td>

            <td className="p-2 max-[500px]:p-1">{getValue()}</td>
        </tr>
    );
}
