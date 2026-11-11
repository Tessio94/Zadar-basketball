import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { show as showPlayer } from '@/actions/App/Http/Controllers/PlayerController';
import { show as showTeam } from '@/actions/App/Http/Controllers/TeamController';
import FilterSeason from '@/components/myComponents/common/filter/filterSeason';
import Pagination from '@/components/myComponents/common/pagination/Pagination';
import BasketballPlayerIcon from '@/components/myComponents/ui/icons/basketballPlayer';
import Seo from '@/components/seo';
import type { SeasonLeaderboardPageProps } from '@/types/season-leaderboard';

const numberFormatter = new Intl.NumberFormat('hr-HR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
});

export default function SeasonLeaderboard({
    season,
    category,
    leaders,
    backUrl,
}: SeasonLeaderboardPageProps) {
    const percentage = category.type === 'pcg';
    const headers = percentage
        ? ['Poredak', 'Tim', 'Igrač', 'Ubačaji', 'Pokušaji', 'Prosjek']
        : ['Poredak', 'Tim', 'Igrač', 'Utakmice', 'Ukupno', 'Prosjek'];
    const canonical = `${category.url}${leaders.current_page > 1 ? `&page=${leaders.current_page}` : ''}`;

    return (
        <>
            <Seo
                title={`${category.title} | ${season.name}${leaders.current_page > 1 ? ` | Stranica ${leaders.current_page}` : ''} | Likar Zadar`}
                description={`Poredak igrača LIKAR lige Zadar: ${category.title.toLocaleLowerCase('hr-HR')} za sezonu ${season.name}. Pogledajte ukupne vrijednosti i prosjeke igrača.`}
                url={canonical}
            />
            <section className="px-[5%] py-10 xl:my-5">
                <div className="mx-auto w-full max-w-6xl min-w-0">
                    <Link
                        href={backUrl}
                        className="mb-6 inline-flex items-center gap-2 rounded-sm font-text text-sm text-slate-300 hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-likar3"
                    >
                        <ArrowLeft aria-hidden="true" className="size-4" />
                        Statistika sezone
                    </Link>

                    <header className="mb-6 flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
                        <div className="min-w-0">
                            <p className="mb-2 flex w-fit items-center gap-2 rounded-lg border border-likar3/60 bg-likar4/60 px-3 py-1 font-text text-xs font-semibold tracking-wider text-likar3 uppercase">
                                Poredak igrača · {season.name}
                            </p>
                            <h1 className="font-heading text-3xl leading-tight font-semibold break-words text-slate-100 sm:text-4xl lg:text-5xl">
                                {category.title}
                            </h1>
                        </div>
                        <FilterSeason selectedSeason={season.id} />
                    </header>

                    <div className="rounded-2xl bg-likar1/30 p-3 sm:p-5">
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 font-text text-xs leading-relaxed text-slate-300 sm:text-sm">
                            <p>
                                {percentage
                                    ? 'Poredano prema postotku uspješnosti šuta.'
                                    : 'Poredano prema prosjeku po utakmici.'}
                            </p>
                            <p className="tabular-nums">
                                {leaders.data.length > 0
                                    ? `${leaders.from}–${leaders.to} od ${leaders.total} igrača`
                                    : leaders.total > 0
                                      ? `Ukupno ${leaders.total} igrača`
                                      : 'Nema rezultata'}
                            </p>
                        </div>

                        <div className="relative overflow-hidden rounded-xl border border-likar1 shadow-xl shadow-likar1">
                            <div
                                role="region"
                                aria-label={category.title}
                                tabIndex={0}
                                className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar overflow-x-auto scrollbar-thumb-likar3 scrollbar-track-slate-900 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-likar3"
                            >
                                <table className="w-full min-w-[700px] font-text text-sm sm:text-base">
                                    <caption className="sr-only">
                                        {category.title}, sezona {season.name}.
                                        Stranica {leaders.current_page}.
                                    </caption>
                                    <thead>
                                        <tr className="bg-slate-900 font-heading text-slate-100">
                                            {headers.map((header) => (
                                                <th
                                                    key={header}
                                                    scope="col"
                                                    className={
                                                        header === 'Igrač'
                                                            ? 'min-w-60 px-4 py-3 text-left font-medium'
                                                            : 'px-4 py-3 text-center font-medium whitespace-nowrap'
                                                    }
                                                >
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {leaders.data.length === 0 && (
                                            <tr className="bg-likar2">
                                                <td
                                                    colSpan={6}
                                                    className="px-5 py-10 text-center leading-relaxed text-slate-300"
                                                >
                                                    Na ovoj stranici nema
                                                    zabilježene statistike za
                                                    odabranu sezonu.
                                                </td>
                                            </tr>
                                        )}
                                        {leaders.data.map((entry, index) => {
                                            const { player } = entry;
                                            const name = `${player.first_name} ${player.last_name}`;
                                            return (
                                                <tr
                                                    key={player.id}
                                                    className="border-b border-white/5 text-slate-100 last:border-b-0 odd:bg-likar2 even:bg-likar2/60"
                                                >
                                                    <td className="px-4 py-3 text-center tabular-nums">
                                                        {(leaders.from ?? 1) +
                                                            index}
                                                        .
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center justify-center gap-1.5">
                                                            {player.teams
                                                                .length ===
                                                            0 ? (
                                                                <span className="text-slate-400">
                                                                    —
                                                                </span>
                                                            ) : (
                                                                player.teams.map(
                                                                    (team) => (
                                                                        <Link
                                                                            key={
                                                                                team.id
                                                                            }
                                                                            href={showTeam(
                                                                                team.id,
                                                                                {
                                                                                    query: {
                                                                                        season: season.id,
                                                                                    },
                                                                                },
                                                                            )}
                                                                            title={
                                                                                team.name
                                                                            }
                                                                            className="shrink-0 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-likar3"
                                                                        >
                                                                            {team.logo ? (
                                                                                <img
                                                                                    src={`/storage/${team.logo}`}
                                                                                    alt={
                                                                                        team.name
                                                                                    }
                                                                                    width={
                                                                                        36
                                                                                    }
                                                                                    height={
                                                                                        36
                                                                                    }
                                                                                    loading={
                                                                                        index <
                                                                                        6
                                                                                            ? 'eager'
                                                                                            : 'lazy'
                                                                                    }
                                                                                    decoding="async"
                                                                                    className="size-9 rounded-full border border-slate-100/30 bg-white object-contain"
                                                                                />
                                                                            ) : (
                                                                                <span className="text-xs">
                                                                                    {
                                                                                        team.name
                                                                                    }
                                                                                </span>
                                                                            )}
                                                                        </Link>
                                                                    ),
                                                                )
                                                            )}
                                                        </div>
                                                    </td>
                                                    <th
                                                        scope="row"
                                                        className="px-4 py-3 text-left font-normal"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <BasketballPlayerIcon
                                                                aria-hidden="true"
                                                                jerseyColor={
                                                                    player
                                                                        .teams[0]
                                                                        ?.logo_color ??
                                                                    '#3f3633'
                                                                }
                                                                className="size-10 shrink-0 rounded-full border border-slate-100/30 bg-likar4 p-0.5"
                                                            />
                                                            {player.teams
                                                                .length > 0 ? (
                                                                <Link
                                                                    href={showPlayer(
                                                                        player.id,
                                                                        {
                                                                            query: {
                                                                                season: season.id,
                                                                            },
                                                                        },
                                                                    )}
                                                                    className="rounded-sm whitespace-nowrap hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-likar3"
                                                                >
                                                                    {name}
                                                                </Link>
                                                            ) : (
                                                                <span className="whitespace-nowrap">
                                                                    {name}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </th>
                                                    <td className="px-4 py-3 text-center tabular-nums">
                                                        {percentage
                                                            ? entry.total
                                                            : entry.games}
                                                    </td>
                                                    <td className="px-4 py-3 text-center tabular-nums">
                                                        {percentage
                                                            ? entry.attempted
                                                            : entry.total}
                                                    </td>
                                                    <td className="px-4 py-3 text-center font-semibold whitespace-nowrap text-orange-200 tabular-nums">
                                                        {entry.value === null
                                                            ? '—'
                                                            : `${numberFormatter.format(entry.value)}${percentage ? '%' : ''}`}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {leaders.last_page > 1 && (
                        <nav
                            aria-label="Stranice poretka igrača"
                            className="mt-6 overflow-x-auto pb-3"
                        >
                            <div className="flex min-w-max justify-center">
                                <Pagination
                                    links={leaders.links}
                                    type="front"
                                />
                            </div>
                        </nav>
                    )}
                </div>
            </section>
        </>
    );
}
