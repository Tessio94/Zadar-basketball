import {
    create,
    index,
} from '@/actions/App/Http/Controllers/Admin/ArticleController';
import type { AdminArticleListItem } from '@/types/propTypes';
import LastNewsCard from '../lastNews/lastNewsCard';
import DashboardButton from '../ui/dashboardButton';

export default function LastNews({
    articles,
}: {
    articles: AdminArticleListItem[];
}) {
    const articlesExist = articles.length;

    return (
        <div className="relative z-10 h-full overflow-hidden rounded-xl border border-sidebar-border/70 bg-[url('/images/design/snow4.jpg')] bg-cover dark:border-sidebar-border">
            <h3 className="p-5 text-lg font-semibold text-slate-100">
                Posljednje novosti
            </h3>
            {articles.length > 0 ? (
                <>
                    {' '}
                    <div className="mx-5 flex flex-col gap-2 rounded-2xl">
                        {articles.map((article) => {
                            return (
                                <LastNewsCard
                                    article={article}
                                    key={article.id}
                                />
                            );
                        })}
                    </div>
                    <div className="flex flex-row items-center justify-center p-5">
                        <DashboardButton
                            type="link"
                            text="Pregledaj sve"
                            href={index().url}
                        />
                    </div>
                </>
            ) : (
                <div className="mt-10 flex flex-col items-center justify-center gap-5">
                    <p className="text-center font-text text-xl text-slate-100">
                        Trenutno nema vijesti
                    </p>
                    <DashboardButton
                        type="link"
                        text="Objavi vijest"
                        href={create().url}
                    />
                </div>
            )}
        </div>
    );
}
