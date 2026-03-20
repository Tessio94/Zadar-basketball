import { Head } from '@inertiajs/react';
import AddOptions from '@/components/myComponents/stranice/admin/panel/addOptions';
import LastGames from '@/components/myComponents/stranice/admin/panel/lastGames/lastGames';
import LastNews from '@/components/myComponents/stranice/admin/panel/lastNews/lastNews';
import UpcomingGames from '@/components/myComponents/stranice/admin/panel/upcomingGames';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin panel',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    return (
        <>
            <Head title="Admin panel" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <UpcomingGames />
                    <AddOptions />
                </div>
                <div className="grid min-h-screen flex-1 gap-4 md:min-h-min md:grid-cols-2">
                    <LastGames />
                    <LastNews />
                </div>
            </div>
        </>
    );
}

Dashboard.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={breadcrumbs} children={page} />
);
