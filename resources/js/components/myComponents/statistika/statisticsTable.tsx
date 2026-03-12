import StaticsticsAverageHeader from './staticsticsAverageHeader';
import StatisticsAverageRow from './statisticsAverageRow';
import StatisticsTableTitle from './statisticsTableTitle';

export default function StatisticsTable({ type, avgLeaders, title }) {
    return (
        <div className="p-3">
            <StatisticsTableTitle title={title} />
            <hr className="my-2 border border-likar2" />
            <table className="w-full overflow-hidden rounded-t-xl rounded-b-xl">
                <StaticsticsAverageHeader type={type} />
                <tbody>
                    {avgLeaders.map((leader, i) => (
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
    );
}
