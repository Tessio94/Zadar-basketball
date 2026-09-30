import { Toaster } from 'sonner';
import FlashMessages from '@/components/myComponents/stranice/admin/ui/FlashMessages';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { AppLayoutProps } from '@/types';

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        <Toaster />
        <FlashMessages />
        {children}
    </AppLayoutTemplate>
);
