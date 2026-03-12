import PlayerHeader from '@/components/myComponents/igrac/playerHeader';
import PlayerStats from '@/components/myComponents/igrac/playerStats';
import LandingLayout from '@/layouts/landing/landing-layout';
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
    console.log('player', player);
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
        <LandingLayout>
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
        </LandingLayout>
    );
}
