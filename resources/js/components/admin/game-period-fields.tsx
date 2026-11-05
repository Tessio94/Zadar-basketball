import { periodLabel } from '@/components/games/period-score-table';
import type { PeriodScoreDraft } from '@/types/admin-games';

type GamePeriodFieldsProps = {
    periods: PeriodScoreDraft[];
    homeName: string;
    awayName: string;
    homeScore: number;
    awayScore: number;
    disabled: boolean;
    errors: Record<string, string | undefined>;
    onChange: (periods: PeriodScoreDraft[]) => void;
};

export default function GamePeriodFields({
    periods,
    homeName,
    awayName,
    homeScore,
    awayScore,
    disabled,
    errors,
    onChange,
}: GamePeriodFieldsProps) {
    const homeTotal = periods.reduce(
        (sum, row) => sum + (row.home_score ?? 0),
        0,
    );
    const awayTotal = periods.reduce(
        (sum, row) => sum + (row.away_score ?? 0),
        0,
    );
    const complete =
        periods.length >= 4 &&
        periods.every(
            (row) => row.home_score !== null && row.away_score !== null,
        );
    const matches =
        complete && homeTotal === homeScore && awayTotal === awayScore;

    function update(
        index: number,
        field: 'home_score' | 'away_score',
        value: string,
    ) {
        onChange(
            periods.map((row, rowIndex) =>
                rowIndex === index
                    ? { ...row, [field]: value === '' ? null : Number(value) }
                    : row,
            ),
        );
    }

    return (
        <fieldset
            disabled={disabled}
            className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6"
        >
            <legend className="px-2 text-lg font-semibold">
                Rezultat po četvrtinama
            </legend>
            <p className="mb-4 text-sm leading-relaxed text-slate-600">
                Unesite poene postignute u svakoj četvrtini, a ne ukupan
                rezultat do tog trenutka. Nacrt može biti nepotpun. Pri objavi
                zbroj mora odgovarati poenima igrača:{' '}
                <strong>
                    {homeScore} : {awayScore}
                </strong>
                .
            </p>
            {periods.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
                    <p className="mb-3 text-sm text-slate-600">
                        Raspodjela nije unesena. Za stare utakmice može ostati
                        nepoznata.
                    </p>
                    <button
                        type="button"
                        className="min-h-11 rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white disabled:opacity-50"
                        onClick={() =>
                            onChange(
                                Array.from({ length: 4 }, (_, index) => ({
                                    period_number: index + 1,
                                    home_score: null,
                                    away_score: null,
                                })),
                            )
                        }
                    >
                        Unesi četvrtine
                    </button>
                </div>
            ) : (
                <>
                    <div
                        className="overflow-x-auto"
                        role="region"
                        aria-label="Unos rezultata po četvrtinama"
                        tabIndex={0}
                    >
                        <table className="w-full text-sm">
                            <caption className="sr-only">
                                Poeni domaćina i gosta po četvrtinama i
                                produžecima
                            </caption>
                            <thead>
                                <tr className="border-b text-slate-600">
                                    <th scope="col" className="p-2 text-left">
                                        Dionica
                                    </th>
                                    <th scope="col" className="p-2 text-left">
                                        {homeName}
                                    </th>
                                    <th scope="col" className="p-2 text-left">
                                        {awayName}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {periods.map((row, index) => (
                                    <tr
                                        key={row.period_number}
                                        className="border-b border-slate-100"
                                    >
                                        <th
                                            scope="row"
                                            className="p-2 text-left"
                                        >
                                            {periodLabel(row.period_number)}
                                        </th>
                                        {(
                                            [
                                                'home_score',
                                                'away_score',
                                            ] as const
                                        ).map((field) => {
                                            const error =
                                                errors[
                                                    `periods.${index}.${field}`
                                                ];
                                            return (
                                                <td key={field} className="p-2">
                                                    <input
                                                        type="number"
                                                        inputMode="numeric"
                                                        min={0}
                                                        max={999}
                                                        step={1}
                                                        value={row[field] ?? ''}
                                                        aria-label={`${periodLabel(row.period_number)} · ${field === 'home_score' ? homeName : awayName}`}
                                                        aria-invalid={!!error}
                                                        aria-describedby={
                                                            error
                                                                ? `period-${index}-${field}-error`
                                                                : undefined
                                                        }
                                                        className="min-h-11 w-24 rounded-lg border border-slate-300 px-3 py-2 tabular-nums focus:border-orange-500 focus:outline-orange-500"
                                                        onChange={(event) =>
                                                            update(
                                                                index,
                                                                field,
                                                                event.target
                                                                    .value,
                                                            )
                                                        }
                                                    />
                                                    {error && (
                                                        <p
                                                            id={`period-${index}-${field}-error`}
                                                            className="mt-1 text-xs text-red-600"
                                                        >
                                                            {error}
                                                        </p>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="font-semibold">
                                    <th scope="row" className="p-2 text-left">
                                        Zbroj unosa
                                    </th>
                                    <td className="p-2">{homeTotal}</td>
                                    <td className="p-2">{awayTotal}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <p
                        className={`mt-3 text-sm ${matches ? 'text-emerald-700' : 'text-amber-700'}`}
                        role="status"
                    >
                        {!complete
                            ? 'Unesite oba rezultata za svaku četvrtinu prije objave.'
                            : matches
                              ? 'Zbroj četvrtina odgovara poenima igrača.'
                              : 'Zbroj četvrtina još ne odgovara poenima igrača.'}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3 text-sm">
                        <button
                            type="button"
                            disabled={disabled || periods.length >= 20}
                            className="min-h-11 rounded-lg border border-slate-300 px-3 py-2 disabled:opacity-50"
                            onClick={() =>
                                onChange([
                                    ...periods,
                                    {
                                        period_number: periods.length + 1,
                                        home_score: null,
                                        away_score: null,
                                    },
                                ])
                            }
                        >
                            + Produžetak
                        </button>
                        {periods.length > 4 && (
                            <button
                                type="button"
                                className="min-h-11 rounded-lg border border-slate-300 px-3 py-2"
                                onClick={() => {
                                    if (
                                        window.confirm(
                                            'Ukloniti zadnji produžetak iz ovog unosa?',
                                        )
                                    )
                                        onChange(periods.slice(0, -1));
                                }}
                            >
                                Ukloni zadnji produžetak
                            </button>
                        )}
                        <button
                            type="button"
                            className="min-h-11 rounded-lg px-3 py-2 text-red-700"
                            onClick={() => {
                                if (
                                    window.confirm(
                                        'Označiti raspodjelu kao nepoznatu? Sve upisane četvrtine uklonit će se pri spremanju.',
                                    )
                                )
                                    onChange([]);
                            }}
                        >
                            Raspodjela nije poznata
                        </button>
                    </div>
                    <p className="mt-3 text-xs text-slate-500">
                        OT1 je prvi produžetak, OT2 drugi. Svaki produžetak mora
                        započeti nakon izjednačenog rezultata.
                    </p>
                </>
            )}
            {errors.periods && (
                <p className="mt-3 text-sm text-red-600" role="alert">
                    {errors.periods}
                </p>
            )}
        </fieldset>
    );
}
