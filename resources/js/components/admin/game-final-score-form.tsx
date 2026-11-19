import {
    buttonClass,
    inputClass,
} from '@/components/myComponents/stranice/admin/utakmice/types';

type ScoreField = 'home_score' | 'away_score';
type Props = {
    homeName: string;
    awayName: string;
    scores: Record<ScoreField, number | null>;
    errors: Partial<Record<ScoreField, string>>;
    processing: boolean;
    published: boolean;
    unchanged: boolean;
    onChange: (field: ScoreField, value: number | null) => void;
    onPublish: () => void;
};

export default function GameFinalScoreForm({
    homeName,
    awayName,
    scores,
    errors,
    processing,
    published,
    unchanged,
    onChange,
    onPublish,
}: Props) {
    return (
        <form
            aria-labelledby="final-score-heading"
            onSubmit={(event) => {
                event.preventDefault();
                onPublish();
            }}
            className="rounded-2xl border border-orange-200 bg-orange-50 p-4 sm:p-6"
        >
            <h2 id="final-score-heading" className="text-lg font-semibold">
                Konačni rezultat
            </h2>
            <p className="mt-1 text-sm text-slate-700">
                {published
                    ? 'Ovdje možete ispraviti rezultat dok četvrtine i statistika igrača još nisu objavljeni.'
                    : 'Znate samo konačni rezultat? Unesite poene obje ekipe. Četvrtine i statistiku igrača možete dodati poslije.'}
            </p>
            <div className="mt-4 grid grid-cols-2 items-end gap-4 sm:flex sm:flex-wrap">
                {(
                    [
                        ['home_score', homeName, 'Domaćin'],
                        ['away_score', awayName, 'Gost'],
                    ] as const
                ).map(([field, team, side]) => (
                    <div key={field} className="min-w-0 sm:w-44">
                        <label
                            htmlFor={`final-${field}`}
                            className="mb-1 block text-sm font-medium"
                        >
                            {side} · {team}
                        </label>
                        <input
                            id={`final-${field}`}
                            type="number"
                            inputMode="numeric"
                            min={0}
                            max={19980}
                            step={1}
                            required
                            disabled={processing}
                            value={scores[field] ?? ''}
                            aria-invalid={!!errors[field]}
                            aria-describedby={
                                errors[field]
                                    ? `final-${field}-error`
                                    : undefined
                            }
                            onChange={(event) => {
                                const value = event.currentTarget.valueAsNumber;
                                onChange(
                                    field,
                                    Number.isFinite(value) ? value : null,
                                );
                            }}
                            className={inputClass}
                        />
                        {errors[field] && (
                            <p
                                id={`final-${field}-error`}
                                className="mt-1 text-sm text-red-700"
                            >
                                {errors[field]}
                            </p>
                        )}
                    </div>
                ))}
                <button
                    type="submit"
                    disabled={processing || unchanged}
                    className={`col-span-2 justify-self-start ${buttonClass}`}
                >
                    {published
                        ? 'Ispravi konačni rezultat'
                        : 'Objavi konačni rezultat'}
                </button>
            </div>
        </form>
    );
}
