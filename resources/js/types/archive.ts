export type Article = {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string | null;
    main_image: string | null;
    meta_description: string | null;
    meta_title: string | null;
    status: string;
    created_at: string;
    published_at: string | null;
    updated_at: string;
};
