import type { GameStats } from '@/types/propTypes';

export default function PlayerBoxScoreRow({ stats }: { stats: GameStats }) {
    const {
        minutes_played,
        points,
        fg2_made,
        fg2_attempted,
        fg3_made,
        fg3_attempted,
        ft_made,
        ft_attempted,
        offensive_rebounds,
        defensive_rebounds,
        assists,
        turnovers,
        steals,
        blocks,
        fouls,
        plus_minus,
        efficiency,
    } = stats;

    const fgTotalMade = fg2_made + fg3_made;
    const fgTotalAttempted = fg2_attempted + fg3_attempted;

    return (
        <tr className="text-slate-100 odd:bg-likar2 even:bg-likar2/60">
            <td className="p-1 text-center text-nowrap">{minutes_played}</td>
            <td className="p-1 text-center text-nowrap">{points}</td>
            <td className="p-1 text-center text-nowrap">
                {fgTotalMade}-{fgTotalAttempted}
            </td>
            <td className="p-1 text-center text-nowrap">
                {fgTotalAttempted > 0
                    ? ((fgTotalMade / fgTotalAttempted) * 100).toFixed(0)
                    : 0}
            </td>
            <td className="p-1 text-center text-nowrap">
                {fg2_made}-{fg2_attempted}
            </td>
            <td className="p-1 text-center text-nowrap">
                {fg2_attempted > 0
                    ? ((fg2_made / fg2_attempted) * 100).toFixed(0)
                    : 0}
            </td>
            <td className="p-1 text-center text-nowrap">
                {fg3_made}-{fg3_attempted}
            </td>
            <td className="p-1 text-center text-nowrap">
                {fg3_attempted > 0
                    ? ((fg3_made / fg3_attempted) * 100).toFixed(0)
                    : 0}
            </td>
            <td className="p-1 text-center text-nowrap">
                {ft_made}-{ft_attempted}
            </td>
            <td className="p-1 text-center text-nowrap">
                {ft_attempted > 0
                    ? ((ft_made / ft_attempted) * 100).toFixed(0)
                    : 0}
            </td>
            <td className="p-1 text-center text-nowrap">
                {offensive_rebounds}
            </td>
            <td className="p-1 text-center text-nowrap">
                {defensive_rebounds}
            </td>
            <td className="p-1 text-center text-nowrap">
                {offensive_rebounds + defensive_rebounds}
            </td>
            <td className="p-1 text-center text-nowrap">{assists}</td>
            <td className="p-1 text-center text-nowrap">{turnovers}</td>
            <td className="p-1 text-center text-nowrap">{steals}</td>
            <td className="p-1 text-center text-nowrap">{blocks}</td>
            <td className="p-1 text-center text-nowrap">{fouls}</td>
            <td className="p-1 text-center text-nowrap">{plus_minus}</td>
            <td className="p-1 text-center text-nowrap">{efficiency}</td>
        </tr>
    );
}
