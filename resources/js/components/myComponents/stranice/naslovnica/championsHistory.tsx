import { Medal, Star, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

type ChampionshipSeason = {
    season: string;
    champion: string;
    runnerUp: string;
    mvp: string;
};

const seasons: ChampionshipSeason[] = [
    {
        season: '2020./21.',
        champion: 'Veterani KK Puntamika',
        runnerUp: 'KK Vrsi',
        mvp: 'Ivan Bulić* / Ivan Kaštropil**',
    },
    {
        season: '2021./22.',
        champion: 'KK Vrsi',
        runnerUp: 'Veterani KK Puntamika',
        mvp: 'Marko Popović* / Domagoj Vidaković**',
    },
    {
        season: '2022./23.',
        champion: 'KK Vrsi',
        runnerUp: 'KK Voštarnica',
        mvp: 'Mario Pešut',
    },
    {
        season: '2023./24.',
        champion: 'KK Vrsi',
        runnerUp: 'Veterani KK Puntamika',
        mvp: 'Ivan Kaštropil',
    },
    {
        season: '2024./25.',
        champion: 'KK Voštarnica',
        runnerUp: 'KK Sabunjar Privlaka',
        mvp: 'Ive Begonja',
    },
    {
        season: '2025./26.',
        champion: 'KK Sfinga Staffordi',
        runnerUp: 'Veterani KK Voštarnica',
        mvp: 'Toni Kolanović',
    },
];

function MvpNames({ name }: { name: string }) {
    return (
        <span className="block space-y-1">
            {name.split(' / ').map((player) => (
                <span key={player} className="block">
                    {player}
                </span>
            ))}
        </span>
    );
}

export default function ChampionHistory() {
    return (
        <div className="w-full min-w-0 font-text text-slate-100">
            {/* Compact enough for the existing fixed-height desktop section. */}
            <div className="hidden overflow-hidden rounded-2xl border border-likar3/25 bg-likar4/70 shadow-lg shadow-black/15 sm:block">
                <table className="w-full table-fixed border-collapse text-left">
                    <caption className="sr-only">
                        Prvaci, doprvaci i MVP igrači Likar lige po sezonama
                    </caption>
                    <colgroup>
                        <col className="w-[18%]" />
                        <col className="w-[28%]" />
                        <col className="w-[27%]" />
                        <col className="w-[27%]" />
                    </colgroup>
                    <thead>
                        <tr className="border-b border-likar3/25 bg-black/20 font-heading text-sm tracking-wide text-slate-300 lg:text-base">
                            <th
                                scope="col"
                                className="px-3 py-4 font-medium lg:px-4"
                            >
                                Sezona
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-4 font-medium text-likar3 lg:px-4"
                            >
                                <span className="flex items-center gap-2">
                                    <Trophy
                                        className="size-4 shrink-0"
                                        aria-hidden="true"
                                    />
                                    Prvak
                                </span>
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-4 font-medium lg:px-4"
                            >
                                <span className="flex items-center gap-2">
                                    <Medal
                                        className="size-4 shrink-0 text-slate-400"
                                        aria-hidden="true"
                                    />
                                    Doprvak
                                </span>
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-4 font-medium lg:px-4"
                            >
                                <span className="flex items-center gap-2">
                                    <Star
                                        className="size-4 shrink-0 text-likar3/80"
                                        aria-hidden="true"
                                    />
                                    MVP
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {seasons.map((season, index) => {
                            const latest = index === seasons.length - 1;
                            return (
                                <tr
                                    key={season.season}
                                    className={cn(
                                        'border-b border-white/10 transition-colors last:border-b-0 hover:bg-white/5 motion-reduce:transition-none',
                                        latest
                                            ? 'bg-likar3/10'
                                            : 'even:bg-likar2/50',
                                    )}
                                >
                                    <th
                                        scope="row"
                                        className={cn(
                                            'relative px-3 py-4 align-middle font-heading text-sm font-medium whitespace-nowrap lg:px-4 lg:text-base',
                                            latest && 'text-likar3',
                                        )}
                                    >
                                        {latest && (
                                            <span
                                                aria-hidden="true"
                                                className="absolute inset-y-3 left-0 w-0.5 rounded-r-full bg-likar3"
                                            />
                                        )}
                                        {season.season}
                                    </th>
                                    <td className="px-3 py-4 align-middle font-heading text-base leading-snug font-medium break-words text-slate-50 lg:px-4 lg:text-lg">
                                        {season.champion}
                                    </td>
                                    <td className="px-3 py-4 align-middle text-xs leading-relaxed break-words text-slate-300 lg:px-4 lg:text-sm">
                                        {season.runnerUp}
                                    </td>
                                    <td className="px-3 py-4 align-middle text-xs leading-relaxed break-words text-slate-200 lg:px-4 lg:text-sm">
                                        <MvpNames name={season.mvp} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <ol
                aria-label="Osvajači Likar lige po sezonama"
                className="space-y-3 sm:hidden"
            >
                {seasons.map((season, index) => {
                    const latest = index === seasons.length - 1;
                    return (
                        <li
                            key={season.season}
                            className={cn(
                                'relative overflow-hidden rounded-2xl border bg-likar4/95 shadow-lg shadow-black/10',
                                latest ? 'border-likar3/60' : 'border-white/15',
                            )}
                        >
                            <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-black/15 px-4 py-3">
                                <span className="text-[10px] font-medium tracking-[0.18em] text-slate-400 uppercase">
                                    Sezona
                                </span>
                                <span className="font-heading text-lg font-medium tracking-wide text-likar3">
                                    {season.season}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 px-4 py-5">
                                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-likar3/25 bg-likar3/10 text-likar3">
                                    <Trophy
                                        className="size-6"
                                        strokeWidth={1.5}
                                        aria-hidden="true"
                                    />
                                </span>
                                <div className="min-w-0">
                                    <p className="mb-1 text-[10px] font-semibold tracking-[0.16em] text-likar3 uppercase">
                                        Prvak lige
                                    </p>
                                    <p className="font-heading text-xl leading-snug font-medium break-words text-slate-50">
                                        {season.champion}
                                    </p>
                                </div>
                            </div>
                            <dl className="grid grid-cols-2 border-t border-white/10 bg-black/10">
                                <div className="min-w-0 border-r border-white/10 px-4 py-3.5">
                                    <dt className="mb-2 flex items-center gap-1.5 text-[10px] font-medium tracking-wider text-slate-400 uppercase">
                                        <Medal
                                            className="size-3.5 shrink-0"
                                            aria-hidden="true"
                                        />
                                        Doprvak
                                    </dt>
                                    <dd className="text-xs leading-relaxed break-words text-slate-200">
                                        {season.runnerUp}
                                    </dd>
                                </div>
                                <div className="min-w-0 px-4 py-3.5">
                                    <dt className="mb-2 flex items-center gap-1.5 text-[10px] font-medium tracking-wider text-slate-400 uppercase">
                                        <Star
                                            className="size-3.5 shrink-0 text-likar3/80"
                                            aria-hidden="true"
                                        />
                                        MVP
                                    </dt>
                                    <dd className="text-xs leading-relaxed break-words text-slate-200">
                                        <MvpNames name={season.mvp} />
                                    </dd>
                                </div>
                            </dl>
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}
