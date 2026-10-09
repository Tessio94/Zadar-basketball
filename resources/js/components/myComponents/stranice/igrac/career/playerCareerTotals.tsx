import PlayerCareerTable from './PlayerCareerTable';
import PlayerCareerTotalsHeader from './playerCareerTotalsHeader';

export default function PlayerCareerTotals({
    careerStats,
    seasonStats,
    playerTeams,
}) {
    return (
        <div className="bg-likar4/40">
            <PlayerCareerTotalsHeader careerStats={careerStats} />
            <PlayerCareerTable
                careerStats={careerStats}
                seasonStats={seasonStats}
                playerTeams={playerTeams}
            />
        </div>
    );
}
