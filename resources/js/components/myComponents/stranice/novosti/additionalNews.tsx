import type { Article } from '@/types/propTypes';
import AdditionalNewsCard from './dodatneVijesti/additionalNewsCard';

export default function AdditionalNews({ articles }: { articles: Article[] }) {
    return (
        <>
            <section className="my-20">
                <div className="px-[5%]">
                    <h2 className="mb-10 font-heading text-5xl font-semibold text-slate-100">
                        Ostale vijesti
                    </h2>
                    <div className="grid w-fit items-start gap-10 rounded-2xl sm:grid-cols-2 xl:grid-cols-4">
                        {articles.map((article) => (
                            <AdditionalNewsCard
                                key={article.id}
                                article={article}
                            />
                        ))}
                    </div>
                    <div className="mx-auto mt-20 mb-25 w-fit">
                        <a
                            className="hover:bg-theme4 rounded-4xl border-2 border-transparent bg-likar2 px-5 py-2.5 font-text text-2xl font-semibold text-slate-100 transition-all duration-300 hover:border-likar1 hover:shadow-likar1 max-[1400px]:px-7 max-[1400px]:py-3 max-[640px]:text-2xl"
                            href="/arhiva"
                        >
                            Arhiva vijesti
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
