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

export type ArticleForm = {
    title: string;
    // published_at: string;
    excerpt: string;
    content: string;
    main_image: File | null;
    status: string;
    slug: string;
};

export type AdminArticleListItem = {
    id: number;
    title: string;
    published_at: string | null;
};

export type ArticleEditForm = ArticleForm & { published_at: string };

export type ArticleFilters = {
    search?: string;
    direction?: 'asc' | 'desc';
};
