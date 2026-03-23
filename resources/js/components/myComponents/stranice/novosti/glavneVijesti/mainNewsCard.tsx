import { Link } from '@inertiajs/react';
import { Clock } from 'lucide-react';
import { show } from '@/actions/App/Http/Controllers/ArticleController';
import { cn } from '@/lib/utils';
import type { Article } from '@/types/propTypes';

export default function MainNewsCard({
    article,
    articleNo,
}: {
    article: Article;
    articleNo: number;
}) {
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
                    ? `url(${article.main_image})`
                    : "url('/images/design/landing.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="relative z-20 p-3">
                <div className="absolute inset-0 -z-10 bg-linear-to-t from-slate-900 to-transparent duration-300" />
                <div className="absolute inset-0 -z-10 bg-linear-to-t from-slate-900 via-slate-900 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="z-20 flex flex-col gap-4">
                    <span className="font-jet w-fit rounded-xl bg-slate-600 px-2 py-1 font-heading text-sm text-slate-100 transition-colors duration-300 group-hover:bg-likar1">
                        2025-2026
                    </span>
                    <p className="font-text text-sm text-slate-100">
                        {article.title}
                    </p>
                    <time className="flex flex-row items-center gap-3 text-sm text-slate-100">
                        <Clock className="h-4 w-4" /> 23. veljače 2026.
                    </time>
                </div>
            </div>
        </Link>
    );
}
