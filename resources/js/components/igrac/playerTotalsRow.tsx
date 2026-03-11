import type { PlayerTotals } from '@/types/propTypes';

export default function PlayerTotalsRow({ totals }: { totals: PlayerTotals }) {
    const {
        minutes,
        points,
        assists,
        blocks,
        steals,
        turnovers,
        offensive_rebounds,
        defensive_rebounds,
        fg2_made,
        fg2_attempted,
        fg3_made,
        fg3_attempted,
        ft_made,
        ft_attempted,
        fouls,
        plus_minus,
        efficiency,
    } = totals;

    const fgTotalMade = fg2_made + fg3_made;
    const fgTotalAttempted = fg2_attempted + fg3_attempted;

    return (
        <tr className="text-slate-100 odd:bg-likar2 even:bg-likar1/20">
            <td className="p-1 text-center text-nowrap">{}</td>
            <td className="p-1 text-center text-nowrap">{minutes}</td>
            <td className="p-1 text-center text-nowrap">{points}</td>
            <td className="p-1 text-center text-nowrap">
                {fgTotalMade}-{fgTotalAttempted}
            </td>
            <td className="p-1 text-center text-nowrap">{'/'}</td>
            <td className="p-1 text-center text-nowrap">
                {fg2_made}-{fg2_attempted}
            </td>
            <td className="p-1 text-center text-nowrap">{'/'}</td>
            <td className="p-1 text-center text-nowrap">
                {fg3_made}-{fg3_attempted}
            </td>
            <td className="p-1 text-center text-nowrap">{'/'}</td>
            <td className="p-1 text-center text-nowrap">
                {ft_made}-{ft_attempted}
            </td>
            <td className="p-1 text-center text-nowrap">{'/'}</td>
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
