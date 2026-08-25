import { Head, useForm } from '@inertiajs/react';
// import { ImageIcon } from 'lucide-react';
// import { useRef } from 'react';
import AdminMainContent from '@/components/myComponents/stranice/admin/ui/adminMainContent';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import type { PlayerForm } from '@/types/propTypes';
import {
    index,
    store,
} from '@/actions/App/Http/Controllers/Admin/PlayerController';

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

export default function CreatePlayer() {
    // const fileInputRef = useRef<HTMLInputElement | null>(null);

    const { data, setData, post, processing, errors } = useForm<PlayerForm>({
        first_name: '',
        last_name: '',
        date_of_birth: '',
        height: '',
        position: '',
        season_id: '',
        team_id: '',
        jersey_number: '',
    });

    // const slikaPreview: string | null = data.slika
    //     ? URL.createObjectURL(data.slika)
    //     : null;

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
                        <div className="space-y-6">
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
                                    <option value="pg">PG</option>
                                    <option value="sg">SG</option>
                                    <option value="sf">SF</option>
                                    <option value="pf">PF</option>
                                    <option value="c">C</option>
                                </select>
                                {errors.position && (
                                    <div className="text-sm text-red-500">
                                        {errors.position}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold underline-offset-2">
                                Momčad
                            </h3>

                            {/* <div>
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

                        <div>
                            <label
                                htmlFor="team"
                                className="mb-1 block font-semibold"
                            >
                                Ekipa
                            </label>
                            <input
                                type="number"
                                id="team"
                                name="team"
                                value={data.team}
                                onChange={(e) =>
                                    setData('team', e.target.value)
                                }
                                className="w-full rounded border p-2"
                            />
                            {errors.team && (
                                <div className="text-sm text-red-500">
                                    {errors.team}
                                </div>
                            )}
                        </div> */}

                            {/* <div>
                            <label
                                htmlFor="slika"
                                className="mb-1 block font-semibold"
                            >
                                Slika
                            </label>
                            <input
                                id="slika"
                                name="slika"
                                type="file"
                                accept=".png,.jpg,.gif,.webp,image/jpeg,image/gif,image/webp,image/png"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        setData('slika', e.target.files[0]);
                                    }
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
                            {errors.slika && (
                                <div className="text-sm text-red-500">
                                    {errors.slika}
                                </div>
                            )}
                        </div>

                        {slikaPreview && (
                            <div>
                                <img
                                    src={slikaPreview}
                                    alt="slika igrača"
                                    className="h-auto w-full rounded"
                                />
                            </div>
                        )} */}
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

CreatePlayer.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={breadcrumbs} children={page} />
);
