import { Link } from '@inertiajs/react';
import { edit } from '@/actions/App/Http/Controllers/Admin/ArticleController';
import { cn, formatRelativeTime } from '@/lib/utils';
import type { AdminArticleListItem } from '@/types/propTypes';

export default function LastNewsCard({
    article,
}: {
    article: AdminArticleListItem;
}) {
    return (
        <Link
            href={edit(article.id).url}
            className="flex flex-row items-center gap-4 rounded-xl bg-linear-to-l from-transparent to-likar2 px-3 py-1.5 inset-shadow-transparent transition-all duration-300 hover:inset-shadow-[0px_8px_20px] hover:inset-shadow-likar1"
        >
            <div
                className={cn(
                    'h-2.5 w-2.5 shrink-0 rounded-full',
                    article.published_at ? 'bg-green-500' : 'bg-likar3',
                )}
            />
            <div className="flex flex-col gap-2">
                <h4 className="font-heading text-lg font-medium text-slate-100 sm:text-xl">
                    {article.title}
                </h4>
                <p className="text-sm font-semibold text-slate-100">
                    <span className="font-normal text-slate-300">
                        Objavljeno:
                    </span>{' '}
                    {article.published_at
                        ? formatRelativeTime(article.published_at)
                        : 'nije objavljeno'}
                </p>
            </div>
        </Link>
    );
}
