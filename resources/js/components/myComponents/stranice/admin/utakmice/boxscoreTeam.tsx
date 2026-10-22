import {
    derived,
    percentage,
    statColumns,
    teamTotal,
    type EditorLine,
    type RosterPlayer,
} from './types';

type Props = {
    name: string;
    teamId: number;
    rows: EditorLine[];
    roster: RosterPlayer[];
    disabled: boolean;
    errors: Record<string, string | undefined>;
    submittedRows: EditorLine[];
    onChange: (
        playerId: number,
        teamId: number,
        patch: Partial<EditorLine>,
    ) => void;
};
export default function BoxscoreTeam({
    name,
    teamId,
    rows,
    roster,
    disabled,
    errors,
    submittedRows,
    onChange,
}: Props) {
    const teamRows = rows.filter((row) => row.team_id === teamId);
    const total = teamTotal(teamRows);
    const summary = derived(total);
    const active = teamRows.filter((row) => row.played);
    return (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b p-5">
                <div>
                    <h2 className="text-xl font-bold">{name}</h2>
                    <p className="mt-1 text-sm text-slate-500">
                        {active.length} igrača ·{' '}
                        {active.filter((r) => r.is_starter).length} startera
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-3xl font-bold tabular-nums text-orange-600">
                        {summary.points}
                    </p>
                    <p className="text-xs text-slate-500">poena</p>
                </div>
            </div>
            <div
                role="region"
                aria-label={`Statistika: ${name}`}
                tabIndex={0}
                className="overflow-x-auto focus-visible:outline-2 focus-visible:outline-orange-500"
            >
                <table className="w-full min-w-[1500px] border-collapse text-sm">
                    <caption className="sr-only">
                        Zapisnik ekipe {name}. Označite Nastup za igrače koji su
                        igrali. Tab pomiče fokus između polja.
                    </caption>
                    <thead className="bg-slate-50 text-xs text-slate-600">
                        <tr>
                            <th
                                scope="col"
                                className="sticky left-0 z-10 min-w-44 bg-slate-50 p-3 text-left"
                            >
                                Igrač
                            </th>
                            <th scope="col" className="p-2">
                                Nastup
                            </th>
                            <th scope="col" className="p-2">
                                Starter
                            </th>
                            {statColumns.map(([key, label, title]) => (
                                <th scope="col" key={key} className="p-2">
                                    <abbr
                                        title={title}
                                        className="cursor-help no-underline"
                                    >
                                        {label}
                                    </abbr>
                                </th>
                            ))}
                            <th scope="col" className="p-2">
                                PO
                            </th>
                            <th scope="col" className="p-2">
                                SK
                            </th>
                            <th scope="col" className="p-2">
                                EFF
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {teamRows.map((row) => {
                            const player = roster.find(
                                (p) =>
                                    p.player_id === row.player_id &&
                                    p.team_id === teamId,
                            );
                            const name =
                                player?.name ?? `Igrač #${row.player_id}`;
                            const stats = derived(row);
                            const errorIndex = submittedRows.findIndex(
                                (r) =>
                                    r.player_id === row.player_id &&
                                    r.team_id === teamId,
                            );
                            return (
                                <tr
                                    key={`${teamId}:${row.player_id}`}
                                    className={`border-t ${row.played ? '' : 'text-slate-400'}`}
                                >
                                    <th
                                        scope="row"
                                        className="sticky left-0 z-10 bg-white p-3 text-left font-medium"
                                    >
                                        <span className="mr-2 text-xs text-slate-400">
                                            {player?.jersey_number ?? '—'}
                                        </span>
                                        {name}
                                        {!player?.on_roster && (
                                            <span className="mt-1 block text-xs text-amber-700">
                                                Izvan trenutačnog rostera
                                            </span>
                                        )}
                                    </th>
                                    <td className="p-2 text-center">
                                        <input
                                            type="checkbox"
                                            className="size-5 accent-orange-600"
                                            aria-label={`${name}: Nastup`}
                                            checked={row.played}
                                            disabled={disabled}
                                            onChange={(e) =>
                                                onChange(
                                                    row.player_id,
                                                    teamId,
                                                    {
                                                        played: e.target
                                                            .checked,
                                                        is_starter: e.target
                                                            .checked
                                                            ? row.is_starter
                                                            : false,
                                                    },
                                                )
                                            }
                                        />
                                    </td>
                                    <td className="p-2 text-center">
                                        <input
                                            type="checkbox"
                                            className="size-5 accent-orange-600"
                                            aria-label={`${name}: Starter`}
                                            checked={row.is_starter}
                                            disabled={disabled || !row.played}
                                            onChange={(e) =>
                                                onChange(
                                                    row.player_id,
                                                    teamId,
                                                    {
                                                        is_starter:
                                                            e.target.checked,
                                                    },
                                                )
                                            }
                                        />
                                    </td>
                                    {statColumns.map(([key, , title]) => {
                                        const error =
                                            errors[
                                                `players.${errorIndex}.${key}`
                                            ];
                                        return (
                                            <td key={key} className="p-1">
                                                <input
                                                    type="number"
                                                    step="1"
                                                    min={
                                                        key === 'plus_minus'
                                                            ? -1000
                                                            : 0
                                                    }
                                                    max="1000"
                                                    required
                                                    inputMode={
                                                        key === 'plus_minus'
                                                            ? undefined
                                                            : 'numeric'
                                                    }
                                                    aria-label={`${name}: ${title}`}
                                                    aria-invalid={!!error}
                                                    title={error ?? title}
                                                    disabled={
                                                        disabled || !row.played
                                                    }
                                                    value={row[key]}
                                                    onFocus={(e) =>
                                                        e.target.select()
                                                    }
                                                    onChange={(e) =>
                                                        onChange(
                                                            row.player_id,
                                                            teamId,
                                                            {
                                                                [key]:
                                                                    e.target
                                                                        .value ===
                                                                    ''
                                                                        ? 0
                                                                        : Number(
                                                                              e
                                                                                  .target
                                                                                  .value,
                                                                          ),
                                                            },
                                                        )
                                                    }
                                                    className={`h-10 w-16 rounded-lg border bg-white px-1 text-center tabular-nums focus:outline-2 focus:outline-orange-500 disabled:bg-slate-50 disabled:text-slate-300 ${error ? 'border-red-500' : 'border-slate-200'}`}
                                                />
                                            </td>
                                        );
                                    })}
                                    <td className="p-2 text-center font-bold text-orange-700">
                                        {row.played ? stats.points : '—'}
                                    </td>
                                    <td className="p-2 text-center">
                                        {row.played ? stats.rebounds : '—'}
                                    </td>
                                    <td className="p-2 text-center">
                                        {row.played ? stats.efficiency : '—'}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                    <tfoot className="border-t-2 border-orange-200 bg-orange-50 font-semibold">
                        <tr>
                            <th
                                scope="row"
                                className="sticky left-0 z-10 bg-orange-50 p-3 text-left"
                            >
                                Ukupno
                            </th>
                            <td className="text-center">{active.length}</td>
                            <td />
                            {statColumns.map(([key]) => (
                                <td
                                    className="p-2 text-center tabular-nums"
                                    key={key}
                                >
                                    {total[key]}
                                </td>
                            ))}
                            <td className="p-2 text-center">
                                {summary.points}
                            </td>
                            <td className="p-2 text-center">
                                {summary.rebounds}
                            </td>
                            <td className="p-2 text-center">
                                {summary.efficiency}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            {!teamRows.length && (
                <p className="p-6 text-sm text-amber-800">
                    Nema igrača u rosteru. Dodajte ih ekipi za ovu sezonu kroz
                    upravljanje igračima pa osvježite zapisnik.
                </p>
            )}
            <div className="flex flex-wrap gap-x-6 gap-y-2 border-t px-5 py-4 text-sm text-slate-600">
                <span>
                    Šut iz igre{' '}
                    <strong>
                        {percentage(
                            total.fg2_made + total.fg3_made,
                            total.fg2_attempted + total.fg3_attempted,
                        )}
                    </strong>
                </span>
                <span>
                    2P{' '}
                    <strong>
                        {percentage(total.fg2_made, total.fg2_attempted)}
                    </strong>
                </span>
                <span>
                    3P{' '}
                    <strong>
                        {percentage(total.fg3_made, total.fg3_attempted)}
                    </strong>
                </span>
                <span>
                    SB{' '}
                    <strong>
                        {percentage(total.ft_made, total.ft_attempted)}
                    </strong>
                </span>
            </div>
        </section>
    );
}
