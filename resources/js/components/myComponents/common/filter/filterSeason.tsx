import { usePage, router } from '@inertiajs/react';
import { cn } from '@/lib/utils';

export default function FilterSeason({
    selectedSeason,
    additionalClass,
    disable,
}: {
    selectedSeason?: number;
    additionalClass?: string;
    disable?: boolean;
}) {
    const { seasons } = usePage().props;

    const seasonLength = seasons.length;

    // console.log('seasong', seasons);
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
                            'border border-slate-100 transition-colors duration-300 hover:bg-likar2',
                            seasonLength > 1
                                ? 'first:rounded-t-xl first:border-b-0 last:rounded-b-xl last:border-t-0'
                                : 'rounded-xl',
                        )}
                    >
                        <span className="px-1.25 text-slate-100">
                            {season.name}
                        </span>
                    </option>
                ))}
            </select>
        </div>
    );
}
