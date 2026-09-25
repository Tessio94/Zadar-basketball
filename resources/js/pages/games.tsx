import { Head } from '@inertiajs/react';
import TableResults from '@/components/myComponents/stranice/tablica/rezultati/tableResults';
import LastGames from '@/components/myComponents/stranice/utakmice/lastGames';
import UpcomingGames from '@/components/myComponents/stranice/utakmice/upcomingGames';
import type { GameWithTeams } from '@/types/propTypes';

const Games = ({
    games,
    lastRoundGames,
    lastRound,
}: {
    games: GameWithTeams[];
    lastRoundGames: GameWithTeams[];
    lastRound: number;
}) => {
    console.log(games);

    return (
        <>
            <Head>
                <title>Tablica | Likar Krombacker</title>
                <meta name="description" content="Your page description" />
            </Head>
            <section className="flex flex-col gap-5 px-[5%] py-5 sm:py-10 xl:my-20">
                <div>
                    <UpcomingGames
                        games={lastRoundGames}
                        lastRound={lastRound + 1}
                    />
                </div>
                <div>
                    <LastGames games={lastRoundGames} lastRound={lastRound} />
                </div>
                <div>
                    <TableResults games={games} />
                </div>
            </section>
        </>
    );
};

export default Games;
