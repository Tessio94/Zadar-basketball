import { Head, useForm } from '@inertiajs/react';
import {
    index,
    store,
} from '@/actions/App/Http/Controllers/Admin/PlayerController';
import AdminMainContent from '@/components/myComponents/stranice/admin/ui/adminMainContent';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import type { PlayerCreateForm } from '@/types/players';
import type { Season } from '@/types/seasons';
import type { Team } from '@/types/teams';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Igrači',
        href: index().url,
    },
    {
        title: 'Kreiraj igrača',
        href: '',
    },
];

export default function CreatePlayer({
    teams,
    seasons,
}: {
    teams: Team[];
    seasons: Season[];
}) {
    const { data, setData, post, processing, errors } =
        useForm<PlayerCreateForm>({
            first_name: '',
            last_name: '',
            date_of_birth: '',
            height: '',
            position: '',
            season_id: '',
            team_id: '',
            jersey_number: '',
        });

    function submit(e: React.SubmitEvent) {
        e.preventDefault();
        post(store().url);
    }

    return (
        <>
            <Head title="Admin panel | Igrači" />
            <AdminMainContent>
                <form
                    onSubmit={submit}
                    className="flex w-full flex-col flex-wrap space-y-6 xl:flex-row"
                >
                    <div className="space-y-6 xl:w-1/2 xl:pr-5 2xl:pr-10">
                        <h3 className="text-xl font-semibold underline-offset-2">
                            Podaci o igraču
                        </h3>
                        <div>
                            <label
                                htmlFor="frist_name"
                                className="mb-1 block font-semibold"
                            >
                                Ime
                            </label>
                            <input
                                id="first_name"
                                name="first_name"
                                type="text"
                                value={data.first_name}
                                onChange={(e) =>
                                    setData('first_name', e.target.value)
                                }
                                className="w-full rounded border p-2"
                            />
                            {errors.first_name && (
                                <div className="text-sm text-red-500">
                                    {errors.first_name}
                                </div>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="last_name"
                                className="mb-1 block font-semibold"
                            >
                                Prezime
                            </label>
                            <input
                                id="last_name"
                                name="last_name"
                                value={data.last_name}
                                onChange={(e) =>
                                    setData('last_name', e.target.value)
                                }
                                className="w-full rounded border p-2"
                            />
                            {errors.last_name && (
                                <div className="text-sm text-red-500">
                                    {errors.last_name}
                                </div>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="date_of_birth"
                                className="mb-1 block font-semibold"
                            >
                                Datum rođenja
                            </label>
                            <input
                                type="date"
                                id="city"
                                name="city"
                                value={data.date_of_birth}
                                onChange={(e) =>
                                    setData('date_of_birth', e.target.value)
                                }
                                className="w-full rounded border p-2"
                            />
                            {errors.date_of_birth && (
                                <div className="text-sm text-red-500">
                                    {errors.date_of_birth}
                                </div>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="height"
                                className="mb-1 block font-semibold"
                            >
                                Visina
                            </label>
                            <input
                                type="number"
                                id="height"
                                name="height"
                                value={data.height}
                                onChange={(e) =>
                                    setData('height', e.target.value)
                                }
                                className="w-full rounded border p-2"
                            />
                            {errors.height && (
                                <div className="text-sm text-red-500">
                                    {errors.height}
                                </div>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="position"
                                className="mb-1 block font-semibold"
                            >
                                Pozicija
                            </label>
                            <select
                                id="position"
                                name="position"
                                value={data.position}
                                onChange={(e) =>
                                    setData('position', e.target.value)
                                }
                                className="w-full rounded border p-2"
                            >
                                <option value="">Odaberi poziciju</option>
                                <option value="PG">PG</option>
                                <option value="SG">SG</option>
                                <option value="SF">SF</option>
                                <option value="PF">PF</option>
                                <option value="C">C</option>
                            </select>
                            {errors.position && (
                                <div className="text-sm text-red-500">
                                    {errors.position}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6 xl:w-1/2 xl:pl-5 2xl:pl-10">
                        <h3 className="text-xl font-semibold underline-offset-2">
                            Trenutna Ekipa
                        </h3>
                        <div>
                            <label
                                htmlFor="team_id"
                                className="mb-1 block font-semibold"
                            >
                                Ekipa
                            </label>
                            <select
                                id="team_id"
                                name="team_id"
                                value={data.team_id}
                                onChange={(e) =>
                                    setData('team_id', e.target.value)
                                }
                                className="w-full rounded border p-2"
                            >
                                <option value="">Odaberi ekipu</option>
                                {teams.map((team) => (
                                    <option key={team.id} value={team.id}>
                                        {team.name}
                                    </option>
                                ))}
                            </select>
                            {errors.team_id && (
                                <div className="text-sm text-red-500">
                                    {errors.team_id}
                                </div>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="season_id"
                                className="mb-1 block font-semibold"
                            >
                                Sezona
                            </label>
                            <select
                                id="season_id"
                                name="season_id"
                                value={data.season_id}
                                onChange={(e) =>
                                    setData('season_id', e.target.value)
                                }
                                className="w-full rounded border p-2"
                            >
                                <option value="">Odaberi sezonu</option>
                                {seasons.map((season) => (
                                    <option key={season.id} value={season.id}>
                                        {season.name}
                                    </option>
                                ))}
                            </select>
                            {errors.season_id && (
                                <div className="text-sm text-red-500">
                                    {errors.season_id}
                                </div>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="jersey_number"
                                className="mb-1 block font-semibold"
                            >
                                Broj
                            </label>
                            <input
                                type="number"
                                id="jersey_number"
                                name="jersey_number"
                                value={data.jersey_number}
                                onChange={(e) =>
                                    setData('jersey_number', e.target.value)
                                }
                                className="w-full rounded border p-2"
                            />
                            {errors.jersey_number && (
                                <div className="text-sm text-red-500">
                                    {errors.jersey_number}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-4 xl:w-1/2 xl:pt-6 xl:pr-5 2xl:pr-10">
                        <button
                            type="submit"
                            disabled={processing}
                            className="cursor-pointer rounded border border-transparent bg-likar3 px-6 py-2 font-semibold text-white transition-all duration-300 hover:border-likar3 hover:bg-likar1/40 hover:text-likar3"
                        >
                            Spremi
                        </button>
                    </div>
                </form>
            </AdminMainContent>
        </>
    );
}

CreatePlayer.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={breadcrumbs} children={page} />
);
