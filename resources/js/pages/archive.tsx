import { Head } from '@inertiajs/react';
import Pagination from '@/components/myComponents/common/pagination/Pagination';
import ArchiveNews from '@/components/myComponents/stranice/arhiva/archiveNews';
import type { Article, Paginated } from '@/types/propTypes';

export default function Archive({
    articles,
}: {
    articles: Paginated<Article>;
}) {
    console.log(articles);
    return (
        <>
            <Head>
                <title>Arhiva | Likar Krombacker</title>
                <meta name="description" content="Your page description" />
            </Head>
            <section className="my-20 px-[5%]">
                <h2 className="mb-10 font-heading text-5xl font-semibold text-slate-100">
                    Arhiva vijesti
                </h2>
                <ArchiveNews articles={articles} />
            </section>
            <section className="my-20 flex flex-row justify-center px-[5%]">
                <Pagination links={articles.links} />
            </section>
        </>
    );
}
