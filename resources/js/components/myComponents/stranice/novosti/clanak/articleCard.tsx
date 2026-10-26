import { Link } from '@inertiajs/react';
import { Clock } from 'lucide-react';
import { show } from '@/actions/App/Http/Controllers/ArticleController';

export default function ArticleCard({
    title,
    date,
    imageUrl,
    id,
}: {
    title: string;
    date: string;
    imageUrl: string | null;
    id: number;
}) {
    return (
        <Link
            href={show(id)}
            className="inline-block w-full border-b border-slate-100/60 py-3 hover:bg-likar2/10 max-[500px]:w-full! max-[500px]:px-0! max-md:w-1/2 max-md:odd:pr-3 max-md:even:pl-3"
        >
            <article className="group flex flex-col justify-between gap-3 2xl:flex-row">
                <img
                    src={
                        imageUrl
                            ? `/storage/${imageUrl}`
                            : '/images/design/landing.jpg'
                    }
                    alt=""
                    className="aspect-video rounded-lg transition-transform duration-300 group-hover:scale-90 md:w-30"
                />
                <h3 className="grow font-text text-base font-semibold text-slate-200 transition-colors duration-300 group-hover:text-likar3 max-2xl:w-50 max-md:w-auto">
                    <span className="line-clamp-3 2xl:line-clamp-2">
                        {title}
                    </span>
                    <time className="mt-2 flex flex-row items-center gap-3 font-text text-sm font-normal text-slate-300">
                        <Clock className="h-4 w-4" /> {date}
                    </time>
                </h3>
            </article>
        </Link>
    );
}
