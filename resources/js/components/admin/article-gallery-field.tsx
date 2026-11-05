import { router } from '@inertiajs/react';
import type { GalleryOption } from '@/types/galleries';

type ArticleGalleryFieldProps = {
    galleries: GalleryOption[];
    value: string;
    onChange: (id: string) => void;
    error?: string;
};

export default function ArticleGalleryField({
    galleries,
    value,
    onChange,
    error,
}: ArticleGalleryFieldProps) {
    const selected = galleries.find((gallery) => String(gallery.id) === value);
    return (
        <div className="space-y-2 rounded-xl border p-4">
            <label htmlFor="article-gallery" className="block font-semibold">
                Galerija uz članak
            </label>
            <select
                id="article-gallery"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="w-full rounded-lg border bg-background p-2.5"
                aria-describedby="article-gallery-help"
            >
                <option value="">Bez galerije</option>
                {galleries.map((gallery) => (
                    <option key={gallery.id} value={gallery.id}>
                        {gallery.title} ({gallery.images_count} fotografija)
                    </option>
                ))}
            </select>
            <p
                id="article-gallery-help"
                className="text-sm text-muted-foreground"
            >
                Povezana galerija prikazuje se ispod teksta članka. Fotografije
                i njihov redoslijed uređuju se u Galerijama.
            </p>
            {selected?.images_count === 0 && (
                <p className="text-sm text-amber-600">
                    Galerija je prazna i neće se prikazati dok ne dodate
                    fotografije.
                </p>
            )}
            {error && <p className="text-sm text-red-500">{error}</p>}
            <a
                href="/admin-panel/galerije/create"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm font-medium text-likar3 hover:underline"
            >
                Izradi novu galeriju u novoj kartici ↗
            </a>
            <button
                type="button"
                onClick={() => router.reload({ only: ['galleries'] })}
                className="block text-sm underline underline-offset-4"
            >
                Osvježi popis galerija
            </button>
            <p className="text-xs text-muted-foreground">
                Nakon izrade galerije osvježite popis. Tekst članka ostaje
                sačuvan u obrascu.
            </p>
        </div>
    );
}
