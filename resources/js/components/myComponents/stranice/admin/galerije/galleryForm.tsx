import { router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

import type { Gallery } from '@/types/propTypes';

interface Props {
    gallery?: Gallery;
}

interface ExistingImage {
    id: number;
    path: string;
    alt: string | null;
    caption: string | null;
}

export default function GalleryForm({ gallery }: Props) {
    const isEditing = Boolean(gallery);

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
            post(`/admin-panel/galerije/${gallery!.id}`, {
                forceFormData: true,
                data: {
                    ...data,
                    _method: 'put',
                },
            });

            return;
        }

        post('/admin-panel/galerije', {
            forceFormData: true,
        });
    };

    const generateSlug = () => {
        const slug = data.title
            .toLowerCase()
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');

        setData('slug', slug);
    };

    const removeExistingImage = (id: number) => {
        if (!gallery) {
            return;
        }

        if (!confirm('Obrisati ovu fotografiju?')) {
            return;
        }

        router.delete(`/admin-panel/galerije/${gallery.id}/images/${id}`);
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
                            onChange={(e) => setData('title', e.target.value)}
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
                                onChange={(e) =>
                                    setData('slug', e.target.value)
                                }
                                className="flex-1 rounded-xl border border-slate-300 px-4 py-3"
                            />

                            <button
                                type="button"
                                onClick={generateSlug}
                                className="rounded-xl bg-slate-200 px-4 py-2"
                            >
                                Generiraj
                            </button>
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

                {data.images.length > 0 && (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {data.images.map((file) => (
                            <div
                                key={`${file.name}-${file.lastModified}`}
                                className="rounded-xl border p-3"
                            >
                                <p className="truncate text-sm font-medium">
                                    {file.name}
                                </p>

                                <p className="text-xs text-slate-500">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                            </div>
                        ))}
                    </div>
                )}

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
