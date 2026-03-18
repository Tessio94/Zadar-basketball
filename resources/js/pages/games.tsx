import { useRemember } from '@inertiajs/react';
import TabComponent from '@/components/myComponents/common/tab/tabComponent';
import GameBoxScore from '@/components/myComponents/stranice/utakmice/boxScore/gameBoxScore';
import GameScore from '@/components/myComponents/stranice/utakmice/headerSection/gameScore';
import GameTitle from '@/components/myComponents/stranice/utakmice/headerSection/gameTitle';
import GameLeaders from '@/components/myComponents/stranice/utakmice/leaders/gameLeaders';
import GamesLayout from '@/layouts/games/games-layout';
import type {
    GameBoxscore,
    GameLeaders as GameLeadersType,
} from '@/types/propTypes';

const Games = ({
    game,
    leaders,
}: {
    game: GameBoxscore;
    leaders: GameLeadersType;
}) => {
    const [active, setActive] = useRemember<string>('tab1');

    const {
        home_team,
        home_team_id,
        home_score,
        away_team,
        away_team_id,
        away_score,
        player_stats,
    } = game;

    const homePlayers = player_stats.filter(
        (player) => player.team_id === home_team_id,
    );

    const awayPlayers = player_stats.filter(
        (player) => player.team_id === away_team_id,
    );

    return (
        <>
            <GameTitle />
            <GameScore
                homeTeam={home_team}
                homeScore={home_score}
                awayTeam={away_team}
                awayScore={away_score}
            />
            <TabComponent
                active={active}
                setActive={setActive}
                tabs={[
                    { id: 'tab1', title: 'Statistika utakmice' },
                    { id: 'tab2', title: 'Najbolji pojedinci' },
                    { id: 'tab3', title: 'Play by Play' },
                ]}
            />
            {active === 'tab1' && (
                <>
                    <GameBoxScore team={home_team} players={homePlayers} />
                    <GameBoxScore team={away_team} players={awayPlayers} />
                </>
            )}
            {active === 'tab2' && <GameLeaders leaders={leaders} />}
        </>
    );
};

Games.layout = (page: React.ReactNode) => <GamesLayout children={page} />;

export default Games;
