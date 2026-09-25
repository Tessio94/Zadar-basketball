import { Head } from '@inertiajs/react';
import { Clock } from 'lucide-react';
import SideArticleCard from '@/components/myComponents/stranice/novosti/clanak/sideArticleGrid';
import useFancybox from '@/hooks/use-fancybox';
import type { Article } from '@/types/propTypes';
import ArticleContent from '@/components/myComponents/stranice/novosti/clanak/articleContent';

const APP_URL = import.meta.env.VITE_APP_URL;

export default function Article({ article }: { article: Article }) {
    const [fancyboxRef] = useFancybox({
        infinite: false,
    });

    return (
        <>
            <Head>
                <title>
                    {article.meta_title
                        ? article.meta_title
                        : `Dobrodošli na službenu stranicu Likar Krombacher - Lige
                    košarkaških amatera i rekreativaca | Likar Krombacker`}
                </title>
                <meta
                    name="description"
                    content={
                        article.meta_description
                            ? article.meta_description
                            : `Your description here`
                    }
                />
            </Head>
            <section className="mx-auto my-5 max-[450px]:px-4! max-2xl:px-18 max-xl:px-16 max-lg:px-12 max-sm:px-10 sm:my-5 2xl:max-w-300">
                <div className="rounded-4xl border border-likar1 bg-likar2 shadow-2xl shadow-likar1">
                    <div className="relative h-[65vh] sm:h-[85vh]">
                        <div
                            className="h-full rounded-t-4xl bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: article.main_image
                                    ? `url(${APP_URL}/storage/${article.main_image})`
                                    : `url(/images/design/landing.jpg)`,
                                viewTransitionName: `article-image-${article.id}`,
                            }}
                        ></div>

                        <div className="article-hero-content absolute bottom-0 left-0 z-20 w-full px-5 pt-14 pb-6">
                            <div className="z-20 flex flex-col gap-4">
                                <span className="font-jet w-fit rounded-xl bg-slate-600 px-2 py-1 font-heading text-sm text-slate-100 transition-colors duration-300 group-hover:bg-likar1">
                                    2025-2026
                                </span>
                                <p className="font-text text-sm text-slate-100">
                                    {article.title}
                                </p>
                                <time className="flex flex-row items-center gap-3 text-sm text-slate-100">
                                    <Clock className="h-4 w-4" /> 23. veljače
                                    2026.
                                </time>
                            </div>
                            <div className="absolute inset-0 -z-10 bg-linear-to-t from-slate-900 via-slate-900/90 to-transparent" />
                        </div>
                    </div>
                    <div className="p-5">
                        {/* <div className="relative flex w-full flex-row justify-between gap-8">
                            <div className="relative my-4 flex grow flex-col items-center justify-center gap-6 rounded-xl bg-likar4/40 p-3.5 2xl:basis-[70%]">
                                <span className="font-jet w-fit rounded-xl bg-slate-600 px-2 py-1 font-heading text-base text-slate-100 transition-colors duration-300 group-hover:bg-likar1">
                                    2025-2026
                                </span>
                                <h2 className="font-heading text-2xl font-semibold text-slate-100">
                                    {article.title}
                                </h2>
                                <time className="flex flex-row items-center gap-3 font-text text-base text-slate-100">
                                    <Clock className="h-4 w-4" /> 23. veljače
                                    2026.
                                </time>
                            </div>
                            <div className="hidden shrink-0 max-2xl:w-[224px] md:block 2xl:basis-[30%]" />
                        </div> */}
                        <div className="relative flex w-full flex-col justify-between gap-8 md:flex-row">
                            <div className="mb-15 flex flex-col justify-start gap-6 max-2xl:grow 2xl:basis-[70%]">
                                {article.excerpt && (
                                    <div className="rounded-xl border border-likar4 bg-likar2 p-3.5">
                                        <p className="z-20 font-text text-xl font-medium text-slate-100">
                                            {article.excerpt}
                                        </p>
                                    </div>
                                )}
                                <ArticleContent content={article.content} />
                                <div className="mt-3 flex flex-wrap gap-2 text-slate-100">
                                    <span className="font-jet rounded-xl bg-slate-600 px-2 py-1 font-heading text-sm">
                                        2025-2026
                                    </span>
                                    <span className="font-jet rounded-xl bg-slate-600 px-2 py-1 font-heading text-sm">
                                        KK vodovod Ballers
                                    </span>
                                </div>
                            </div>
                            <SideArticleCard />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
