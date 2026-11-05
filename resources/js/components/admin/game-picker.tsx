import { useEffect, useId, useState } from 'react';
import { index } from '@/actions/App/Http/Controllers/Admin/ArticleGameController';
import type { GameOption, GameSearchResult } from '@/types/games';

export default function GamePicker({
    onSelect,
}: {
    onSelect: (game: GameOption) => void;
}) {
    const inputId = useId();
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [result, setResult] = useState<GameSearchResult>({
        data: [],
        current_page: 1,
        last_page: 1,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const controller = new AbortController();
        const timer = window.setTimeout(async () => {
            try {
                const response = await fetch(
                    index({ query: { search, page } }).url,
                    {
                        signal: controller.signal,
                        headers: { Accept: 'application/json' },
                        credentials: 'same-origin',
                    },
                );
                if (!response.ok)
                    throw new Error(
                        'Utakmice nije moguće učitati. Provjerite prijavu i pokušajte ponovno.',
                    );
                const data: GameSearchResult = await response.json();
                if (!Array.isArray(data.data))
                    throw new Error('Odgovor poslužitelja nije ispravan.');
                if (!controller.signal.aborted) {
                    setResult(data);
                    setError('');
                    setLoading(false);
                }
            } catch (reason) {
                if (!controller.signal.aborted) {
                    setError(
                        reason instanceof Error
                            ? reason.message
                            : 'Pogreška pri učitavanju.',
                    );
                    setLoading(false);
                }
            }
        }, 250);
        return () => {
            window.clearTimeout(timer);
            controller.abort();
        };
    }, [search, page]);

    function changePage(next: number) {
        setLoading(true);
        setPage(next);
    }

    return (
        <div className="space-y-3">
            <label htmlFor={inputId} className="block text-sm font-medium">
                Pretraži po ekipi, sezoni ili ID-u utakmice
            </label>
            <input
                id={inputId}
                value={search}
                onChange={(event) => {
                    setSearch(event.target.value);
                    setPage(1);
                    setLoading(true);
                }}
                className="w-full rounded-lg border p-2.5"
                type="search"
                placeholder="npr. Sabunjar, 2025-2026 ili 123"
            />
            {loading && (
                <p role="status" className="text-sm text-muted-foreground">
                    Učitavanje utakmica…
                </p>
            )}
            {error && (
                <p role="alert" className="text-sm text-red-500">
                    {error}
                </p>
            )}
            {!loading && !error && result.data.length === 0 && (
                <p className="py-6 text-center text-sm text-muted-foreground">
                    Nema utakmica za ovaj upit.
                </p>
            )}
            {!error && (
                <ul
                    className="max-h-72 space-y-2 overflow-y-auto"
                    aria-busy={loading}
                >
                    {result.data.map((game) => (
                        <li key={game.id}>
                            <button
                                type="button"
                                disabled={loading}
                                onClick={() => onSelect(game)}
                                className="w-full rounded-lg border p-3 text-left text-sm transition-colors hover:border-likar3 hover:bg-likar3/10 focus-visible:outline-2 focus-visible:outline-likar3 disabled:opacity-40"
                            >
                                {game.label}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <div className="flex items-center justify-between gap-3 text-sm">
                <button
                    type="button"
                    onClick={() => changePage(page - 1)}
                    disabled={loading || page <= 1}
                    className="rounded border px-3 py-2 disabled:opacity-40"
                >
                    Prethodna
                </button>
                <span>
                    {result.current_page} / {result.last_page}
                </span>
                <button
                    type="button"
                    onClick={() => changePage(page + 1)}
                    disabled={loading || page >= result.last_page}
                    className="rounded border px-3 py-2 disabled:opacity-40"
                >
                    Sljedeća
                </button>
            </div>
        </div>
    );
}
