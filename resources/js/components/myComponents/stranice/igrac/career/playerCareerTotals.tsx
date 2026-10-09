import PlayerCareerTable from './PlayerCareerTable';
import PlayerCareerTotalsHeader from './playerCareerTotalsHeader';

export default function PlayerCareerTotals({ careerStats }) {
    return (
        <>
            <PlayerCareerTotalsHeader careerStats={careerStats} />
            <table className="w-full bg-likar2">
                <PlayerCareerTable careerStats={careerStats} />
            </table>
        </>
    );
}
