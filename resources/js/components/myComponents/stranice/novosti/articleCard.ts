import type { Article } from '@/types/articles';

export type ArticleCardTag = {
    id: number;
    name: string;
};

export type ArticleCardData = Article & {
    tags?: readonly ArticleCardTag[] | null;
};

const dateFormatter = new Intl.DateTimeFormat('hr-HR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Zagreb',
});

export function articleCardDate(article: ArticleCardData) {
    const timestamp = article.published_at || article.created_at;
    const date = timestamp ? new Date(timestamp) : null;

    if (!date || Number.isNaN(date.getTime())) return null;

    return {
        dateTime: date.toISOString(),
        label: dateFormatter.format(date),
    };
}

export function articleCardImage(article: ArticleCardData): string {
    return typeof article.main_image === 'string' && article.main_image
        ? `/storage/${article.main_image}`
        : '/images/design/landing.jpg';
}
