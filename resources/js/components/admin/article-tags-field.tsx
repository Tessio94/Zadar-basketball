import { X } from 'lucide-react';
import type { ArticleTag } from '@/types/tags';

type ArticleTagsFieldProps = {
    value: string;
    onChange: (value: string) => void;
    options: ArticleTag[];
    error?: string;
};

export default function ArticleTagsField({
    value,
    onChange,
    options,
    error,
}: ArticleTagsFieldProps) {
    const names = value
        .split(',')
        .map((name) => name.trim().replace(/\s+/g, ' '))
        .filter(Boolean);
    const unique = [
        ...new Map(names.map((name) => [name.toLowerCase(), name])).values(),
    ];
    const available = options.filter(
        (tag) =>
            !unique.some(
                (name) => name.toLowerCase() === tag.name.toLowerCase(),
            ),
    );

    return (
        <div className="space-y-3 rounded-xl border p-4">
            <label htmlFor="article-tags" className="block font-semibold">
                Oznake članka{' '}
                <span className="font-normal text-muted-foreground">
                    (neobavezno)
                </span>
            </label>
            <input
                id="article-tags"
                type="text"
                value={value}
                maxLength={2000}
                onChange={(event) => onChange(event.target.value)}
                placeholder="2025-2026, KK Vodovod Ballers, Doigravanje"
                aria-describedby={`article-tags-help${error ? ' article-tags-error' : ''}`}
                aria-invalid={!!error}
                className="w-full rounded-lg border bg-background p-2.5"
            />
            <p id="article-tags-help" className="text-sm text-muted-foreground">
                Odvojite oznake zarezom. Najviše 10 oznaka, do 60 znakova po
                oznaci. Klik na oznaku u članku vodi na povezane vijesti.
            </p>
            {unique.length > 0 && (
                <ul
                    aria-label="Unesene oznake"
                    className="flex flex-wrap gap-2"
                >
                    {unique.map((name) => (
                        <li
                            key={name.toLowerCase()}
                            className="flex max-w-full items-center gap-1 rounded-full border bg-muted py-1 pr-1 pl-3 text-sm"
                        >
                            <span className="break-words">{name}</span>
                            <button
                                type="button"
                                aria-label={`Ukloni oznaku ${name}`}
                                className="shrink-0 rounded-full p-2 hover:bg-background focus-visible:outline-2 focus-visible:outline-likar3"
                                onClick={() =>
                                    onChange(
                                        names
                                            .filter(
                                                (item) =>
                                                    item.toLowerCase() !==
                                                    name.toLowerCase(),
                                            )
                                            .join(', '),
                                    )
                                }
                            >
                                <X className="size-4" aria-hidden="true" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {available.length > 0 && (
                <div>
                    <label htmlFor="existing-article-tag" className="sr-only">
                        Dodaj postojeću oznaku
                    </label>
                    <select
                        id="existing-article-tag"
                        value=""
                        className="w-full rounded-lg border bg-background p-2.5"
                        onChange={(event) => {
                            if (event.target.value)
                                onChange(
                                    [...names, event.target.value].join(', '),
                                );
                        }}
                    >
                        <option value="">Dodaj postojeću oznaku…</option>
                        {available.map((tag) => (
                            <option key={tag.id} value={tag.name}>
                                {tag.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            {error && (
                <p
                    id="article-tags-error"
                    role="alert"
                    className="text-sm text-red-500"
                >
                    {error}
                </p>
            )}
        </div>
    );
}
