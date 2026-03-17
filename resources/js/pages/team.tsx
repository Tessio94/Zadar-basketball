// import { useState } from 'react';
import { useRemember } from '@inertiajs/react';
import TabComponent from '@/components/myComponents/common/tab/tabComponent';
import LastFive from '@/components/myComponents/stranice/ekipe/ekipa/lastFive/lastFive';
import TeamPlayers from '@/components/myComponents/stranice/ekipe/ekipa/roster/teamPlayers';
import TeamHeading from '@/components/myComponents/stranice/ekipe/ekipa/teamHeading';
import TeamResults from '@/components/myComponents/stranice/ekipe/ekipa/utakmice/teamResults';
import StatisticsTable from '@/components/myComponents/stranice/statistika/statisticsTable';
import LandingLayout from '@/layouts/landing/landing-layout';
import type {
    GameWithTeams,
    StatsLeader,
    TeamWithPlayers,
} from '@/types/propTypes';

export default function Team({
    team,
    games,
    stats,
}: {
    team: TeamWithPlayers;
    games: GameWithTeams[];
    stats: StatsLeader[];
}) {
    const [active, setActive] = useRemember<string>('tab1');

    const { logo, name, players } = team;

    const teamLeaders = Object.values(stats);

    return (
        <LandingLayout>
            <section className="my-20 px-[5%]">
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
                        />
                        {active === 'tab1' && <TeamPlayers players={players} />}
                        {active === 'tab2' && <TeamResults games={games} />}
                        {active === 'tab3' && (
                            <div className="mx-auto grid w-full items-stretch gap-10 rounded-2xl bg-likar1/30 p-2 lg:grid-cols-2">
                                {teamLeaders.map((category, i) => {
                                    const { type, title, topFive } = category;
                                    return (
                                        <StatisticsTable
                                            key={i}
                                            title={title}
                                            type={type}
                                            leaders={topFive}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    {games.length > 0 && <LastFive games={games} />}
                </div>
            </section>
        </LandingLayout>
    );
}
