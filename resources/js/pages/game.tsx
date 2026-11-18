import { useRemember } from '@inertiajs/react';
import TabComponent from '@/components/myComponents/common/tab/tabComponent';
import BoxScoreLegend from '@/components/myComponents/stranice/utakmice/utakmica/boxScore/boxScoreLegend';
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
    const awaitingBoxscore =
        game.status === 'finished' && player_stats.length === 0;

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
            {awaitingBoxscore ? (
                <section className="mx-auto my-10 px-[5%]">
                    <div className="rounded-2xl border border-likar3/30 bg-likar2 p-6 text-center sm:p-8">
                        <h2 className="font-heading text-2xl font-semibold text-slate-100">
                            Rezultat je objavljen
                        </h2>
                        <p className="mt-2 font-text text-sm leading-relaxed text-slate-300 sm:text-base">
                            Statistika igrača i najbolji pojedinci bit će
                            dostupni nakon unosa zapisnika.
                        </p>
                    </div>
                </section>
            ) : (
                <TabComponent
                    active={active}
                    setActive={setActive}
                    tabs={[
                        { id: 'tab1', title: 'Statistika utakmice' },
                        { id: 'tab2', title: 'Najbolji pojedinci' },
                    ]}
                    className="mt-15 mb-10"
                />
            )}
            {!awaitingBoxscore && active === 'tab1' && (
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
                    <BoxScoreLegend />
                </>
            )}
            {!awaitingBoxscore && active === 'tab2' && (
                <GameLeaders leaders={leaders} />
            )}
        </>
    );
};

Game.layout = (page: React.ReactNode) => <GameLayout children={page} />;

export default Game;
