import PlayerSeasonAverageRow from './playerSeasonAverageRow';
import PlayerSeasonAveragesHeader from './playerSeasonAveragesHeader';

export default function PlayerCareerTable({ careerStats }) {
    return (
        <>
            <PlayerSeasonAveragesHeader />
            <PlayerSeasonAverageRow
                careerStats={careerStats.regular.averages}
            />
        </>
    );
}
