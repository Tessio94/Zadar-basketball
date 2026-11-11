import { useRemember } from '@inertiajs/react';
import TabComponent from '@/components/myComponents/common/tab/tabComponent';
import GameBoxScore from '@/components/myComponents/stranice/utakmice/utakmica/boxScore/gameBoxScore';
import GameScore from '@/components/myComponents/stranice/utakmice/utakmica/headerSection/gameScore';
import GameTitle from '@/components/myComponents/stranice/utakmice/utakmica/headerSection/gameTitle';
import GameLeaders from '@/components/myComponents/stranice/utakmice/utakmica/leaders/gameLeaders';
import Seo from '@/components/seo';
import GameLayout from '@/layouts/game/game-layout';
import type { GameDetailsProps } from '@/types/game-boxscore';

const Game = ({ game, leaders, teamTotals }: GameDetailsProps) => {
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
            <Seo
                title={`${game.home_team.name} — ${game.away_team.name} | Likar Zadar`}
                description={
                    game.status === 'finished'
                        ? `${game.home_team.name} ${game.home_score} : ${game.away_score} ${game.away_team.name}. Rezultat, statistika igrača i zapisnik utakmice LIKAR lige Zadar.`
                        : `Najava utakmice ${game.home_team.name} — ${game.away_team.name}. Pogledajte raspored i informacije o utakmici LIKAR lige Zadar.`
                }
                url={`/utakmice/${game.id}`}
            />
            <GameTitle />
            <GameScore
                homeTeam={home_team}
                homeScore={home_score}
                awayTeam={away_team}
                awayScore={away_score}
                periods={game.period_scores}
                status={game.status}
            />
            <TabComponent
                active={active}
                setActive={setActive}
                tabs={[
                    { id: 'tab1', title: 'Statistika utakmice' },
                    { id: 'tab2', title: 'Najbolji pojedinci' },
                ]}
                className="mt-15 mb-10"
            />
            {active === 'tab1' && (
                <>
                    <GameBoxScore
                        team={home_team}
                        players={homePlayers}
                        totals={teamTotals.home}
                    />
                    <GameBoxScore
                        team={away_team}
                        players={awayPlayers}
                        totals={teamTotals.away}
                    />
                </>
            )}
            {active === 'tab2' && <GameLeaders leaders={leaders} />}
        </>
    );
};

Game.layout = (page: React.ReactNode) => <GameLayout children={page} />;

export default Game;
