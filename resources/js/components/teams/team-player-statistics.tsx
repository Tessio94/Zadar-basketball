import { Link } from '@inertiajs/react';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { useId, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { show } from '@/actions/App/Http/Controllers/PlayerController';
import BasketballPlayerIcon from '@/components/myComponents/ui/icons/basketballPlayer';
import {
    TEAM_STAT_CATEGORIES,
    sortTeamStatPlayers,
} from '@/lib/team-statistics';
import type {
    TeamStatCategory,
    TeamStatColumn,
    TeamStatSort,
} from '@/lib/team-statistics';
import { cn } from '@/lib/utils';
import type { TeamSeasonPlayerStats } from '@/types/team-statistics';

type TeamPlayerStatisticsProps = {
    players: TeamSeasonPlayerStats[];
    seasonId: number;
    jerseyColor: string;
};

export default function TeamPlayerStatistics({
    players,
    seasonId,
    jerseyColor,
}: TeamPlayerStatisticsProps) {
    const id = useId();
    const [selection, setSelection] = useState<{
        category: TeamStatCategory['id'];
        sort: TeamStatSort;
    }>({ category: 'points', sort: { column: 'total', direction: 'desc' } });

    const category =
        TEAM_STAT_CATEGORIES.find((item) => item.id === selection.category) ??
        TEAM_STAT_CATEGORIES[1];
    const sortColumn =
        category.columns.find(
            (column) => column.id === selection.sort.column,
        ) ?? category.columns[0];
    const sortedPlayers = sortTeamStatPlayers(
        players,
        sortColumn,
        selection.sort.direction,
    );

    function selectCategory(item: TeamStatCategory) {
        setSelection({ category: item.id, sort: item.defaultSort });
    }

    function onTabKeyDown(
        event: KeyboardEvent<HTMLButtonElement>,
        index: number,
    ) {
        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
            return;
        let next: number;
        switch (event.key) {
            case 'ArrowRight':
                next = (index + 1) % TEAM_STAT_CATEGORIES.length;
                break;
            case 'ArrowLeft':
                next =
                    (index - 1 + TEAM_STAT_CATEGORIES.length) %
                    TEAM_STAT_CATEGORIES.length;
                break;
            case 'Home':
                next = 0;
                break;
            case 'End':
                next = TEAM_STAT_CATEGORIES.length - 1;
                break;
            default:
                return;
        }
        event.preventDefault();
        selectCategory(TEAM_STAT_CATEGORIES[next]);
        event.currentTarget.parentElement
            ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
            [next]?.focus();
    }

    function sortBy(column: TeamStatColumn) {
        setSelection((current) => ({
            ...current,
            sort: {
                column: column.id,
                direction:
                    current.sort.column === column.id
                        ? current.sort.direction === 'desc'
                            ? 'asc'
                            : 'desc'
                        : category.defaultSort.direction,
            },
        }));
    }

    return (
        <section
            aria-label="Statistika igrača"
            className="min-w-0 overflow-hidden rounded-xl border border-likar1 bg-likar4/50 shadow-xl shadow-likar1"
        >
            <header className="flex flex-wrap items-center justify-between gap-3 border-b border-likar1 bg-slate-900 px-4 py-4 sm:px-5">
                <h2 className="flex items-center gap-3 font-heading text-2xl font-semibold text-slate-100">
                    Statistika igrača
                </h2>
                <span className="font-text text-xs text-slate-400">
                    Igrača: {players.length}
                </span>
            </header>

            <div
                role="tablist"
                aria-label="Statistička kategorija"
                className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar flex gap-1 overflow-x-auto border-b border-white/10 bg-slate-900/40 p-3 scrollbar-thumb-likar3 scrollbar-track-slate-900 sm:px-4"
            >
                {TEAM_STAT_CATEGORIES.map((item, index) => (
                    <button
                        key={item.id}
                        id={`${id}-${item.id}`}
                        type="button"
                        role="tab"
                        aria-selected={category.id === item.id}
                        aria-controls={`${id}-panel`}
                        tabIndex={category.id === item.id ? 0 : -1}
                        title={item.title}
                        onClick={() => selectCategory(item)}
                        onKeyDown={(event) => onTabKeyDown(event, index)}
                        className={cn(
                            'shrink-0 rounded-lg px-3 py-2.5 font-heading text-sm font-medium tracking-wide whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-likar3 motion-reduce:transition-none',
                            category.id === item.id
                                ? 'bg-likar3 text-slate-950'
                                : 'text-slate-300 hover:bg-white/10 hover:text-white',
                        )}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            <div
                id={`${id}-panel`}
                role="tabpanel"
                aria-labelledby={`${id}-${category.id}`}
            >
                <div className="border-b border-white/10 px-4 py-4 sm:px-5">
                    <h3 className="font-heading text-xl font-medium text-slate-100">
                        {category.title}
                    </h3>
                </div>

                {players.length === 0 ? (
                    <p className="p-6 font-text text-sm text-slate-300">
                        Za ovu ekipu još nema igrača u odabranoj sezoni.
                    </p>
                ) : (
                    <div
                        role="region"
                        aria-label={`${category.title} — tablica igrača`}
                        tabIndex={0}
                        className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar overflow-x-auto scrollbar-thumb-likar3 scrollbar-track-slate-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-likar3"
                    >
                        <table className="w-full min-w-[680px] text-sm sm:text-base">
                            <caption className="sr-only">
                                {category.title}. Broj označava broj dresa.
                                Kliknite naslov brojčanog stupca za promjenu
                                poretka.
                            </caption>
                            <thead>
                                <tr className="border-b border-likar1 bg-slate-900 font-heading text-sm text-slate-100 uppercase">
                                    <th
                                        scope="col"
                                        className="px-3 py-3 text-center font-medium whitespace-nowrap"
                                    >
                                        Broj
                                    </th>
                                    <th
                                        scope="col"
                                        className="min-w-52 px-3 py-3 text-left font-medium whitespace-nowrap"
                                    >
                                        Igrač
                                    </th>
                                    {category.columns.map((column) => {
                                        const selected =
                                            sortColumn.id === column.id;
                                        const Icon = selected
                                            ? selection.sort.direction ===
                                              'desc'
                                                ? ArrowDown
                                                : ArrowUp
                                            : ArrowUpDown;
                                        return (
                                            <th
                                                key={column.id}
                                                scope="col"
                                                aria-sort={
                                                    selected
                                                        ? selection.sort
                                                              .direction ===
                                                          'desc'
                                                            ? 'descending'
                                                            : 'ascending'
                                                        : undefined
                                                }
                                                className="px-3 py-3 text-right font-medium whitespace-nowrap"
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        sortBy(column)
                                                    }
                                                    className="ml-auto inline-flex items-center gap-1.5 rounded-sm text-right uppercase hover:text-likar3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-likar3"
                                                    aria-label={`${column.label}: poredaj ${selected && selection.sort.direction === 'desc' ? 'rastuće' : selected ? 'padajuće' : category.defaultSort.direction === 'asc' ? 'rastuće' : 'padajuće'}`}
                                                >
                                                    {column.label}
                                                    <Icon
                                                        className={cn(
                                                            'size-3.5',
                                                            selected
                                                                ? 'text-likar3'
                                                                : 'text-slate-500',
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                </button>
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {sortedPlayers.map((player) => {
                                    const name = `${player.first_name} ${player.last_name}`;
                                    return (
                                        <tr
                                            key={player.id}
                                            className="border-b border-white/5 font-text text-slate-100 last:border-b-0 odd:bg-likar2 even:bg-likar2/60"
                                        >
                                            <td className="px-3 py-3 text-center tabular-nums">
                                                <span className="inline-block min-w-8 rounded-md bg-slate-900/55 px-1.5 py-1 text-xs font-semibold text-slate-300">
                                                    {player.jersey_number ??
                                                        '—'}
                                                </span>
                                            </td>
                                            <th
                                                scope="row"
                                                className="px-3 py-3 text-left font-normal"
                                            >
                                                <div className="flex items-center gap-2.5">
                                                    <BasketballPlayerIcon
                                                        jerseyColor={
                                                            jerseyColor
                                                        }
                                                        aria-hidden="true"
                                                        className="size-8 shrink-0 rounded-full border border-slate-100/30 bg-likar4 p-0.5 sm:size-9"
                                                    />
                                                    <div>
                                                        {player.on_roster ? (
                                                            <Link
                                                                href={show(
                                                                    player.id,
                                                                    {
                                                                        query: {
                                                                            season: seasonId,
                                                                        },
                                                                    },
                                                                )}
                                                                className="rounded-sm whitespace-nowrap hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-likar3"
                                                            >
                                                                {name}
                                                            </Link>
                                                        ) : (
                                                            <span className="whitespace-nowrap">
                                                                {name}
                                                            </span>
                                                        )}
                                                        {!player.on_roster ? (
                                                            <span className="mt-1 block text-[11px] text-slate-400">
                                                                Raniji član
                                                                ekipe
                                                            </span>
                                                        ) : player.games_played ===
                                                          0 ? (
                                                            <span className="mt-1 block text-[11px] text-slate-400">
                                                                Bez zabilježenog
                                                                nastupa
                                                            </span>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            </th>
                                            {category.columns.map((column) => (
                                                <td
                                                    key={column.id}
                                                    className={cn(
                                                        'px-3 py-3 text-right whitespace-nowrap tabular-nums',
                                                        column.id ===
                                                            sortColumn.id
                                                            ? 'font-semibold text-slate-200'
                                                            : 'text-slate-200',
                                                    )}
                                                >
                                                    {column.display(player)}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
}
