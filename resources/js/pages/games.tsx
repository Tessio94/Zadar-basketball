import { useState } from 'react';

import GameBoxScore from '@/components/myComponents/utakmice/boxScore/gameBoxScore';
import GameDetailButtons from '@/components/myComponents/utakmice/headerSection/gameDetailButtons';
import GameScore from '@/components/myComponents/utakmice/headerSection/gameScore';
import GameTitle from '@/components/myComponents/utakmice/headerSection/gameTitle';
import GameLeaders from '@/components/myComponents/utakmice/leaders/gameLeaders';
import GamesLayout from '@/layouts/games/games-layout';

export default function Games({ game, leaders }) {
    // console.log('game', game);
    const [active, setActive] = useState('tab1');

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

    // console.log(homePlayers);
    return (
        <GamesLayout>
            <GameTitle />
            <GameScore
                homeTeam={home_team}
                homeScore={home_score}
                awayTeam={away_team}
                awayScore={away_score}
            />
            <GameDetailButtons active={active} setActive={setActive} />
            {active === 'tab1' && (
                <>
                    <GameBoxScore
                        id={home_team_id}
                        team={home_team}
                        score={home_score}
                        players={homePlayers}
                    />
                    <GameBoxScore
                        id={away_team_id}
                        team={away_team}
                        score={away_score}
                        players={awayPlayers}
                    />
                </>
            )}
            {active === 'tab2' && <GameLeaders leaders={leaders} />}
        </GamesLayout>
    );
}
