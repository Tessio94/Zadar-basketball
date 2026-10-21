import type { GalleryImage } from '@/types/propTypes';

// Optional server-generated derivatives. Existing records remain compatible.
export type GalleryDisplayImage = GalleryImage & {
    preview_path?: string | null;
    thumbnail_path?: string | null;
};

function storageUrl(path: string) {
    return `/storage/${path.replace(/^\/+/, '').split('/').map(encodeURIComponent).join('/')}`;
}

export function galleryImageSources(image: GalleryDisplayImage) {
    const original = storageUrl(image.path);

    return {
        original,
        preview: image.preview_path ? storageUrl(image.preview_path) : original,
        thumbnail: image.thumbnail_path ? storageUrl(image.thumbnail_path) : original,
    };
}

// Fancybox captions accept HTML; display database captions as plain text.
export function escapeCaption(value: string) {
    return value.replace(/[&<>"']/g, (character) => {
        const entities: Record<string, string> = {
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
        };
        return entities[character];
    });
}
