import TeamCard from '@/components/myComponents/ekipe/teamCard';
import LandingLayout from '@/layouts/landing/landing-layout';
import type { Teams } from '@/types/propTypes';

export default function Teams({ teams }: { teams: Teams }) {
    return (
        <LandingLayout>
            <section className="my-20 px-[5%]">
                <div className="mx-auto grid w-full items-stretch gap-10 rounded-2xl bg-likar1/30 p-2 sm:grid-cols-2 xl:grid-cols-3">
                    {teams.map((team) => (
                        <TeamCard key={team.id} ekipa={team} />
                    ))}
                </div>
            </section>
        </LandingLayout>
    );
}
