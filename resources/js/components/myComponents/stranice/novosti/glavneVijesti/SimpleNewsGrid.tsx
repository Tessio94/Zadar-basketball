import type { ArticleCardData } from '../articleCard';
import AdditionalNewsCard from '../dodatneVijesti/additionalNewsCard';
import LatestNewsCard from './LatestNewsCard';

type SimpleNewsGridProps = {
    articles: ArticleCardData[];
};

export default function SimpleNewsGrid({ articles }: SimpleNewsGridProps) {
    const [latestArticle, ...remainingArticles] = articles;

    if (!latestArticle) return null;

    return (
        <div className="grid min-w-0 grid-cols-1 items-stretch gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-6">
            <div
                className={`min-w-0 sm:col-span-2 ${
                    articles.length === 1 ? 'lg:col-span-6' : 'lg:col-span-4'
                }`}
            >
                <LatestNewsCard
                    article={latestArticle}
                    fullWidth={articles.length === 1}
                />
            </div>

            {remainingArticles.map((article, index) => {
                const isSecondArticle = index === 0;
                const fillsSecondRow = articles.length === 3 && index === 1;

                return (
                    <div
                        key={article.id}
                        className={`min-w-0 ${
                            isSecondArticle
                                ? 'sm:col-span-2 lg:col-span-2'
                                : fillsSecondRow
                                  ? 'sm:col-span-2 lg:col-span-6'
                                  : 'sm:col-span-1 lg:col-span-3'
                        }`}
                    >
                        <AdditionalNewsCard
                            article={article}
                            horizontal={fillsSecondRow}
                            headingLevel="h2"
                        />
                    </div>
                );
            })}
        </div>
    );
}
