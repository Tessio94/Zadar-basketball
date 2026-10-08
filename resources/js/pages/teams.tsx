import { Head } from '@inertiajs/react';
import FilterSeason from '@/components/myComponents/common/filter/filterSeason';
import TeamCard from '@/components/myComponents/stranice/ekipe/teamCard';
import type { Team } from '@/types/propTypes';

export default function Teams({ teams }: { teams: Team[] }) {
    return (
        <>
            <Head>
                <title>Ekipe | Likar Krombacher</title>
                <meta name="description" content="Your page description" />
            </Head>
            <section className="px-[5%] py-10 xl:my-5">
                <div className="mb-10 flex flex-row items-center justify-between">
                    <h1 className="font-heading text-4xl font-semibold text-slate-100">
                        Tablica
                    </h1>
                    <FilterSeason />
                </div>
                <div className="mx-auto grid w-full items-stretch gap-10 rounded-2xl bg-likar1/30 p-2.5 sm:grid-cols-2 xl:grid-cols-3">
                    {teams.map((team) => (
                        <TeamCard key={team.id} ekipa={team} />
                    ))}
                </div>
            </section>
        </>
    );
}
