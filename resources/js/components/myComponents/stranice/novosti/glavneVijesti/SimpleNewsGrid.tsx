import AdditionalNewsCard from '@/components/myComponents/stranice/novosti/dodatneVijesti/additionalNewsCard';
import { cn } from '@/lib/utils';
import type { Article } from '@/types/propTypes';

export default function SimpleNewsGrid({ articles }: { articles: Article[] }) {
    return (
        <section className="px-[5%] py-10 xl:my-5">
            <div
                className={cn(
                    'mx-auto grid w-full max-w-7xl gap-10',
                    articles.length === 1
                        ? 'max-w-2xl'
                        : articles.length === 2
                          ? 'sm:grid-cols-2'
                          : 'sm:grid-cols-2 lg:grid-cols-3',
                )}
            >
                {articles.map((article) => (
                    <AdditionalNewsCard key={article.id} article={article} />
                ))}
            </div>
        </section>
    );
}
