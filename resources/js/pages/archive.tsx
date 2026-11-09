import { Head, Link } from '@inertiajs/react';
import Pagination from '@/components/myComponents/common/pagination/Pagination';
import ArchiveNews from '@/components/myComponents/stranice/arhiva/archiveNews';
import EmptyNews from '@/components/myComponents/stranice/novosti/glavneVijesti/emptyNews';
import { archive } from '@/routes';
import type { Paginated } from '@/types/pagination';
import type { ArticleTag } from '@/types/tags';
import type { ArticleCardData } from '@/components/myComponents/stranice/novosti/articleCard';

export default function Archive({
    articles,
    activeTag,
}: {
    articles: Paginated<ArticleCardData>;
    activeTag: ArticleTag | null;
}) {
    return (
        <>
            <Head>
                <title>
                    {activeTag
                        ? `${activeTag.name} | Arhiva | Likar Zadar`
                        : 'Arhiva | Likar Zadar'}
                </title>
                <meta name="description" content="Your page description" />
            </Head>
            <section className="px-[5%] py-10 xl:my-5">
                <h2 className="mb-10 font-heading text-5xl font-semibold text-slate-100">
                    Arhiva vijesti
                </h2>
                {activeTag && (
                    <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-likar3/30 bg-likar2 p-4 text-slate-100">
                        <p>
                            Oznaka: <strong>{activeTag.name}</strong>{' '}
                            <span className="text-sm text-slate-400">
                                ({articles.total})
                            </span>
                        </p>
                        <Link
                            href={archive()}
                            className="rounded-lg px-3 py-2 text-sm font-semibold text-likar3 hover:underline focus-visible:outline-2 focus-visible:outline-likar3"
                        >
                            Prikaži sve vijesti
                        </Link>
                    </div>
                )}
                {articles.data.length > 0 ? (
                    <ArchiveNews articles={articles} />
                ) : activeTag ? (
                    <p className="rounded-xl border border-white/10 p-6 text-slate-300">
                        Još nema objavljenih vijesti s ovom oznakom.
                    </p>
                ) : (
                    <EmptyNews />
                )}
            </section>
            {articles.data.length > 0 && (
                <section className="flex flex-row justify-center px-[5%] py-10 xl:my-5">
                    <Pagination links={articles.links} type="front" />
                </section>
            )}
        </>
    );
}
