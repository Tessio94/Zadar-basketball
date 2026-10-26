import { Head, Link, useForm } from '@inertiajs/react';
import type { ReactNode } from 'react';
import GameAdminShell, {
    FormErrors,
} from '@/components/myComponents/stranice/admin/utakmice/gameAdminShell';
import {
    base,
    buttonClass,
    inputClass,
} from '@/components/myComponents/stranice/admin/utakmice/types';
import type { GameData, SeasonOption } from '@/types/admin-games';
import type { GameScheduleForm } from '@/types/admin-games';

type Props = {
    game: GameData | null;
    locked: boolean;
    seasons: SeasonOption[];
    teams: { id: number; season_id: number; name: string }[];
    playoffs: { id: number; season_id: number; name: string }[];
    timezone: string;
};
export default function GameForm(props: Props) {
    // Remount only after a successful server revision; failed validation preserves entered fields.
    return (
        <ScheduleEditor
            key={`${props.game?.id ?? 'new'}:${props.game?.revision ?? 0}`}
            {...props}
        />
    );
}
function ScheduleEditor({
    game,
    locked,
    seasons,
    teams,
    playoffs,
    timezone,
}: Props) {
    const form = useForm<GameScheduleForm>({
        season_id: String(
            game?.season_id ??
                seasons.find((s) => s.is_active)?.id ??
                seasons[0]?.id ??
                '',
        ),
        home_team_id: String(game?.home_team_id ?? ''),
        away_team_id: String(game?.away_team_id ?? ''),
        game_date: game?.game_date ?? '',
        round_number: String(game?.round_number ?? 1),
        playoff_id: String(game?.playoff_id ?? ''),
        playoff_round: game?.playoff_round ?? '',
        revision: game?.revision ?? 0,
    });
    const availableTeams = teams.filter(
        (t) => t.season_id === Number(form.data.season_id),
    );
    const availablePlayoffs = playoffs.filter(
        (p) => p.season_id === Number(form.data.season_id),
    );
    const title = game ? 'Uredi raspored' : 'Nova utakmica';
    return (
        <GameAdminShell title={title}>
            <Head title={title} />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (game)
                        form.put(`${base}/${game.id}`, {
                            preserveScroll: true,
                        });
                    else form.post(base);
                }}
                className="max-w-4xl space-y-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-8"
            >
                <div>
                    <p className="text-xs font-bold tracking-widest text-orange-600 uppercase">
                        01 / Raspored
                    </p>
                    <h2 className="mt-2 text-xl font-semibold">
                        Tko igra i kada?
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Rezultat i statistiku unosite u zasebnom zapisniku.
                    </p>
                </div>
                <FormErrors errors={form.errors} />
                {locked && (
                    <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
                        Utakmica već ima zapisnik. Možete urediti termin i kolo;
                        ekipe, sezonu i fazu natjecanja čuvamo radi ispravnosti
                        statistike.
                    </p>
                )}
                <div className="grid gap-5 sm:grid-cols-2">
                    <label className="space-y-2 sm:col-span-2">
                        <span className="font-medium">Sezona</span>
                        <select
                            required
                            disabled={locked || form.processing}
                            className={inputClass}
                            value={form.data.season_id}
                            onChange={(e) =>
                                form.setData({
                                    ...form.data,
                                    season_id: e.target.value,
                                    home_team_id: '',
                                    away_team_id: '',
                                    playoff_id: '',
                                    playoff_round: '',
                                })
                            }
                        >
                            <option value="">Odaberite sezonu</option>
                            {seasons.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    {(['home_team_id', 'away_team_id'] as const).map(
                        (field, index) => (
                            <label key={field} className="space-y-2">
                                <span className="font-medium">
                                    {index === 0 ? 'Domaćin' : 'Gost'}
                                </span>
                                <select
                                    required
                                    disabled={locked || form.processing}
                                    className={inputClass}
                                    value={form.data[field]}
                                    onChange={(e) =>
                                        form.setData(field, e.target.value)
                                    }
                                >
                                    <option value="">Odaberite ekipu</option>
                                    {!availableTeams.some(
                                        (t) =>
                                            String(t.id) === form.data[field],
                                    ) &&
                                        form.data[field] && (
                                            <option value={form.data[field]}>
                                                Ekipa #{form.data[field]} (izvan
                                                popisa sezone)
                                            </option>
                                        )}
                                    {availableTeams.map((t) => (
                                        <option
                                            key={t.id}
                                            value={t.id}
                                            disabled={
                                                String(t.id) ===
                                                form.data[
                                                    index === 0
                                                        ? 'away_team_id'
                                                        : 'home_team_id'
                                                ]
                                            }
                                        >
                                            {t.name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        ),
                    )}
                    <label className="space-y-2">
                        <span className="font-medium">Datum i vrijeme</span>
                        <input
                            required
                            disabled={form.processing}
                            type="datetime-local"
                            className={inputClass}
                            value={form.data.game_date}
                            onChange={(e) =>
                                form.setData('game_date', e.target.value)
                            }
                        />
                        <span className="text-xs text-slate-500">
                            Vremenska zona aplikacije: {timezone}
                        </span>
                    </label>
                    <label className="space-y-2">
                        <span className="font-medium">Kolo</span>
                        <input
                            required
                            disabled={form.processing}
                            type="number"
                            min="1"
                            max="1000"
                            className={inputClass}
                            value={form.data.round_number}
                            onChange={(e) =>
                                form.setData('round_number', e.target.value)
                            }
                        />
                    </label>
                    <label className="space-y-2">
                        <span className="font-medium">Natjecanje</span>
                        <select
                            disabled={locked || form.processing}
                            className={inputClass}
                            value={form.data.playoff_id}
                            onChange={(e) =>
                                form.setData({
                                    ...form.data,
                                    playoff_id: e.target.value,
                                    playoff_round: e.target.value
                                        ? 'quarterfinal'
                                        : '',
                                })
                            }
                        >
                            <option value="">Regularni dio</option>
                            {availablePlayoffs.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    {form.data.playoff_id && (
                        <label className="space-y-2">
                            <span className="font-medium">
                                Faza doigravanja
                            </span>
                            <select
                                disabled={locked || form.processing}
                                required
                                className={inputClass}
                                value={form.data.playoff_round}
                                onChange={(e) =>
                                    form.setData(
                                        'playoff_round',
                                        e.target.value,
                                    )
                                }
                            >
                                <option value="quarterfinal">
                                    Četvrtfinale
                                </option>
                                <option value="semifinal">Polufinale</option>
                                <option value="final">Finale</option>
                            </select>
                        </label>
                    )}
                </div>
                {availableTeams.length < 2 && !locked && (
                    <p className="text-sm text-amber-800">
                        U upravljanju ekipama najprije prijavite barem dvije
                        ekipe u ovu sezonu.
                    </p>
                )}
                <div className="flex flex-wrap gap-3">
                    <button
                        className={buttonClass}
                        disabled={form.processing || !form.data.season_id}
                    >
                        {form.processing
                            ? 'Spremanje…'
                            : game
                              ? 'Spremi raspored'
                              : 'Dodaj utakmicu'}
                    </button>
                    {game && (
                        <Link
                            className="rounded-xl border px-5 py-3 font-medium"
                            href={`${base}/${game.id}/boxscore`}
                        >
                            Otvori zapisnik
                        </Link>
                    )}
                    <Link className="px-5 py-3 text-slate-500" href={base}>
                        Odustani
                    </Link>
                </div>
                {form.recentlySuccessful && (
                    <p role="status" className="text-sm text-emerald-700">
                        Raspored je spremljen.
                    </p>
                )}
            </form>
        </GameAdminShell>
    );
}

// The admin shell is rendered above; bypass app.tsx's default public layout.
GameForm.layout = (page: ReactNode) => page;
