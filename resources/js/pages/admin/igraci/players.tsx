import { Head, Link, router } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import Pagination from '@/components/myComponents/common/pagination/Pagination';
import AdminMainContent from '@/components/myComponents/stranice/admin/ui/adminMainContent';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import type { Paginated, Player } from '@/types/propTypes';
import {
    create,
    destroy,
    edit,
    index,
} from '@/actions/App/Http/Controllers/Admin/PlayerController';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Igrači',
        href: index().url,
    },
];

export default function Players({ players }: { players: Paginated<Player> }) {
    console.log(players);
    return (
        <>
            <Head title="Admin panel | Igrači" />
            <AdminMainContent>
                <div className="flex min-h-full flex-col justify-between">
                    <div className="mb-4 flex justify-between">
                        <h1 className="text-xl font-bold">Ekipe</h1>

                        <Link
                            href={create()}
                            className="group flex flex-row items-center gap-2 rounded-lg border border-transparent bg-likar3 px-6 py-2 text-center! font-semibold text-slate-100 transition-colors duration-300 hover:border-likar3 hover:bg-likar1/40 hover:text-likar3"
                        >
                            <Plus className="transition-transform duration-300 group-hover:rotate-180" />{' '}
                            Kreiraj Igrača
                        </Link>
                    </div>
                    <div className="grow rounded-xl">
                        <div className="overflow-hidden rounded-xl border">
                            <table className="w-full">
                                <thead>
                                    <tr className="rounded-t-xl bg-linear-to-r from-likar3 via-likar1 to-likar3 text-slate-100 *:border-r *:p-5 *:text-start *:last:border-0 max-[500px]:*:p-2">
                                        <th className="text-center!">No.</th>
                                        <th style={{ width: '35%' }}>
                                            Prezime
                                        </th>
                                        <th style={{ width: '35%' }}>Ime</th>
                                        <th
                                            colSpan={2}
                                            className="text-center!"
                                        >
                                            Akcije
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {players.data.map((player) => (
                                        <tr
                                            key={player.id}
                                            className="*:border-r *:p-5 *:text-start *:last:border-0 even:bg-slate-200/60 max-[500px]:*:px-2 max-[500px]:*:py-3"
                                        >
                                            <td className="flex items-center justify-center">
                                                <span className="flex h-8 w-8 items-center justify-center rounded-full">
                                                    {player.id}
                                                </span>
                                            </td>
                                            <td>{player.last_name}</td>
                                            <td>{player.first_name}</td>
                                            <td className="text-center!">
                                                <Link
                                                    href={edit(player.id)}
                                                    className="rounded-lg bg-likar2 px-6 py-2 text-center! font-semibold transition-colors duration-300 hover:bg-likar4 hover:text-slate-100"
                                                >
                                                    Uredi
                                                </Link>
                                            </td>
                                            <td className="text-center!">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        if (
                                                            confirm(
                                                                'Jeste li sigurni da želite izbrisati ovaj članak?',
                                                            )
                                                        ) {
                                                            router.delete(
                                                                destroy(
                                                                    player.id,
                                                                ).url,
                                                            );
                                                        }
                                                    }}
                                                    className="cursor-pointer rounded-lg bg-likar3 px-6 py-2 text-center! font-semibold text-slate-100 transition-colors duration-300 hover:bg-likar4 hover:text-slate-100"
                                                >
                                                    Izbriši
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex flex-row justify-center">
                        <Pagination links={players.links} type="admin" />
                    </div>
                </div>
            </AdminMainContent>
        </>
    );
}

Players.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={breadcrumbs} children={page} />
);
