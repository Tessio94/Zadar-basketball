// import { useState } from 'react';
import { useRemember } from '@inertiajs/react';
import TabComponent from '@/components/myComponents/common/tab/tabComponent';
import StatisticsTable from '@/components/myComponents/statistika/statisticsTable';
import LandingLayout from '@/layouts/landing/landing-layout';
import type { StatsDailyLeader, StatsLeader } from '@/types/propTypes';

export default function Statistics({
    leaders,
    lastRound,
}: {
    leaders: StatsLeader[];
    lastRound: StatsDailyLeader[];
}) {
    const [active, setActive] = useRemember<string>('tab1');

    const avgLeadersArr = Object.values(leaders);
    const dailyLeadersArr = Object.values(lastRound);

    return (
        <LandingLayout>
            <section className="my-20 px-[5%]">
                <TabComponent
                    active={active}
                    setActive={setActive}
                    tabs={[
                        { id: 'tab1', title: 'Sezona' },
                        { id: 'tab2', title: 'Posljednje kolo' },
                    ]}
                />
                <div className="mx-auto grid w-full items-stretch gap-10 rounded-2xl bg-likar1/30 p-2 lg:grid-cols-2">
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
                </div>
            </section>
        </LandingLayout>
    );
}
