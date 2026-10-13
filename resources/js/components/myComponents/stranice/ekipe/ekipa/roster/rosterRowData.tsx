import { Link } from '@inertiajs/react';
import { show } from '@/actions/App/Http/Controllers/PlayerController';
import BasketballPlayerIcon from '@/components/myComponents/ui/icons/basketballPlayer';

export default function RosterRowData({
    id,
    name,
    dateOfBirth,
    age,
    height,
    position,
    broj,
    jerseyColor,
}: {
    id: number;
    name: string;
    dateOfBirth: string | null;
    age: number;
    height: number | null;
    position: 'PG' | 'SG' | 'SF' | 'PF' | 'C' | null;
    broj: number;
    jerseyColor: string;
}) {
    return (
        <tr className="text-lg text-slate-100 odd:bg-likar2 even:bg-likar2/60">
            <td className="p-1 text-center text-nowrap">{broj}</td>
            <td className="p-1 text-center text-nowrap">
                <div className="flex flex-row items-center justify-center">
                    <BasketballPlayerIcon
                        className="h-10 w-10 shrink-0 rounded-full border border-slate-100/80 bg-gray-400 p-0.5 text-slate-900 max-[500px]:h-6 max-[500px]:w-6"
                        jerseyColor={jerseyColor}
                    />
                </div>
            </td>
            <td className="p-1 text-center text-nowrap">
                <Link href={show(id)} className="hover:underline">
                    {name}
                </Link>
            </td>
            <td className="p-1 text-center text-nowrap">
                {dateOfBirth?.split('T')[0].split('-').reverse().join('/')}
            </td>
            <td className="p-1 text-center text-nowrap">{age}</td>
            <td className="p-1 text-center text-nowrap">{height}</td>
            <td className="p-1 text-center text-nowrap">{position}</td>
        </tr>
    );
}
