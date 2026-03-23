import { Link } from '@inertiajs/react';

export default function Pagination({
    links,
}: {
    links: {
        url: string | null;
        label: string;
        page: string | null;
        active: boolean;
    }[];
}) {
    return (
        <div className="mt-4 flex gap-2">
            {links.map((link, i) => (
                <Link
                    key={i}
                    href={link.url || ''}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={`rounded-xl border border-likar3 px-3 py-1 text-slate-100 ${
                        link.active ? 'bg-likar3 text-white' : ''
                    } ${!link.url ? 'pointer-events-none opacity-50' : ''}`}
                />
            ))}
        </div>
    );
}
