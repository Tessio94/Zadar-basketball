import { Head } from '@inertiajs/react';
import { Clock } from 'lucide-react';
import SideArticleCard from '@/components/myComponents/stranice/novosti/clanak/sideArticleGrid';
import type { Article } from '@/types/propTypes';

const APP_URL = import.meta.env.VITE_APP_URL;

export default function Article({ article }: { article: Article }) {
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
            <section className="my-20 px-[5%]">
                <div className="rounded-4xl border border-likar1 bg-likar2 shadow-2xl shadow-likar1">
                    {article.main_image ? (
                        <div className="relative">
                            <img
                                src={`${APP_URL}/storage/${article.main_image}`}
                                alt=""
                                className="h-screen w-full rounded-t-4xl"
                            />
                            <div className="absolute bottom-0 left-0 z-20 w-full px-5 py-10">
                                <p className="z-20 font-text text-xl font-medium text-slate-100">
                                    {article.excerpt}
                                </p>
                                <div className="absolute inset-0 -z-10 bg-linear-to-t from-slate-900 via-slate-900 to-transparent" />
                            </div>
                        </div>
                    ) : (
                        <img
                            src="/images/design/landing.jpg"
                            alt=""
                            className="w-full rounded-t-4xl"
                        />
                    )}
                    <div className="p-5">
                        <div className="relative flex w-full flex-row justify-between gap-8">
                            <div className="relative my-15 flex grow flex-col items-center justify-center gap-6 2xl:basis-[70%]">
                                {/* <div className="absolute inset-0 z-0 bg-linear-to-r from-transparent via-likar2 to-transparent" /> */}
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
                        </div>
                        <div className="relative flex w-full flex-col justify-between gap-8 md:flex-row">
                            <div className="mb-15 flex flex-col justify-start gap-6 max-2xl:grow 2xl:basis-[70%]">
                                <div className="rounded-xl border border-likar4 bg-likar2 p-3.5">
                                    <p className="z-20 font-text text-xl font-medium text-slate-100">
                                        {article.excerpt}
                                    </p>
                                </div>
                                <div
                                    className="mb-15 flex flex-col justify-start gap-6 font-text text-xl text-slate-100"
                                    dangerouslySetInnerHTML={{
                                        __html: article.content,
                                    }}
                                ></div>
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
