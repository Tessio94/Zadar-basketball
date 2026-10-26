import { usePage, router } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import type { Season } from '@/types/seasons';

export default function FilterSeason({
    selectedSeason,
    additionalClass,
    disable,
}: {
    selectedSeason?: number;
    additionalClass?: string;
    disable?: boolean;
}) {
    const { seasons } = usePage<{ seasons: Season[] }>().props;

    const seasonLength = seasons.length;

    function handleSeasonChange(e: React.ChangeEvent<HTMLSelectElement>) {
        router.get(
            window.location.pathname,
            { season: e.target.value },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    }

    return (
        <div>
            <select
                className={cn(
                    'filter-season rounded-xl border border-likar1 bg-likar1 px-2.5 py-1.5 font-heading text-xl text-slate-100 shadow-md shadow-likar1',
                    additionalClass,
                    disable && 'disabled:bg-gray-400 disabled:opacity-50',
                )}
                disabled={disable}
                value={selectedSeason}
                onChange={handleSeasonChange}
                name="season"
                id="season"
            >
                {seasons.map((season) => (
                    <option
                        key={season.id}
                        value={season.id}
                        className={cn(
                            'flex flex-row items-center gap-0 border border-slate-100 py-1.5 transition-colors duration-300 hover:bg-likar2',
                            seasonLength > 1
                                ? 'first:rounded-t-xl first:border-b-0 last:rounded-b-xl last:border-t-0'
                                : 'rounded-xl',
                        )}
                    >
                        <span className="px-1.25 text-xl text-slate-100">
                            {season.name}
                        </span>
                    </option>
                ))}
            </select>
        </div>
    );
}
