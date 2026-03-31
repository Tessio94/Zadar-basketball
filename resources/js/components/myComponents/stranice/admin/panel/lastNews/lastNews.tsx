import { index } from '@/actions/App/Http/Controllers/Admin/ArticleController';
import LastNewsCard from '../lastNews/lastNewsCard';
import DashboardButton from '../ui/dashboardButton';

export default function LastNews() {
    return (
        <div className="relative z-10 h-full overflow-hidden rounded-xl border border-sidebar-border/70 bg-[url('/images/design/snow4.jpg')] bg-cover dark:border-sidebar-border">
            <h3 className="p-5 text-lg font-semibold text-slate-100">
                Posljednje novosti
            </h3>
            <div className="mx-5 flex flex-col gap-2 rounded-2xl">
                <LastNewsCard />
                <LastNewsCard />
                <LastNewsCard />
                <LastNewsCard />
                <LastNewsCard />
            </div>

            <div className="flex flex-row items-center justify-center p-5">
                <DashboardButton
                    type="link"
                    text="Pregledaj sve"
                    href={index().url}
                />
            </div>
        </div>
    );
}
