import { Head } from '@inertiajs/react';
import Pagination from '@/components/myComponents/common/pagination/Pagination';
import ArchiveNews from '@/components/myComponents/stranice/arhiva/archiveNews';
import EmptyNews from '@/components/myComponents/stranice/novosti/glavneVijesti/EmptyNews';
import type { Article, Paginated } from '@/types/propTypes';

export default function Archive({
    articles,
}: {
    articles: Paginated<Article>;
}) {
    return (
        <>
            <Head>
                <title>Arhiva | Likar Krombacher</title>
                <meta name="description" content="Your page description" />
            </Head>
            <section className="px-[5%] py-10 xl:my-5">
                <h2 className="mb-10 font-heading text-5xl font-semibold text-slate-100">
                    Arhiva vijesti
                </h2>
                {articles.data.length > 0 ? (
                    <ArchiveNews articles={articles} />
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
