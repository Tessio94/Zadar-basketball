import { router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

import {
    destroyImage,
    store,
    update,
} from '@/actions/App/Http/Controllers/Admin/GalleryController';
import { slugify } from '@/lib/utils';
import type { Gallery } from '@/types/propTypes';

interface ExistingImage {
    id: number;
    path: string;
    alt: string | null;
    caption: string | null;
}

export default function GalleryForm({ gallery }: { gallery?: Gallery }) {
    const isEditing = Boolean(gallery);
    console.log('gallery', gallery);
    const [existingImages, setExistingImages] = useState<ExistingImage[]>(
        gallery?.images ?? [],
    );

    const { data, setData, post, processing, errors } = useForm<{
        title: string;
        slug: string;
        date: string;
        images: File[];
        alts: Record<number, string>;
        captions: Record<number, string>;
    }>({
        title: gallery?.title ?? '',
        slug: gallery?.slug ?? '',
        date: gallery?.date ? gallery.date.substring(0, 10) : '',
        images: [],
        alts: {},
        captions: {},
    });

    useEffect(() => {
        if (!gallery) {
            return;
        }

        const alts: Record<number, string> = {};
        const captions: Record<number, string> = {};

        gallery.images.forEach((image) => {
            alts[image.id] = image.alt ?? '';
            captions[image.id] = image.caption ?? '';
        });

        setData('alts', alts);
        setData('captions', captions);
    }, [gallery]);

    const submit = (event: React.FormEvent) => {
        event.preventDefault();

        if (isEditing) {
            post(update(gallery!.id).url, {
                forceFormData: true,
                data: {
                    ...data,
                    _method: 'put',
                },
            });

            return;
        }

        post(store().url, {
            forceFormData: true,
        });
    };

    // const generateSlug = () => {
    //     setData('slug', slugify(data.title));
    // };

    const removeExistingImage = (id: number) => {
        if (!gallery) {
            return;
        }

        if (!confirm('Obrisati ovu fotografiju?')) {
            return;
        }

        // router.delete(`/admin-panel/galerije/${gallery.id}/images/${id}`);
        router.delete(destroyImage(gallery.id, id).url);
    };

    return (
        <form onSubmit={submit} className="space-y-8">
            <div className="rounded-2xl bg-white p-6 shadow">
                <h2 className="mb-6 text-xl font-semibold">
                    Podaci o galeriji
                </h2>

                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block font-medium">Naslov</label>

                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => {
                                setData('title', e.target.value);
                                setData('slug', slugify(e.target.value));
                            }}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        />

                        {errors.title && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">Datum</label>

                        <input
                            type="date"
                            value={data.date}
                            onChange={(e) => setData('date', e.target.value)}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3"
                        />

                        {errors.date && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.date}
                            </p>
                        )}
                    </div>

                    <div className="md:col-span-2">
                        <label className="mb-2 block font-medium">Slug</label>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={data.slug}
                                readOnly
                                className="flex-1 rounded-xl border border-slate-300 px-4 py-3"
                            />
                        </div>

                        {errors.slug && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.slug}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {isEditing && existingImages.length > 0 && (
                <div className="rounded-2xl bg-white p-6 shadow">
                    <h2 className="mb-6 text-xl font-semibold">
                        Postojeće fotografije
                    </h2>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {existingImages.map((image) => (
                            <div
                                key={image.id}
                                className="overflow-hidden rounded-xl border"
                            >
                                <img
                                    src={`/storage/${image.path}`}
                                    alt={image.alt ?? ''}
                                    className="aspect-video w-full object-cover"
                                />

                                <div className="space-y-3 p-4">
                                    <input
                                        type="text"
                                        value={
                                            data.alts[image.id] ??
                                            image.alt ??
                                            ''
                                        }
                                        onChange={(e) =>
                                            setData('alts', {
                                                ...data.alts,
                                                [image.id]: e.target.value,
                                            })
                                        }
                                        placeholder="Alt tekst"
                                        className="w-full rounded-lg border px-3 py-2"
                                    />

                                    <input
                                        type="text"
                                        value={
                                            data.captions[image.id] ??
                                            image.caption ??
                                            ''
                                        }
                                        onChange={(e) =>
                                            setData('captions', {
                                                ...data.captions,
                                                [image.id]: e.target.value,
                                            })
                                        }
                                        placeholder="Opis fotografije"
                                        className="w-full rounded-lg border px-3 py-2"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeExistingImage(image.id)
                                        }
                                        className="w-full rounded-lg bg-red-50 px-3 py-2 text-red-600"
                                    >
                                        Obriši fotografiju
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="rounded-2xl bg-white p-6 shadow">
                <h2 className="mb-2 text-xl font-semibold">
                    Dodaj fotografije
                </h2>

                <p className="mb-6 text-sm text-slate-500">
                    Možete odabrati više fotografija odjednom.
                </p>

                <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    multiple
                    onChange={(e) =>
                        setData('images', Array.from(e.target.files ?? []))
                    }
                    className="w-full rounded-xl border border-slate-300 p-3"
                />

                {data.images.map((file, index) => (
                    <div
                        key={`${file.name}-${file.lastModified}`}
                        className="my-3 rounded-xl border p-3 last:mb-0"
                    >
                        <p className="truncate text-sm font-medium">
                            {file.name}
                        </p>

                        <p className="text-xs text-slate-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>

                        <input
                            type="text"
                            value={data.alts[index] ?? ''}
                            onChange={(e) =>
                                setData('alts', {
                                    ...data.alts,
                                    [index]: e.target.value,
                                })
                            }
                            placeholder="Alt tekst"
                            className="mt-3 w-full rounded-lg border px-3 py-2"
                        />

                        <input
                            type="text"
                            value={data.captions[index] ?? ''}
                            onChange={(e) =>
                                setData('captions', {
                                    ...data.captions,
                                    [index]: e.target.value,
                                })
                            }
                            placeholder="Opis fotografije"
                            className="mt-2 w-full rounded-lg border px-3 py-2"
                        />
                    </div>
                ))}

                {errors.images && (
                    <p className="mt-2 text-sm text-red-600">{errors.images}</p>
                )}
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={processing}
                    className="rounded-xl bg-likar3 px-6 py-3 font-semibold text-white disabled:opacity-50"
                >
                    {processing
                        ? 'Spremanje...'
                        : isEditing
                          ? 'Spremi promjene'
                          : 'Kreiraj galeriju'}
                </button>
            </div>
        </form>
    );
}
