import { Head } from '@inertiajs/react';
import FilterSeason from '@/components/myComponents/common/filter/filterSeason';
import PlayerCareerTotals from '@/components/myComponents/stranice/igrac/career/playerCareerTotals';
import PlayerHeader from '@/components/myComponents/stranice/igrac/playerHeader';
import PlayerStats from '@/components/myComponents/stranice/igrac/playerStats';
import type {
    PlayerAverages,
    PlayerTotals,
    PlayerWithTeamAndGames,
} from '@/types/propTypes';

type PlayerProps = {
    player: PlayerWithTeamAndGames;
    totals: PlayerTotals;
    averages: PlayerAverages;
    season: number;
};

export default function player({
    player,
    careerStats,
    seasonStats,
    seasons,
    games,
    selectedSeason,
    // totals,
    // averages,
    // season,
}: PlayerProps) {
    const {
        date_of_birth,
        first_name,
        last_name,
        position,
        height,
        game_stats,
    } = player;

    console.log('player', player);
    console.log('careerStats', careerStats);
    console.log('seasonStats', seasonStats);
    console.log('seasons', seasons);
    console.log('games', games);
    console.log('selectedSeason', selectedSeason);

    const teamSeason = player.team_seasons?.find(
        (teamSeason) => teamSeason.season_id === selectedSeason,
    );

    const team = teamSeason?.team;
    const jerseyNumber = teamSeason?.pivot.jersey_number;

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
                            jerseyNumber={jerseyNumber}
                            team={team}
                        />
                        <PlayerCareerTotals careerStats={careerStats} />
                        {/* <FilterSeason additionalClass=" mx-[5%] mt-5" />
                        <PlayerStats
                            game_stats={game_stats}
                            totals={totals}
                            averages={averages}
                        /> */}
                    </div>
                </div>
            </section>
        </>
    );
}
