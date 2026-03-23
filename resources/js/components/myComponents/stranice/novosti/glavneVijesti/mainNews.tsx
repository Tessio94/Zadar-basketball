import type { Article } from '@/types/propTypes';
import MainNewsCard from './mainNewsCard';

export default function MainNews({ articles }: { articles: Article[] }) {
    return (
        <section className="my-20 px-[5%]">
            <div className="grid w-full grid-cols-1 grid-rows-5 items-stretch max-sm:gap-10 sm:aspect-square sm:grid-cols-2 sm:grid-rows-3 lg:aspect-2/1 lg:grid-cols-4 lg:grid-rows-2 xl:aspect-3/1 xl:grid-cols-5">
                {articles.map((article, i) => (
                    <MainNewsCard
                        key={article.id}
                        article={article}
                        articleNo={i + 1}
                    />
                ))}
            </div>
        </section>
    );
}
