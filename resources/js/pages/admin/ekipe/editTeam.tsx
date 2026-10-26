import { Head, useForm } from '@inertiajs/react';
import { ImageIcon } from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';
import {
    index,
    update,
} from '@/actions/App/Http/Controllers/Admin/TeamController';
import AdminMainContent from '@/components/myComponents/stranice/admin/ui/adminMainContent';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import type { Season } from '@/types/seasons';
import type { TeamWithSeasons, TeamEditForm } from '@/types/teams';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Ekipe',
        href: index().url,
    },
    {
        title: 'Uredi ekipu',
        href: '',
    },
];

export default function EditTeam({
    team,
    seasons,
}: {
    team: TeamWithSeasons;
    seasons: Season[];
}) {
    console.log(team);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const { data, setData, post, transform, processing, errors } =
        useForm<TeamEditForm>({
            name: team.name ?? '',
            short_name: team.short_name ?? '',
            city: team.city ?? '',
            founded_year: team.founded_year?.toString() ?? '',
            logo_color: team.logo_color ?? '',
            logo: null,
            season_ids:
                team.seasons?.map((season) => season.id.toString()) ?? [],
        });

    const logoPreview = useMemo(() => {
        return data.logo ? URL.createObjectURL(data.logo) : null;
    }, [data.logo]);

    useEffect(() => {
        return () => {
            if (logoPreview) {
                URL.revokeObjectURL(logoPreview);
            }
        };
    }, [logoPreview]);

    function submit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        transform((formData) => ({
            ...formData,
            _method: 'put',
        }));

        post(update(team.id).url, {
            forceFormData: true,
        });
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
                        <div>
                            <label
                                htmlFor="name"
                                className="mb-1 block font-semibold"
                            >
                                Ime ekipe
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                className="w-full rounded border p-2"
                            />
                            {errors.name && (
                                <div className="text-sm text-red-500">
                                    {errors.name}
                                </div>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="short_name"
                                className="mb-1 block font-semibold"
                            >
                                Kratica
                            </label>
                            <input
                                id="short_name"
                                name="short_name"
                                value={data.short_name}
                                onChange={(e) =>
                                    setData('short_name', e.target.value)
                                }
                                className="w-full rounded border p-2"
                            />
                            {errors.short_name && (
                                <div className="text-sm text-red-500">
                                    {errors.short_name}
                                </div>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="city"
                                className="mb-1 block font-semibold"
                            >
                                Mjesto
                            </label>
                            <input
                                id="city"
                                name="city"
                                value={data.city}
                                onChange={(e) =>
                                    setData('city', e.target.value)
                                }
                                className="w-full rounded border p-2"
                            />
                            {errors.city && (
                                <div className="text-sm text-red-500">
                                    {errors.city}
                                </div>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="founded_year"
                                className="mb-1 block font-semibold"
                            >
                                Godina osnivanja
                            </label>
                            <input
                                type="number"
                                id="founded_year"
                                name="founded_year"
                                value={data.founded_year}
                                onChange={(e) =>
                                    setData('founded_year', e.target.value)
                                }
                                className="w-full rounded border p-2"
                            />
                            {errors.founded_year && (
                                <div className="text-sm text-red-500">
                                    {errors.founded_year}
                                </div>
                            )}
                        </div>
                        <div>
                            <label
                                htmlFor="logo_color"
                                className="mb-1 block font-semibold"
                            >
                                Boja ekipe
                            </label>
                            <input
                                type="text"
                                id="logo_color"
                                name="logo_color"
                                value={data.logo_color}
                                onChange={(e) =>
                                    setData('logo_color', e.target.value)
                                }
                                className="w-full rounded border p-2"
                            />
                            {errors.logo_color && (
                                <div className="text-sm text-red-500">
                                    {errors.logo_color}
                                </div>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="logo"
                                className="mb-1 block font-semibold"
                            >
                                Logo
                            </label>
                            <input
                                id="logo"
                                name="logo"
                                type="file"
                                accept=".png,.jpg,.gif,.webp,image/jpeg,image/gif,image/webp,image/png"
                                onChange={(e) => {
                                    setData(
                                        'logo',
                                        e.target.files?.[0] ?? null,
                                    );
                                }}
                                ref={fileInputRef}
                                className="sr-only"
                            />

                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="flex w-fit cursor-pointer flex-row items-center gap-2 rounded bg-black px-4 py-2 text-white transition-colors duration-300 hover:bg-likar4"
                            >
                                Odaberi sliku <ImageIcon strokeWidth="1.5" />
                            </button>
                            {errors.logo && (
                                <div className="text-sm text-red-500">
                                    {errors.logo}
                                </div>
                            )}
                        </div>

                        {(logoPreview || team.logo) && (
                            <div>
                                <img
                                    src={logoPreview ?? `/storage/${team.logo}`}
                                    alt={`${team.name} logo`}
                                    className="h-auto w-full rounded"
                                />
                            </div>
                        )}

                        <div className="space-y-3">
                            <h3 className="text-xl font-semibold">
                                Sezone u kojima je ekipa sudjelovala
                            </h3>

                            {seasons.map((season) => (
                                <label
                                    key={season.id}
                                    className="flex items-center gap-3"
                                >
                                    <input
                                        type="checkbox"
                                        checked={data.season_ids.includes(
                                            season.id.toString(),
                                        )}
                                        onChange={(e) => {
                                            const seasonId =
                                                season.id.toString();

                                            setData(
                                                'season_ids',
                                                e.target.checked
                                                    ? [
                                                          ...data.season_ids,
                                                          seasonId,
                                                      ]
                                                    : data.season_ids.filter(
                                                          (id) =>
                                                              id !== seasonId,
                                                      ),
                                            );
                                        }}
                                    />

                                    <span>{season.name}</span>
                                </label>
                            ))}

                            {errors.season_ids && (
                                <p className="text-sm text-red-500">
                                    {errors.season_ids}
                                </p>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="cursor-pointer rounded border border-transparent bg-likar3 px-6 py-2 font-semibold text-white transition-all duration-300 hover:border-likar3 hover:bg-likar1/40 hover:text-likar3"
                            >
                                Spremi
                            </button>
                        </div>
                    </div>
                </form>
            </AdminMainContent>
        </>
    );
}

EditTeam.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={breadcrumbs} children={page} />
);
