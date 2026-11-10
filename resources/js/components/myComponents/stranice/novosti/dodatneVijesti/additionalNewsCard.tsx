import { Link } from '@inertiajs/react';
import { ArrowUpRight, CalendarDays } from 'lucide-react';
import { show } from '@/actions/App/Http/Controllers/ArticleController';
import { articleCardDate, articleCardImage } from '../articleCard';
import type { ArticleCardData } from '../articleCard';
import ArticleCardTags from '../ArticleCardTags';

type AdditionalNewsCardProps = {
    article: ArticleCardData;
    horizontal?: boolean;
    headingLevel?: 'h2' | 'h3';
};

export default function AdditionalNewsCard({
    article,
    horizontal = false,
    headingLevel = 'h3',
}: AdditionalNewsCardProps) {
    const date = articleCardDate(article);
    const Heading = headingLevel;

    return (
        <article className="h-full min-w-0">
            <Link
                href={show(article.id)}
                className={`group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-likar1 bg-likar4 shadow-lg shadow-black/15 transition-colors duration-300 hover:border-likar3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-likar3 motion-reduce:transition-none ${
                    horizontal ? 'sm:grid sm:grid-cols-[1fr_1.4fr]' : ''
                }`}
            >
                <div
                    className={`relative isolate aspect-[16/10] overflow-hidden rounded-t-2xl bg-slate-950/40 ${
                        horizontal ? 'sm:aspect-auto sm:min-h-64' : ''
                    }`}
                    style={{
                        viewTransitionName: `article-image-${article.id}`,
                    }}
                >
                    <img
                        src={articleCardImage(article)}
                        alt=""
                        width={1200}
                        height={750}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 size-full rounded-t-2xl object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-10"
                    />
                </div>

                <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
                    <Heading className="line-clamp-3 font-heading text-2xl leading-tight font-semibold break-words text-slate-100">
                        {article.title}
                    </Heading>

                    {article.excerpt && (
                        <p className="mt-3 line-clamp-3 font-text text-sm leading-relaxed break-words text-slate-300">
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

                    <div className="mt-auto pt-6">
                        <span className="inline-flex items-center gap-2 font-text text-sm font-semibold text-likar3">
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
