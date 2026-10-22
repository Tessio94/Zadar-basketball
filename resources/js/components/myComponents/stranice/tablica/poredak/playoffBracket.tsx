import { Link } from '@inertiajs/react';
import { ChevronDown, Trophy, X } from 'lucide-react';
import { useId, useRef, useState } from 'react';
import PlayoffBracketCard from './playoffBracketCard';
import type { PlayoffBracketData, PlayoffSeries } from '@/types/playoffs';

export default function PlayoffBracket({
    bracket,
}: {
    bracket: PlayoffBracketData;
}) {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [pinnedId, setPinnedId] = useState<string | null>(null);
    const triggers = useRef<Record<string, HTMLButtonElement | null>>({});
    const panelId = useId();
    const allSeries = [
        ...bracket.quarterfinals,
        ...bracket.semifinals,
        bracket.final,
    ];
    const selected =
        allSeries.find(
            (series) => series.id === selectedId && series.games.length > 0,
        ) ?? null;

    function closeDetails() {
        if (selectedId)
            triggers.current[selectedId]?.focus({ preventScroll: true });
        setSelectedId(null);
        setPinnedId(null);
    }

    function renderSeries(series: PlayoffSeries, placement: string) {
        const hasGames = series.games.length > 0;
        const expanded = selected?.id === series.id;
        return (
            <div
                key={series.id}
                className={`relative flex items-center px-3 ${placement}`}
            >
                <div className="w-full min-w-0">
                    <div className="mb-1.5 flex items-center justify-between px-1 text-[10px] font-semibold tracking-wide text-slate-200/80 uppercase">
                        <span>{series.label}</span>
                        <span>
                            {series.winner
                                ? 'Završeno'
                                : hasGames
                                  ? 'U tijeku / najavljeno'
                                  : 'Na dvije pobjede'}
                        </span>
                    </div>
                    <button
                        ref={(node) => {
                            triggers.current[series.id] = node;
                        }}
                        type="button"
                        disabled={!hasGames}
                        aria-expanded={hasGames ? expanded : undefined}
                        aria-controls={hasGames ? panelId : undefined}
                        aria-label={
                            hasGames
                                ? `${series.label}: prikaži utakmice serije`
                                : `${series.label}: utakmice još nisu unesene`
                        }
                        onPointerEnter={(event) => {
                            if (
                                hasGames &&
                                pinnedId === null &&
                                event.pointerType === 'mouse' &&
                                window.matchMedia(
                                    '(hover: hover) and (pointer: fine)',
                                ).matches
                            ) {
                                setSelectedId(series.id);
                            }
                        }}
                        onClick={() => {
                            if (pinnedId === series.id) {
                                setSelectedId(null);
                                setPinnedId(null);
                            } else {
                                setSelectedId(series.id);
                                setPinnedId(series.id);
                            }
                        }}
                        className={`block w-full overflow-hidden rounded-xl border text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-likar3 disabled:cursor-default motion-reduce:transition-none ${expanded ? 'border-likar3 bg-[url(/images/design/snow.png)]' : 'border-likar3/30 bg-likar4/60 enabled:hover:border-likar3/80'}`}
                    >
                        <div className="divide-y divide-white/10">
                            {series.teams.map((slot, index) => (
                                <PlayoffBracketCard
                                    key={
                                        slot.team?.id ?? `${series.id}-${index}`
                                    }
                                    {...slot}
                                    winner={
                                        slot.team !== null &&
                                        series.winner?.id === slot.team.id
                                    }
                                    eliminated={
                                        slot.team !== null &&
                                        series.winner !== null &&
                                        series.winner.id !== slot.team.id
                                    }
                                />
                            ))}
                        </div>
                        {hasGames && (
                            <span className="flex items-center justify-between border-t border-white/5 px-3 py-1.5 text-[10px] text-slate-200/80">
                                <span>
                                    {series.games.length} utakmice • detalji
                                </span>
                                <ChevronDown
                                    aria-hidden="true"
                                    className={`size-3.5 transition-transform motion-reduce:transition-none ${expanded ? 'rotate-180' : ''}`}
                                />
                            </span>
                        )}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            {bracket.status === 'pending' && (
                <p className="px-5 py-3 text-sm text-slate-200/80 italic">
                    **Doigravanje još nije započelo. Parovi će biti prikazani
                    nakon objave rasporeda.
                </p>
            )}
            <div
                className="mb-10 min-w-0"
                onKeyDown={(event) => {
                    if (event.key === 'Escape' && selected) {
                        event.preventDefault();
                        closeDetails();
                    }
                }}
            >
                <div className="overflow-hidden rounded-xl border border-likar1 bg-slate-900 shadow-xl shadow-likar1">
                    {bracket.champion && (
                        <div className="flex flex-wrap items-center justify-center gap-3 border-b border-white/10 px-5 py-4">
                            <div className="flex items-center gap-2 rounded-lg border border-likar3/30 bg-likar3/10 px-3 py-2 text-sm text-likar3">
                                <Trophy
                                    aria-hidden="true"
                                    className="size-4 shrink-0"
                                />
                                <span>
                                    Prvak:{' '}
                                    <strong>{bracket.champion.name}</strong>
                                </span>
                            </div>
                        </div>
                    )}

                    <div
                        className="scrollbar overflow-x-auto scrollbar-thumb-likar3 scrollbar-track-slate-900"
                        role="region"
                        aria-label="Ždrijeb doigravanja; na manjim zaslonima pomaknite vodoravno"
                        tabIndex={0}
                    >
                        <div className="grid min-w-[960px] grid-cols-3 bg-[url('/images/design/snow4.jpg')] bg-cover bg-no-repeat">
                            <div className="border-r border-likar4 bg-slate-900/40">
                                <h2 className="bg-slate-900 py-2 text-center font-heading text-xl text-slate-100 uppercase">
                                    Četvrtfinale
                                </h2>
                                <div className="grid h-[720px] grid-rows-8 py-4">
                                    {bracket.quarterfinals.map((series) =>
                                        renderSeries(series, 'row-span-2'),
                                    )}
                                </div>
                            </div>
                            <div className="border-r border-likar4 bg-slate-900/40">
                                <h2 className="bg-slate-900 py-2 text-center font-heading text-xl text-slate-100 uppercase">
                                    Polufinale
                                </h2>
                                <div className="grid h-[720px] grid-rows-8 py-4">
                                    {bracket.semifinals.map((series, index) =>
                                        renderSeries(
                                            series,
                                            index === 0
                                                ? 'row-span-2 row-start-2'
                                                : 'row-span-2 row-start-6',
                                        ),
                                    )}
                                </div>
                            </div>
                            <div className="bg-slate-900/40">
                                <h2 className="bg-slate-900 py-2 text-center font-heading text-xl text-slate-100 uppercase">
                                    Finale
                                </h2>
                                <div className="grid h-[720px] grid-rows-8 py-4">
                                    {renderSeries(
                                        bracket.final,
                                        'row-span-2 row-start-4',
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Outside the horizontal viewport: detail content cannot be clipped. */}
                {selected && (
                    <section
                        id={panelId}
                        aria-label={`Utakmice serije ${selected.label}`}
                        className="mt-4 rounded-xl border border-likar3/40 bg-likar4/60 p-4 sm:p-5"
                    >
                        <div className="mb-4 flex items-start justify-between gap-4">
                            <div>
                                <h3 className="font-heading text-xl text-slate-100">
                                    {selected.label} — utakmice serije
                                </h3>
                                <p className="mt-1 text-sm text-slate-200/80">
                                    {selected.teams[0].team?.name} —{' '}
                                    {selected.teams[1].team?.name}
                                </p>
                                <p className="mt-1 text-xs text-slate-200/80">
                                    Serija {selected.teams[0].wins} :{' '}
                                    {selected.teams[1].wins}
                                    {selected.winner
                                        ? ` • Pobjednik: ${selected.winner.name}`
                                        : ''}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={closeDetails}
                                aria-label="Zatvori pregled utakmica"
                                className="flex size-10 shrink-0 items-center justify-center rounded-lg text-slate-200/80 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-likar3"
                            >
                                <X className="size-5" aria-hidden="true" />
                            </button>
                        </div>
                        <ul className="grid gap-3 lg:grid-cols-3">
                            {selected.games.map((game, index) => (
                                <li key={game.id}>
                                    <Link
                                        href={`/utakmice/${game.id}`}
                                        className="block rounded-lg border border-white/10 bg-likar2/80 p-4 hover:border-likar3/60 focus-visible:outline-2 focus-visible:outline-likar3"
                                    >
                                        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-200/80">
                                            <span>Utakmica {index + 1}</span>
                                            <time dateTime={game.game_date}>
                                                {new Intl.DateTimeFormat(
                                                    'hr-HR',
                                                    {
                                                        dateStyle: 'short',
                                                        timeStyle: 'short',
                                                        timeZone:
                                                            'Europe/Zagreb',
                                                    },
                                                ).format(
                                                    new Date(game.game_date),
                                                )}
                                            </time>
                                        </div>
                                        <div className="space-y-2 text-sm text-slate-100">
                                            <div className="flex items-center justify-between gap-3">
                                                <span>
                                                    {game.home_team.name}
                                                </span>
                                                <strong className="tabular-nums">
                                                    {game.status === 'finished'
                                                        ? game.home_score
                                                        : '—'}
                                                </strong>
                                            </div>
                                            <div className="flex items-center justify-between gap-3">
                                                <span>
                                                    {game.away_team.name}
                                                </span>
                                                <strong className="tabular-nums">
                                                    {game.status === 'finished'
                                                        ? game.away_score
                                                        : '—'}
                                                </strong>
                                            </div>
                                        </div>
                                        <p className="mt-3 text-[11px] text-likar3">
                                            {game.status === 'finished'
                                                ? 'Odigrano • Pregled utakmice →'
                                                : 'Najavljeno • Pregled utakmice →'}
                                        </p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </>
    );
}
