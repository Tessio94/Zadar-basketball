import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';

export default function Pagination({
    links,
    type,
}: {
    links: {
        url: string | null;
        label: string;
        page: number | null;
        active: boolean;
    }[];
    type: string;
}) {
    return (
        <div className="mt-4 flex gap-2">
            {links.map((link, i) => (
                <Link
                    key={i}
                    href={link.url || ''}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={cn(
                        'rounded-xl border border-likar3 px-3 py-1',
                        type === 'front' && 'text-slate-100',
                        type === 'admin' && 'text-slate-900',
                        link.active && 'bg-likar3 text-white',
                        !link.url && 'pointer-events-none opacity-50',
                    )}
                />
            ))}
        </div>
    );
}
