import { Link } from '@inertiajs/react';
import { LoaderCircle, Search, SearchX } from 'lucide-react';
import {
    type Dispatch,
    type SetStateAction,
    useEffect,
    useRef,
    useState,
} from 'react';
import { show } from '@/actions/App/Http/Controllers/PlayerController';
import { cn } from '@/lib/utils';

type PlayerResult = {
    id: number;
    first_name: string;
    last_name: string;
};

type SearchComponentProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    searchButtonRef: React.RefObject<HTMLButtonElement | null>;
};

export default function SearchComponent({
    open,
    setOpen,
    searchButtonRef,
}: SearchComponentProps) {
    const [searchValue, setSearchValue] = useState('');
    const [players, setPlayers] = useState<PlayerResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    const query = searchValue.trim();
    const canSearch = query.length >= 3;

    useEffect(() => {
        if (!open) {
            setPlayers([]);
            setLoading(false);
            setError(false);
            setShowResults(false);
            return;
        }

        if (!canSearch) {
            setPlayers([]);
            setLoading(false);
            setError(false);

            // Keep showResults unchanged so the hint doesn't flicker.
            return;
        }

        const controller = new AbortController();

        setError(false);

        const timeoutId = window.setTimeout(async () => {
            setLoading(true);

            try {
                const response = await fetch(
                    `/igrac/search?q=${encodeURIComponent(query)}`,
                    {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            'X-Requested-With': 'XMLHttpRequest',
                        },
                        signal: controller.signal,
                    },
                );

                if (!response.ok) {
                    throw new Error('Player search failed.');
                }

                const data: { players: PlayerResult[] } = await response.json();

                setPlayers(data.players);
            } catch (err) {
                if (err instanceof Error && err.name === 'AbortError') {
                    return;
                }

                setPlayers([]);
                setError(true);
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }, 300);

        return () => {
            window.clearTimeout(timeoutId);
            controller.abort();
        };
    }, [query, canSearch, open]);

    useEffect(() => {
        if (!open) return;

        function handlePointerDown(event: PointerEvent) {
            const target = event.target as Node;

            if (
                containerRef.current?.contains(target) ||
                searchButtonRef.current?.contains(target)
            ) {
                return;
            }

            setShowResults(false);
            setSearchValue('');
            setPlayers([]);
            setOpen(false);
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setShowResults(false);
                setSearchValue('');
                setPlayers([]);
                setOpen(false);
            }
        }

        document.addEventListener('pointerdown', handlePointerDown);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [open, searchButtonRef, setOpen]);

    return (
        <div
            ref={containerRef}
            className={cn(
                'absolute top-full right-0 z-1000 w-full min-w-0',
                'rounded-2xl border border-likar3 bg-likar1 shadow-xl',
                'transition-all duration-200 md:top-19 md:w-96',
                open
                    ? 'visible translate-y-0 opacity-100'
                    : 'pointer-events-none invisible -translate-y-2 opacity-0',
            )}
        >
            <form
                className="flex items-center gap-2 p-2"
                onSubmit={(event) => event.preventDefault()}
                role="search"
            >
                <label htmlFor="player-search" className="sr-only">
                    Search for a player
                </label>

                <input
                    id="player-search"
                    type="search"
                    className={cn(
                        'min-w-0 flex-1 rounded-xl border-none',
                        'bg-slate-100 px-3 py-2.5 font-text text-slate-900',
                        'outline-none placeholder:text-slate-500',
                        'focus-visible:ring-2 focus-visible:ring-likar3',
                    )}
                    placeholder="Traži igrača..."
                    value={searchValue}
                    onChange={(event) => {
                        setSearchValue(event.target.value);
                        setShowResults(true);
                    }}
                    onFocus={() => {
                        if (canSearch) setShowResults(true);
                    }}
                    autoComplete="off"
                    aria-autocomplete="list"
                    aria-controls="player-search-results"
                    aria-expanded={open && showResults && canSearch}
                />

                <button
                    type="submit"
                    aria-label="Search players"
                    className="flex shrink-0 items-center justify-center rounded-xl bg-likar4 p-2.5 text-slate-100 transition-colors hover:bg-likar2"
                >
                    <Search className="h-5 w-5" />
                </button>
            </form>

            {open && showResults && (
                <div
                    id="player-search-results"
                    className="border-t border-likar3/50"
                >
                    {!canSearch ? (
                        <p className="px-4 py-3 text-sm text-slate-300">
                            Unesi najmanje 3 slova za pretragu.
                        </p>
                    ) : loading ? (
                        <div
                            className="flex items-center gap-2 px-4 py-4 text-sm text-slate-300"
                            role="status"
                        >
                            <LoaderCircle className="h-4 w-4 animate-spin" />
                            Tražim igrače...
                        </div>
                    ) : error ? (
                        <p
                            className="px-4 py-3 text-sm text-red-300"
                            role="alert"
                        >
                            Pretraga trenutno nije dostupna. Pokušaj ponovno.
                        </p>
                    ) : players.length === 0 ? (
                        <div className="flex items-center gap-2 px-4 py-4 text-sm text-slate-300">
                            <SearchX className="h-4 w-4 shrink-0" />
                            Nema pronađenih igrača.
                        </div>
                    ) : (
                        <ul className="scrollbar-slate max-h-80 overflow-y-auto overscroll-contain py-1">
                            {players.map((player) => (
                                <li key={player.id}>
                                    <Link
                                        href={show(player.id)}
                                        className={cn(
                                            'block px-4 py-3 font-text text-slate-100',
                                            'transition-colors hover:bg-likar2/70',
                                            'focus-visible:bg-likar2/70 focus-visible:outline-none',
                                        )}
                                        onClick={() => {
                                            setShowResults(false);
                                            setSearchValue('');
                                            setPlayers([]);
                                            setOpen(false);
                                        }}
                                    >
                                        <span className="block font-semibold">
                                            {player.first_name}{' '}
                                            {player.last_name}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}
