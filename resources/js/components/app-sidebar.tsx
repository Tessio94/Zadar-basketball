import { Link } from '@inertiajs/react';
import {
    BookOpen,
    Dribbble,
    Folder,
    ShieldHalfIcon,
    Images,
    LayoutGrid,
    Newspaper,
    User2Icon,
} from 'lucide-react';
import { index as adminArticleIndex } from '@/actions/App/Http/Controllers/Admin/ArticleController';
import { index as adminTeamController } from '@/actions/App/Http/Controllers/Admin/TeamController';
import { NavFooter } from '@/components/nav-footer';
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
import AppLogo from './app-logo';
import { index as adminPlayerController } from '@/actions/App/Http/Controllers/Admin/PlayerController';

const mainNavItems: NavItem[] = [
    {
        title: 'Admin panel',
        href: panel(),
        icon: LayoutGrid,
    },
    {
        title: 'Ekipe',
        href: adminTeamController(),
        icon: ShieldHalfIcon,
    },
    {
        title: 'Igrači',
        href: adminPlayerController(),
        icon: User2Icon,
    },
    {
        title: 'Utakmice',
        href: panel(),
        icon: Dribbble,
    },
    {
        title: 'Novosti',
        href: adminArticleIndex(),
        icon: Newspaper,
    },
    {
        title: 'Galerije',
        href: panel(),
        icon: Images,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
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
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
