import type { GameTeamTotal } from '@/types/game-boxscore';

export default function BoxScoreTotalsRow({
    totals,
}: {
    totals: GameTeamTotal;
}) {
    if (!totals.has_stats) {
        return (
            <tr className="bg-likar1/60 text-slate-100">
                <td colSpan={23} className="p-3 text-center text-sm">
                    Statistika još nije dostupna.
                </td>
            </tr>
        );
    }

    const cells = [
        totals.minutes_played,
        totals.points,
        `${totals.fg_made}-${totals.fg_attempted}`,
        `${totals.fg_percentage}%`,
        `${totals.fg2_made}-${totals.fg2_attempted}`,
        `${totals.fg2_percentage}%`,
        `${totals.fg3_made}-${totals.fg3_attempted}`,
        `${totals.fg3_percentage}%`,
        `${totals.ft_made}-${totals.ft_attempted}`,
        `${totals.ft_percentage}%`,
        totals.offensive_rebounds,
        totals.defensive_rebounds,
        totals.rebounds,
        totals.assists,
        totals.turnovers,
        totals.steals,
        totals.blocks,
        totals.fouls,
        totals.score_difference,
        // totals.plus_minus,
        totals.efficiency,
    ];

    return (
        <tr className="bg-likar1/60 text-slate-100">
            <th
                scope="row"
                colSpan={3}
                className="p-1 text-center font-semibold text-nowrap"
            >
                Ukupno
            </th>
            {cells.map((value, index) => (
                <td
                    key={index}
                    className="p-1 text-center font-semibold text-nowrap"
                >
                    {value}
                </td>
            ))}
        </tr>
    );
}
