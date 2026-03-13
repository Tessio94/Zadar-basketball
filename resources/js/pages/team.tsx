import { useState } from 'react';
import TabComponent from '@/components/myComponents/common/tab/tabComponent';
import LastFive from '@/components/myComponents/ekipe/ekipa/lastFive/lastFive';
import TeamPlayers from '@/components/myComponents/ekipe/ekipa/Roster/teamPlayers';
import TeamHeading from '@/components/myComponents/ekipe/ekipa/teamHeading';
import LandingLayout from '@/layouts/landing/landing-layout';
import type { GamesWithTeams, TeamWithPlayers } from '@/types/propTypes';

export default function Team({
    team,
    games,
}: {
    team: TeamWithPlayers;
    games: GamesWithTeams;
}) {
    const [active, setActive] = useState<string>('tab1');

    const { logo, name, players } = team;

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
                        <TeamPlayers players={players} />
                    </div>
                    {games.length > 0 && <LastFive games={games} />}
                </div>
            </section>
        </LandingLayout>
    );
}
