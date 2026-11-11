import type { TeamSeasonStatistics } from '@/types/team-statistics';
import TeamPlayerStatistics from './team-player-statistics';
import TeamSeasonSummary from './team-season-summary';

type TeamStatisticsProps = {
    stats: TeamSeasonStatistics;
    seasonId: number;
    seasonName: string;
    jerseyColor: string;
};

export default function TeamStatistics({
    stats,
    seasonId,
    seasonName,
    jerseyColor,
}: TeamStatisticsProps) {
    return (
        <div className="min-w-0 space-y-6 p-3 sm:space-y-8 sm:p-5">
            <TeamSeasonSummary
                summary={stats.summary}
                seasonName={seasonName}
            />
            <TeamPlayerStatistics
                players={stats.players}
                seasonId={seasonId}
                jerseyColor={jerseyColor}
            />
        </div>
    );
}
