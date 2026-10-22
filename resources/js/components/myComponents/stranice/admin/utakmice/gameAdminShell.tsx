import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';
import AdminMainContent from '@/components/myComponents/stranice/admin/ui/adminMainContent';
import AppLayout from '@/layouts/app-layout';
import { base } from './types';

export default function GameAdminShell({
    title,
    children,
}: {
    title: string;
    children: ReactNode;
}) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Utakmice', href: base },
                { title, href: '' },
            ]}
        >
            <AdminMainContent>
                <div className="mx-auto w-full max-w-[1600px] space-y-6 text-slate-900">
                    <div>
                        <Link
                            href={base}
                            className="text-sm font-medium text-orange-700 hover:underline"
                        >
                            Upravljanje utakmicama
                        </Link>
                        <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                            {title}
                        </h1>
                    </div>
                    {children}
                </div>
            </AdminMainContent>
        </AppLayout>
    );
}
export function FormErrors({
    errors,
}: {
    errors: Record<string, string | undefined>;
}) {
    const messages = Object.entries(errors).filter(([, message]) => message);
    return messages.length > 0 ? (
        <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
            <p className="font-semibold">Provjerite unos</p>
            <ul className="mt-2 list-inside list-disc space-y-1">
                {messages.map(([key, message]) => (
                    <li key={key}>{message}</li>
                ))}
            </ul>
        </div>
    ) : null;
}
