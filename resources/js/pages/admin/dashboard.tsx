import { Head } from '@inertiajs/react';
import AddOptions from '@/components/myComponents/stranice/admin/panel/addOptions/addOptions';
import LastGames from '@/components/myComponents/stranice/admin/panel/lastGames/lastGames';
import LastNews from '@/components/myComponents/stranice/admin/panel/lastNews/lastNews';
import AdminLowerGrid from '@/components/myComponents/stranice/admin/panel/ui/adminLowerGrid';
import AdminUpperGrid from '@/components/myComponents/stranice/admin/panel/ui/adminUpperGrid';
import UpcomingGames from '@/components/myComponents/stranice/admin/panel/upcomingGames/upcomingGames';
import AdminMainContent from '@/components/myComponents/stranice/admin/ui/adminMainContent';
import AppLayout from '@/layouts/app-layout';
import { panel } from '@/routes/admin';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin panel',
        href: panel().url,
    },
];

export default function Dashboard() {
    return (
        <>
            <Head title="Admin panel" />
            <AdminMainContent>
                <AdminUpperGrid>
                    <UpcomingGames />
                    <AddOptions />
                </AdminUpperGrid>
                <AdminLowerGrid>
                    <LastGames />
                    <LastNews />
                </AdminLowerGrid>
            </AdminMainContent>
        </>
    );
}

Dashboard.layout = (page: React.ReactNode) => (
    <AppLayout breadcrumbs={breadcrumbs} children={page} />
);
