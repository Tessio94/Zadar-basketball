import { Head, Link, router } from '@inertiajs/react';
import { CalendarDays, Plus } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import GameAdminShell, {
    FormErrors,
} from '@/components/myComponents/stranice/admin/utakmice/gameAdminShell';
import {
    base,
    buttonClass,
    inputClass,
    type GameData,
    type SeasonOption,
} from '@/components/myComponents/stranice/admin/utakmice/types';

type Props = {
    games: {
        data: (GameData & { has_draft: boolean })[];
        current_page: number;
        last_page: number;
        prev_page_url: string | null;
        next_page_url: string | null;
        total: number;
    };
    seasons: SeasonOption[];
    filters: { season_id?: string; status?: string };
};
export default function Games({ games, seasons, filters }: Props) {
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [deleting, setDeleting] = useState<number | null>(null);
    function filter(key: string, value: string) {
        router.get(
            base,
            { ...filters, [key]: value },
            { preserveState: true, replace: true },
        );
    }
    return (
        <GameAdminShell title="Utakmice">
            <Head title="Admin | Utakmice" />
            <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-slate-500">
                    Raspored, rezultati i zapisnici na jednom mjestu.
                </p>
                <Link className={buttonClass} href={`${base}/create`}>
                    <Plus size={18} />
                    Nova utakmica
                </Link>
            </div>
            <div className="grid gap-4 rounded-2xl border bg-white p-4 sm:grid-cols-2">
                <label className="space-y-1">
                    <span className="text-sm font-medium">Sezona</span>
                    <select
                        className={inputClass}
                        value={filters.season_id ?? ''}
                        onChange={(e) => filter('season_id', e.target.value)}
                    >
                        <option value="">Sve sezone</option>
                        {seasons.map((s) => (
                            <option value={s.id} key={s.id}>
                                {s.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="space-y-1">
                    <span className="text-sm font-medium">Status</span>
                    <select
                        className={inputClass}
                        value={filters.status ?? ''}
                        onChange={(e) => filter('status', e.target.value)}
                    >
                        <option value="">Sve utakmice</option>
                        <option value="scheduled">Zakazane</option>
                        <option value="finished">Završene</option>
                    </select>
                </label>
            </div>
            <FormErrors errors={errors} />
            <div className="overflow-x-auto rounded-2xl border bg-white">
                <table className="w-full min-w-[760px] text-sm">
                    <thead className="bg-slate-950 text-left text-white">
                        <tr>
                            {[
                                'Utakmica',
                                'Termin / kolo',
                                'Status',
                                'Upravljanje',
                            ].map((s) => (
                                <th className="p-4" key={s}>
                                    {s}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {games.data.map((game) => (
                            <tr key={game.id} className="border-t">
                                <td className="p-4">
                                    <p className="mb-1 text-xs text-slate-500">
                                        {game.season_name}
                                        {game.playoff_id
                                            ? ' · Doigravanje'
                                            : ''}
                                    </p>
                                    <p className="font-semibold">
                                        {game.home_name}{' '}
                                        <span className="px-2 text-orange-600">
                                            {game.status === 'finished'
                                                ? `${game.home_score} : ${game.away_score}`
                                                : 'VS'}
                                        </span>{' '}
                                        {game.away_name}
                                    </p>
                                </td>
                                <td className="p-4">
                                    <p>{game.game_date.replace('T', ' ')}</p>
                                    <p className="mt-1 text-xs text-slate-500">
                                        {game.round_number}. kolo
                                    </p>
                                </td>
                                <td className="p-4">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${game.status === 'finished' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'}`}
                                    >
                                        {game.status === 'finished'
                                            ? 'Završena'
                                            : 'Zakazana'}
                                    </span>
                                    {game.has_draft && (
                                        <p className="mt-2 text-xs text-amber-700">
                                            Spremljen nacrt
                                        </p>
                                    )}
                                </td>
                                <td className="p-4">
                                    <div className="flex flex-wrap gap-2">
                                        <Link
                                            className="rounded-lg bg-orange-50 px-3 py-2 font-semibold text-orange-700"
                                            href={`${base}/${game.id}/boxscore`}
                                        >
                                            Zapisnik
                                        </Link>
                                        <Link
                                            className="rounded-lg border px-3 py-2"
                                            href={`${base}/${game.id}/edit`}
                                        >
                                            Raspored
                                        </Link>
                                        <button
                                            disabled={deleting !== null}
                                            type="button"
                                            className="rounded-lg px-3 py-2 text-red-600 disabled:opacity-50"
                                            onClick={() => {
                                                if (
                                                    !confirm(
                                                        `Izbrisati ${game.home_name} – ${game.away_name}? Brišu se i sva statistika te nacrt. Ovo mijenja javne rezultate.`,
                                                    )
                                                )
                                                    return;
                                                setDeleting(game.id);
                                                setErrors({});
                                                router.delete(
                                                    `${base}/${game.id}`,
                                                    {
                                                        data: {
                                                            revision:
                                                                game.revision,
                                                        },
                                                        onError: setErrors,
                                                        onFinish: () =>
                                                            setDeleting(null),
                                                    },
                                                );
                                            }}
                                        >
                                            Izbriši
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {!games.data.length && (
                    <div className="flex flex-col items-center gap-3 p-12 text-center">
                        <CalendarDays className="text-orange-500" size={36} />
                        <h2 className="font-semibold">
                            Nema utakmica za odabrane filtre.
                        </h2>
                        <p className="text-sm text-slate-500">
                            Promijenite filtre ili dodajte prvu utakmicu.
                        </p>
                    </div>
                )}
            </div>
            <nav
                aria-label="Stranice utakmica"
                className="flex items-center justify-between gap-3 text-sm"
            >
                <span>
                    {games.total} utakmica · Stranica {games.current_page} /{' '}
                    {games.last_page}
                </span>
                <div className="flex gap-3">
                    {games.prev_page_url && (
                        <Link
                            className="rounded-lg border px-4 py-2"
                            href={games.prev_page_url}
                        >
                            Prethodna
                        </Link>
                    )}
                    {games.next_page_url && (
                        <Link
                            className="rounded-lg border px-4 py-2"
                            href={games.next_page_url}
                        >
                            Sljedeća
                        </Link>
                    )}
                </div>
            </nav>
        </GameAdminShell>
    );
}

// The admin shell is rendered above; bypass app.tsx's default public layout.
Games.layout = (page: ReactNode) => page;
