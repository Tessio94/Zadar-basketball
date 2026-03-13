import { useState } from 'react';
import TabComponent from '@/components/myComponents/common/tab/tabComponent';
import StatisticsTable from '@/components/myComponents/statistika/statisticsTable';
import LandingLayout from '@/layouts/landing/landing-layout';
import type { StatsLeader } from '@/types/propTypes';

export default function Statistics({ leaders }: { leaders: StatsLeader[] }) {
    const [active, setActive] = useState<string>('tab1');

    const leadersArr = Object.values(leaders);
    console.log(leadersArr);
    return (
        <LandingLayout>
            <section className="my-20 px-[5%]">
                {/* <div className="mb-15 flex flex-row justify-center">
                    <div className="text-heading z-20 -mr-7 rounded-full bg-likar3 px-10 py-2 text-2xl font-semibold text-slate-100 uppercase">
                        Sezona
                    </div>
                    <div className="text-heading z-10 rounded-full rounded-l-none bg-likar1/80 px-10 py-2 text-2xl font-semibold text-slate-100 uppercase">
                        Posljednje kolo
                    </div>
                </div> */}
                <TabComponent
                    active={active}
                    setActive={setActive}
                    tabs={[
                        { id: 'tab1', title: 'Sezona' },
                        { id: 'tab2', title: 'Posljednje kolo' },
                    ]}
                />
                <div className="mx-auto grid w-full items-stretch gap-10 rounded-2xl bg-likar1/30 p-2 lg:grid-cols-2">
                    {leadersArr.map((leader, i) => {
                        const { type, title, topFive } = leader;
                        return (
                            <StatisticsTable
                                key={i}
                                title={title}
                                type={type}
                                avgLeaders={topFive}
                            />
                        );
                    })}
                </div>
            </section>
        </LandingLayout>
    );
}
