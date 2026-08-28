import { Head, useForm } from '@inertiajs/react';
import {
    index,
    store,
} from '@/actions/App/Http/Controllers/Admin/SeasonController';
import AdminMainContent from '@/components/myComponents/stranice/admin/ui/adminMainContent';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import type { SeasonForm } from '@/types/propTypes';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Sezone',
        href: index().url,
    },
    {
        title: 'Kreiraj sezonu',
        href: '',
    },
];

export default function CreateSeason() {
    const { data, setData, post, processing, errors } = useForm<SeasonForm>({
        name: '',
        start_date: '',
        end_date: '',
        is_active: false,
    });

    function submit(e: React.SubmitEvent) {
        e.preventDefault();
        post(store().url);
    }

    return (
        <>
            <Head title="Admin panel | Ekipe" />
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
                                Ime sezone
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
                                htmlFor="start_date"
                                className="mb-1 block font-semibold"
                            >
                                Datum početka
                            </label>
                            <input
                                type="date"
                                id="start_date"
                                name="start_date"
                                value={data.start_date}
                                onChange={(e) =>
                                    setData('start_date', e.target.value)
                                }
                                className="w-full rounded border p-2"
                            />
                            {errors.start_date && (
                                <div className="text-sm text-red-500">
                                    {errors.start_date}
                                </div>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="end_date"
                                className="mb-1 block font-semibold"
                            >
                                Datum završetka
                            </label>
                            <input
                                type="date"
                                id="end_date"
                                name="end_date"
                                value={data.end_date}
                                onChange={(e) =>
                                    setData('end_date', e.target.value)
                                }
                                className="w-full rounded border p-2"
                            />
                            {errors.end_date && (
                                <div className="text-sm text-red-500">
                                    {errors.end_date}
                                </div>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="is_active"
                                className="mb-1 block font-semibold"
                            >
                                Trenutno aktivna
                            </label>
                            <input
                                id="is_active"
                                name="is_active"
                                type="checkbox"
                                checked={data.is_active}
                                onChange={(e) =>
                                    setData('is_active', e.target.checked)
                                }
                                className="h-6 w-6 rounded border p-2"
                            />
                            {errors.is_active && (
                                <div className="text-sm text-red-500">
                                    {errors.is_active}
                                </div>
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

CreateSeason.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={breadcrumbs} children={page} />
);
