import type { PeriodScore } from '@/types/games';

type PeriodScoreTableProps = {
    periods?: PeriodScore[];
    homeName: string;
    awayName: string;
    homeScore: number;
    awayScore: number;
    status?: string;
};

export function periodLabel(period: number): string {
    return period <= 4 ? `${period}Q` : `OT${period - 4}`;
}

export default function PeriodScoreTable({
    periods = [],
    homeName,
    awayName,
    homeScore,
    awayScore,
    status,
}: PeriodScoreTableProps) {
    const ordered = [...periods].sort(
        (a, b) => a.period_number - b.period_number,
    );
    const totalsMatch =
        ordered.reduce((sum, row) => sum + row.home_score, 0) === homeScore &&
        ordered.reduce((sum, row) => sum + row.away_score, 0) === awayScore;

    if (ordered.length === 0 || status === 'scheduled') {
        return (
            <p className="px-4 py-3 text-center text-sm text-slate-400">
                Rezultati po četvrtinama još nisu uneseni.
            </p>
        );
    }
    // A later correction in an older game CRUD must never publish a misleading breakdown.
    if (!totalsMatch) {
        return (
            <p className="px-4 py-3 text-center text-sm text-slate-400">
                Raspodjela po četvrtinama čeka usklađivanje s rezultatom.
            </p>
        );
    }

    return (
        <div
            className="max-w-full overflow-x-auto px-3 py-3"
            role="region"
            aria-label="Rezultat po četvrtinama"
            tabIndex={0}
        >
            <table className="w-full border-collapse text-center text-sm tabular-nums">
                <caption className="sr-only">
                    Poeni postignuti u svakoj četvrtini i produžetku
                </caption>
                <thead>
                    <tr className="text-xs text-slate-400">
                        <th scope="col" className="p-2 text-left">
                            Ekipa
                        </th>
                        {ordered.map((period) => (
                            <th
                                scope="col"
                                key={period.period_number}
                                className="p-2 font-medium"
                            >
                                {periodLabel(period.period_number)}
                            </th>
                        ))}
                        <th scope="col" className="p-2">
                            UK
                        </th>
                    </tr>
                </thead>
                <tbody className="text-slate-100">
                    <tr className="border-t border-white/10">
                        <th scope="row" className="p-2 text-left font-medium">
                            {homeName}
                        </th>
                        {ordered.map((period) => (
                            <td key={period.period_number} className="p-2">
                                {period.home_score}
                            </td>
                        ))}
                        <td className="p-2 font-bold text-likar3">
                            {homeScore}
                        </td>
                    </tr>
                    <tr className="border-t border-white/10">
                        <th scope="row" className="p-2 text-left font-medium">
                            {awayName}
                        </th>
                        {ordered.map((period) => (
                            <td key={period.period_number} className="p-2">
                                {period.away_score}
                            </td>
                        ))}
                        <td className="p-2 font-bold text-likar3">
                            {awayScore}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
