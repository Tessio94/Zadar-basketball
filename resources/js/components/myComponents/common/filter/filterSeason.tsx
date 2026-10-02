import { usePage, router } from '@inertiajs/react';
import { cn } from '@/lib/utils';

export default function FilterSeason({
    additionalClass,
}: {
    additionalClass?: string;
}) {
    const { seasons } = usePage().props;

    const seasonLenght = seasons.length;

    const params = new URLSearchParams(window.location.search);

    const selectedSeason = params.get('season') ?? '';

    console.log('seasong', seasons);
    return (
        <div>
            <select
                className={cn(
                    'filter-season rounded-xl border border-likar1 bg-likar1 px-2.5 py-1.5 font-heading text-xl text-slate-100 shadow-md shadow-likar1',
                    additionalClass,
                )}
                value={selectedSeason}
                onChange={(e) => {
                    router.get(
                        window.location.pathname,
                        { season: e.target.value },
                        {
                            preserveState: true,
                            preserveScroll: true,
                        },
                    );
                }}
                name="season"
                id="season"
            >
                {seasons.map((season) => (
                    <option
                        key={season.id}
                        value={season.id}
                        className={cn(
                            'rounded-xl border border-slate-100',
                            seasonLenght > 1 &&
                                'first:rounded-t-xl first:border-b-0 last:rounded-b-xl last:border-t-0',
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
