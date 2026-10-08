import { Head, useRemember } from '@inertiajs/react';
import FilterSeason from '@/components/myComponents/common/filter/filterSeason';
import TabComponent from '@/components/myComponents/common/tab/tabComponent';
import StatisticsTable from '@/components/myComponents/stranice/statistika/statisticsTable';
import type {
    StatsDailyLeader,
    StatsLeader,
    StatsBestPerformance,
} from '@/types/propTypes';

export default function Statistics({
    season,
    leaders,
    lastRound,
    bestPerformances,
}: {
    leaders: StatsLeader[];
    lastRound: StatsDailyLeader[];
    bestPerformances: StatsBestPerformance[];
}) {
    const [active, setActive] = useRemember<string>('tab1');

    const avgLeadersArr = Object.values(leaders);
    const dailyLeadersArr = Object.values(lastRound);
    const bestPerformancesArr = Object.values(bestPerformances);

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
                    season={season.is_active}
                    tabs={[
                        { id: 'tab1', title: 'Sezona' },
                        { id: 'tab2', title: 'Posljednje kolo' },
                        { id: 'tab3', title: 'Najbolje izvedbe' },
                    ]}
                />
                <FilterSeason
                    disable={active === 'tab2'}
                    selectedSeason={season.id}
                    additionalClass={'mb-5'}
                />
                <div className="mx-auto w-full rounded-2xl bg-likar1/30 p-2 sm:grid sm:items-stretch sm:gap-10 lg:grid-cols-2">
                    {active === 'tab1' &&
                        avgLeadersArr.map((category, i) => {
                            const { type, title, topFive } = category;
                            return (
                                <StatisticsTable
                                    key={i}
                                    title={title}
                                    type={type}
                                    leaders={topFive}
                                />
                            );
                        })}
                    {active === 'tab2' &&
                        dailyLeadersArr.map((category, i) => {
                            const { title, topFive } = category;
                            return (
                                <StatisticsTable
                                    key={i}
                                    title={title}
                                    type="daily"
                                    leaders={topFive}
                                />
                            );
                        })}
                    {active === 'tab3' &&
                        bestPerformancesArr.map((category, i) => {
                            const { title, topFive } = category;

                            return (
                                <StatisticsTable
                                    key={i}
                                    title={title}
                                    type="daily"
                                    leaders={topFive}
                                />
                            );
                        })}
                </div>
            </section>
        </>
    );
}
