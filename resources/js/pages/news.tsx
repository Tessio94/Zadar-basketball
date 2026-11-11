import AdditionalNews from '@/components/myComponents/stranice/novosti/additionalNews';
import MainNews from '@/components/myComponents/stranice/novosti/glavneVijesti/mainNews';
import Seo from '@/components/seo';
import type { Article } from '@/types/articles';

export default function Novosti({
    mainArticles,
    additionalArticles,
}: {
    mainArticles: Article[];
    additionalArticles: Article[];
}) {
    return (
        <>
            <Seo
                title="Novosti | Likar Zadar"
                description="Najnovije vijesti iz LIKAR lige Zadar: najave utakmica, izvještaji, rezultati i obavijesti za igrače i navijače."
                url="/novosti"
            />
            <section
                aria-labelledby="latest-news-heading"
                className="px-[5%] py-10 xl:my-5"
            >
                <header className="mb-6 border-b border-slate-100/15 pb-6 sm:mb-8 sm:pb-8">
                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-8">
                        <h1
                            id="latest-news-heading"
                            className="font-heading text-5xl leading-none font-semibold tracking-tight text-slate-100 sm:text-6xl lg:text-7xl"
                        >
                            Novosti
                        </h1>
                        <p className="max-w-md font-text text-sm leading-relaxed text-slate-300 sm:text-base md:text-right">
                            Pronađite raspored, rezultate i aktualnosti iz lige.
                        </p>
                    </div>
                </header>
                <MainNews articles={mainArticles} />

                {additionalArticles.length > 0 && (
                    <AdditionalNews articles={additionalArticles} />
                )}
            </section>
        </>
    );
}
