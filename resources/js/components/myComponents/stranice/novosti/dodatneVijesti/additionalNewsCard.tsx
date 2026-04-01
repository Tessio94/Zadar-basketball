import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { show } from '@/actions/App/Http/Controllers/ArticleController';
import type { Article } from '@/types/propTypes';

const APP_URL = import.meta.env.VITE_APP_URL;

export default function AdditionalNewsCard({ article }: { article: Article }) {
    return (
        <Link
            href={show(article.id)}
            rel="noopener noreferrer"
            className="group z-100 flex cursor-pointer flex-col overflow-hidden rounded-2xl border-2 border-likar1 shadow-lg shadow-likar1"
        >
            <div className="shrink-0 overflow-hidden">
                {article.main_image ? (
                    <img
                        src={`${APP_URL}/storage/${article.main_image}`}
                        alt=""
                        loading="lazy"
                        className="transition-transform duration-300 group-hover:scale-110"
                    />
                ) : (
                    <img
                        src="/images/design/landing.jpg"
                        alt=""
                        loading="lazy"
                        className="transition-transform duration-300 group-hover:scale-110"
                    />
                )}
            </div>
            <div className="flex grow flex-col justify-between gap-6 bg-likar2 p-3">
                <h5 className="font-heading text-lg font-semibold text-slate-100">
                    {article.title}
                </h5>
                {article.excerpt && (
                    <p className="font-text text-sm text-slate-100">
                        {article.excerpt}
                    </p>
                )}
                <div className="flex flex-wrap gap-2 text-slate-100">
                    <span className="font-jet rounded-xl bg-slate-600 px-2 py-1 font-heading text-sm">
                        2025-2026
                    </span>
                    <span className="font-jet rounded-xl bg-slate-600 px-2 py-1 font-heading text-sm">
                        KK vodovod Ballers
                    </span>
                </div>
                <div className="text-theme2 flex w-fit items-center gap-3 font-heading text-lg font-semibold text-likar3">
                    Pogledaj više
                    <ArrowRight className="text-likar3 transition-all duration-300 group-hover:translate-x-1.5" />
                </div>
            </div>
        </Link>
    );
}
