import { Clock } from 'lucide-react';
import ArticleGallery from '@/components/articles/article-gallery';
import ArticleTags from '@/components/articles/article-tags';
import ArticleContent from '@/components/myComponents/stranice/novosti/clanak/articleContent';
import SideArticleCard from '@/components/myComponents/stranice/novosti/clanak/sideArticleGrid';
import Seo from '@/components/seo';
import { formatDateToString } from '@/lib/utils';
import type { Article, ArticleDetail } from '@/types/articles';
import type { GameSummary } from '@/types/games';

export default function Article({
    article,
    lastArticles,
    embeddedGames,
    season,
}: {
    article: ArticleDetail;
    embeddedGames: GameSummary[];
    lastArticles: Article[];
    season: string | null;
}) {
    return (
        <>
            <Seo
                title={`${article.meta_title?.trim() || article.title} | Likar Zadar`}
                description={
                    article.excerpt?.trim() ||
                    article.meta_description?.trim() ||
                    `Pročitajte članak „${article.title}“ i aktualnosti iz LIKAR lige Zadar.`
                }
                url={`/novosti/${article.id}`}
                image={
                    article.main_image
                        ? `/storage/${article.main_image}`
                        : undefined
                }
                imageAlt={article.title}
                type="article"
                publishedAt={article.published_at}
                modifiedAt={article.updated_at}
            />
            <section className="mx-auto my-5 max-[450px]:px-4! max-2xl:px-18 max-xl:px-16 max-lg:px-12 max-sm:px-10 sm:my-5 sm:mb-10 2xl:max-w-300">
                <div className="rounded-4xl border border-likar1 bg-likar2 shadow-2xl shadow-likar1">
                    <div className="relative h-[65vh] max-h-187.5 sm:h-[85vh]">
                        <div
                            className="h-full max-h-187.5 rounded-t-4xl bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: article.main_image
                                    ? `url(/storage/${article.main_image})`
                                    : `url(/images/design/landing.jpg)`,
                                viewTransitionName: `article-image-${article.id}`,
                            }}
                        ></div>

                        <div className="article-hero-content absolute bottom-0 left-0 z-20 w-full px-5 pt-14 pb-6">
                            <div className="z-20 flex flex-col gap-4">
                                {season && (
                                    <span className="font-jet w-fit rounded-xl bg-slate-600 px-2 py-1 font-heading text-sm text-slate-100 transition-colors duration-300 group-hover:bg-likar1">
                                        {season}
                                    </span>
                                )}
                                <p className="font-text text-sm text-slate-100">
                                    {article.title}
                                </p>
                                <time className="flex flex-row items-center gap-3 text-sm text-slate-100">
                                    <Clock className="h-4 w-4" />{' '}
                                    {formatDateToString(
                                        new Date(
                                            article.published_at ??
                                                article.created_at,
                                        ),
                                    )}
                                </time>
                            </div>
                            <div className="absolute inset-0 -z-10 bg-linear-to-t from-slate-900 via-slate-900/90 to-transparent" />
                        </div>
                    </div>
                    <div className="p-5">
                        <div className="relative flex w-full flex-col justify-between gap-8 md:flex-row">
                            <div className="mb-15 flex min-w-0 flex-col justify-start gap-6 max-2xl:grow 2xl:basis-[70%]">
                                {article.excerpt && (
                                    <div className="rounded-xl border border-likar4 bg-likar2 p-3.5">
                                        <p className="z-20 font-text text-xl font-medium text-slate-100">
                                            {article.excerpt}
                                        </p>
                                    </div>
                                )}
                                <ArticleContent
                                    content={article.content}
                                    embeddedGames={embeddedGames}
                                />
                                {article.gallery && (
                                    <ArticleGallery
                                        key={article.gallery.id}
                                        gallery={article.gallery}
                                    />
                                )}
                                <ArticleTags tags={article.tags} />
                            </div>
                            <SideArticleCard articles={lastArticles} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
