import { Head } from '@inertiajs/react';
import TableResults from '@/components/myComponents/stranice/tablica/rezultati/tableResults';
import GamesEmptyState from '@/components/myComponents/stranice/utakmice/gamesEmptyState';
import LastGames from '@/components/myComponents/stranice/utakmice/lastGames';
import UpcomingGames from '@/components/myComponents/stranice/utakmice/upcomingGames';
import type { GameWithTeams } from '@/types/games';
import type { Season } from '@/types/seasons';

type GamesProps = {
    season: Season;
    games: GameWithTeams[];
    lastRoundGames: GameWithTeams[];
    lastRound: number | null;
    upcomingGames: GameWithTeams[];
    upcomingRound: number | null;
};

const Games = ({
    season,
    games,
    lastRoundGames,
    lastRound,
    upcomingGames,
    upcomingRound,
}: GamesProps) => {
    return (
        <>
            <Head>
                <title>Utakmice | Likar Krombacher</title>
                <meta name="description" content="Your page description" />
            </Head>
            <section className="flex flex-col gap-5 px-[5%] py-10 xl:my-5">
                {upcomingRound !== null && upcomingGames.length > 0 ? (
                    <UpcomingGames
                        games={upcomingGames}
                        roundNumber={upcomingRound}
                    />
                ) : (
                    <GamesEmptyState variant="upcoming" />
                )}

                {lastRound !== null && lastRoundGames.length > 0 ? (
                    <LastGames games={lastRoundGames} lastRound={lastRound} />
                ) : (
                    <GamesEmptyState variant="results" />
                )}

                {games.length > 0 && (
                    <TableResults games={games} seasonName={season.name} />
                )}
            </section>
        </>
    );
};

export default Games;
