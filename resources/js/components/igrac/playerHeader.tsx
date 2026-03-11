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
            <div className="flex flex-row items-center justify-between border-b border-likar1 px-20 py-5">
                <div className="flex flex-row items-center gap-10">
                    <User2Icon className="h-25 w-25 shrink-0 rounded-full border border-slate-100/80 bg-likar4 p-0.5 text-slate-900 max-[500px]:h-3.5 max-[500px]:w-3.5" />
                    <h2 className="font-heading text-5xl font-semibold text-slate-100">
                        {name}
                    </h2>
                </div>
                <p className="flex flex-row items-center gap-10 font-heading text-4xl font-semibold text-slate-100">
                    Team: <span>{teams[0].name}</span>
                </p>
            </div>
            <div className="flex flex-col gap-5 px-20 py-5">
                <p className="font-heading text-3xl font-semibold text-slate-100">
                    Broj: <span>{teams[0].pivot.jersey_number}</span>
                </p>

                <p className="font-heading text-3xl font-semibold text-slate-100">
                    Datum rođenja:{' '}
                    <span>{date_of_birth.split('-').reverse().join('/')}</span>
                </p>
                <p className="font-heading text-3xl font-semibold text-slate-100">
                    Godine: <span>{age}</span>
                </p>
                <p className="font-heading text-3xl font-semibold text-slate-100">
                    Visina: <span>{height}</span>
                </p>
                <p className="font-heading text-3xl font-semibold text-slate-100">
                    Pozicija: <span>{position}</span>
                </p>
            </div>
        </div>
    );
}
