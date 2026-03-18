import { useRef } from 'react';
import type { TopFiveAvg, TopFiveDaily, TopFivePcg } from '@/types/propTypes';
import ButtonScroll from '../../common/ButtonScroll';
import StaticsticsAverageHeader from './staticsticsAverageHeader';
import StatisticsAverageRow from './statisticsAverageRow';
import StatisticsTableTitle from './statisticsTableTitle';

export default function StatisticsTable({
    type,
    leaders,
    title,
}: {
    type: 'avg' | 'pcg' | 'daily';
    title: string;
    leaders: TopFiveAvg[] | TopFivePcg[] | TopFiveDaily[];
}) {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    return (
        <div className="p-3">
            <StatisticsTableTitle title={title} />
            <hr className="my-2 border border-likar2" />
            <div className="relative">
                <ButtonScroll scrollRef={scrollRef} />
                <div
                    className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full mb-10 scrollbar-thin overflow-x-auto rounded-xl border border-likar1 shadow-xl shadow-likar1 scrollbar-thumb-likar3 scrollbar-track-likar3"
                    ref={scrollRef}
                >
                    <table className="w-full overflow-hidden rounded-xl">
                        <StaticsticsAverageHeader type={type} />
                        <tbody>
                            {leaders.map((leader, i) => (
                                <StatisticsAverageRow
                                    key={i}
                                    type={type}
                                    leader={leader}
                                    index={i}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
