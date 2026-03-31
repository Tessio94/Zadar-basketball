import { Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

export default function DashboardButton({
    type,
    text,
    href,
}: {
    type: 'add' | 'link';
    text: string;
    href: string;
}) {
    if (type === 'add') {
        return (
            <Link
                href={href}
                className="group flex w-full flex-row items-center justify-center gap-2 rounded-xl border border-transparent bg-likar2 px-3 py-1.5 text-base font-semibold text-slate-100 transition-all duration-300 hover:border-likar1"
            >
                <Plus className="transition-all duration-300 group-hover:rotate-180 group-hover:text-likar1" />
                {text}
            </Link>
        );
    } else if (type === 'link') {
        return (
            <Link
                href={href}
                className="rounded-xl border border-transparent bg-likar2 px-3 py-1.5 text-base font-semibold text-slate-100 transition-all duration-300 hover:border-likar1"
            >
                {text}
            </Link>
        );
    }
}
