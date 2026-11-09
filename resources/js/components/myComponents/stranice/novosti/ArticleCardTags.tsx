import { cn } from '@/lib/utils';
import type { ArticleCardTag } from './articleCard';

type ArticleCardTagsProps = {
    tags?: readonly ArticleCardTag[] | null;
    parent?: 'simple' | 'main';
};

export default function ArticleCardTags({
    tags,
    parent = 'simple',
}: ArticleCardTagsProps) {
    if (!tags?.length) return null;

    const visibleTags = tags.slice(0, 3);
    const remainingTags = tags.slice(3);

    return (
        <ul
            aria-label="Oznake članka"
            className={cn(
                'flex min-w-0 flex-wrap gap-1.5 font-text text-xs text-slate-200',
                parent === 'main' ? '' : 'mt-4',
            )}
        >
            {visibleTags.map((tag) => (
                <li
                    key={tag.id}
                    title={tag.name}
                    className="max-w-full min-w-0 truncate rounded-full border border-slate-100/10 bg-slate-100/5 px-2.5 py-1"
                >
                    {tag.name}
                </li>
            ))}
            {remainingTags.length > 0 && (
                <li
                    title={remainingTags.map((tag) => tag.name).join(', ')}
                    aria-label={`Još ${remainingTags.length} oznaka`}
                    className="rounded-full border border-likar3/20 bg-likar3/10 px-2.5 py-1 text-likar3"
                >
                    +{remainingTags.length}
                </li>
            )}
        </ul>
    );
}
