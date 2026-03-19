import { Head } from '@inertiajs/react';
import TeamCard from '@/components/myComponents/stranice/ekipe/teamCard';
import type { Team } from '@/types/propTypes';

export default function Teams({ teams }: { teams: Team[] }) {
    return (
        <>
            <Head>
                <title>Ekipe | Likar Krombacker</title>
                <meta name="description" content="Your page description" />
            </Head>
            <section className="my-20 px-[5%]">
                <div className="mx-auto grid w-full items-stretch gap-10 rounded-2xl bg-likar1/30 p-2 sm:grid-cols-2 xl:grid-cols-3">
                    {teams.map((team) => (
                        <TeamCard key={team.id} ekipa={team} />
                    ))}
                </div>
            </section>
        </>
    );
}
