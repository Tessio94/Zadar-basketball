import { Head, Link, router, useForm } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import BoxscoreTeam from '@/components/myComponents/stranice/admin/utakmice/boxscoreTeam';
import GameAdminShell, {
    FormErrors,
} from '@/components/myComponents/stranice/admin/utakmice/gameAdminShell';
import {
    base,
    buttonClass,
    derived,
    emptyLine,
    teamTotal,
    statColumns,
    type EditorLine,
    type GameData,
    type PlayerLine,
    type RosterPlayer,
} from '@/components/myComponents/stranice/admin/utakmice/types';

type Props = {
    game: GameData;
    roster: RosterPlayer[];
    players: PlayerLine[];
    hasDraft: boolean;
};
export default function Boxscore(props: Props) {
    return (
        <BoxscoreEditor
            key={`${props.game.id}:${props.game.revision}`}
            {...props}
        />
    );
}
function BoxscoreEditor({ game, roster, players, hasDraft }: Props) {
    // Also show removed draft participants so the admin can explicitly exclude stale entries.
    const displayedRoster = [...roster];
    for (const row of players)
        if (
            !displayedRoster.some(
                (p) =>
                    p.player_id === row.player_id && p.team_id === row.team_id,
            )
        )
            displayedRoster.push({
                player_id: row.player_id,
                team_id: row.team_id,
                name: `Igrač #${row.player_id}`,
                jersey_number: null,
                on_roster: false,
            });
    const form = useForm({
        revision: game.revision,
        players: displayedRoster.map((player): EditorLine => {
            const saved = players.find(
                (p) =>
                    p.player_id === player.player_id &&
                    p.team_id === player.team_id,
            );
            return {
                ...emptyLine({
                    player_id: player.player_id,
                    team_id: player.team_id,
                }),
                ...saved,
                played: !!saved,
            };
        }),
    });
    useEffect(() => {
        const beforeUnload = (event: BeforeUnloadEvent) => {
            if (form.isDirty && !form.processing) {
                event.preventDefault();
                event.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', beforeUnload);
        const unsubscribe = router.on('before', (event) => {
            if (
                form.isDirty &&
                !form.processing &&
                event.detail.visit.method === 'get' &&
                !window.confirm(
                    'Imate nespremljene promjene u zapisniku. Napustiti stranicu?',
                )
            )
                event.preventDefault();
        });
        return () => {
            window.removeEventListener('beforeunload', beforeUnload);
            unsubscribe();
        };
    }, [form.isDirty, form.processing]);
    const included = form.data.players.filter((row) => row.played);
    const homeScore = derived(
        teamTotal(
            form.data.players.filter((p) => p.team_id === game.home_team_id),
        ),
    ).points;
    const awayScore = derived(
        teamTotal(
            form.data.players.filter((p) => p.team_id === game.away_team_id),
        ),
    ).points;
    function save(intent: 'draft' | 'publish') {
        if (
            intent === 'publish' &&
            !confirm(
                `Objaviti konačan rezultat ${homeScore} : ${awayScore}? Ovo ažurira javni zapisnik i poredak.`,
            )
        )
            return;
        form.transform((data) => ({
            revision: data.revision,
            intent,
            players: data.players
                .filter((p) => p.played)
                .map((row) => ({
                    player_id: row.player_id,
                    team_id: row.team_id,
                    is_starter: row.is_starter,
                    ...Object.fromEntries(
                        statColumns.map(([key]) => [key, row[key]]),
                    ),
                })),
        }));
        form.put(`${base}/${game.id}/boxscore`, { preserveScroll: true });
    }
    function update(
        playerId: number,
        teamId: number,
        patch: Partial<EditorLine>,
    ) {
        form.setData(
            'players',
            form.data.players.map((row) =>
                row.player_id === playerId && row.team_id === teamId
                    ? { ...row, ...patch }
                    : row,
            ),
        );
    }
    return (
        <GameAdminShell title="Zapisnik utakmice">
            <Head title={`Zapisnik | ${game.home_name} – ${game.away_name}`} />
            <div className="rounded-2xl bg-slate-950 p-6 text-white">
                <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-300">
                    <span>
                        {game.season_name} · {game.round_number}. kolo ·{' '}
                        {game.game_date.replace('T', ' ')}
                    </span>
                    <Link
                        href={`${base}/${game.id}/edit`}
                        className="rounded-lg border border-slate-600 px-3 py-2 hover:border-orange-400"
                    >
                        Uredi raspored
                    </Link>
                </div>
                <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-4">
                    <h2 className="text-right text-lg font-semibold sm:text-2xl">
                        {game.home_name}
                    </h2>
                    <div className="text-center">
                        <p className="text-3xl font-bold text-orange-400 tabular-nums sm:text-5xl">
                            {homeScore} : {awayScore}
                        </p>
                        <p className="mt-2 text-xs text-slate-400">
                            Pregled unosa
                        </p>
                    </div>
                    <h2 className="text-lg font-semibold sm:text-2xl">
                        {game.away_name}
                    </h2>
                </div>
                <p className="mt-6 text-center text-xs text-slate-400">
                    {game.status === 'finished'
                        ? `Javno objavljeno: ${game.home_score} : ${game.away_score}`
                        : 'Zakazana utakmica · rezultat još nije objavljen'}
                    {hasDraft ? ' · Postoji spremljen nacrt' : ''}
                </p>
            </div>
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-relaxed text-blue-950">
                <strong>Označite igrače koji su nastupili.</strong> Zatim
                unesite statistiku; poeni, skokovi, EFF i ekipni zbrojevi
                računaju se automatski. MIN su cijele minute, +/− se unosi
                ručno. Pokušaji uključuju i pogođene šuteve. Neoznačeni igrači
                ne ulaze u statistiku nastupa.
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    save('draft');
                }}
                className="space-y-6"
            >
                <FormErrors errors={form.errors} />
                {[
                    {
                        id: game.home_team_id,
                        name: game.home_name ?? 'Domaćin',
                    },
                    { id: game.away_team_id, name: game.away_name ?? 'Gost' },
                ].map((team) => (
                    <BoxscoreTeam
                        key={team.id}
                        name={team.name}
                        teamId={team.id}
                        roster={displayedRoster}
                        rows={form.data.players}
                        submittedRows={included}
                        errors={form.errors}
                        disabled={form.processing}
                        onChange={update}
                    />
                ))}
                <p className="text-xs leading-relaxed text-slate-500">
                    Ukupno +/− zbroj je vrijednosti igrača, a ne razlika
                    rezultata. Ekipna statistika u ovom zapisniku predstavlja
                    zbroj igrača; posebni timski skokovi i timske izgubljene
                    lopte nisu zasebno evidentirani.
                </p>
                <div className="sticky bottom-0 z-20 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg">
                    <div>
                        <p className="font-semibold">
                            {form.processing
                                ? 'Spremanje…'
                                : form.isDirty
                                  ? 'Nespremljene promjene'
                                  : hasDraft
                                    ? 'Nacrt spremljen'
                                    : game.status === 'finished'
                                      ? 'Objavljeni zapisnik'
                                      : 'Spremno za unos'}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                            Nacrt je privatan. Objava mijenja javne rezultate.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {hasDraft && (
                            <button
                                type="button"
                                disabled={form.processing}
                                className="min-h-11 rounded-xl px-4 py-2 text-red-700 disabled:opacity-50"
                                onClick={() => {
                                    if (
                                        !confirm(
                                            'Odbaciti spremljeni nacrt i nespremljene promjene? Objavljeni rezultat ostaje nepromijenjen.',
                                        )
                                    )
                                        return;
                                    form.transform(() => ({
                                        revision: game.revision,
                                    }));
                                    form.delete(
                                        `${base}/${game.id}/boxscore/draft`,
                                        { preserveScroll: true },
                                    );
                                }}
                            >
                                Odbaci nacrt
                            </button>
                        )}
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="min-h-11 rounded-xl border border-slate-300 px-5 py-2 font-semibold disabled:opacity-50"
                        >
                            Spremi nacrt
                        </button>
                        <button
                            type="button"
                            disabled={form.processing}
                            className={buttonClass}
                            onClick={(event) => {
                                if (event.currentTarget.form?.reportValidity())
                                    save('publish');
                            }}
                        >
                            {game.status === 'finished'
                                ? 'Objavi ispravak'
                                : 'Završi i objavi'}
                        </button>
                    </div>
                </div>
            </form>
        </GameAdminShell>
    );
}

// The admin shell is rendered above; bypass app.tsx's default public layout.
Boxscore.layout = (page: ReactNode) => page;
