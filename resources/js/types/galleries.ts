export type GalleryImage = {
    id: number;
    gallery_id: number;
    path: string;
    alt: string | null;
    caption: string | null;
    sort_order: number;
    created_at: string;
    updated_at: string;
};

export type Gallery = {
    id: number;
    title: string;
    slug: string;
    date: string | null;
    images: GalleryImage[];
    images_count?: number;
    created_at: string;
    updated_at: string;
};
