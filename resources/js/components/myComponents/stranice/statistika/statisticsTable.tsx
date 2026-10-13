import type { TopFiveAvg, TopFiveDaily, TopFivePcg } from '@/types/propTypes';
import StaticsticsAverageHeader from './staticsticsAverageHeader';
import StatisticsAverageRow from './statisticsAverageRow';
import StatisticsTableTitle from './statisticsTableTitle';

export default function StatisticsTable({
    type,
    leaders,
    title,
    seasonId,
    jerseyColor,
}: {
    type: 'avg' | 'pcg' | 'daily';
    leaders: TopFiveAvg[] | TopFivePcg[] | TopFiveDaily[];
    title: string;
    seasonId?: number;
    jerseyColor: string;
}) {
    return (
        <div className="flex flex-col p-3">
            <StatisticsTableTitle title={title} />
            <hr className="my-2 border border-likar2" />
            <div className="relative grow overflow-hidden rounded-xl border border-likar1 shadow-xl shadow-likar1">
                <div className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar h-full overflow-x-auto scrollbar-thumb-likar3 scrollbar-track-slate-900">
                    <table className="h-full w-full overflow-hidden rounded-xl">
                        <StaticsticsAverageHeader type={type} />
                        <tbody>
                            {leaders.map((leader, i) => (
                                <StatisticsAverageRow
                                    key={i}
                                    type={type}
                                    leader={leader}
                                    seasonId={seasonId}
                                    index={i}
                                    jerseyColor={jerseyColor}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
