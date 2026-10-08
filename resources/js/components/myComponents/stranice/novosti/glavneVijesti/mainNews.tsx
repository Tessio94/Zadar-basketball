import type { Article } from '@/types/propTypes';
import EmptyNews from './EmptyNews';
import MainNewsGrid from './MainNewsGrid';
import SimpleNewsGrid from './SimpleNewsGrid';

export default function MainNews({ articles }: { articles: Article[] }) {
    if (articles.length === 0) {
        return <EmptyNews />;
    }

    if (articles.length < 5) {
        return <SimpleNewsGrid articles={articles} />;
    }

    return <MainNewsGrid articles={articles} />;
}
