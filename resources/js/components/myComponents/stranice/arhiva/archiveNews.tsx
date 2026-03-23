import type { Article, Paginated } from '@/types/propTypes';
import AdditionalNewsCard from '../novosti/dodatneVijesti/additionalNewsCard';

export default function ArchiveNews({
    articles,
}: {
    articles: Paginated<Article>;
}) {
    return (
        <div className="grid w-fit items-start gap-10 rounded-2xl sm:grid-cols-2 xl:grid-cols-4">
            {articles.data.map((article) => (
                <AdditionalNewsCard key={article.id} article={article} />
            ))}
        </div>
    );
}
