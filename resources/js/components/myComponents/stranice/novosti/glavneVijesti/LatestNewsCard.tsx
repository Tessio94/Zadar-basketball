import { Link } from '@inertiajs/react';
import { ArrowUpRight, CalendarDays } from 'lucide-react';
import { show } from '@/actions/App/Http/Controllers/ArticleController';
import { articleCardDate, articleCardImage } from '../articleCard';
import type { ArticleCardData } from '../articleCard';
import ArticleCardTags from '../ArticleCardTags';

type LatestNewsCardProps = {
    article: ArticleCardData;
    fullWidth?: boolean;
};

export default function LatestNewsCard({
    article,
    fullWidth = false,
}: LatestNewsCardProps) {
    const date = articleCardDate(article);

    return (
        <article className="h-full min-w-0">
            <Link
                href={show(article.id)}
                className="group flex h-full min-w-0 flex-col overflow-hidden rounded-3xl border border-likar1 bg-likar4 shadow-xl shadow-black/15 transition-colors duration-300 hover:border-likar3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-likar3 motion-reduce:transition-none lg:grid lg:grid-cols-[1.20fr_0.8fr]"
            >
                <div
                    className="relative isolate aspect-[16/10] overflow-hidden bg-slate-950/40 lg:aspect-auto lg:min-h-96"
                    style={{
                        viewTransitionName: `article-image-${article.id}`,
                    }}
                >
                    <img
                        src={articleCardImage(article)}
                        alt=""
                        width={1200}
                        height={750}
                        loading="eager"
                        decoding="async"
                        className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-black/10"
                    />
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-center p-5 sm:p-6 xl:p-8">
                    <h2
                        className={`font-heading text-3xl leading-tight font-semibold break-words text-slate-100 xl:text-4xl ${
                            fullWidth ? '2xl:text-5xl' : ''
                        }`}
                    >
                        {article.title}
                    </h2>

                    {article.excerpt && (
                        <p className="mt-4 line-clamp-4 font-text text-sm leading-relaxed break-words text-slate-300 xl:text-base">
                            {article.excerpt}
                        </p>
                    )}

                    <ArticleCardTags tags={article.tags} />

                    {date && (
                        <time
                            dateTime={date.dateTime}
                            className="mt-4 inline-flex items-center gap-1.5 font-text text-xs text-slate-300"
                        >
                            <CalendarDays
                                aria-hidden="true"
                                className="size-3.5 shrink-0 text-slate-400"
                            />
                            {date.label}
                        </time>
                    )}

                    <div className="mt-7 sm:mt-8">
                        <span className="inline-flex items-center gap-2 rounded-full bg-likar3 px-5 py-3 font-text text-sm font-semibold text-slate-950">
                            Pročitaj članak
                            <ArrowUpRight
                                aria-hidden="true"
                                className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
                            />
                        </span>
                    </div>
                </div>
            </Link>
        </article>
    );
}
