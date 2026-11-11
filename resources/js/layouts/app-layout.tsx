import { Head } from '@inertiajs/react';
import { Toaster } from 'sonner';
import FlashMessages from '@/components/myComponents/stranice/admin/ui/FlashMessages';
import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import type { AppLayoutProps } from '@/types';

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        <Head>
            <meta head-key="robots" name="robots" content="noindex, follow" />
        </Head>
        <Toaster />
        <FlashMessages />
        {children}
    </AppLayoutTemplate>
);
