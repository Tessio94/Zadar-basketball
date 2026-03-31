import { create } from '@/actions/App/Http/Controllers/Admin/ArticleController';
import DashboardButton from '../ui/dashboardButton';

export default function AddOptions() {
    return (
        <div className="relative z-10 flex h-full flex-row items-center justify-center overflow-hidden rounded-xl border border-sidebar-border/70 bg-[url('/images/design/snow4.jpg')] bg-cover dark:border-sidebar-border">
            <div className="flex flex-row flex-wrap justify-center gap-5 p-5">
                <div className="basis-full xl:basis-5/12">
                    <DashboardButton
                        type="add"
                        text="Dodaj utakmice"
                        href={''}
                    />
                </div>
                <div className="basis-full xl:basis-5/12">
                    <DashboardButton type="add" text="Dodaj ekipe" href={''} />
                </div>

                <div className="basis-full xl:basis-5/12">
                    <DashboardButton
                        type="add"
                        text="Dodaj novosti"
                        href={create().url}
                    />
                </div>
                <div className="basis-full xl:basis-5/12">
                    <DashboardButton
                        type="add"
                        text="Dodaj galeriju"
                        href={''}
                    />
                </div>
            </div>
        </div>
    );
}
