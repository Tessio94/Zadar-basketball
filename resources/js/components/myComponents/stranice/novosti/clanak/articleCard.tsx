import { Clock } from 'lucide-react';

export default function ArticleCard() {
    return (
        <article className="group flex w-full flex-col justify-between gap-3 border-b border-slate-100/60 py-3 hover:bg-likar2/10 max-[500px]:w-full! max-[500px]:px-0! max-md:w-1/2 max-md:odd:pr-3 max-md:even:pl-3 2xl:flex-row">
            <img
                src="/images/design/landing.jpg"
                alt=""
                className="aspect-video rounded-lg transition-transform duration-300 group-hover:scale-90 md:w-50"
            />
            <h3 className="grow font-text text-xl font-semibold text-slate-200 transition-colors duration-300 group-hover:text-likar3 max-2xl:w-50 max-md:w-auto">
                <a href="">Likar Krombacher - liga rekreativaca Zadar</a>
                <time className="flex flex-row items-center gap-3 font-text text-base text-slate-100">
                    <Clock className="h-4 w-4" /> 23. veljače 2026.
                </time>
            </h3>
        </article>
    );
}
