import type { StatsDailyLeader, StatsLeader } from '@/types/statistics';
import StaticsticsAverageHeader from './staticsticsAverageHeader';
import StatisticsAverageRow from './statisticsAverageRow';
import StatisticsTableTitle from './statisticsTableTitle';

type StatisticsTableProps = {
    category: StatsLeader | (StatsDailyLeader & { type: 'daily' });
    seasonId?: number;
    jerseyColor?: string;
};

export default function StatisticsTable({
    category,
    seasonId,
    jerseyColor,
}: StatisticsTableProps) {
    return (
        <div className="flex flex-col p-3">
            <StatisticsTableTitle title={category.title} />
            <hr className="my-2 border border-likar2" />
            <div className="relative grow overflow-hidden rounded-xl border border-likar1 shadow-xl shadow-likar1">
                <div className="scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar h-full overflow-x-auto scrollbar-thumb-likar3 scrollbar-track-slate-900">
                    <table className="h-full w-full overflow-hidden rounded-xl">
                        <StaticsticsAverageHeader
                            type={category.type}
                            jerseyColor={jerseyColor}
                        />
                        <tbody>
                            {category.type === 'avg' &&
                                category.topFive.map((leader, i) => (
                                    <StatisticsAverageRow
                                        key={i}
                                        type="avg"
                                        leader={leader}
                                        seasonId={seasonId}
                                        index={i}
                                        jerseyColor={jerseyColor}
                                    />
                                ))}
                            {category.type === 'pcg' &&
                                category.topFive.map((leader, i) => (
                                    <StatisticsAverageRow
                                        key={i}
                                        type="pcg"
                                        leader={leader}
                                        seasonId={seasonId}
                                        index={i}
                                        jerseyColor={jerseyColor}
                                    />
                                ))}
                            {category.type === 'daily' &&
                                category.topFive.map((leader, i) => (
                                    <StatisticsAverageRow
                                        key={i}
                                        type="daily"
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
