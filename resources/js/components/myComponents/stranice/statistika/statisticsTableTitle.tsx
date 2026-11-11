import { Link } from '@inertiajs/react';
import { ArrowUpRight } from 'lucide-react';

export default function StatisticsTableTitle({
    title,
    href,
}: {
    title: string;
    href?: string;
}) {
    return (
        <h3 className="shrink-0 font-heading text-xl font-semibold text-slate-100">
            {href ? (
                <Link
                    href={href}
                    className="group inline-flex items-center gap-2 rounded-sm hover:text-orange-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-likar3"
                >
                    {title}
                    <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 shrink-0 text-likar3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
                    />
                    <span className="sr-only"> — prikaži sve igrače</span>
                </Link>
            ) : (
                title
            )}
        </h3>
    );
}
