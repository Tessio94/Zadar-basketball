import { Info } from 'lucide-react';
import {
    formatStatAverage,
    formatStatCount,
    formatStatPercentage,
} from '@/lib/team-statistics';
import { cn } from '@/lib/utils';
import type { TeamSeasonSummary } from '@/types/team-statistics';

type TeamSeasonSummaryProps = {
    summary: TeamSeasonSummary;
    seasonName: string;
};

export default function TeamSeasonSummary({
    summary,
    seasonName,
}: TeamSeasonSummaryProps) {
    const highlights = [
        { label: 'Utakmice', value: formatStatCount(summary.games_played) },
        {
            label: 'Pobjede – porazi',
            value: `${summary.wins} – ${summary.losses}`,
        },
        {
            label: 'Poeni po utakmici',
            value: formatStatAverage(summary.points_per_game),
        },
        {
            label: 'Primljeni poeni po utakmici',
            value: formatStatAverage(summary.points_allowed_per_game),
        },
        {
            label: 'Koš-razlika',
            value: `${summary.score_difference > 0 ? '+' : ''}${formatStatCount(summary.score_difference)}`,
            className:
                summary.score_difference < 0
                    ? 'text-rose-300'
                    : summary.score_difference > 0
                      ? 'text-emerald-300'
                      : undefined,
        },
    ];
    const shooting = [
        { label: 'Šut za 2', shot: summary.shooting.fg2 },
        { label: 'Šut za 3', shot: summary.shooting.fg3 },
        { label: 'Slobodna bacanja', shot: summary.shooting.ft },
    ];
    const averages = [
        { label: 'Skokovi', value: summary.averages.rebounds },
        { label: 'Asistencije', value: summary.averages.assists },
        { label: 'Ukradene', value: summary.averages.steals },
        { label: 'Blokade', value: summary.averages.blocks },
        { label: 'Izgubljene', value: summary.averages.turnovers },
        { label: 'Prekršaji', value: summary.averages.fouls },
    ];

    return (
        <section
            aria-label={`Statistika ekipe za sezonu ${seasonName}`}
            className="overflow-hidden rounded-xl border border-likar1 bg-likar4/70 shadow-xl shadow-likar1"
        >
            <header className="flex flex-wrap items-center justify-between gap-3 border-b border-likar1 bg-slate-900 px-4 py-4 sm:px-5">
                <h2 className="flex items-center gap-3 font-heading text-2xl font-semibold text-slate-100">
                    Statistika ekipe
                </h2>
                <span className="rounded-full border border-likar3/25 bg-likar3/10 px-3 py-1 font-text text-xs font-semibold text-slate-200">
                    {seasonName}
                </span>
            </header>

            <dl className="grid grid-cols-2 gap-px border-b border-white/10 bg-white/10 sm:grid-cols-3 lg:grid-cols-5">
                {highlights.map((item) => (
                    <div
                        key={item.label}
                        className="flex flex-col items-center justify-center gap-2 bg-likar4/70 px-3 py-5 text-center last:col-span-2 sm:last:col-span-1"
                    >
                        <dt className="order-2 max-w-32 font-text text-[11px] leading-relaxed font-medium tracking-wide text-slate-300 uppercase">
                            {item.label}
                        </dt>
                        <dd
                            className={cn(
                                'font-heading text-3xl leading-none font-semibold text-likar3 tabular-nums sm:text-4xl',
                                item.className,
                            )}
                        >
                            {item.value}
                        </dd>
                    </div>
                ))}
            </dl>

            {summary.games_played === 0 ? (
                <p className="border-b border-white/10 px-4 py-4 font-text text-sm leading-relaxed text-slate-300 sm:px-5">
                    Još nema odigranih utakmica u ovoj sezoni.
                </p>
            ) : summary.boxscore_games < summary.games_played ? (
                <p className="flex items-start gap-2 border-b border-white/10 bg-slate-900/40 px-4 py-3 font-text text-xs leading-relaxed text-slate-300 sm:px-5">
                    <Info
                        className="mt-0.5 size-4 shrink-0 text-likar3"
                        aria-hidden="true"
                    />
                    <span>
                        Rezultati uključuju sve odigrane utakmice. Šut i ostala
                        statistika ekipe temelje se na zapisnicima za{' '}
                        {summary.boxscore_games} od {summary.games_played}{' '}
                        utakmica.
                    </span>
                </p>
            ) : null}

            <div className="grid gap-7 bg-[(url(/images/design/snow.png))] p-4 sm:p-5 lg:grid-cols-2">
                <div>
                    <h3 className="mb-4 font-heading text-lg font-medium tracking-wide text-slate-100">
                        Šut u sezoni
                    </h3>
                    <div className="space-y-5">
                        {shooting.map(({ label, shot }) => (
                            <div key={label}>
                                <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 font-text text-sm">
                                    <span className="text-slate-200">
                                        {label}
                                    </span>
                                    <span className="text-slate-400 tabular-nums">
                                        <strong className="mr-2 font-semibold text-slate-100">
                                            {formatStatPercentage(
                                                shot.percentage,
                                            )}
                                        </strong>
                                        {formatStatCount(shot.made)} /{' '}
                                        {formatStatCount(shot.attempted)}
                                    </span>
                                </div>
                                <div
                                    aria-hidden="true"
                                    className="h-2 overflow-hidden rounded-full bg-slate-900/70"
                                >
                                    <div
                                        className="h-full rounded-full bg-likar3"
                                        style={{
                                            width: `${Math.max(0, Math.min(100, shot.percentage ?? 0))}%`,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="mb-4 font-heading text-lg font-medium tracking-wide text-slate-100">
                        Po utakmici
                    </h3>
                    <dl className="grid grid-cols-3 gap-2 sm:gap-3">
                        {averages.map((item) => (
                            <div
                                key={item.label}
                                className="flex flex-col items-center gap-1.5 rounded-lg border border-white/5 bg-slate-900/55 px-2 py-3 text-center"
                            >
                                <dt className="order-2 font-text text-[10px] tracking-wide text-slate-300 uppercase sm:text-[11px]">
                                    {item.label}
                                </dt>
                                <dd className="font-heading text-2xl font-semibold text-slate-100 tabular-nums">
                                    {formatStatAverage(item.value)}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
            {summary.draws > 0 && (
                <p className="px-5 pb-4 font-text text-xs text-slate-300">
                    Neriješeni rezultati u evidenciji: {summary.draws}.
                </p>
            )}
        </section>
    );
}
