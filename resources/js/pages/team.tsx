import { useRemember } from '@inertiajs/react';
import FilterSeason from '@/components/myComponents/common/filter/filterSeason';
import TabComponent from '@/components/myComponents/common/tab/tabComponent';
import LastFive from '@/components/myComponents/stranice/ekipe/ekipa/lastFive/lastFive';
import TeamPlayers from '@/components/myComponents/stranice/ekipe/ekipa/roster/teamPlayers';
import TeamHeading from '@/components/myComponents/stranice/ekipe/ekipa/teamHeading';
import TeamResults from '@/components/myComponents/stranice/ekipe/ekipa/utakmice/teamResults';
import Seo from '@/components/seo';
import TeamStatistics from '@/components/teams/team-statistics';
import type { GameWithTeams } from '@/types/games';
import type { Season } from '@/types/seasons';
import type { TeamSeasonStatistics } from '@/types/team-statistics';
import type { Team, TeamSeason } from '@/types/teams';

export default function Team({
    team,
    teamSeason,
    games,
    stats,
    season,
}: {
    team: Team;
    teamSeason: TeamSeason;
    games: GameWithTeams[];
    stats: TeamSeasonStatistics;
    season: Season;
}) {
    const [active, setActive] = useRemember<string>('tab1');

    const { logo, name, logo_color } = team;
    const { players } = teamSeason;

    return (
        <>
            <Seo
                title={`${name} | Likar Zadar`}
                description={`Ekipa ${name} u LIKAR ligi Zadar. Pogledajte sastav, rezultate utakmica i statistiku igrača za sezonu ${season.name}.`}
                url={`/ekipe/${team.id}?season=${season.id}`}
            />
            <section className="px-[5%] py-10 xl:my-5">
                <div className="flex flex-col items-start justify-between gap-10 xl:flex-row">
                    <div className="mx-auto w-full rounded-2xl bg-likar1/30">
                        <TeamHeading logo={logo} name={name} />
                        <TabComponent
                            active={active}
                            setActive={setActive}
                            tabs={[
                                { id: 'tab1', title: 'Roster' },
                                { id: 'tab2', title: 'Utakmice' },
                                { id: 'tab3', title: 'Statistika' },
                            ]}
                            className="mt-15 mb-8"
                        />
                        <FilterSeason
                            additionalClass="mb-5 ml-5"
                            selectedSeason={season.id}
                        />
                        {active === 'tab1' && (
                            <TeamPlayers
                                players={players}
                                jerseyColor={logo_color ?? '#3f3633'}
                            />
                        )}
                        {active === 'tab2' && (
                            <TeamResults
                                seasonName={season.name}
                                games={games}
                                team_id={team.id}
                            />
                        )}
                        {active === 'tab3' && (
                            <TeamStatistics
                                stats={stats}
                                seasonId={season.id}
                                seasonName={season.name}
                                jerseyColor={logo_color ?? '#3f3633'}
                            />
                        )}
                    </div>
                    {games.length > 0 && <LastFive games={games} />}
                </div>
            </section>
        </>
    );
}
