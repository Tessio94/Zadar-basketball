import { User2Icon } from 'lucide-react';
import type { TeamsWithPlayer } from '@/types/propTypes';

export default function PlayerHeader({
    date_of_birth,
    first_name,
    last_name,
    position,
    height,
    teams,
}: {
    date_of_birth: string;
    first_name: string;
    last_name: string;
    position: 'PG' | 'SG' | 'SF' | 'PF' | 'C';
    height: number;
    teams: TeamsWithPlayer;
}) {
    const name = first_name + ' ' + last_name;

    const datumRodenja = new Date(date_of_birth);
    const today = new Date();

    let age = today.getFullYear() - datumRodenja.getFullYear();

    const monthDiff = today.getMonth() - datumRodenja.getMonth();

    if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < datumRodenja.getDate())
    ) {
        age--;
    }

    return (
        <div className="flex flex-col gap-5 border-b border-likar1 py-5">
            <div className="border-b border-likar1 px-[5%] py-5 md:px-20">
                <div className="flex w-full flex-col items-start gap-10 sm:flex-row sm:items-center">
                    <User2Icon className="h-30 w-30 shrink-0 rounded-full border border-slate-100/80 bg-likar4 p-0.5 text-slate-900 max-[500px]:h-25 max-[500px]:w-25" />
                    <div className="flex flex-col items-start gap-6">
                        <h2 className="font-heading text-4xl font-semibold text-slate-100 my-text-stroke lg:text-5xl">
                            {name}
                        </h2>
                        <p className="font-heading text-3xl font-semibold text-slate-100 min-[400px]:flex min-[400px]:flex-row min-[400px]:items-center min-[400px]:gap-4 xl:gap-6 xl:text-4xl">
                            Ekipa:{' '}
                            <span className="max-xl:text-2xl">
                                {teams[0].name}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-5 px-[5%] py-5 md:px-20">
                <p className="font-heading text-2xl font-semibold text-slate-100 sm:text-3xl">
                    Broj: <span>{teams[0].pivot.jersey_number}</span>
                </p>

                <p className="font-heading text-2xl font-semibold text-slate-100 sm:text-3xl">
                    Datum rođenja:{' '}
                    <span>{date_of_birth.split('-').reverse().join('/')}</span>
                </p>
                <p className="font-heading text-2xl font-semibold text-slate-100 sm:text-3xl">
                    Godine: <span>{age}</span>
                </p>
                <p className="font-heading text-2xl font-semibold text-slate-100 sm:text-3xl">
                    Visina: <span>{height}</span>
                </p>
                <p className="font-heading text-2xl font-semibold text-slate-100 sm:text-3xl">
                    Pozicija: <span>{position}</span>
                </p>
            </div>
        </div>
    );
}
