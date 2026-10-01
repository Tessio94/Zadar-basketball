import { cn } from '@/lib/utils';

export default function FilterSeason({
    additionalClass,
}: {
    additionalClass?: string;
}) {
    return (
        <div>
            <select
                className={cn(
                    'rounded-xl border border-likar1 bg-likar1 px-5 py-2 font-heading text-xl text-slate-100 shadow-md shadow-likar1',
                    additionalClass,
                )}
                name="season"
                id="season"
            >
                <option value="">2028/2029</option>
                <option value="">2027/2028</option>
                <option value="">2026/2027</option>
            </select>
        </div>
    );
}
