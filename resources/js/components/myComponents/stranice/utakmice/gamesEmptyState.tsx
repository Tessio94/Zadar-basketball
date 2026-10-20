import { CalendarDays, Trophy } from 'lucide-react';

type GamesEmptyStateProps = {
    variant: 'upcoming' | 'results';
};

const content = {
    upcoming: {
        icon: CalendarDays,
        heading: 'Nadolazeće utakmice',
        title: 'Nema nadolazećih utakmica',
        description: 'Trenutno nema zakazanih utakmica za odabranu sezonu.',
    },
    results: {
        icon: Trophy,
        heading: 'Posljednji rezultati',
        title: 'Još nema odigranih utakmica',
        description:
            'Rezultati će se prikazati nakon završetka prvih utakmica.',
    },
};

export default function GamesEmptyState({ variant }: GamesEmptyStateProps) {
    const { icon: Icon, heading, title, description } = content[variant];

    return (
        <div className="overflow-hidden rounded-xl border border-sidebar-border/70 bg-likar2 dark:border-sidebar-border">
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
                <Icon aria-hidden="true" className="size-5 text-orange-400" />
                <h3 className="font-heading text-lg font-semibold text-slate-100">
                    {heading}
                </h3>
            </div>

            <div className="flex min-h-56 flex-col items-center justify-center px-6 py-10 text-center">
                <div className="mb-5 flex size-16 items-center justify-center rounded-2xl border border-orange-400/20 bg-orange-400/10">
                    <Icon
                        aria-hidden="true"
                        className="size-8 text-orange-400"
                        strokeWidth={1.5}
                    />
                </div>

                <p className="font-heading text-xl font-semibold text-slate-100">
                    {title}
                </p>

                <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-400">
                    {description}
                </p>
            </div>
        </div>
    );
}
