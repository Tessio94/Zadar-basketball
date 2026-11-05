import { Link } from '@inertiajs/react';
import { Tag } from 'lucide-react';
import { archive } from '@/routes';
import type { ArticleTag } from '@/types/tags';

export default function ArticleTags({ tags }: { tags: ArticleTag[] }) {
    if (tags.length === 0) return null;

    return (
        <nav
            aria-label="Oznake članka"
            className="mt-3 border-t border-white/10 pt-5 text-slate-100"
        >
            <p className="mb-3 flex items-center gap-2 text-xs tracking-wider text-slate-400 uppercase">
                <Tag className="size-4" aria-hidden="true" />
                Povezane teme
            </p>
            <ul className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <li key={tag.id} className="max-w-full">
                        <Link
                            href={archive({ query: { tag: tag.id } })}
                            className="inline-flex min-h-10 items-center rounded-xl border border-white/10 bg-slate-600/60 px-3 py-2 font-heading text-sm break-words transition-colors hover:border-likar3/50 hover:bg-likar3/15 hover:text-likar3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-likar3 motion-reduce:transition-none"
                        >
                            {tag.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
