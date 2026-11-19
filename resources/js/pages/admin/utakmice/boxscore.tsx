import type { Page } from '@inertiajs/core';
import { Head, Link, router, useForm } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import GameFinalScoreForm from '@/components/admin/game-final-score-form';
import GamePeriodFields from '@/components/admin/game-period-fields';
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
} from '@/components/myComponents/stranice/admin/utakmice/types';
import type {
    EditorLine,
    NamedGameData,
    PeriodScoreDraft,
    PlayerLine,
    RosterPlayer,
} from '@/types/admin-games';

type Props = {
    game: NamedGameData;
    roster: RosterPlayer[];
    players: PlayerLine[];
    hasDraft: boolean;
    hasPublishedPeriods: boolean;
    periods: PeriodScoreDraft[];
};
type SaveIntent = 'total' | 'score' | 'draft' | 'publish';
export default function Boxscore(props: Props) {
    return <BoxscoreEditor key={props.game.id} {...props} />;
}

function editorRoster({ roster, players }: Pick<Props, 'roster' | 'players'>) {
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

    return displayedRoster;
}

function editorData(props: Props) {
    return {
        revision: props.game.revision,
        home_score:
            props.game.status === 'finished' ? props.game.home_score : null,
        away_score:
            props.game.status === 'finished' ? props.game.away_score : null,
        periods: props.periods,
        players: editorRoster(props).map((player): EditorLine => {
            const saved = props.players.find(
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
    };
}

function BoxscoreEditor(props: Props) {
    const { game, hasDraft, hasPublishedPeriods } = props;
    const canEditTotal = !hasPublishedPeriods && !game.has_boxscore;
    const totalOnlyPublished = canEditTotal && game.status === 'finished';
    const displayedRoster = editorRoster(props);
    const form = useForm(editorData(props));

    function refreshSavedData(page: Page, intent: SaveIntent | 'discard') {
        // Every successful mutation redirects back to this same typed editor page.
        const saved = editorData((page as Page<Props>).props);
        form.setDefaults(saved);
        // Keep inputs that this button did not send. Defaults stay at the server
        // values, so genuinely unsaved edits still trigger the leave-page warning.
        form.setData({
            ...saved,
            ...(intent === 'total' ? { periods: form.data.periods } : {}),
            ...(intent === 'total' || intent === 'score'
                ? { players: form.data.players }
                : {}),
            ...(intent === 'draft'
                ? {
                      home_score: form.data.home_score,
                      away_score: form.data.away_score,
                  }
                : {}),
        });
    }
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
    const quarterHomeScore = form.data.periods.reduce(
        (sum, row) => sum + (row.home_score ?? 0),
        0,
    );
    const quarterAwayScore = form.data.periods.reduce(
        (sum, row) => sum + (row.away_score ?? 0),
        0,
    );
    let preview = `${homeScore} : ${awayScore}`;
    let previewLabel = 'Zbroj poena igrača';
    if (totalOnlyPublished) {
        preview = `${game.home_score} : ${game.away_score}`;
        previewLabel = 'Konačni rezultat';
    } else if (form.data.periods.length > 0) {
        preview = `${quarterHomeScore} : ${quarterAwayScore}`;
        previewLabel = 'Zbroj četvrtina';
    } else if (
        canEditTotal &&
        (form.data.home_score !== null || form.data.away_score !== null)
    ) {
        preview = `${form.data.home_score ?? '–'} : ${form.data.away_score ?? '–'}`;
        previewLabel = 'Unos konačnog rezultata';
    }
    function save(intent: SaveIntent) {
        if (intent !== 'draft') {
            const question = {
                total: `Objaviti konačni rezultat ${game.home_name} ${form.data.home_score} : ${form.data.away_score} ${game.away_name}? Četvrtine i statistika neće se objaviti.`,
                score: `Objaviti rezultat ${quarterHomeScore} : ${quarterAwayScore} po četvrtinama? Statistika igrača neće se objaviti.`,
                publish: `Objaviti cijeli zapisnik s rezultatom ${homeScore} : ${awayScore}?`,
            }[intent];
            if (!window.confirm(question)) return;
        }
        form.transform((data) => {
            if (intent === 'total') {
                return {
                    revision: data.revision,
                    intent,
                    home_score: data.home_score,
                    away_score: data.away_score,
                };
            }
            const result = {
                revision: data.revision,
                intent,
                periods: data.periods,
            };
            if (intent === 'score') return result;

            return {
                ...result,
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
            };
        });
        form.put(`${base}/${game.id}/boxscore`, {
            preserveScroll: true,
            onSuccess: (page) => refreshSavedData(page, intent),
        });
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
                            {preview}
                        </p>
                        <p className="mt-2 text-xs text-slate-400">
                            {previewLabel}
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
                    {game.status === 'finished' && !game.has_boxscore
                        ? ' · Statistika igrača još nije objavljena'
                        : ''}
                </p>
            </div>
            <FormErrors errors={form.errors} />
            {canEditTotal && (
                <GameFinalScoreForm
                    homeName={game.home_name}
                    awayName={game.away_name}
                    scores={form.data}
                    errors={form.errors}
                    processing={form.processing}
                    published={totalOnlyPublished}
                    unchanged={
                        totalOnlyPublished &&
                        form.data.home_score === game.home_score &&
                        form.data.away_score === game.away_score
                    }
                    onChange={(field, value) => form.setData(field, value)}
                    onPublish={() => save('total')}
                />
            )}
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm leading-relaxed text-blue-950">
                <strong>
                    Četvrtine možete objaviti prije statistike igrača.
                </strong>{' '}
                Unesite ih i odaberite „Objavi četvrtine”. Za cijeli zapisnik
                označite igrače koji su nastupili, a zatim unesite statistiku;
                poeni, skokovi, EFF i ekipni zbrojevi računaju se automatski.
                MIN su cijele minute, +/− se unosi ručno. Pokušaji uključuju i
                pogođene šuteve. Neoznačeni igrači ne ulaze u statistiku
                nastupa.
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    save('draft');
                }}
                className="space-y-6"
            >
                <GamePeriodFields
                    periods={form.data.periods}
                    homeName={game.home_name}
                    awayName={game.away_name}
                    homeScore={homeScore}
                    awayScore={awayScore}
                    disabled={form.processing}
                    errors={form.errors}
                    onChange={(value) => form.setData('periods', value)}
                />
                {form.data.periods.length > 0 && (
                    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-orange-200 bg-orange-50 p-4">
                        <p className="max-w-2xl text-sm leading-relaxed text-slate-700">
                            Sve četiri četvrtine i eventualni produžeci dovoljni
                            su za objavu konačnog rezultata. Unos igrača ostaje
                            u obrascu; za nastavak kasnije spremite ga kao
                            nacrt.
                        </p>
                        <button
                            type="button"
                            disabled={form.processing}
                            className={buttonClass}
                            onClick={() => save('score')}
                        >
                            Objavi četvrtine
                        </button>
                    </div>
                )}
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
                                      ? game.has_boxscore
                                          ? 'Objavljeni zapisnik'
                                          : 'Rezultat objavljen · statistika čeka unos'
                                      : 'Spremno za unos'}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                            Nacrt sprema samo četvrtine i unos igrača. Ne
                            mijenja javni rezultat.
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
                                        revision: form.data.revision,
                                    }));
                                    form.delete(
                                        `${base}/${game.id}/boxscore/draft`,
                                        {
                                            preserveScroll: true,
                                            onSuccess: (page) =>
                                                refreshSavedData(
                                                    page,
                                                    'discard',
                                                ),
                                        },
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
                                ? game.has_boxscore
                                    ? 'Objavi ispravak'
                                    : 'Objavi statistiku'
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
