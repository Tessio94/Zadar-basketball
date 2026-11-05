import { Link, usePage } from '@inertiajs/react';
import {
    // BookOpen,
    Dribbble,
    // Folder,
    ShieldHalfIcon,
    Images,
    LayoutGrid,
    Newspaper,
    User2Icon,
} from 'lucide-react';
import { index as adminArticleIndex } from '@/actions/App/Http/Controllers/Admin/ArticleController';
import { index as adminGalleryController } from '@/actions/App/Http/Controllers/Admin/GalleryController';
import { index as adminPlayerController } from '@/actions/App/Http/Controllers/Admin/PlayerController';
import { index as adminSeasonController } from '@/actions/App/Http/Controllers/Admin/SeasonController';
import { index as adminTeamController } from '@/actions/App/Http/Controllers/Admin/TeamController';
// import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { panel } from '@/routes/admin';
import type { NavItem } from '@/types';
import type { StaffPermissions } from '@/types/auth';
import AppLogo from './app-logo';
import SeasonCalendar from './myComponents/ui/icons/seasonCalendar';

type StaffNavItem = NavItem & { permission?: keyof StaffPermissions };

const mainNavItems: StaffNavItem[] = [
    {
        title: 'Admin panel',
        href: panel(),
        icon: LayoutGrid,
    },
    {
        title: 'Ekipe',
        permission: 'manageLeague',
        href: adminTeamController(),
        icon: ShieldHalfIcon,
    },
    {
        title: 'Igrači',
        permission: 'manageLeague',
        href: adminPlayerController(),
        icon: User2Icon,
    },
    {
        title: 'Utakmice',
        permission: 'manageLeague',
        href: '/admin-panel/utakmice',
        icon: Dribbble,
    },
    {
        title: 'Sezone',
        permission: 'manageLeague',
        href: adminSeasonController(),
        icon: SeasonCalendar,
    },
    {
        title: 'Novosti',
        href: adminArticleIndex(),
        icon: Newspaper,
    },
    {
        title: 'Galerije',
        href: adminGalleryController(),
        icon: Images,
    },
];

// const footerNavItems: NavItem[] = [
//     {
//         title: 'Repository',
//         href: 'https://github.com/laravel/react-starter-kit',
//         icon: Folder,
//     },
//     {
//         title: 'Documentation',
//         href: 'https://laravel.com/docs/starter-kits#react',
//         icon: BookOpen,
//     },
// ];

export function AppSidebar() {
    const { auth } = usePage().props;
    const visibleItems = mainNavItems.filter(
        (item) => !item.permission || auth.permissions[item.permission],
    );
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={panel()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={visibleItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
