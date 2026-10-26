import { Head, useForm } from '@inertiajs/react';
import {
    index,
    update,
} from '@/actions/App/Http/Controllers/Admin/PlayerController';
import AdminMainContent from '@/components/myComponents/stranice/admin/ui/adminMainContent';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import type { PlayerAdmin, PlayerEditForm } from '@/types/players';
import type { TeamSeasonOption } from '@/types/teams';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Igrači',
        href: index().url,
    },
    {
        title: 'Uredi igrača',
        href: '',
    },
];

export default function EditPlayer({
    player,
    teamSeasons,
}: {
    player: PlayerAdmin;
    teamSeasons: TeamSeasonOption[];
}) {
    const { data, setData, put, processing, errors } = useForm<PlayerEditForm>({
        first_name: player.first_name ?? '',
        last_name: player.last_name ?? '',
        date_of_birth: player.date_of_birth ?? '',
        height: player.height?.toString() ?? '',
        position: player.position ?? '',
        team_seasons: player.team_seasons.map((teamSeason) => ({
            team_season_id: teamSeason.id.toString(),
            jersey_number: teamSeason.pivot?.jersey_number?.toString() ?? '',
        })),
    });

    function updateAssignment(
        index: number,
        field: 'team_season_id' | 'jersey_number',
        value: string,
    ) {
        setData(
            'team_seasons',
            data.team_seasons.map((assignment, i) =>
                i === index ? { ...assignment, [field]: value } : assignment,
            ),
        );
    }

    function addAssignment() {
        setData('team_seasons', [
            ...data.team_seasons,
            { team_season_id: '', jersey_number: '' },
        ]);
    }

    function removeAssignment(index: number) {
        setData(
            'team_seasons',
            data.team_seasons.filter((_, i) => i !== index),
        );
    }

    function submit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        put(update(player.id).url);
    }

    return (
        <>
            <Head title="Admin panel | Novosti" />
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
                        <h3 className="text-xl font-semibold">
                            Ekipe i sezone
                        </h3>

                        {data.team_seasons.map((assignment, index) => (
                            <div
                                key={index}
                                className="grid gap-3 rounded-lg border p-4 md:grid-cols-[1fr_120px_auto]"
                            >
                                <div>
                                    <label className="mb-1 block font-semibold">
                                        Ekipa i sezona
                                    </label>

                                    <select
                                        value={assignment.team_season_id}
                                        onChange={(e) =>
                                            updateAssignment(
                                                index,
                                                'team_season_id',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded border p-2"
                                    >
                                        <option value="">
                                            Odaberi ekipu i sezonu
                                        </option>

                                        {teamSeasons.map((option) => {
                                            const alreadySelected =
                                                data.team_seasons.some(
                                                    (item, i) =>
                                                        i !== index &&
                                                        item.team_season_id ===
                                                            option.id.toString(),
                                                );

                                            return (
                                                <option
                                                    key={option.id}
                                                    value={option.id}
                                                    disabled={alreadySelected}
                                                >
                                                    {option.team.name} —{' '}
                                                    {option.season.name}
                                                </option>
                                            );
                                        })}
                                    </select>

                                    {errors[
                                        `team_seasons.${index}.team_season_id` as keyof typeof errors
                                    ] && (
                                        <p className="text-sm text-red-500">
                                            {
                                                errors[
                                                    `team_seasons.${index}.team_season_id` as keyof typeof errors
                                                ]
                                            }
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1 block font-semibold">
                                        Broj dresa
                                    </label>

                                    <input
                                        type="number"
                                        min="0"
                                        value={assignment.jersey_number}
                                        onChange={(e) =>
                                            updateAssignment(
                                                index,
                                                'jersey_number',
                                                e.target.value,
                                            )
                                        }
                                        className="w-full rounded border p-2"
                                    />
                                </div>

                                <div className="flex items-end">
                                    <button
                                        type="button"
                                        onClick={() => removeAssignment(index)}
                                        className="rounded border px-3 py-2"
                                    >
                                        Ukloni
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addAssignment}
                            className="rounded border px-4 py-2"
                        >
                            + Dodaj ekipu/sezonu
                        </button>
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

EditPlayer.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={breadcrumbs} children={page} />
);
