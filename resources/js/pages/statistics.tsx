import { Head, useRemember } from '@inertiajs/react';
import FilterSeason from '@/components/myComponents/common/filter/filterSeason';
import TabComponent from '@/components/myComponents/common/tab/tabComponent';
import StatisticsTable from '@/components/myComponents/stranice/statistika/statisticsTable';
import type { Season } from '@/types/seasons';
import type {
    StatsDailyLeader,
    StatsLeader,
    StatsBestPerformance,
} from '@/types/statistics';

export default function Statistics({
    season,
    leaders,
    lastRoundStats,
    lastRound,
    bestPerformances,
}: {
    season: Season;
    leaders: Record<string, StatsLeader>;
    lastRoundStats: Record<string, StatsDailyLeader>;
    lastRound: number | null;
    bestPerformances: Record<string, StatsBestPerformance>;
}) {
    const [active, setActive] = useRemember<string>('tab1');

    const avgLeadersArr = Object.values(leaders);
    const dailyLeadersArr = Object.values(lastRoundStats);
    const bestPerformancesArr = Object.values(bestPerformances);
    console.log('dailyLeaders', dailyLeadersArr);
    console.log('last round', lastRound);
    return (
        <>
            <Head>
                <title>Statistika | Likar Krombacher</title>
                <meta name="description" content="Your page description" />
            </Head>
            <section className="px-[5%] py-10 xl:my-5">
                <TabComponent
                    active={active}
                    setActive={setActive}
                    seasonActive={season.is_active}
                    tabs={[
                        { id: 'tab1', title: 'Sezona' },
                        { id: 'tab2', title: 'Posljednje kolo' },
                        { id: 'tab3', title: 'Najbolje izvedbe' },
                    ]}
                    className="mb-8"
                />
                <FilterSeason
                    disable={active === 'tab2'}
                    selectedSeason={season.id}
                    additionalClass={'mb-5'}
                />
                <div className="relative mx-auto w-full rounded-2xl bg-likar1/30 p-2 sm:grid sm:items-stretch sm:gap-10 lg:grid-cols-2">
                    {active === 'tab2' && (
                        <div className="absolute top-0 left-1/2 flex h-13 w-13 -translate-1/2 flex-row items-center justify-center rounded-xl bg-likar1 font-heading text-3xl font-black text-slate-100">
                            R{lastRound}
                        </div>
                    )}
                    {active === 'tab1' &&
                        avgLeadersArr.map((category, i) => {
                            return (
                                <StatisticsTable
                                    key={i}
                                    category={category}
                                    seasonId={season.id}
                                />
                            );
                        })}
                    {active === 'tab2' &&
                        lastRound !== null &&
                        dailyLeadersArr.map((category, i) => {
                            return (
                                <StatisticsTable
                                    key={i}
                                    category={{ ...category, type: 'daily' }}
                                    seasonId={season.id}
                                />
                            );
                        })}
                    {active === 'tab2' && lastRound === null && (
                        <p className="p-6 text-center text-slate-300">
                            Još nema odigranih utakmica u ovoj sezoni.
                        </p>
                    )}
                    {active === 'tab3' &&
                        bestPerformancesArr.map((category, i) => {
                            return (
                                <StatisticsTable
                                    key={i}
                                    category={{ ...category, type: 'daily' }}
                                    seasonId={season.id}
                                />
                            );
                        })}
                </div>
            </section>
        </>
    );
}
