import { Head } from '@inertiajs/react';
import FilterSeason from '@/components/myComponents/common/filter/filterSeason';
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

export default function player({
    player,
    totals,
    averages,
    season,
}: PlayerProps) {
    const {
        date_of_birth,
        first_name,
        last_name,
        position,
        height,
        game_stats,
    } = player;

    const teamSeason = player.team_seasons?.find(
        (teamSeason) => teamSeason.season_id === season,
    );

    const team = teamSeason?.team;

    return (
        <>
            <Head>
                <title>{`${first_name} ${last_name} | Likar Krombacher`}</title>
                <meta
                    name="description"
                    content={`Pogledaj statistiku za ${first_name} ${last_name} – prosjek poena, asistencija, skokova i učinak po utakmici.`}
                />
            </Head>
            <section className="px-[5%] py-10 xl:my-5">
                <div className="flex flex-col items-start justify-between gap-10 xl:flex-row">
                    <div className="mx-auto w-full rounded-2xl bg-likar1/30">
                        <PlayerHeader
                            date_of_birth={date_of_birth}
                            first_name={first_name}
                            last_name={last_name}
                            position={position}
                            height={height}
                            team={team}
                        />
                        <FilterSeason additionalClass=" mx-[5%] mt-5" />
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
