import { move } from '@dnd-kit/helpers';
import { DragDropProvider, type DragEndEvent } from '@dnd-kit/react';
import { isSortable } from '@dnd-kit/react/sortable';
import { router, useForm } from '@inertiajs/react';
import { GripVertical } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import {
    destroyImage,
    store,
    update,
    updateImage,
    reorderImages,
} from '@/actions/App/Http/Controllers/Admin/GalleryController';
import { slugify } from '@/lib/utils';
import type { Gallery } from '@/types/propTypes';
import { SortableImageCard } from './sortableImageCard';

type ExistingImage = {
    id: number;
    path: string;
    alt: string | null;
    caption: string | null;
};

export default function GalleryForm({ gallery }: { gallery?: Gallery }) {
    const isEditing = Boolean(gallery);
    console.log('gallery', gallery);
    const [existingImages, setExistingImages] = useState<ExistingImage[]>(
        gallery?.images ?? [],
    );

    const { data, setData, post, put, processing, errors } = useForm<{
        title: string;
        slug: string;
        date: string;
        images: File[];
        alts: Record<number, string>;
        captions: Record<number, string>;
        newAlts: Record<number, string>;
        newCaptions: Record<number, string>;
    }>({
        title: gallery?.title ?? '',
        slug: gallery?.slug ?? '',
        date: gallery?.date ? gallery.date.substring(0, 10) : '',
        images: [],
        alts: gallery
            ? Object.fromEntries(
                  gallery.images.map((image) => [image.id, image.alt ?? '']),
              )
            : {},
        captions: gallery
            ? Object.fromEntries(
                  gallery.images.map((image) => [
                      image.id,
                      image.caption ?? '',
                  ]),
              )
            : {},
        newAlts: {},
        newCaptions: {},
    });

    const submit = (event: React.SubmitEvent) => {
        event.preventDefault();

        if (isEditing) {
            put(update(gallery!.id).url, {
                forceFormData: true,
            });

            return;
        }

        post(store().url, {
            forceFormData: true,
        });
    };

    const removeExistingImage = (id: number) => {
        if (!gallery) {
            return;
        }

        toast('Obrisati ovu fotografiju?', {
            action: {
                label: 'Obriši',
                onClick: () => {
                    router.delete(
                        destroyImage({
                            gallery: gallery.id,
                            image: id,
                        }).url,
                        {
                            preserveScroll: true,
                            onSuccess: () => {
                                setExistingImages((images) =>
                                    images.filter((image) => image.id !== id),
                                );
                            },
                        },
                    );
                },
            },
            cancel: {
                label: 'Odustani',
                onClick: () => {},
            },
        });
    };

    const saveExistingImage = (
        imageId: number,
        alt: string,
        caption: string,
    ) => {
        if (!gallery) {
            return;
        }

        router.patch(
            updateImage({
                gallery: gallery.id,
                image: imageId,
            }).url,
            {
                alt,
                caption,
            },
            {
                preserveScroll: true,
            },
        );
    };

    const handleDragEnd = (event: DragEndEvent) => {
        if (event.canceled || !gallery) {
            return;
        }

        const { source } = event.operation;

        if (!isSortable(source)) {
            return;
        }

        const { initialIndex, index } = source;

        if (initialIndex === index) {
            return;
        }

        const reordered = move(existingImages, event);

        setExistingImages(reordered);

        router.patch(
            reorderImages(gallery.id).url,
            {
                images: reordered.map((image) => image.id),
            },
            {
                preserveScroll: true,
            },
        );
    };

    return (
        <form onSubmit={submit} className="space-y-8">
            <div className="rounded bg-white p-6 shadow">
                <h2 className="mb-6 text-xl font-semibold">
                    Podaci o galeriji
                </h2>

                <div className="grid gap-6 md:grid-cols-2">
                    <div>
                        <label
                            htmlFor="title"
                            className="mb-2 block font-medium"
                        >
                            Naslov
                        </label>

                        <input
                            type="text"
                            id="title"
                            value={data.title}
                            onChange={(e) => {
                                setData('title', e.target.value);
                                setData('slug', slugify(e.target.value));
                            }}
                            className="w-full rounded border border-slate-300 px-4 py-3"
                        />

                        {errors.title && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="date"
                            className="mb-2 block font-medium"
                        >
                            Datum
                        </label>

                        <input
                            type="date"
                            id="date"
                            value={data.date}
                            onChange={(e) => setData('date', e.target.value)}
                            className="w-full rounded border border-slate-300 px-4 py-3"
                        />

                        {errors.date && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.date}
                            </p>
                        )}
                    </div>

                    <div className="md:col-span-2">
                        <label
                            htmlFor="slug"
                            className="mb-2 block font-medium"
                        >
                            Slug
                        </label>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                id="slug"
                                value={data.slug}
                                readOnly
                                className="flex-1 rounded border border-slate-300 px-4 py-3"
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
                <div className="rounded bg-white p-6 shadow">
                    <h2 className="mb-6 text-xl font-semibold">
                        Postojeće fotografije
                    </h2>
                    <DragDropProvider onDragEnd={handleDragEnd}>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {existingImages.map((image, index) => (
                                <SortableImageCard
                                    key={image.id}
                                    id={image.id}
                                    index={index}
                                >
                                    <div className="group relative overflow-hidden rounded border">
                                        <GripVertical className="absolute top-2 right-2 text-slate-100 transition-colors duration-300 group-hover:text-likar3" />
                                        <img
                                            src={`/storage/${image.path}`}
                                            alt={image.alt ?? ''}
                                            className="aspect-video w-full object-cover"
                                        />

                                        <div className="space-y-3 p-4">
                                            <div>
                                                <label
                                                    htmlFor={`alt-${image.id}`}
                                                    className="sr-only"
                                                >
                                                    Alt tekst za fotografiju
                                                </label>
                                                <input
                                                    type="text"
                                                    id={`alt-${image.id}`}
                                                    value={
                                                        data.alts[image.id] ??
                                                        image.alt ??
                                                        ''
                                                    }
                                                    onChange={(e) =>
                                                        setData('alts', {
                                                            ...data.alts,
                                                            [image.id]:
                                                                e.target.value,
                                                        })
                                                    }
                                                    placeholder="Alt tekst"
                                                    className="w-full rounded border px-3 py-2"
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor={`caption-${image.id}`}
                                                    className="sr-only"
                                                >
                                                    Opis fotografije
                                                </label>
                                                <input
                                                    type="text"
                                                    id={`caption-${image.id}`}
                                                    value={
                                                        data.captions[
                                                            image.id
                                                        ] ??
                                                        image.caption ??
                                                        ''
                                                    }
                                                    onChange={(e) =>
                                                        setData('captions', {
                                                            ...data.captions,
                                                            [image.id]:
                                                                e.target.value,
                                                        })
                                                    }
                                                    placeholder="Opis fotografije"
                                                    className="w-full rounded border px-3 py-2"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    saveExistingImage(
                                                        image.id,
                                                        data.alts[image.id] ??
                                                            '',
                                                        data.captions[
                                                            image.id
                                                        ] ?? '',
                                                    )
                                                }
                                                className="w-full rounded bg-slate-200/70 px-3 py-2 text-slate-900"
                                            >
                                                Spremi podatke
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeExistingImage(
                                                        image.id,
                                                    )
                                                }
                                                className="w-full rounded bg-red-50 px-3 py-2 text-red-600"
                                            >
                                                Obriši fotografiju
                                            </button>
                                        </div>
                                    </div>
                                </SortableImageCard>
                            ))}
                        </div>
                    </DragDropProvider>
                </div>
            )}

            <div className="rounded bg-white p-6 shadow">
                <h2 className="mb-2 text-xl font-semibold">
                    Dodaj fotografije
                </h2>

                <p className="mb-6 text-sm text-slate-500">
                    Možete odabrati više fotografija odjednom.
                </p>
                <div>
                    <label htmlFor="images" className="mb-2 block font-medium">
                        Fotografije
                    </label>

                    <input
                        type="file"
                        id="images"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        multiple
                        onChange={(e) =>
                            setData('images', Array.from(e.target.files ?? []))
                        }
                        className="w-full rounded border border-slate-300 p-3"
                    />
                </div>
                {data.images.map((file, index) => (
                    <div
                        key={`${file.name}-${file.lastModified}`}
                        className="my-3 rounded border p-3 last:mb-0"
                    >
                        <p className="truncate text-sm font-medium">
                            {file.name}
                        </p>

                        <p className="text-xs text-slate-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        <div>
                            <label
                                htmlFor={`new-alt${index}`}
                                className="sr-only"
                            >
                                Alt tekst za fotografiju
                            </label>
                            <input
                                type="text"
                                id={`new-alt${index}`}
                                value={data.newAlts[index] ?? ''}
                                onChange={(e) =>
                                    setData('newAlts', {
                                        ...data.newAlts,
                                        [index]: e.target.value,
                                    })
                                }
                                placeholder="Alt tekst"
                                className="mt-3 w-full rounded border px-3 py-2"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor={`new-caption${index}`}
                                className="sr-only"
                            >
                                Opis fotografije
                            </label>
                            <input
                                type="text"
                                id={`new-caption${index}`}
                                value={data.newCaptions[index] ?? ''}
                                onChange={(e) =>
                                    setData('newCaptions', {
                                        ...data.newCaptions,
                                        [index]: e.target.value,
                                    })
                                }
                                placeholder="Opis fotografije"
                                className="mt-2 w-full rounded border px-3 py-2"
                            />
                        </div>
                    </div>
                ))}

                {errors.images && (
                    <p className="mt-2 text-sm text-red-600">{errors.images}</p>
                )}
            </div>

            <div className="flex justify-start">
                <button
                    type="submit"
                    disabled={processing}
                    className="cursor-pointer rounded border border-transparent bg-likar3 px-6 py-2 font-semibold text-white transition-all duration-300 hover:border-likar3 hover:bg-likar1/40 hover:text-likar3 disabled:opacity-50"
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
