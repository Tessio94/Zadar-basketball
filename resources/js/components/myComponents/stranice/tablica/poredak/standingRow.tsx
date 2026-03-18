import { Link } from '@inertiajs/react';
import { show } from '@/actions/App/Http/Controllers/TeamController';
import type { TableStandings } from '@/types/propTypes';

export default function StandingRow({
    standing,
    index,
}: {
    standing: TableStandings;
    index: number;
}) {
    const {
        id,
        name,
        logo,
        played,
        wins,
        losses,
        scored,
        allowed,
        difference,
        form,
    } = standing;
    return (
        <tr className="text-slate-100 odd:bg-likar2 even:bg-likar2/60">
            <td className="border-r border-likar4 p-2 text-center">
                {index + 1}
            </td>
            <td className="border-r border-likar4 p-2">
                <Link
                    href={show(id)}
                    className="flex flex-row flex-nowrap items-center justify-center gap-4 text-nowrap hover:underline"
                >
                    <img
                        src={logo}
                        alt={`${name} logo`}
                        className="h-6 w-6 shrink-0 rounded-full bg-white"
                    />
                    <span>{name}</span>
                </Link>
            </td>
            <td className="border-r border-likar4 p-2 text-center">{played}</td>
            <td className="border-r border-likar4 p-2 text-center">
                {+wins * 2}
            </td>
            <td className="border-r border-likar4 p-2 text-center">{wins}</td>
            <td className="border-r border-likar4 p-2 text-center">{losses}</td>
            <td className="border-r border-likar4 p-2 text-center">{scored}</td>
            <td className="border-r border-likar4 p-2 text-center">
                {allowed}
            </td>
            <td className="border-r border-likar4 p-2 text-center">
                {difference}
            </td>
            <td className="flex flex-row items-center justify-center gap-0.5 p-2 text-center">
                {form.map((game, i) => {
                    return game === 'W' ? (
                        <span
                            key={i}
                            className="h-6 w-6 shrink-0 rounded-full bg-green-600"
                        >
                            W
                        </span>
                    ) : (
                        <span
                            key={i}
                            className="h-6 w-6 shrink-0 rounded-full bg-red-600"
                        >
                            L
                        </span>
                    );
                })}
            </td>
        </tr>
    );
}
