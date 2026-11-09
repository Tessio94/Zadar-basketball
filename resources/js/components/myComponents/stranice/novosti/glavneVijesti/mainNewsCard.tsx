import { Link } from '@inertiajs/react';
import { CalendarDays } from 'lucide-react';
import { show } from '@/actions/App/Http/Controllers/ArticleController';
import { cn } from '@/lib/utils';
import {
    articleCardDate,
    type ArticleCardData,
} from '@/components/myComponents/stranice/novosti/articleCard';
import ArticleCardTags from '@/components/myComponents/stranice/novosti/ArticleCardTags';

export default function MainNewsCard({
    article,
    articleNo,
}: {
    article: ArticleCardData;
    articleNo: number;
}) {
    const date = articleCardDate(article);

    return (
        <Link
            href={show(article.id)}
            rel="noopener noreferrer"
            className={cn(
                'group relative z-100 flex cursor-pointer flex-col justify-end gap-4 overflow-hidden border-2 border-likar3 shadow-lg shadow-likar1 max-sm:aspect-square max-sm:rounded-2xl',
                articleNo === 1 &&
                    'sm:col-span-1 sm:row-span-2 sm:rounded-tl-2xl lg:col-span-2 lg:row-span-1 xl:col-span-2 xl:row-span-2 xl:rounded-l-2xl',
                articleNo === 2 &&
                    'sm:rounded-tr-2xl lg:col-span-1 lg:row-span-2 lg:rounded-tr-none xl:col-span-2 xl:row-span-1',
                articleNo === 3 &&
                    'lg:col-span-1 lg:row-span-2 lg:rounded-r-2xl xl:col-span-1 xl:row-span-2',
                articleNo === 4 &&
                    'sm:rounded-bl-2xl lg:col-span-1 lg:row-span-1 xl:col-span-1 xl:row-span-1 xl:rounded-bl-none',
                articleNo === 5 &&
                    'sm:rounded-br-2xl lg:col-span-1 lg:row-span-1 lg:rounded-br-none xl:col-span-1 xl:row-span-1',
            )}
            style={{
                backgroundImage: article.main_image
                    ? `url(/storage/${article.main_image})`
                    : "url('/images/design/landing.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                viewTransitionName: `article-image-${article.id}`,
            }}
        >
            <div className="relative z-20 p-3">
                <div className="absolute inset-0 -top-5 -z-10 bg-linear-to-t from-slate-900 to-transparent duration-300" />
                <div className="absolute inset-0 -top-5 -z-10 bg-linear-to-t from-slate-900 via-slate-900 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="z-20 flex flex-col gap-2">
                    <p className="font-text text-sm text-slate-100">
                        {article.title}
                    </p>
                    {date && (
                        <time
                            dateTime={date.dateTime}
                            className="inline-flex items-center gap-1.5 font-text text-xs text-slate-300"
                        >
                            <CalendarDays
                                aria-hidden="true"
                                className="size-3.5 shrink-0 text-slate-400"
                            />
                            {date.label}
                        </time>
                    )}
                    <ArticleCardTags tags={article.tags} parent="main" />
                </div>
            </div>
        </Link>
    );
}
