import { Head } from '@inertiajs/react';
import PlayerHeader from '@/components/myComponents/stranice/igrac/playerHeader';
import PlayerStats from '@/components/myComponents/stranice/igrac/playerStats';
import type {
    PlayerAverages,
    PlayerTotals,
    PlayerWithTeamAndGames,
} from '@/types/propTypes';

interface PlayerProps {
    player: PlayerWithTeamAndGames;
    totals: PlayerTotals;
    averages: PlayerAverages;
}

export default function player({ player, totals, averages }: PlayerProps) {
    const {
        date_of_birth,
        first_name,
        last_name,
        position,
        height,
        teams,
        game_stats,
    } = player;

    return (
        <>
            <Head>
                <title>{`${first_name} ${last_name} | Likar Krombacker`}</title>
                <meta
                    name="description"
                    content={`Pogledaj statistiku za ${first_name} ${last_name} – prosjek poena, asistencija, skokova i učinak po utakmici.`}
                />
            </Head>
            <section className="my-20 px-[5%]">
                <div className="flex flex-col items-start justify-between gap-10 xl:flex-row">
                    <div className="mx-auto w-full rounded-2xl bg-likar1/30">
                        <PlayerHeader
                            date_of_birth={date_of_birth}
                            first_name={first_name}
                            last_name={last_name}
                            position={position}
                            height={height}
                            teams={teams}
                        />

                        <PlayerStats
                            game_stats={game_stats}
                            totals={totals}
                            averages={averages}
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
