import { Link } from '@inertiajs/react';
import { User2Icon } from 'lucide-react';
import { show } from '@/actions/App/Http/Controllers/PlayerController';

export default function RosterRowData({
    id,
    name,
    date_of_birth,
    age,
    height,
    position,
    broj,
}: {
    id: number;
    name: string;
    date_of_birth: string;
    age: number;
    height: number;
    position: 'PG' | 'SG' | 'SF' | 'PF' | 'C';
    broj: number;
}) {
    return (
        <tr className="text-lg text-slate-100 odd:bg-likar2 even:bg-likar2/60">
            <td className="p-1 text-center text-nowrap">{broj}</td>
            <td className="p-1 text-center text-nowrap">
                <div className="flex flex-row items-center justify-center">
                    <User2Icon className="h-10 w-10 shrink-0 rounded-full border border-slate-100/80 bg-likar4 p-0.5 text-slate-900 max-[500px]:h-5 max-[500px]:w-5" />
                </div>
            </td>
            <td className="p-1 text-center text-nowrap">
                <Link href={show(id)} className="hover:underline">
                    {name}
                </Link>
            </td>
            <td className="p-1 text-center text-nowrap">
                {date_of_birth.split('-').reverse().join('/')}
            </td>
            <td className="p-1 text-center text-nowrap">{age}</td>
            <td className="p-1 text-center text-nowrap">{height}</td>
            <td className="p-1 text-center text-nowrap">{position}</td>
        </tr>
    );
}
