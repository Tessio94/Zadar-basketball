import { Link } from '@inertiajs/react';
import { ArrowUpRight, Trophy } from 'lucide-react';
import PeriodScoreTable from '@/components/games/period-score-table';
import { publicImageUrl } from '@/lib/article-media';
import type { GameSummary, ScoreTeam } from '@/types/games';

function TeamHeading({ team }: { team: ScoreTeam }) {
    const logo = publicImageUrl(team.logo);
    return (
        <div className="flex min-w-0 flex-col items-center gap-3 text-center">
            {logo ? (
                <img
                    src={logo}
                    alt=""
                    loading="lazy"
                    className="h-14 w-14 rounded-xl bg-white/5 object-contain p-1 sm:h-18 sm:w-18"
                />
            ) : (
                <Trophy
                    aria-hidden="true"
                    className="h-14 w-14 p-3 text-slate-400"
                />
            )}
            <span className="text-sm leading-snug font-semibold text-slate-100 sm:text-base">
                {team.name}
            </span>
        </div>
    );
}

export default function ArticleGameCard({ game }: { game: GameSummary }) {
    const scheduled = game.status === 'scheduled';
    const status =
        game.status === 'finished'
            ? 'Konačni rezultat'
            : scheduled
              ? 'Najava utakmice'
              : 'Utakmica u tijeku / prekidu';

    return (
        <section
            className="my-6 overflow-hidden rounded-2xl border border-likar3/30 bg-slate-950/50 font-text shadow-lg"
            aria-label={`Utakmica: ${game.home_team.name} — ${game.away_team.name}`}
        >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-4 py-3 text-xs text-slate-400">
                <span>
                    {game.season_name} · {game.round_number}. kolo
                </span>
                <span className="rounded-full bg-likar3/10 px-2.5 py-1 font-semibold text-likar3">
                    {status}
                </span>
            </div>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-6 sm:gap-5">
                <TeamHeading team={game.home_team} />
                <div className="text-center">
                    <p className="font-heading text-3xl font-bold tracking-tight text-white tabular-nums sm:text-4xl">
                        {scheduled
                            ? 'VS'
                            : `${game.home_score} : ${game.away_score}`}
                    </p>
                    <time
                        dateTime={game.game_date}
                        className="mt-2 block text-xs text-slate-400"
                    >
                        {game.game_date
                            .slice(0, 10)
                            .split('-')
                            .reverse()
                            .join('. ')}
                    </time>
                </div>
                <TeamHeading team={game.away_team} />
            </div>
            {!scheduled && (
                <PeriodScoreTable
                    periods={game.period_scores}
                    homeName={game.home_team.short_name ?? game.home_team.name}
                    awayName={game.away_team.short_name ?? game.away_team.name}
                    homeScore={game.home_score}
                    awayScore={game.away_score}
                    status={game.status}
                />
            )}
            {!scheduled && (
                <details open className="border-t border-white/10 px-4 py-3">
                    <summary className="cursor-pointer text-sm font-semibold text-slate-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-likar3">
                        Strijelci i poeni
                    </summary>
                    <div className="mt-4 grid gap-5 sm:grid-cols-2">
                        {[game.home_team, game.away_team].map((team) => {
                            const scorers = game.scorers.filter(
                                (player) => player.team_id === team.id,
                            );
                            return (
                                <div key={team.id}>
                                    <p className="mb-2 text-xs font-bold text-likar3 uppercase">
                                        {team.short_name ?? team.name}
                                    </p>
                                    {scorers.length ? (
                                        <table className="w-full text-sm">
                                            <caption className="sr-only">
                                                {team.name}: poeni igrača
                                            </caption>
                                            <thead className="text-xs text-slate-400">
                                                <tr>
                                                    <th
                                                        scope="col"
                                                        className="pb-2 text-left font-normal"
                                                    >
                                                        Igrač
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="pb-2 text-right font-normal"
                                                    >
                                                        PTS
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {scorers.map((player) => (
                                                    <tr
                                                        key={player.player_id}
                                                        className="border-t border-white/5"
                                                    >
                                                        <td className="py-2 pr-3">
                                                            <Link
                                                                href={
                                                                    player.url
                                                                }
                                                                className="text-slate-200 hover:text-white hover:underline"
                                                            >
                                                                {player.name}
                                                            </Link>
                                                        </td>
                                                        <td className="py-2 text-right font-semibold text-white tabular-nums">
                                                            {player.points}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    ) : (
                                        <p className="text-sm text-slate-400">
                                            Statistika igrača još nije unesena.
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </details>
            )}
            <Link
                href={game.url}
                className="flex items-center justify-between gap-3 border-t border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition-colors hover:bg-likar3/15 focus-visible:outline-2 focus-visible:outline-likar3"
            >
                Cijeli zapisnik utakmice{' '}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
        </section>
    );
}
